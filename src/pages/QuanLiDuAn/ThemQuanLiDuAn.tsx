import { postData } from '@app/api/postData.api';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { appActions } from '@app/store/slices/appSlice';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FormQuanLiDuAn from './FormQuanLiDuAn';
import ProjectFormPage from './components/ProjectFormPage';
import { ProjectFormValues } from './types';
import { PROJECT_PATH, STATUS_DRAFT, STATUS_PUBLISHED } from './constants';
import { getListData } from '@app/api/getData.api';
import { handleDuplicateOrder } from '@app/utils/utils';
import { useEffect } from 'react';

const ThemQuanLiDuAn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [existingOrders, setExistingOrders] = useState<number[]>([]);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const title = `Thêm ${t('common.quan-li-du-an').toLowerCase()}`;
  const path = PROJECT_PATH;
  useEffect(() => {
    const fetchExistingOrders = async () => {
      try {
        const res = await getListData(path, { limit: 1000 });
        if (res?.data) {
          const orders = res.data.map((item: any) => item.order);
          setExistingOrders(orders);
          // Suggest next order
          const nextOrder = handleDuplicateOrder(0, orders);
          form.setFieldsValue({ order: nextOrder });
        }
      } catch (error) {
        console.error('Error fetching existing project orders:', error);
      }
    };
    fetchExistingOrders();
  }, [path, form]);

  const goBack = () => {
    navigate('/quan-li-du-an');
  };

  const onCreate = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Basic Fields
      formData.append('title', values.title);
      if (values.mo_ta_ngan) formData.append('mo_ta_ngan', values.mo_ta_ngan);
      if (values.mo_ta_chi_tiet) formData.append('mo_ta_chi_tiet', values.mo_ta_chi_tiet);
      if (values.vai_tro) formData.append('vai_tro', values.vai_tro);
      if (values.dich_vu) formData.append('dich_vu', values.dich_vu);
      if (values.tieu_de_phu) formData.append('tieu_de_phu', values.tieu_de_phu);
      if (values.order !== undefined) formData.append('order', values.order.toString());
      formData.append('status', values.status ? STATUS_PUBLISHED : STATUS_DRAFT);

      // JSON strings for arrays/objects if backend expects them that way,
      // but usually for Multipart we append individually or as JSON string.
      // My backend DTO has tools as IsArray. I'll append individually as tools[].
      if (Array.isArray(values.tools)) {
        values.tools.forEach((tool: any) => formData.append('tools[]', tool));
      }

      // 1. Handle Thumbnail
      if (values.thumbnail && values.thumbnail.length > 0) {
        const file = values.thumbnail[0].originFileObj;
        if (file) {
          formData.append('thumbnail', file);
        }
      }

      // 2. Handle Gallery
      if (values.gallery && values.gallery.length > 0) {
        values.gallery.forEach((item: any) => {
          if (item.originFileObj) {
            formData.append('gallery', item.originFileObj);
          }
        });
      }

      const onSuccess = () => {
        dispatch(appActions.toggleReload('DANH_SACH'));
        goBack();
      };

      await postData(path, formData, onSuccess);
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectFormPage
      title={title}
      formId='formThemQuanLiDuAn'
      form={form}
      onFinish={onCreate}
      onBack={() => navigate('/quan-li-du-an')}
      onReset={() => form.resetFields()}
      loading={isLoading}
      submitLabel='Hoàn thành'
    >
      <FormQuanLiDuAn existingOrders={existingOrders} />
    </ProjectFormPage>
  );
};

export default ThemQuanLiDuAn;
