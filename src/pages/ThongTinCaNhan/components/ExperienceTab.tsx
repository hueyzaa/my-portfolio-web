import React, { useState } from 'react';
import { Table, Space, Modal, DatePicker, Checkbox } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { apiInstance } from '@app/api/core.api';
import { notificationController } from '@app/controllers/notificationController';
import { ExperienceData } from '../types';
import moment from 'moment';

interface ExperienceTabProps {
  experiences: ExperienceData[];
  onUpdate: () => void;
}

export const ExperienceTab: React.FC<ExperienceTabProps> = ({ experiences, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<ExperienceData | null>(null);
  const [form] = BaseForm.useForm();
  const [loading, setLoading] = useState(false);
  const [isCurrent, setIsCurrent] = useState(false);

  const showModal = (exp?: ExperienceData) => {
    if (exp) {
      setEditingExp(exp);
      setIsCurrent(exp.dang_lam_viec);
      form.setFieldsValue({
        ...exp,
        bat_dau: exp.bat_dau ? moment(exp.bat_dau) : null,
        ket_thuc: exp.ket_thuc ? moment(exp.ket_thuc) : null
      });
    } else {
      setEditingExp(null);
      setIsCurrent(false);
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingExp(null);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        bat_dau: values.bat_dau ? values.bat_dau.format('YYYY-MM-DD') : null,
        ket_thuc: values.dang_lam_viec ? null : values.ket_thuc ? values.ket_thuc.format('YYYY-MM-DD') : null
      };

      if (editingExp) {
        await apiInstance.patch(`thong-tin-ca-nhan/experiences/${editingExp.id}`, payload);
        notificationController.success({ message: 'Cập nhật kinh nghiệm thành công' });
      } else {
        await apiInstance.post('thong-tin-ca-nhan/experiences', payload);
        notificationController.success({ message: 'Thêm kinh nghiệm thành công' });
      }
      handleCancel();
      onUpdate();
    } catch {
      notificationController.error({ message: 'Lỗi xử lý kinh nghiệm' });
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
          await apiInstance.delete(`thong-tin-ca-nhan/experiences/${id}`);
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
      title: 'Chức vụ',
      dataIndex: 'chuc_vu',
      key: 'chuc_vu'
    },
    {
      title: 'Công ty',
      dataIndex: 'cong_ty',
      key: 'cong_ty'
    },
    {
      title: 'Thời gian',
      key: 'time',
      render: (_: any, record: ExperienceData) => (
        <span>
          {record.bat_dau ? moment(record.bat_dau).format('MM/YYYY') : '?'} -{' '}
          {record.dang_lam_viec ? 'Hiện tại' : record.ket_thuc ? moment(record.ket_thuc).format('MM/YYYY') : '?'}
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
      render: (_: any, record: ExperienceData) => (
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
          Thêm kinh nghiệm
        </BaseButton>
      </div>
      <Table dataSource={experiences} columns={columns} rowKey='id' pagination={false} size='small' />

      <Modal
        title={editingExp ? 'Sửa kinh nghiệm' : 'Thêm kinh nghiệm'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={700}
      >
        <BaseForm form={form} layout='vertical' onFinish={onFinish}>
          <BaseForm.Item name='chuc_vu' label='Chức danh / Vị trí' rules={[{ required: true }]}>
            <BaseInput size='small' placeholder='VD: Senior Developer' />
          </BaseForm.Item>
          <BaseForm.Item name='cong_ty' label='Công ty / Tổ chức' rules={[{ required: true }]}>
            <BaseInput size='small' placeholder='VD: Google Inc.' />
          </BaseForm.Item>
          <div style={{ display: 'flex', gap: 16 }}>
            <BaseForm.Item name='bat_dau' label='Từ ngày' style={{ flex: 1 }}>
              <DatePicker size='small' picker='month' style={{ width: '100%' }} />
            </BaseForm.Item>
            <BaseForm.Item name='ket_thuc' label='Đến ngày' style={{ flex: 1 }} hidden={isCurrent}>
              <DatePicker size='small' picker='month' style={{ width: '100%' }} />
            </BaseForm.Item>
          </div>
          <BaseForm.Item name='dang_lam_viec' valuePropName='checked'>
            <Checkbox onChange={(e) => setIsCurrent(e.target.checked)}>Tôi đang làm việc tại đây</Checkbox>
          </BaseForm.Item>
          <BaseForm.Item name='thu_tu' label='Thứ tự hiển thị' initialValue={0}>
            <BaseInputNumber size='small' min={0} style={{ width: '100%' }} />
          </BaseForm.Item>
          <BaseForm.Item name='mo_ta' label='Mô tả công việc'>
            <BaseInput.TextArea size='small' rows={4} placeholder='Mô tả các trách nhiệm, thành tựu...' />
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
