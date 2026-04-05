import React from 'react';
import { Tag, Popconfirm } from 'antd';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { EyeOutlined, CheckOutlined, DeleteOutlined, FolderAddOutlined } from '@ant-design/icons';
import { LienHeEntity, LienHeStatus } from '../types';
import { Actions } from '@app/interfaces/interfaces';
import moment from 'moment';

export const getLienHeColumns = (
  pagination: { page: number; limit: number },
  permission: Actions,
  onView: (record: LienHeEntity) => void,
  onUpdateStatus: (id: number, status: LienHeStatus) => void,
  onDelete: (id: number) => void,
  inputSearch: any
) => {
  return [
    {
      title: 'STT',
      key: 'stt',
      width: '70px',
      render: (text: string, record: any, index: number) => (pagination.page - 1) * pagination.limit + index + 1
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      ...inputSearch('hoTen')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...inputSearch('email')
    },
    {
      title: 'Sổ điện thoại',
      dataIndex: 'soDienThoai',
      key: 'soDienThoai',
      ...inputSearch('soDienThoai')
    },
    {
      title: 'Chủ đề',
      dataIndex: 'chuDe',
      key: 'chuDe'
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => moment(date).format('DD/MM/YYYY HH:mm')
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (status: LienHeStatus) => {
        let color = 'volcano';
        let text = 'Chưa đọc';
        if (status === LienHeStatus.DA_LIEN_HE) {
          color = 'green';
          text = 'Đã liên hệ';
        } else if (status === LienHeStatus.LUU_TRU) {
          color = 'geekblue';
          text = 'Lưu trữ';
        }
        return <Tag color={color}>{text}</Tag>;
      }
    },
    {
      title: 'Hành động',
      key: 'actions',
      fixed: 'right',
      width: '180px',
      render: (record: LienHeEntity) => (
        <div style={{ display: 'flex', gap: '5px' }}>
          <BaseTooltip title='Xem chi tiết'>
            <BaseButton size='small' type='primary' icon={<EyeOutlined />} onClick={() => onView(record)} />
          </BaseTooltip>

          {permission.edit && record.trangThai === LienHeStatus.CHUA_DOC && (
            <BaseTooltip title='Đánh dấu đã liên hệ'>
              <BaseButton
                size='small'
                type='ghost'
                icon={<CheckOutlined style={{ color: 'green' }} />}
                onClick={() => onUpdateStatus(record.id, LienHeStatus.DA_LIEN_HE)}
              />
            </BaseTooltip>
          )}

          {permission.edit && record.trangThai !== LienHeStatus.LUU_TRU && (
            <BaseTooltip title='Lưu trữ'>
              <BaseButton
                size='small'
                type='ghost'
                icon={<FolderAddOutlined style={{ color: 'blue' }} />}
                onClick={() => onUpdateStatus(record.id, LienHeStatus.LUU_TRU)}
              />
            </BaseTooltip>
          )}

          {permission.delete && (
            <Popconfirm title='Bạn có chắc chắn muốn xóa?' onConfirm={() => onDelete(record.id)}>
              <BaseButton size='small' type='ghost' danger icon={<DeleteOutlined />} />
            </Popconfirm>
          )}
        </div>
      )
    }
  ];
};
