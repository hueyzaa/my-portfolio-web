import { getListData } from '@app/api/getData.api';
import { BaseBadge } from '@app/components/common/BaseBadge/BaseBadge';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { NotificationsOverlay } from '@app/components/header/components/notificationsDropdown/NotificationsOverlay/NotificationsOverlay';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { API_URL } from '@app/configs/api-configs';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { createFilterQuery } from '@app/utils/utils';
import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa6';

export const NotificationsDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const userInfo = useAppSelector((state) => state.user.user);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      getNoti();
    }
    setOpen(newOpen);
  };

  const getNoti = async () => {
    try {
      const response = await getListData(
        API_URL.NOTIFICATIONS,
        createFilterQuery(0, 'nguoi_dung_id', 'eqeal', userInfo?.id || '')
      );
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasePopover
      trigger='click'
      content={<NotificationsOverlay notifications={notifications} setNotifications={setNotifications} />}
      showArrow={false}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <HeaderActionWrapper>
        <BaseButton
          type='text'
          icon={
            <BaseBadge>
              <FaBell size={20} />
            </BaseBadge>
          }
        />
      </HeaderActionWrapper>
    </BasePopover>
  );
};
