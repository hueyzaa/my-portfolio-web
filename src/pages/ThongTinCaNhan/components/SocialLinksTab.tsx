import React, { useState } from 'react';
import { Table, Space, Modal, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { apiInstance } from '@app/api/core.api';
import { notificationController } from '@app/controllers/notificationController';
import { SocialLinkData } from '../types';
import {
  FacebookFilled,
  LinkedinFilled,
  GithubFilled,
  InstagramFilled,
  DribbbleOutlined,
  TwitterOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const PLATFORMS = [
  { label: 'Facebook', value: 'Facebook', icon: <FacebookFilled /> },
  { label: 'LinkedIn', value: 'LinkedIn', icon: <LinkedinFilled /> },
  { label: 'GitHub', value: 'GitHub', icon: <GithubFilled /> },
  { label: 'Instagram', value: 'Instagram', icon: <InstagramFilled /> },
  { label: 'Dribbble', value: 'Dribbble', icon: <DribbbleOutlined /> },
  { label: 'Twitter', value: 'Twitter', icon: <TwitterOutlined /> },
  { label: 'Website', value: 'Website', icon: <GlobalOutlined /> }
];

interface SocialLinksTabProps {
  links: SocialLinkData[];
  onUpdate: () => void;
}

export const SocialLinksTab: React.FC<SocialLinksTabProps> = ({ links, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLinkData | null>(null);
  const [form] = BaseForm.useForm();
  const [loading, setLoading] = useState(false);

  const getIcon = (platform: string) => {
    const p = PLATFORMS.find((item) => item.value === platform);
    return p ? p.icon : <GlobalOutlined />;
  };

  const showModal = (link?: SocialLinkData) => {
    if (link) {
      setEditingLink(link);
      form.setFieldsValue(link);
    } else {
      setEditingLink(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingLink(null);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (editingLink) {
        await apiInstance.patch(`thong-tin-ca-nhan/social-links/${editingLink.id}`, values);
        notificationController.success({ message: 'Cập nhật thành công' });
      } else {
        await apiInstance.post('thong-tin-ca-nhan/social-links', values);
        notificationController.success({ message: 'Thêm mới thành công' });
      }
      handleCancel();
      onUpdate();
    } catch {
      notificationController.error({ message: 'Lỗi xử lý' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa liên kết này?',
      onOk: async () => {
        try {
          await apiInstance.delete(`thong-tin-ca-nhan/social-links/${id}`);
          notificationController.success({ message: 'Đã xóa' });
          onUpdate();
        } catch {
          notificationController.error({ message: 'Lỗi khi xóa' });
        }
      }
    });
  };

  const columns = [
    {
      title: 'Nền tảng',
      dataIndex: 'nen_tang',
      key: 'nen_tang',
      render: (text: string) => (
        <Space>
          {getIcon(text)}
          {text}
        </Space>
      )
    },
    {
      title: 'Đường dẫn (URL)',
      dataIndex: 'url',
      key: 'url',
      render: (text: string) => (
        <a href={text} target='_blank' rel='noreferrer'>
          {text}
        </a>
      )
    },
    {
      title: 'Thứ tự',
      dataIndex: 'thu_tu',
      key: 'thu_tu'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: SocialLinkData) => (
        <Space size='middle'>
          <BaseButton icon={<EditOutlined />} onClick={() => showModal(record)} size='small' />
          <BaseButton icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} size='small' danger />
        </Space>
      )
    }
  ];

  return (
    <>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <BaseButton type='primary' icon={<PlusOutlined />} onClick={() => showModal()}>
          Thêm liên kết
        </BaseButton>
      </div>
      <Table dataSource={links} columns={columns} rowKey='id' pagination={false} />

      <Modal
        title={editingLink ? 'Sửa liên kết' : 'Thêm liên kết'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <BaseForm form={form} layout='vertical' onFinish={onFinish}>
          <BaseForm.Item name='nen_tang' label='Nền tảng' rules={[{ required: true }]}>
            <Select options={PLATFORMS} placeholder='Chọn nền tảng' />
          </BaseForm.Item>
          <BaseForm.Item name='url' label='Đường dẫn (URL)' rules={[{ required: true, type: 'url' }]}>
            <BaseInput placeholder='https://...' />
          </BaseForm.Item>
          <BaseForm.Item name='thu_tu' label='Thứ tự hiển thị' initialValue={0}>
            <BaseInputNumber min={0} style={{ width: '100%' }} />
          </BaseForm.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
            <BaseButton size='small' onClick={handleCancel}>
              Hủy
            </BaseButton>
            <BaseButton type='primary' size='small' htmlType='submit' loading={loading}>
              Hoàn thành
            </BaseButton>
          </div>
        </BaseForm>
      </Modal>
    </>
  );
};
