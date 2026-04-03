import React from 'react';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import {
  RocketOutlined,
  SearchOutlined,
  SafetyOutlined,
  TrophyOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  RiseOutlined
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = BaseTypography;

// Styled Components
const HeroCard = styled(BaseCard)`
  background: linear-gradient(135deg, #1677ff 0%, #722ed1 100%);
  border-radius: 24px;
  overflow: hidden;
  position: relative;

  .ant-card-body {
    padding: 48px 32px;
  }

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
`;

const IconWrapper = styled.div`
  display: inline-flex;
  padding: 16px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-bottom: 24px;

  .anticon {
    font-size: 48px;
    color: white;
  }
`;

const HeroTitle = styled(Title)`
  color: white !important;
  margin-bottom: 16px !important;
  font-size: 48px !important;
  font-weight: 700 !important;
`;

const HeroSubtitle = styled(Title)`
  color: rgba(255, 255, 255, 0.95) !important;
  margin-bottom: 24px !important;
  font-size: 36px !important;
  font-weight: 600 !important;
`;

const HeroText = styled(Text)`
  color: rgba(255, 255, 255, 0.95);
  font-size: 18px;
  line-height: 1.8;
  display: block;
  margin-bottom: 32px;
`;

const StatsRow = styled(BaseRow)`
  background: white;
  border-radius: 0 0 24px 24px;
  padding: 24px 0;
  margin-top: -24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const StatCol = styled(BaseCol)`
  text-align: center;
  padding: 16px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgba(22, 119, 255, 0.05);
  }

  &:not(:last-child) {
    border-right: 1px solid #f0f0f0;
  }
`;

const StatLabel = styled(Text)`
  display: block;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  margin-bottom: 8px;
`;

const StatValue = styled(Text)`
  display: block;
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(135deg, #1677ff 0%, #722ed1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FeatureCard = styled(BaseCard)`
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    border-color: #1677ff;
  }

  .feature-icon {
    display: inline-flex;
    padding: 16px;
    border-radius: 12px;
    margin-bottom: 16px;
    font-size: 32px;
    transition: all 0.3s ease;
  }

  &:hover .feature-icon {
    transform: scale(1.1);
  }
`;

const FeatureTitle = styled(Title)`
  font-size: 20px !important;
  margin-bottom: 12px !important;
  color: rgba(0, 0, 0, 0.85) !important;
`;

const FeatureText = styled(Text)`
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.6;
`;

const InfoCard = styled(BaseCard)`
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
`;

const InfoIconWrapper = styled.div<{ $color: string }>`
  display: inline-flex;
  padding: 12px;
  border-radius: 12px;
  background: ${(props) => props.$color};

  .anticon {
    font-size: 24px;
    color: white;
  }
`;

const InfoTitle = styled(Title)`
  font-size: 18px !important;
  margin-bottom: 8px !important;
