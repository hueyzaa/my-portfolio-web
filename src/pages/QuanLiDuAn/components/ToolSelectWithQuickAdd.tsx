import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import styled from 'styled-components';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import SelectApi from '@app/components/select/SelectApi';
import { postData } from '@app/api/postData.api';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import FormCongNghe from './FormCongNghe';
import { CONG_NGHE_PATH } from '../../CongNghe/constants';
import { getListData } from '@app/api/getData.api';
import { handleDuplicateOrder } from '@app/utils/utils';

export interface ToolSelectWithQuickAddProps {
  name: string;
  label: string;
  placeholder?: string;
  rules?: any[];
  disabled?: boolean;
}

const TagsRow = styled(BaseRow)`
  flex-wrap: nowrap;
  width: 100%;

  .select-field {
    flex: 1 1 auto;
    min-width: 0;
  }

  .add-button-col {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }
`;

export const ToolSelectWithQuickAdd: React.FC<ToolSelectWithQuickAddProps> = ({
  name,
  label,
  placeholder,
  rules,
  disabled
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [creating, setCreating] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [existingOrders, setExistingOrders] = useState<number[]>([]);
  const [modalForm] = BaseForm.useForm();
  const form = Form.useFormInstance();

  const showModal = async () => {
    try {
      const res = await getListData(CONG_NGHE_PATH, { limit: 1000 });
      if (res?.data) {
        const orders = res.data.map((item: any) => item.thu_tu);
        setExistingOrders(orders);
        // Suggest next order
        const nextOrder = handleDuplicateOrder(0, orders);
        modalForm.setFieldsValue({ thu_tu: nextOrder });
      }
    } catch (error) {
      console.error('Error fetching technology orders:', error);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    modalForm.resetFields();
  };

  const handleCreate = async (values: any) => {
    setCreating(true);
    try {
      const payload = {
        ...values,
        trang_thai: values.trang_thai ? 1 : 0
      };

      const response = await postData(CONG_NGHE_PATH, payload);
      const newId = response?.data?.id || response?.id;

      if (newId && form) {
        const currentValues = form.getFieldValue(name) || [];
        form.setFieldValue(name, [...currentValues, newId]);
      }

      setIsModalVisible(false);
      modalForm.resetFields();
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error('Error creating technology:', error);
    } finally {
      setCreating(false);
    }
  };
  return (
    <BaseForm.Item label={label} rules={rules}>
      <TagsRow gutter={[8, 0]}>
        <BaseCol className='select-field'>
          <BaseForm.Item name={name} noStyle>
            <SelectApi
              key={refreshKey}
              path={`${CONG_NGHE_PATH}/options`}
              placeholder={placeholder}
              mode='multiple'
              style={{ width: '100%' }}
              disabled={disabled}
            />
          </BaseForm.Item>
        </BaseCol>

        {!disabled && (
          <BaseCol className='add-button-col'>
            <BaseButton
              type='primary'
              icon={<PlusOutlined />}
              onClick={showModal}
              size='small'
              style={{ width: 32, height: 32, borderRadius: 6 }}
            />
          </BaseCol>
        )}
      </TagsRow>

      <BaseModal
        title='Thêm công nghệ mới'
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <BaseButton key='back' onClick={handleCancel}>
            Hủy
          </BaseButton>,
          <BaseButton key='submit' type='primary' loading={creating} onClick={() => modalForm.submit()}>
            Lưu
          </BaseButton>
        ]}
      >
        <BaseForm id='formThemCongNgheQuick' form={modalForm} layout='vertical' onFinish={handleCreate}>
          <FormCongNghe existingOrders={existingOrders} />
        </BaseForm>
      </BaseModal>
    </BaseForm.Item>
  );
};

export default ToolSelectWithQuickAdd;
