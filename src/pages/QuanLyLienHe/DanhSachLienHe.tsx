import React, { useEffect, useState } from 'react';
import { getListData } from '@app/api/getData.api';
import { apiInstance } from '@app/api/core.api';
import CustomTable from '@app/components/customs/Table/CustomTable';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import useColumnSearch from '@app/hooks/useColumnSearch';
import { usePagination } from '@app/hooks/usePagination';
import { appActions } from '@app/store/slices/appSlice';
import { Actions } from '@app/interfaces/interfaces';
import { createFilterQueryFromArray } from '@app/utils/utils';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { notificationController } from '@app/controllers/notificationController';
import { getLienHeColumns } from './config/columns.config';
import { LienHeEntity, LienHeStatus } from './types';
import { LIEN_HE_PATH } from './constants';

const DanhSachLienHe = ({ permission }: { permission: Actions }) => {
  const [danhSach, setDanhSach] = useState<{ data: LienHeEntity[]; total: number } | undefined>({
    data: [],
    total: 0
  });
  const { filter, handlePageChange, handleLimitChange } = usePagination({ page: 1, limit: 10 });
  const { inputSearch, query } = useColumnSearch();
  const reload = useAppSelector((state) => state.app.reloadData['LIEN_HE_LIST']);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLienHe, setSelectedLienHe] = useState<LienHeEntity | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  const getDanhSach = async () => {
    setIsLoading(true);
    const params = { ...filter, ...createFilterQueryFromArray(query) };
    const res = await getListData(LIEN_HE_PATH, params);
    setDanhSach(res);
    setIsLoading(false);
  };

  const handleUpdateStatus = async (id: number, status: LienHeStatus) => {
    try {
      await apiInstance.patch(`${LIEN_HE_PATH}/${id}/status`, { trangThai: status });
      notificationController.success({ message: 'Cập nhật trạng thái thành công' });
      getDanhSach();
    } catch {
      notificationController.error({ message: 'Cập nhật thất bại' });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await apiInstance.delete(`${LIEN_HE_PATH}/${id}`);
      notificationController.success({ message: 'Xóa liên hệ thành công' });
      getDanhSach();
    } catch {
      notificationController.error({ message: 'Xóa thất bại' });
    }
  };

  const handleView = (record: LienHeEntity) => {
    setSelectedLienHe(record);
    setIsModalVisible(true);
  };

  const columns = getLienHeColumns(
    { page: filter.page, limit: filter.limit || 10 },
    permission,
    handleView,
    handleUpdateStatus,
    handleDelete,
    inputSearch
  ).map((col) => ({ ...col, width: col.width || '180px' }));

  useEffect(() => {
    getDanhSach();
    dispatch(appActions.saveQuery({ ...filter, ...createFilterQueryFromArray(query) }));
    dispatch(appActions.saveColumns(columns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, filter, query]);

  return (
    <>
      <BaseRow justify='end'>
        <BaseCol span={24}>
          <CustomTable
            rowKey='id'
            size='small'
            dataTable={danhSach?.data}
            defaultColumns={columns}
            filter={filter}
            scroll={{ x: 1200, y: 'calc(100dvh - 350px)' }}
            handlePageChange={handlePageChange}
            handleLimitChange={handleLimitChange}
            total={danhSach?.total}
            loading={isLoading}
          />
        </BaseCol>
      </BaseRow>

      <BaseModal
        title='Chi tiết liên hệ'
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedLienHe && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <p>
              <strong>Họ tên:</strong> {selectedLienHe.hoTen}
            </p>
            <p>
              <strong>Email:</strong> {selectedLienHe.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedLienHe.soDienThoai || 'N/A'}
            </p>
            <p>
              <strong>Chủ đề:</strong> {selectedLienHe.chuDe || 'N/A'}
            </p>
            <div>
              <p>
                <strong>Nội dung:</strong>
              </p>
              <div style={{ padding: '15px', background: '#f5f5f5', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
                {selectedLienHe.noiDung}
              </div>
            </div>
          </div>
        )}
      </BaseModal>
    </>
  );
};

export default DanhSachLienHe;
