import React, { useState } from 'react';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseEditor } from '@app/components/common/BaseEditor/BaseEditor';
import MainImageUpload from '@app/components/common/MainImageUpload/MainImageUpload';
import { apiInstance } from '@app/api/core.api';
import { notificationController } from '@app/controllers/notificationController';
import { ProfileData } from '../types';
import { apiURL } from '@app/configs/configs';

interface BioTabProps {
  initialData?: ProfileData;
  onUpdate: () => void;
}

export const BioTab: React.FC<BioTabProps> = ({ initialData, onUpdate }) => {
  const [form] = BaseForm.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Handle Avatar
      if (values.avatar && Array.isArray(values.avatar) && values.avatar.length > 0) {
        const item = values.avatar[0];
        if (item.originFileObj) {
          const formData = new FormData();
          formData.append('file', item.originFileObj);
          const res = await apiInstance.post('upload', formData);
          values.avatar = res.data.path;
        } else {
          values.avatar = item.url?.replace(`${apiURL}/`, '') || initialData?.avatar;
        }
      } else if (!values.avatar) {
        values.avatar = null;
      } else if (typeof values.avatar !== 'string') {
        values.avatar = initialData?.avatar;
      }

      await apiInstance.patch('thong-tin-ca-nhan/profile', values);
      notificationController.success({ message: 'Cập nhật tiểu sử thành công' });
      onUpdate();
    } catch {
      notificationController.error({ message: 'Lỗi cập nhật tiểu sử' });
    } finally {
      setLoading(false);
    }
  };

  const transformToFileList = (path?: string) => {
    if (!path) return [];
    return [
      {
        uid: '-1',
        name: 'avatar.png',
        status: 'done',
        url: path.startsWith('http') ? path : `${apiURL}/${path}`
      }
    ];
  };

  return (
    <BaseForm
      form={form}
      layout='vertical'
      initialValues={{
        ...initialData,
        avatar: transformToFileList(initialData?.avatar)
      }}
      onFinish={onFinish}
    >
      <BaseRow gutter={[20, 20]}>
        <BaseCol xs={24} md={8}>
          <BaseForm.Item name='avatar' label='Ảnh đại diện'>
            <MainImageUpload
              title='Ảnh đại diện'
              showTitle={false}
              helperText='Khuyên dùng kích thước vuông (e.g. 500x500)'
              uploadText='Tải lên'
              altText='avatar'
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} md={16}>
          <BaseRow gutter={[20, 0]}>
            <BaseCol span={24}>
              <BaseForm.Item name='ho_ten' label='Họ và tên' rules={[{ required: true }]}>
                <BaseInput size='small' placeholder='Nhập họ tên' />
              </BaseForm.Item>
            </BaseCol>
            <BaseCol span={24}>
              <BaseForm.Item name='chuc_danh' label='Chức danh / Nghề nghiệp'>
                <BaseInput size='small' placeholder='VD: Software Engineer | UI Designer' />
              </BaseForm.Item>
            </BaseCol>
            <BaseCol span={12}>
              <BaseForm.Item name='email' label='Email'>
                <BaseInput size='small' placeholder='Nhập email' />
              </BaseForm.Item>
            </BaseCol>
            <BaseCol span={12}>
              <BaseForm.Item name='so_dien_thoai' label='Số điện thoại'>
                <BaseInput size='small' placeholder='Nhập số điện thoại' />
              </BaseForm.Item>
            </BaseCol>
            <BaseCol span={24}>
              <BaseForm.Item name='dia_chi' label='Địa chỉ'>
                <BaseInput size='small' placeholder='Nhập địa chỉ' />
              </BaseForm.Item>
            </BaseCol>
          </BaseRow>
        </BaseCol>

        <BaseCol span={24}>
          <BaseForm.Item name='tieu_su' label='Tiểu sử giới thiệu'>
            <BaseEditor placeholder='Viết gì đó về bản thân bạn...' />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol span={24} style={{ marginTop: 16 }}>
          <BaseButton type='primary' size='small' htmlType='submit' loading={loading}>
            Lưu thay đổi
          </BaseButton>
        </BaseCol>
      </BaseRow>
    </BaseForm>
  );
};
