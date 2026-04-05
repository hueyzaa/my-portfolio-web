import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { ToggleCard } from '@app/components/common/ToggleCard/ToggleCard';

interface FormCongNgheProps {
  disabled?: boolean;
}

const FormCongNghe = ({ disabled }: FormCongNgheProps) => {
  return (
    <BaseRow gutter={[20, 20]}>
      <BaseCol span={24}>
        <BaseForm.Item
          name='ten'
          label='Tên công nghệ'
          rules={[{ required: true, message: 'Tên công nghệ không được bỏ trống' }]}
        >
          <BaseInput placeholder='Nhập tên công nghệ' size='small' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={24}>
        <BaseForm.Item name='mo_ta' label='Mô tả'>
          <BaseInput.TextArea placeholder='Nhập mô tả' autoSize={{ minRows: 2, maxRows: 6 }} disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item name='mau' label='Màu sắc (mã hex)'>
          <BaseInput placeholder='VD: #1890ff' size='small' disabled={disabled} />
        </BaseForm.Item>
      </BaseCol>

      <BaseCol span={12}>
        <BaseForm.Item label='Hoạt động' style={{ marginBottom: 0 }}>
          <ToggleCard>
            <span>Trạng thái</span>
            <BaseForm.Item name='trang_thai' valuePropName='checked' initialValue={true} noStyle>
              <BaseSwitch size='small' disabled={disabled} />
            </BaseForm.Item>
          </ToggleCard>
        </BaseForm.Item>
      </BaseCol>
    </BaseRow>
  );
};

export default FormCongNghe;
