import { EditOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/getData.api';
import { patchData } from '@app/api/updateData';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormQuanLiDichVu from './FormQuanLiDichVu';
import { apiURL } from '@app/configs/configs';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { getImageUrl } from '@app/utils/utils';

const SuaQuanLiDichVu = ({ path, id, existingOrders }: { path: string; id: number; existingOrders?: number[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const title = `Sửa ${t('common.quan-li-dich-vu').toLowerCase()}`;

  const transformToFileList = (filePath: string) => {
    if (!filePath) return [];
    return [
      {
        uid: '-1',
        name: filePath.split('/').pop() || 'image.png',
        status: 'done',
        url: getImageUrl(apiURL, filePath),
        thumbUrl: getImageUrl(apiURL, filePath),
        response: { path: filePath }
      }
    ];
  };

  const showModal = async () => {
    const data = await getDataById(id, path);
    if (data) {
      const formData = {
        ...data,
        anh: transformToFileList(data.anh || '')
      };
      form.setFieldsValue(formData);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onUpdate = async (values: any) => {
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
        const item = values.anh[0];
        if (item.originFileObj) {
          formData.append('file', item.originFileObj);
        } else {
          // Preserve existing path
          const existingPath = item.response?.path || item.url?.replace(`${apiURL}/`, '') || '';
          formData.append('anh', existingPath);
        }
      } else {
        formData.append('anh', '');
      }

      const closeModel = () => {
        handleCancel();
        dispatch(appActions.toggleReload('DANH_SACH'));
      };

      await patchData(path, id, formData, closeModel);
    } catch (error) {
      console.error('Error updating service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BaseButton onClick={showModal} type='text' size='small' title={title} icon={<EditOutlined />} />
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
            size='small'
            form={`formSuaQuanLiDichVu-${id}`}
            type='primary'
            htmlType='submit'
            loading={isLoading}
          >
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id={`formSuaQuanLiDichVu-${id}`} form={form} layout='vertical' onFinish={onUpdate}>
          <FormQuanLiDichVu disabled={false} existingOrders={existingOrders} />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default SuaQuanLiDichVu;
