import React, { useEffect, useState } from 'react';
import { Tabs, Card, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { apiInstance } from '@app/api/core.api';
import { FullProfileData } from './types';
import { BioTab } from './components/BioTab';
import { SkillsTab } from './components/SkillsTab';
import { ExperienceTab } from './components/ExperienceTab';
import { EducationTab } from './components/EducationTab';
import { SocialLinksTab } from './components/SocialLinksTab';
import { notificationController } from '@app/controllers/notificationController';

const ThongTinCaNhan: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<FullProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiInstance.get('thong-tin-ca-nhan/full');
      setData(response.data);
    } catch (error) {
      notificationController.error({ message: 'Lỗi tải dữ liệu' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading && !data) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size='large' tip='Đang tải dữ liệu...' />
      </div>
    );
  }

  const items = [
    {
      key: 'bio',
      label: 'Tiểu sử',
      children: <BioTab initialData={data?.profile} onUpdate={fetchData} />
    },
    {
      key: 'skills',
      label: 'Kỹ năng',
      children: <SkillsTab skills={data?.skills || []} onUpdate={fetchData} />
    },
    {
      key: 'experience',
      label: 'Kinh nghiệm',
      children: <ExperienceTab experiences={data?.experiences || []} onUpdate={fetchData} />
    },
    {
      key: 'education',
      label: 'Học vấn',
      children: <EducationTab education={data?.education || []} onUpdate={fetchData} />
    },
    {
      key: 'social',
      label: 'Mạng xã hội',
      children: <SocialLinksTab links={data?.socialLinks || []} onUpdate={fetchData} />
    }
  ];

  return (
    <>
      <PageTitle>Thông tin cá nhân & Profile</PageTitle>
      <Card>
        <Tabs defaultActiveKey='bio' items={items} />
      </Card>
    </>
  );
};

export default ThongTinCaNhan;
