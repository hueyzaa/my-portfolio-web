import React from 'react';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import WelcomeModule from '@app/components/home/WelcomeModule';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';

const Home: React.FC = () => {
  return (
    <>
      <PageTitle>Trang chủ</PageTitle>
      <BaseRow gutter={[16, 16]}>
        <BaseCol span={24}>
          <WelcomeModule />
        </BaseCol>
      </BaseRow>
    </>
  );
};

export default Home;
