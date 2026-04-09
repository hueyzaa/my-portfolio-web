import React from 'react';
import { Tag } from 'antd';
import moment from 'moment';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import Delete from '@app/components/customs/Delete/Delete';
import { ProjectEntity } from '../types';
import { COLUMN_WIDTHS, STATUS_PUBLISHED } from '../constants';
import { getImageUrl } from '@app/utils/utils';
import { apiURL } from '@app/configs/configs';

/**
 * Generate table columns configuration for project list
 */
export const getProjectColumns = (
  filter: { page: number; limit: number },
  permission: any,
  navigate: (path: string) => void,
  onRefresh: () => void,
  inputSearch: any,
  dateSearch: any,
  t: any,
  path: string
) => {
  return [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'right' as const,
      width: COLUMN_WIDTHS.STT,
      render: (_text: any, _record: any, index: number) => {
        return filter.limit && (filter.page - 1) * filter.limit + index + 1;
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center' as const,
      width: COLUMN_WIDTHS.ACTION,
      render: (id: number, record: ProjectEntity) => {
        return (
          <BaseSpace size={0}>
            <BaseButton
              type='text'
              size='small'
              icon={<EyeOutlined />}
              title='Xem chi tiết'
              onClick={() => navigate(`/quan-li-du-an/xem/${id}`)}
            />
            {permission.edit && (
              <BaseButton
                type='text'
                size='small'
                icon={<EditOutlined />}
                title='Sửa'
                onClick={() => navigate(`/quan-li-du-an/sua/${id}`)}
              />
            )}
            {permission.delete && (
              <Delete path={path} title={`${t('common.quan-li-du-an')} ${record.title}`} id={id} onShow={onRefresh} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Tên',
      dataIndex: 'title',
      ...inputSearch({ dataIndex: 'title', operator: 'contain', nameColumn: 'Tên' })
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'thumbnail',
      width: COLUMN_WIDTHS.THUMBNAIL,
      render: (thumbnail: string) =>
        thumbnail ? (
          <img
            src={getImageUrl(apiURL, thumbnail)}
            alt='thumbnail'
            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
          />
        ) : (
          'No image'
        )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      width: COLUMN_WIDTHS.STATUS,
      render: (status: string) => (
        <Tag color={status === STATUS_PUBLISHED ? 'success' : 'default'} style={{ fontSize: '13px' }}>
          {status === STATUS_PUBLISHED ? 'Công khai' : 'Nháp'}
        </Tag>
      )
    },
    {
      title: 'Thứ tự',
      dataIndex: 'order',
      width: COLUMN_WIDTHS.ORDER,
      align: 'center' as const,
      sorter: (a: any, b: any) => a.order - b.order,
      render: (order: number) => <b>{order}</b>
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'ngay_tao',
      align: 'right' as const,
      width: COLUMN_WIDTHS.NGAY_TAO,
      render: (record: string): string => {
        if (!record) return '';
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm');
      },
      ...dateSearch({ dataIndex: 'ngay_tao', nameColumn: 'Thời gian tạo' })
    }
  ];
};
