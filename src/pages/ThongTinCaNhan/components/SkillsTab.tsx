import React, { useState } from 'react';
import { Table, Space, Modal, Progress } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { apiInstance } from '@app/api/core.api';
import { notificationController } from '@app/controllers/notificationController';
import { SkillData } from '../types';

interface SkillsTabProps {
  skills: SkillData[];
  onUpdate: () => void;
}

export const SkillsTab: React.FC<SkillsTabProps> = ({ skills, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillData | null>(null);
  const [form] = BaseForm.useForm();
  const [loading, setLoading] = useState(false);

  const showModal = (skill?: SkillData) => {
    if (skill) {
      setEditingSkill(skill);
      form.setFieldsValue(skill);
    } else {
      setEditingSkill(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingSkill(null);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      if (editingSkill) {
        await apiInstance.patch(`thong-tin-ca-nhan/skills/${editingSkill.id}`, values);
        notificationController.success({ message: 'Cập nhật kỹ năng thành công' });
      } else {
        await apiInstance.post('thong-tin-ca-nhan/skills', values);
        notificationController.success({ message: 'Thêm kỹ năng thành công' });
      }
      handleCancel();
      onUpdate();
    } catch {
      notificationController.error({ message: 'Lỗi xử lý kỹ năng' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa kỹ năng này?',
      onOk: async () => {
        try {
          await apiInstance.delete(`thong-tin-ca-nhan/skills/${id}`);
          notificationController.success({ message: 'Đã xóa kỹ năng' });
          onUpdate();
        } catch {
          notificationController.error({ message: 'Lỗi khi xóa' });
        }
      }
    });
  };

  const columns = [
    {
      title: 'Tên kỹ năng',
      dataIndex: 'ten',
      key: 'ten'
    },
    {
      title: 'Loại',
      dataIndex: 'loai',
      key: 'loai'
    },
    {
      title: 'Mức độ (%)',
      dataIndex: 'muc_do',
      key: 'muc_do',
      render: (val: number) => <Progress percent={val} size='small' />
    },
    {
      title: 'Thứ tự',
      dataIndex: 'thu_tu',
      key: 'thu_tu'
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_: any, record: SkillData) => (
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
        <BaseButton type='primary' size='small' icon={<PlusOutlined />} onClick={() => showModal()}>
          Thêm kỹ năng
        </BaseButton>
      </div>
      <Table dataSource={skills} columns={columns} rowKey='id' pagination={false} size='small' />

      <Modal
        title={editingSkill ? 'Sửa kỹ năng' : 'Thêm kỹ năng'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <BaseForm form={form} layout='vertical' onFinish={onFinish}>
          <BaseForm.Item name='ten' label='Tên kỹ năng' rules={[{ required: true }]}>
            <BaseInput size='small' placeholder='Nhập tên kỹ năng' />
          </BaseForm.Item>
          <BaseForm.Item name='loai' label='Loại (Frontend, Backend...)'>
            <BaseInput size='small' placeholder='VD: Frontend / Design' />
          </BaseForm.Item>
          <BaseForm.Item name='muc_do' label='Mức độ (0-100)' rules={[{ required: true }]}>
            <BaseInputNumber size='small' min={0} max={100} style={{ width: '100%' }} />
          </BaseForm.Item>
          <BaseForm.Item name='thu_tu' label='Thứ tự hiển thị' initialValue={0}>
            <BaseInputNumber size='small' min={0} style={{ width: '100%' }} />
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
