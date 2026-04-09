import { getDataById } from '@app/api/getData.api';
import { patchData } from '@app/api/updateData';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { apiURL } from '@app/configs/configs';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import FormQuanLiDuAn from './FormQuanLiDuAn';
import ProjectFormPage from './components/ProjectFormPage';
import { ProjectEntity, ProjectFormValues } from './types';
import { PROJECT_PATH, STATUS_DRAFT, STATUS_PUBLISHED } from './constants';
import { getListData } from '@app/api/getData.api';
import { getImageUrl } from '@app/utils/utils';

const SuaQuanLiDuAn = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const [initialData, setInitialData] = useState<ProjectEntity | null>(null);
  const [existingOrders, setExistingOrders] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const path = PROJECT_PATH;
  const title = `Sửa ${t('common.quan-li-du-an').toLowerCase()}`;

  const transformToFileList = (filePath: string | string[]) => {
    if (!filePath) return [];
    const paths = Array.isArray(filePath) ? filePath : [filePath];
    return paths.map((p, index) => ({
      uid: `-${index}`,
      name: p.split(/[/\\]/).pop() || 'image.png',
      status: 'done',
      url: getImageUrl(apiURL, p),
      thumbUrl: getImageUrl(apiURL, p),
      response: { path: p }
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [data, listRes] = await Promise.all([getDataById(Number(id), path), getListData(path, { limit: 1000 })]);

        if (data) {
          const formData = {
            ...data,
            status: data.status === STATUS_PUBLISHED,
            thumbnail: transformToFileList(data.thumbnail || ''),
            gallery: transformToFileList(data.gallery || []),
            tools: (data.tools || data.tool_details?.map((t: any) => t.id) || []).map(Number)
          };
          setInitialData(formData as any);
          form.setFieldsValue(formData);
        }

        if (listRes?.data) {
          setExistingOrders(listRes.data.map((item: any) => item.order));
        }
      } catch (error) {
        console.error('Error fetching project data or orders:', error);
      }
    };
    fetchData();
  }, [id, path, form]);

  const goBack = () => {
    navigate('/quan-li-du-an');
  };

  const onUpdate = async (values: ProjectFormValues) => {
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

      // Resolve Tools
      if (Array.isArray(values.tools)) {
        values.tools.forEach((tool: any) => formData.append('tools[]', tool));
      }

      // 1. Handle Thumbnail
      if (values.thumbnail && values.thumbnail.length > 0) {
        const item = values.thumbnail[0];
        if (item.originFileObj) {
          formData.append('thumbnail', item.originFileObj);
        } else {
          const path = item.response?.path || item.url?.replace(`${apiURL}/`, '') || '';
          formData.append('thumbnail', path);
        }
      }

      // 2. Handle Gallery
      if (values.gallery && values.gallery.length > 0) {
        values.gallery.forEach((item: any) => {
          if (item.originFileObj) {
            formData.append('gallery', item.originFileObj);
          } else {
            const path = item.response?.path || item.url?.replace(`${apiURL}/`, '') || '';
            formData.append('gallery_existing[]', path);
          }
        });
      }

      const onSuccess = () => {
        dispatch(appActions.toggleReload('DANH_SACH'));
        goBack();
      };

      await patchData(path, Number(id), formData, onSuccess);
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectFormPage
      title={title}
      formId='formSuaQuanLiDuAn'
      form={form}
      onFinish={onUpdate}
      onBack={goBack}
      onReset={() => (initialData ? form.setFieldsValue(initialData) : form.resetFields())}
      loading={isLoading}
      submitLabel='Cập nhật'
    >
      <FormQuanLiDuAn existingOrders={existingOrders} />
    </ProjectFormPage>
  );
};

export default SuaQuanLiDuAn;
