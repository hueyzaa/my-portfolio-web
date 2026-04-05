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
import { Divider } from 'antd';

const SectionHeader = styled(BaseTypography.Title)`
  color: var(--primary-color) !important;
  margin-top: 20px !important;
  margin-bottom: 20px !important;
  font-weight: 700 !important;
`;

// ProjectFormValues import removed as it was unused
interface FormQuanLiDuAnProps {
  disabled?: boolean;
}

const FormQuanLiDuAn = ({ disabled }: FormQuanLiDuAnProps) => {
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
        <BaseForm.Item name='order' label='Thứ tự' initialValue={0}>
          <BaseInputNumber size='small' min={0} style={{ width: '100%' }} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormQuanLiDuAn;
