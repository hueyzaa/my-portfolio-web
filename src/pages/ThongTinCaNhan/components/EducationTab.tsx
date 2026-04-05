import React, { useState } from 'react';
import { Table, Space, Modal, DatePicker } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { apiInstance } from '@app/api/core.api';
import { notificationController } from '@app/controllers/notificationController';
import { EducationData } from '../types';
import moment from 'moment';

interface EducationTabProps {
  education: EducationData[];
  onUpdate: () => void;
}

export const EducationTab: React.FC<EducationTabProps> = ({ education, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationData | null>(null);
  const [form] = BaseForm.useForm();
  const [loading, setLoading] = useState(false);

  const showModal = (edu?: EducationData) => {
    if (edu) {
      setEditingEdu(edu);
      form.setFieldsValue({
        ...edu,
        bat_dau: edu.bat_dau ? moment(edu.bat_dau) : null,
        ket_thuc: edu.ket_thuc ? moment(edu.ket_thuc) : null
      });
    } else {
      setEditingEdu(null);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingEdu(null);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        bat_dau: values.bat_dau ? values.bat_dau.format('YYYY-MM-DD') : null,
        ket_thuc: values.ket_thuc ? values.ket_thuc.format('YYYY-MM-DD') : null
      };

      if (editingEdu) {
        await apiInstance.patch(`thong-tin-ca-nhan/education/${editingEdu.id}`, payload);
        notificationController.success({ message: 'Cập nhật học vấn thành công' });
      } else {
        await apiInstance.post('thong-tin-ca-nhan/education', payload);
        notificationController.success({ message: 'Thêm học vấn thành công' });
      }
      handleCancel();
      onUpdate();
    } catch {
      notificationController.error({ message: 'Lỗi xử lý học vấn' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa mục này?',
      onOk: async () => {
        try {
          await apiInstance.delete(`thong-tin-ca-nhan/education/${id}`);
          notificationController.success({ message: 'Đã xóa mục này' });
          onUpdate();
        } catch {
          notificationController.error({ message: 'Lỗi khi xóa' });
        }
      }
    });
  };

  const columns = [
    {
      title: 'Bằng cấp',
      dataIndex: 'bang_cap',
      key: 'bang_cap'
    },
    {
      title: 'Trường học',
      dataIndex: 'truong_hoc',
      key: 'truong_hoc'
    },
    {
      title: 'Thời gian',
      key: 'time',
      render: (_: any, record: EducationData) => (
        <span>
          {record.bat_dau ? moment(record.bat_dau).format('MM/YYYY') : '?'} -{' '}
          {record.ket_thuc ? moment(record.ket_thuc).format('MM/YYYY') : '?'}
        </span>
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
      render: (_: any, record: EducationData) => (
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
          Thêm học vấn
        </BaseButton>
      </div>
      <Table dataSource={education} columns={columns} rowKey='id' pagination={false} size='small' />

      <Modal
        title={editingEdu ? 'Sửa học vấn' : 'Thêm học vấn'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={700}
      >
        <BaseForm form={form} layout='vertical' onFinish={onFinish}>
          <BaseForm.Item name='bang_cap' label='Bằng cấp / Khóa học' rules={[{ required: true }]}>
            <BaseInput size='small' placeholder='VD: Cử nhân Công nghệ thông tin' />
          </BaseForm.Item>
          <BaseForm.Item name='truong_hoc' label='Trường / Tổ chức giáo dục' rules={[{ required: true }]}>
            <BaseInput size='small' placeholder='VD: Đại học Bách Khoa Hà Nội' />
          </BaseForm.Item>
          <div style={{ display: 'flex', gap: 16 }}>
            <BaseForm.Item name='bat_dau' label='Từ ngày' style={{ flex: 1 }}>
              <DatePicker size='small' picker='month' style={{ width: '100%' }} />
            </BaseForm.Item>
            <BaseForm.Item name='ket_thuc' label='Đến ngày' style={{ flex: 1 }}>
              <DatePicker size='small' picker='month' style={{ width: '100%' }} />
            </BaseForm.Item>
          </div>
          <BaseForm.Item name='thu_tu' label='Thứ tự hiển thị' initialValue={0}>
            <BaseInputNumber size='small' min={0} style={{ width: '100%' }} />
          </BaseForm.Item>
          <BaseForm.Item name='mo_ta' label='Mô tả thêm'>
            <BaseInput.TextArea size='small' rows={4} placeholder='VD: Tốt nghiệp loại giỏi, GPA 3.6...' />
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
