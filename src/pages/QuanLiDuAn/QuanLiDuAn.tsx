import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import DanhSachQuanLiDuAn from './DanhSachQuanLiDuAn';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';
import { getPermissionUser } from '@app/utils/redux.utils';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { Actions } from '@app/interfaces/interfaces';
import ExportTable from '@app/components/customs/exportExcel/ExportTable';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

import { PROJECT_PATH, PROJECT_PAGE_KEY } from './constants';

const QuanLiDuAn = () => {
  const path = PROJECT_PATH;
  const page = PROJECT_PAGE_KEY;
  const permission: Actions = getPermissionUser(path);
  const query = useAppSelector((state) => state.app.queryData);
  const columns = useAppSelector((state) => state.app.columns);
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>{t(page)}</PageTitle>
      <BaseCard padding='2rem'>
        <BaseRow gutter={[10, 40]}>
          <BaseCol span={24}>
            <BaseRow justify='space-between' align='middle'>
              <BaseCol>
                <BaseTypography.Title level={4} className='typography-title'>
                  {t(page).toUpperCase()}
                </BaseTypography.Title>
              </BaseCol>
              <BaseCol style={{ display: 'flex', gap: '1rem' }}>
                {permission.export && <ExportTable columns={columns} path={path} params={query} />}
                {permission.create && (
                  <BaseButton
                    type='primary'
                    size='small'
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/quan-li-du-an/them')}
                  >
                    Thêm
                  </BaseButton>
                )}
              </BaseCol>
            </BaseRow>
          </BaseCol>
          <BaseCol span={24}>{permission.show && <DanhSachQuanLiDuAn path={path} permission={permission} />}</BaseCol>
        </BaseRow>
      </BaseCard>
    </>
  );
};

export default QuanLiDuAn;
