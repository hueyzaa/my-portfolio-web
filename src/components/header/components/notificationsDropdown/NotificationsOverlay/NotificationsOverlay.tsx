import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './NotificationsOverlay.styles';

interface INotiData {
  id: number;
  da_xem: number;
  nguoi_dung_id: number;
  ngay_tao: string;
  tieu_de: string;
  noi_dunng: string;
}

interface NotificationsOverlayProps {
  notifications: any;
  setNotifications: any;
}

export const NotificationsOverlay: React.FC<NotificationsOverlayProps> = ({ notifications, ...props }) => {
  const { t } = useTranslation();

  return (
    <S.NoticesOverlayMenu {...props}>
      <BaseRow gutter={[10, 10]}>
        <BaseCol span={24}>
          <BaseRow justify={'space-between'}>
            <BaseCol>
              <BaseTypography.Title level={4}>{t('header.notifications.title')}</BaseTypography.Title>
            </BaseCol>
            {/* <BaseCol>
              <BaseButton size='small' type='text'>
                {t('header.notifications.markReadAll')}
              </BaseButton>
            </BaseCol> */}
          </BaseRow>
        </BaseCol>
        <BaseCol span={24} style={{ maxHeight: '70dvh', overflowY: 'auto' }}>
          {notifications.length > 0 ? (
            <div style={{ cursor: 'pointer' }} onClick={() => console.log('click')} role='presentation'>
              {notifications.map((noti: INotiData) => (
                <BaseRow key={noti.id} gutter={[10, 10]}>
                  <BaseCol span={18}>
                    <b>{noti.tieu_de}</b>
                  </BaseCol>
                  <BaseCol span={6}>
                    <div style={{ float: 'right' }}>
                      {noti.da_xem === 0 && (
                        <div
                          style={{
                            background: 'var(--error-color)',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            display: 'inline-block',
                            marginRight: '12px'
                          }}
                        />
                      )}
                      {moment(noti.ngay_tao).format('HH:mm')}
                    </div>
                  </BaseCol>
                  <BaseCol span={18} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <span>{noti.noi_dunng}</span>
                  </BaseCol>
                  <BaseCol span={6}>
                    <span style={{ float: 'right' }}>{moment(noti.ngay_tao).format('DD/MM/YYYY')}</span>
                  </BaseCol>
                  <BaseCol span={24}>
                    <BaseDivider style={{ margin: '10px 0', borderColor: '#000' }}></BaseDivider>
                  </BaseCol>
                </BaseRow>
              ))}
            </div>
          ) : (
            <S.Text>{t('header.notifications.noNotifications')}</S.Text>
          )}
        </BaseCol>
      </BaseRow>
    </S.NoticesOverlayMenu>
  );
};
