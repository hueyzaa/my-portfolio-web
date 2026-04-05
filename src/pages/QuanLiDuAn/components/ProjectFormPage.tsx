import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const BackTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  color: var(--primary-color);
  transition: color 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  h4 {
    margin: 0 !important;
    color: inherit !important;
    font-weight: 700;
  }
`;

import { FormInstance } from 'antd';

export interface ProjectFormPageProps {
  title: string;
  formId: string;
  form: FormInstance;
  onFinish: (values: any) => void;
  onBack: () => void;
  onReset?: () => void;
  loading: boolean;
  submitLabel?: string;
  initialValues?: any;
  children: React.ReactNode;
}

export const ProjectFormPage: React.FC<ProjectFormPageProps> = ({
  title,
  formId,
  form,
  onFinish,
  onBack,
  onReset,
  loading,
  submitLabel = 'Lưu',
  initialValues,
  children
}) => {
  const { t } = useTranslation();
  return (
    <BaseCard padding='2rem'>
      <BaseRow gutter={[20, 20]}>
        {/* Page Header */}
        <BaseCol span={24} style={{ padding: 0 }}>
          <BackTitle onClick={onBack}>
            <ArrowLeftOutlined style={{ fontSize: '20px' }} />
            <BaseTypography.Title level={4} className='typography-title'>
              {title.toUpperCase()}
            </BaseTypography.Title>
          </BackTitle>
        </BaseCol>

        {/* Form Content */}
        <BaseCol span={24}>
          <BaseForm id={formId} form={form} layout='vertical' onFinish={onFinish} initialValues={initialValues}>
            {children}

            {/* Action Buttons */}
            <BaseSpace style={{ display: 'flex', justifyContent: 'end', marginTop: '30px' }} size={15}>
              {onReset && (
                <BaseButton size='small' onClick={onReset} style={{ borderRadius: 6, minWidth: 100 }}>
                  {t('common.reset')}
                </BaseButton>
              )}
              <BaseButton
                type='primary'
                htmlType='submit'
                size='small'
                loading={loading}
                form={formId}
                style={{ borderRadius: 6, minWidth: 100 }}
              >
                {submitLabel || t('common.save')}
              </BaseButton>
            </BaseSpace>
          </BaseForm>
        </BaseCol>
      </BaseRow>
    </BaseCard>
  );
};

export default ProjectFormPage;
