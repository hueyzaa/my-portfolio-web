import { getDataById } from '@app/api/getData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EyeOutlined } from '@ant-design/icons';
import FormQuanLiDichVu from './FormQuanLiDichVu';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';

const XemChiTietQuanLiDichVu = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const title = `Chi tiết ${t('common.quan-li-dich-vu').toLowerCase()}`;

  const showModal = async () => {
    const data = await getDataById(id, path);
    if (data) {
      form.setFieldsValue(data);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BaseButton onClick={showModal} type='text' size='small' title={title} icon={<EyeOutlined />} />
      <BaseModal
        title={
          <BaseTypography.Title style={{ textAlign: 'center' }} level={3}>
            {title.toUpperCase()}
          </BaseTypography.Title>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={true}
        centered
        footer={[
          <BaseButton key='close' size='small' onClick={handleCancel}>
            Đóng
          </BaseButton>
        ]}
      >
        <BaseForm form={form} layout='vertical'>
          <FormQuanLiDichVu disabled={true} />
        </BaseForm>
      </BaseModal>
    </>
  );
};

export default XemChiTietQuanLiDichVu;
