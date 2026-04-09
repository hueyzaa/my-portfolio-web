import { getListData } from '@app/api/getData.api';
import { Tag } from 'antd';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import Delete from '@app/components/customs/Delete/Delete';
import CustomTable from '@app/components/customs/Table/CustomTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import useColumnSearch from '@app/hooks/useColumnSearch';
import { usePagination } from '@app/hooks/usePagination';
import { appActions } from '@app/store/slices/appSlice';
import { Actions } from '@app/interfaces/interfaces';
import { createFilterQueryFromArray } from '@app/utils/utils';
import { useEffect, useState } from 'react';
import SuaQuanLiDichVu from './SuaQuanLiDichVu';
import moment from 'moment';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { useTranslation } from 'react-i18next';
import XemChiTietQuanLiDichVu from './XemChiTietQuanLiDichVu';

const DanhSachQuanLiDichVu = ({ path, permission }: { path: string; permission: Actions }) => {
  const { t } = useTranslation();
  const [danhSach, setDanhSach] = useState<{ data: any; total: number } | undefined>({ data: [], total: 0 });
  const { filter, handlePageChange, handleLimitChange } = usePagination({ page: 1 });
  const { inputSearch, query, dateSearch } = useColumnSearch();
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const getDanhSach = async () => {
    setIsLoading(true);
    const params = { ...filter, ...createFilterQueryFromArray(query) };
    const danhSach = await getListData(path, params);
    if (danhSach) {
      setIsLoading(false);
    }
    setDanhSach(danhSach);
  };

  const defaultColumnsTemp: any = [
    {
      title: 'STT',
      dataIndex: 'index',
      align: 'right',
      width: '50px',
      render: (_text: any, _record: any, index: any) => {
        return filter.limit && (filter.page - 1) * filter.limit + index + 1;
      }
    },
    {
      title: 'Thao tác',
      dataIndex: 'id',
      align: 'center',
      width: '120px',
      render: (id: number, record: any) => {
        return (
          <BaseSpace size={0}>
            <XemChiTietQuanLiDichVu path={path} id={id} />
            {permission.edit && (
              <SuaQuanLiDichVu 
                path={path} 
                id={id} 
                existingOrders={danhSach?.data?.map((item: any) => item.thu_tu) || []} 
              />
            )}
            {permission.delete && (
              <Delete path={path} title={`${t('common.quan-li-dich-vu')} ${record.ten}`} id={id} onShow={getDanhSach} />
            )}
          </BaseSpace>
        );
      }
    },
    {
      title: 'Thứ tự',
      dataIndex: 'thu_tu',
      align: 'center',
      width: '100px',
      sorter: (a: any, b: any) => a.thu_tu - b.thu_tu
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'anh',
      width: '120px',
      render: (anh: string) => (
        <img
          src={anh?.startsWith('http') ? anh : `${import.meta.env.VITE_API_URL || 'http://localhost:9999'}/${anh}`}
          style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 4 }}
          alt='Dịch vụ'
        />
      )
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'ten',
      ...inputSearch({ dataIndex: 'ten', operator: 'contain', nameColumn: 'Tên dịch vụ' })
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai',
      width: '120px',
      align: 'center',
      render: (status: boolean) => (
        <Tag color={status ? 'success' : 'default'} style={{ fontSize: '13px' }}>
          {status ? 'Hiển thị' : 'Ẩn'}
        </Tag>
      )
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'ngay_tao',
      align: 'right',
      width: '210px',
      render: (record: string): string => {
        if (!record) return '';
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm');
      },
      ...dateSearch({ dataIndex: 'ngay_tao', nameColumn: 'Thời gian tạo' })
    },
    {
      width: '210px',
      title: 'Người tạo',
      dataIndex: 'ten_nguoi_tao',
      render: (record: string): string => {
        return record;
      },
      ...inputSearch({ dataIndex: 'nguoi_tao.ho_va_ten', operator: 'contain', nameColumn: 'Người tạo' })
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'ngay_cap_nhat',
      align: 'right',
      width: '210px',
      render: (record: string): string => {
        if (!record) return '';
        const date = moment(record);
        return date.format('DD/MM/YYYY HH:mm');
      },
      ...dateSearch({ dataIndex: 'ngay_cap_nhat', nameColumn: 'Thời gian cập nhật' })
    },
    {
      title: 'Người cập nhật',
      width: '210px',
      dataIndex: 'ten_nguoi_cap_nhat',
      render: (record: string): string => {
        return record;
      },
      ...inputSearch({ dataIndex: 'nguoi_cap_nhat.ho_va_ten', operator: 'contain', nameColumn: 'Người cập nhật' })
    }
  ];

  const defaultColumns = defaultColumnsTemp.map((item: any) => ({
    ...item,
    width: item.width || '210px'
  }));

  useEffect(() => {
    const params = { ...filter, ...createFilterQueryFromArray(query) };
    getDanhSach();
    dispatch(appActions.saveQuery(params));
    dispatch(appActions.saveColumns(defaultColumns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, filter, query]);

  return (
    <BaseRow justify='end'>
      <BaseCol span={24}>
        <CustomTable
          rowKey='id'
          dataTable={danhSach?.data}
          defaultColumns={defaultColumns}
          filter={filter}
          scroll={{ x: 1000, y: 'calc(100dvh - 300px)' }}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
          total={danhSach?.total}
          loading={isLoading}
        />
      </BaseCol>
    </BaseRow>
  );
};

export default DanhSachQuanLiDichVu;