`;

const InfoText = styled(Text)`
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.6;
`;

const WelcomeModule: React.FC = () => {
  const features = [
    {
      icon: <RocketOutlined />,
      title: 'Dự án nổi bật',
      description: 'Khám phá các dự án công nghệ và giải pháp sáng tạo tôi đã thực hiện',
      gradient: 'linear-gradient(135deg, #1677ff 0%, #0958d9 100%)'
    },
    {
      icon: <SearchOutlined />,
      title: 'Kỹ năng chuyên môn',
      description: 'Tổng hợp các công nghệ và công cụ tôi sử dụng thành thạo',
      gradient: 'linear-gradient(135deg, #52c41a 0%, #389e0d 100%)'
    },
    {
      icon: <SafetyOutlined />,
      title: 'Kinh nghiệm làm việc',
      description: 'Hành trình phát triển và các đơn vị tôi đã từng đồng hành',
      gradient: 'linear-gradient(135deg, #722ed1 0%, #531dab 100%)'
    },
    {
      icon: <TrophyOutlined />,
      title: 'Giải thưởng & Chứng chỉ',
      description: 'Các thành tích và chứng chỉ chuyên môn đã đạt được',
      gradient: 'linear-gradient(135deg, #fa8c16 0%, #d46b08 100%)'
    }
  ];

  const stats = [
    { label: 'Dự án', value: '20+', icon: <ThunderboltOutlined /> },
    { label: 'Khách hàng', value: '15+', icon: <TeamOutlined /> },
    { label: 'Năm kinh nghiệm', value: '5+', icon: <RiseOutlined /> }
  ];

  return (
    <BaseSpace direction='vertical' size='large' style={{ width: '100%' }}>
      {/* Hero Section */}
      <HeroCard bordered={false}>
        <HeroContent>
          <BaseRow align='middle' gutter={[24, 24]}>
            <BaseCol xs={24}>
              <IconWrapper>
                <RocketOutlined />
              </IconWrapper>
              <HeroTitle level={1}>Chào mừng đến với</HeroTitle>
              <HeroSubtitle level={2}>Portfolio Cá Nhân</HeroSubtitle>
              <HeroText>
                Nơi chia sẻ kiến thức, kinh nghiệm và các dự án sáng tạo. Tôi là một nhà phát triển đam mê xây dựng
                những sản phẩm số chất lượng, tối ưu và mang lại giá trị thực tế cho người dùng.
              </HeroText>
              <BaseSpace size='middle'>
                <BaseButton
                  type='primary'
                  size='large'
                  style={{
                    background: 'white',
                    color: '#1677ff',
                    borderColor: 'white',
                    fontWeight: 600,
                    height: '48px',
                    padding: '0 32px',
                    fontSize: '16px'
                  }}
                  icon={<RocketOutlined />}
                >
                  Xem Dự Án
                </BaseButton>
                <BaseButton
                  type='default'
                  size='large'
                  style={{
                    background: 'transparent',
                    color: 'white',
                    borderColor: 'white',
                    borderWidth: '2px',
                    fontWeight: 600,
                    height: '48px',
                    padding: '0 32px',
                    fontSize: '16px'
                  }}
                >
                  Liên Hệ
                </BaseButton>
              </BaseSpace>
            </BaseCol>
          </BaseRow>
        </HeroContent>
      </HeroCard>

      {/* Stats Bar */}
      <BaseCard bordered={false} style={{ borderRadius: '24px', marginTop: '-48px' }}>
        <StatsRow gutter={[0, 16]}>
          {stats.map((stat, index) => (
            <StatCol key={index} xs={24} sm={8}>
              <BaseSpace direction='vertical' size='small' style={{ width: '100%' }}>
                <BaseSpace size='small' style={{ justifyContent: 'center' }}>
                  <span style={{ color: '#1677ff', fontSize: '20px' }}>{stat.icon}</span>
                  <StatLabel>{stat.label}</StatLabel>
                </BaseSpace>
                <StatValue>{stat.value}</StatValue>
              </BaseSpace>
            </StatCol>
          ))}
        </StatsRow>
      </BaseCard>

      {/* Features Grid */}
      <BaseRow gutter={[24, 24]}>
        {features.map((feature, index) => (
          <BaseCol key={index} xs={24} sm={12} lg={6}>
            <FeatureCard bordered={false}>
              <div className='feature-icon' style={{ background: feature.gradient }}>
                {feature.icon}
              </div>
              <FeatureTitle level={4}>{feature.title}</FeatureTitle>
              <FeatureText>{feature.description}</FeatureText>
            </FeatureCard>
          </BaseCol>
        ))}
      </BaseRow>

      {/* Info Group */}
      <BaseRow gutter={[24, 24]}>
        <BaseCol xs={24} md={8}>
          <InfoCard bordered={false}>
            <BaseSpace direction='vertical' size='middle' style={{ width: '100%' }}>
              <BaseSpace size='middle' align='start'>
                <InfoIconWrapper $color='#1677ff'>
                  <ThunderboltOutlined />
                </InfoIconWrapper>
                <div style={{ flex: 1 }}>
                  <InfoTitle level={5}>Phát triển nhanh</InfoTitle>
                  <InfoText>Luôn tối ưu hóa quy trình để mang lại sản phẩm tốt nhất trong thời gian ngắn nhất</InfoText>
                </div>
              </BaseSpace>
            </BaseSpace>
          </InfoCard>
        </BaseCol>

        <BaseCol xs={24} md={8}>
          <InfoCard bordered={false}>
            <BaseSpace direction='vertical' size='middle' style={{ width: '100%' }}>
              <BaseSpace size='middle' align='start'>
                <InfoIconWrapper $color='#52c41a'>
                  <TeamOutlined />
                </InfoIconWrapper>
                <div style={{ flex: 1 }}>
                  <InfoTitle level={5}>Làm việc nhóm</InfoTitle>
                  <InfoText>Khả năng thích nghi và phối hợp hiệu quả trong môi trường chuyên nghiệp</InfoText>
                </div>
              </BaseSpace>
            </BaseSpace>
          </InfoCard>
        </BaseCol>

        <BaseCol xs={24} md={8}>
          <InfoCard bordered={false}>
            <BaseSpace direction='vertical' size='middle' style={{ width: '100%' }}>
              <BaseSpace size='middle' align='start'>
                <InfoIconWrapper $color='#722ed1'>
                  <SafetyOutlined />
                </InfoIconWrapper>
                <div style={{ flex: 1 }}>
                  <InfoTitle level={5}>Chất lượng & Bảo mật</InfoTitle>
                  <InfoText>Cam kết về tính ổn định và an toàn cho mọi giải pháp xây dựng</InfoText>
                </div>
              </BaseSpace>
            </BaseSpace>
          </InfoCard>
        </BaseCol>
      </BaseRow>
    </BaseSpace>
  );
};

export default WelcomeModule;
