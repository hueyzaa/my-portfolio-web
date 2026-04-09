import { getDataById } from '@app/api/getData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EyeOutlined } from '@ant-design/icons';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { Tag, Space, Divider } from 'antd';
import { apiURL } from '@app/configs/configs';
import { getListData } from '@app/api/getData.api';
import { getImageUrl } from '@app/utils/utils';

const XemChiTietQuanLiDichVu = ({ path, id }: { path: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [technologies, setTechnologies] = useState<any[]>([]);
  const { t } = useTranslation();
  const title = `Chi tiết ${t('common.quan-li-dich-vu').toLowerCase()}`;

  const fetchTechnologies = async () => {
    try {
      const res = await getListData('cong-nghe', { limit: 100 });
      if (res?.data) {
        setTechnologies(res.data);
      }
    } catch (error) {
      console.error('Error fetching technologies:', error);
    }
  };

  const showModal = async () => {
    const res = await getDataById(id, path);
    if (res) {
      setData(res);
    }
    await fetchTechnologies();
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderTags = () => {
    if (!data?.tags || !Array.isArray(data.tags)) return null;
    return (
      <Space size={[8, 8]} wrap>
        {data.tags.map((tagId: any, index: number) => {
          const tech = technologies.find(
            (t: any) => t.id === Number(tagId) || String(t.ten || t.name).toLowerCase() === String(tagId).toLowerCase()
          );
          const tagName = tech ? tech.ten || tech.name : tagId;
          return (
            <Tag color='geekblue' key={index} style={{ borderRadius: '4px' }}>
              {tagName}
            </Tag>
          );
        })}
      </Space>
    );
  };

  return (
    <>
      <BaseButton onClick={showModal} type='text' size='small' title={title} icon={<EyeOutlined />} />
      <BaseModal
        title={
          <BaseTypography.Title style={{ textAlign: 'center', color: '#FF4500' }} level={3}>
            {title.toUpperCase()}
          </BaseTypography.Title>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={true}
        centered
        width={700}
        footer={[
          <BaseButton key='close' size='small' onClick={handleCancel}>
            Đóng
          </BaseButton>
        ]}
      >
        {data && (
          <div style={{ padding: '10px' }}>
            <BaseRow gutter={[24, 24]}>
              <BaseCol span={24}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <BaseTypography.Text strong style={{ color: '#FF4500', display: 'block', marginBottom: '8px' }}>
                    Tên dịch vụ
                  </BaseTypography.Text>
                  <BaseTypography.Title level={4} style={{ marginTop: 0 }}>
                    {data.ten}
                  </BaseTypography.Title>
                </div>
              </BaseCol>

              <BaseCol span={24}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <BaseTypography.Text strong style={{ color: '#FF4500', display: 'block', marginBottom: '8px' }}>
                    Mô tả
                  </BaseTypography.Text>
                  <BaseTypography.Paragraph
                    style={{ fontSize: '15px', color: 'rgba(0,0,0,0.85)', whiteSpace: 'pre-wrap' }}
                  >
                    {data.mo_ta || 'Không có mô tả'}
                  </BaseTypography.Paragraph>
                </div>
              </BaseCol>

              <BaseCol span={24}>
                <BaseTypography.Text strong style={{ color: '#FF4500', display: 'block', marginBottom: '12px' }}>
                  Hình ảnh minh họa
                </BaseTypography.Text>
                {data.anh ? (
                  <div
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: '1px solid #f0f0f0',
                      width: '100%',
                      maxHeight: '300px',
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    <img
                      src={getImageUrl(apiURL, data.anh)}
                      alt={data.ten}
                      style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', background: '#f5f5f5', borderRadius: '8px' }}>
                    Không có hình ảnh
                  </div>
                )}
              </BaseCol>

              <BaseCol span={24}>
                <Divider style={{ margin: '12px 0' }} />
                <BaseRow gutter={[16, 16]}>
                  <BaseCol span={12}>
                    <BaseTypography.Text strong style={{ color: '#FF4500', display: 'block', marginBottom: '8px' }}>
                      Trạng thái
                    </BaseTypography.Text>
                    <Tag color={data.trang_thai ? 'success' : 'default'} style={{ fontSize: '13px' }}>
                      {data.trang_thai ? 'Hiển thị' : 'Ẩn'}
                    </Tag>
                  </BaseCol>

                  <BaseCol span={12}>
                    <BaseTypography.Text strong style={{ color: '#FF4500', display: 'block', marginBottom: '8px' }}>
                      Thứ tự hiển thị
                    </BaseTypography.Text>
                    <BaseTypography.Text style={{ fontSize: '15px' }}>{data.thu_tu}</BaseTypography.Text>
                  </BaseCol>
                </BaseRow>
              </BaseCol>

              <BaseCol span={24}>
                <BaseTypography.Text strong style={{ color: '#FF4500', display: 'block', marginBottom: '12px' }}>
                  Công nghệ / Tags liên quan
                </BaseTypography.Text>
                {renderTags() || <BaseTypography.Text type='secondary'>Không có công nghệ nào</BaseTypography.Text>}
              </BaseCol>
            </BaseRow>
          </div>
        )}
      </BaseModal>
    </>
  );
};

export default XemChiTietQuanLiDichVu;
