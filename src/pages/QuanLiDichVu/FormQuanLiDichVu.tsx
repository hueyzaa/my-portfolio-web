import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import MainImageUpload from '@app/components/common/MainImageUpload/MainImageUpload';
import { ToggleCard } from '@app/components/common/ToggleCard/ToggleCard';
import { ToolSelectWithQuickAdd } from '../QuanLiDuAn/components/ToolSelectWithQuickAdd';

interface FormQuanLiDichVuProps {
  isEditing?: boolean;
  disabled?: boolean;
}

const FormQuanLiDichVu = ({ disabled }: FormQuanLiDichVuProps) => {
  return (
    <BaseRow gutter={[20, 20]}>
      <BaseCol span={24}>
        <BaseForm.Item
          name='ten'
          label='Tên dịch vụ'
          rules={[{ required: true, message: 'Tên dịch vụ không được bỏ trống' }]}
        >
          <BaseInput size='small' placeholder='Nhập tên dịch vụ' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='mo_ta' label='Mô tả'>
          <BaseInput.TextArea
            placeholder='Nhập mô tả dịch vụ'
            autoSize={{ minRows: 3, maxRows: 6 }}
            disabled={disabled}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='anh' label='Hình ảnh' extra='Hình ảnh minh họa cho dịch vụ'>
          <MainImageUpload
            title='Hình ảnh'
            showTitle={false}
            helperText=''
            uploadText='Tải lên'
            altText='anh'
            disabled={disabled}
          />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <ToolSelectWithQuickAdd
          name='tags'
          label='Công nghệ cung cấp'
          placeholder='Chọn hoặc thêm công nghệ'
          disabled={disabled}
        />
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item label='Trạng thái' style={{ marginBottom: 0 }}>
          <ToggleCard>
            <span>Hiển thị</span>
            <BaseForm.Item name='trang_thai' valuePropName='checked' initialValue={true} noStyle>
              <BaseSwitch size='small' disabled={disabled} />
            </BaseForm.Item>
          </ToggleCard>
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='thu_tu' label='Thứ tự' initialValue={0}>
          <BaseInputNumber size='small' min={0} style={{ width: '100%' }} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormQuanLiDichVu;
