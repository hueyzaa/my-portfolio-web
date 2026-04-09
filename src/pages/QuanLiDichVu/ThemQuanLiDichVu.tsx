import { PlusOutlined } from '@ant-design/icons';
import { postData } from '@app/api/postData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import FormQuanLiDichVu from './FormQuanLiDichVu';
import { useTranslation } from 'react-i18next';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { getListData } from '@app/api/getData.api';
import { handleDuplicateOrder } from '@app/utils/utils';

const ThemQuanLiDichVu = ({ path }: { path: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [existingOrders, setExistingOrders] = useState<number[]>([]);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const title = `Thêm ${t('common.quan-li-dich-vu').toLowerCase()}`;

  const showModal = async () => {
    try {
      const res = await getListData(path, { limit: 1000 });
      if (res?.data) {
        const orders = res.data.map((item: any) => item.thu_tu);
        setExistingOrders(orders);
        // Suggest next order (starting from 1)
        const nextOrder = handleDuplicateOrder(1, orders);
        form.setFieldsValue({ thu_tu: nextOrder });
      }
    } catch (error) {
      console.error('Error fetching existing orders:', error);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onCreate = async (values: any) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Append basic fields
      formData.append('ten', values.ten);
      if (values.mo_ta) formData.append('mo_ta', values.mo_ta);
      if (values.thu_tu !== undefined) formData.append('thu_tu', values.thu_tu.toString());
      if (values.trang_thai !== undefined) formData.append('trang_thai', values.trang_thai ? '1' : '0');

      // Append tags individually
      if (Array.isArray(values.tags)) {
        values.tags.forEach((tag: string) => formData.append('tags[]', tag));
      }

      // Handle File
      if (values.anh && values.anh.length > 0) {
        const file = values.anh[0].originFileObj;
        if (file) {
          formData.append('file', file);
        } else {
          // If it happens to be an existing path (unlikely for Them)
          formData.append('anh', values.anh[0].url || values.anh[0].response?.path || '');
        }
      }

      const closeModel = () => {
        handleCancel();
        dispatch(appActions.toggleReload('DANH_SACH'));
      };
      await postData(path, formData, closeModel);
    } catch (error) {
      console.error('Error creating service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BaseButton onClick={showModal} type='primary' size='small' title={title} icon={<PlusOutlined />}>
        Thêm
      </BaseButton>
      <BaseModal
        title={
          <BaseTypography.Title style={{ textAlign: 'center' }} level={3}>
            {title.toUpperCase()}
          </BaseTypography.Title>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        centered
        footer={[
          <BaseButton
            key='submit'
            form='formThemQuanLiDichVu'
            type='primary'
            size='small'
            htmlType='submit'
            loading={isLoading}
          >
            Hoàn thành
          </BaseButton>
        ]}
      >
        <BaseForm id='formThemQuanLiDichVu' form={form} layout='vertical' onFinish={onCreate}>
          <FormQuanLiDichVu disabled={false} existingOrders={existingOrders} />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default ThemQuanLiDichVu;
