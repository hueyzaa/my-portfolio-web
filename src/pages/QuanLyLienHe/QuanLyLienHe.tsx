import React from 'react';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { useTranslation } from 'react-i18next';
import { getPermissionUser } from '@app/utils/redux.utils';
import { LIEN_HE_PATH, LIEN_HE_PAGE_KEY } from './constants';
import DanhSachLienHe from './DanhSachLienHe';

const QuanLyLienHe: React.FC = () => {
  const { t } = useTranslation();
  const path = LIEN_HE_PATH;
  const pageKey = LIEN_HE_PAGE_KEY;
  const permission = getPermissionUser(path);

  return (
    <>
      <PageTitle>{t(pageKey)}</PageTitle>
      <BaseCard padding='2rem'>
        <BaseRow gutter={[10, 20]}>
          <BaseCol span={24}>
            <BaseTypography.Title level={4} className='typography-title'>
              {t(pageKey).toUpperCase()}
            </BaseTypography.Title>
          </BaseCol>
          <BaseCol span={24}>{permission.show && <DanhSachLienHe permission={permission} />}</BaseCol>
        </BaseRow>
      </BaseCard>
    </>
  );
};

export default QuanLyLienHe;
