import React from 'react';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { BaseEditor } from '@app/components/common/BaseEditor/BaseEditor';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import MainImageUpload from '@app/components/common/MainImageUpload/MainImageUpload';
import EventGalleryUpload from '@app/components/common/EventGalleryUpload/EventGalleryUpload';
import { ToggleCard } from '@app/components/common/ToggleCard/ToggleCard';
import styled from 'styled-components';
import { ToolSelectWithQuickAdd } from './components/ToolSelectWithQuickAdd';
import { Divider, Form } from 'antd';
import { handleDuplicateOrder } from '@app/utils/utils';

const SectionHeader = styled(BaseTypography.Title)`
  color: var(--primary-color) !important;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  font-weight: 700 !important;
`;

// ProjectFormValues import removed as it was unused
interface FormQuanLiDuAnProps {
  isEditing?: boolean;
  disabled?: boolean;
  existingOrders?: number[];
}

const FormQuanLiDuAn = ({ disabled, existingOrders = [] }: FormQuanLiDuAnProps) => {
  const form = Form.useFormInstance();

  const handleOrderBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (disabled) return;
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      const nextValue = handleDuplicateOrder(value, existingOrders);
      if (nextValue !== value) {
        form.setFieldsValue({ order: nextValue });
      }
    }
  };
  return (
    <BaseRow gutter={[20, 20]}>
      <BaseCol span={24}>
        <BaseForm.Item
          name='title'
          label='Tên dự án'
          rules={[{ required: true, message: 'Tên dự án không được bỏ trống' }]}
        >
          <BaseInput size='small' placeholder='Nhập tên dự án' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='mo_ta_ngan' label='Mô tả ngắn'>
          <BaseInput.TextArea
            placeholder='Nhập mô tả ngắn (hiển thị ở thẻ dự án)'
            autoSize={{ minRows: 2, maxRows: 4 }}
            disabled={disabled}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='mo_ta_chi_tiet' label='Mô tả chi tiết'>
          <BaseEditor placeholder='Nhập mô tả chi tiết dự án' readOnly={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <Divider />
        <SectionHeader level={4}>CẤU HÌNH CHI TIẾT MONOLITH</SectionHeader>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='vai_tro' label='Vai trò (Role)'>
          <BaseInput placeholder='VD: DESIGNER & DEVELOPER' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='dich_vu' label='Dịch vụ (Services)'>
          <BaseInput placeholder='VD: UI/UX, FRONTEND & MOTION' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='tieu_de_phu' label='Slogan / Headline (Concept)'>
          <BaseInput.TextArea
            placeholder='VD: Crafting unique experiences through minimalist design and modular architecture.'
            autoSize={{ minRows: 2, maxRows: 4 }}
            disabled={disabled}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <Divider />
        <SectionHeader level={4}>HÌNH ẢNH</SectionHeader>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item
          name='thumbnail'
          label='Hình ảnh chính'
          extra='Hình ảnh đại diện của dự án (khuyến nghị: 500x500px)'
        >
          <MainImageUpload
            title='Hình ảnh chính'
            showTitle={false}
            helperText=''
            uploadText='Tải lên'
            altText='thumbnail'
            disabled={disabled}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='gallery' label='Hình ảnh chi tiết'>
          <EventGalleryUpload uploadText='Tải lên' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <Divider />
      </BaseCol>

      <BaseCol span={24}>
        <ToolSelectWithQuickAdd
          name='tools'
          label='Công nghệ sử dụng'
          placeholder='Chọn hoặc thêm công nghệ'
          disabled={disabled}
        />
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item label='Hoạt động' style={{ marginBottom: 0 }}>
          <ToggleCard>
            <span>Trạng thái</span>
            <BaseForm.Item name='status' valuePropName='checked' initialValue={true} noStyle>
              <BaseSwitch size='small' disabled={disabled} />
            </BaseForm.Item>
          </ToggleCard>
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='order' label='Thứ tự' initialValue={1}>
          <BaseInputNumber
            size='small'
            min={1}
            style={{ width: '100%' }}
            disabled={disabled}
            onBlur={handleOrderBlur}
          />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormQuanLiDuAn;
