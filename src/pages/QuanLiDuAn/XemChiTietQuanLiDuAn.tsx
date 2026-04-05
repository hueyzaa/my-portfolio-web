import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { getDataById } from '@app/api/getData.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseImage } from '@app/components/common/BaseImage/BaseImage';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { Tag, Space, Descriptions, Spin } from 'antd';
import { apiURL } from '@app/configs/configs';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components';
import { ProjectEntity } from './types';
import { PROJECT_PATH, STATUS_PUBLISHED } from './constants';

const StyledDescriptions = styled(Descriptions)`
  margin-bottom: 24px;
  .ant-descriptions-title {
    color: var(--primary-color) !important;
    font-weight: 700 !important;
    font-size: 16px !important;
  }
  .ant-descriptions-item-label {
    width: 220px;
    font-weight: 600;
    color: #405072;
    background-color: #f9f9f9 !important;
  }
`;

const XemChiTietQuanLiDuAn = () => {
  const { id } = useParams();
  const [data, setData] = useState<ProjectEntity | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const path = PROJECT_PATH;

  useEffect(() => {
    const fetchLogo = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const res = await getDataById(Number(id), path);
        setData(res);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogo();
  }, [id, path]);

  const handleBack = () => {
    navigate('/quan-li-du-an');
  };

  const handleEdit = () => {
    navigate(`/quan-li-du-an/sua/${id}`);
  };

  if (isLoading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Spin size='large' tip='Đang tải dữ liệu...' />
      </div>
    );
  }

  return (
    <BaseCard padding='2rem'>
      <BaseRow gutter={[20, 20]}>
        {/* Header */}
        <BaseCol span={24} style={{ padding: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <BaseTypography.Title level={4} style={{ marginBottom: 0 }}>
              <BaseButton style={{ padding: 0 }} onClick={handleBack} size='small' type='text' title='Quay lại'>
                <BaseTypography.Title
                  level={4}
                  className='typography-title'
                  style={{
                    color: 'var(--primary-color)',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <ArrowLeftOutlined /> CHI TIẾT DỰ ÁN
                </BaseTypography.Title>
              </BaseButton>
            </BaseTypography.Title>
            <BaseButton
              type='primary'
              size='small'
              icon={<EditOutlined />}
              onClick={handleEdit}
              style={{ borderRadius: 6 }}
            >
              Sửa dự án
            </BaseButton>
          </div>
        </BaseCol>

        {data && (
          <BaseCol span={24}>
            {/* THÔNG TIN CHUNG */}
            <StyledDescriptions
              title='Thông tin chung'
              bordered
              column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
              size='small'
            >
              <Descriptions.Item label='Tên dự án' span={2}>
                <b style={{ color: '#002140' }}>{data.title}</b>
              </Descriptions.Item>
              <Descriptions.Item label='Trạng thái'>
                <Tag color={data.status === STATUS_PUBLISHED ? 'success' : 'default'} style={{ fontSize: '13px' }}>
                  {data.status === STATUS_PUBLISHED ? 'Công khai' : 'Nháp'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label='Thứ tự hiển thị'>
                <b>{data.order}</b>
              </Descriptions.Item>
              <Descriptions.Item label='Mô tả ngắn' span={2}>
                <b>{data.mo_ta_ngan || 'Chưa có mô tả ngắn'}</b>
              </Descriptions.Item>
              {((data.tool_details && data.tool_details.length > 0) || (data.tools && data.tools.length > 0)) && (
                <Descriptions.Item label='Công nghệ sử dụng' span={2}>
                  <Space wrap>
                    {data.tool_details
                      ? data.tool_details.map((tool: any) => (
                          <Tag color='geekblue' key={tool.id} style={{ borderRadius: '4px' }}>
                            {tool.ten || tool.ten_cong_nghe}
                          </Tag>
                        ))
                      : data.tools?.map((tool: string) => (
                          <Tag key={tool} style={{ borderRadius: '4px' }}>
                            {tool}
                          </Tag>
                        ))}
                  </Space>
                </Descriptions.Item>
              )}
            </StyledDescriptions>

            {/* MÔ TẢ CHI TIẾT */}
            <StyledDescriptions title='Mô tả chi tiết' bordered column={1} size='small'>
              <Descriptions.Item label='Nội dung dự án'>
                <div
                  className='quill-content'
                  style={{ padding: '8px 0', lineHeight: '1.8' }}
                  dangerouslySetInnerHTML={{ __html: data.mo_ta_chi_tiet || 'Chưa có mô tả chi tiết' }}
                />
              </Descriptions.Item>
            </StyledDescriptions>

            {/* HÌNH ẢNH & THƯ VIỆN */}
            <StyledDescriptions title='Hình ảnh & Thư viện' bordered column={1} size='small'>
              <Descriptions.Item label='Ảnh đại diện'>
                {data.thumbnail ? (
                  <BaseImage
                    src={data.thumbnail.startsWith('http') ? data.thumbnail : `${apiURL}/${data.thumbnail}`}
                    style={{
                      maxHeight: '300px',
                      maxWidth: '100%',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                    alt={data.title}
                  />
                ) : (
                  'Không có ảnh'
                )}
              </Descriptions.Item>
              {data.gallery && data.gallery.length > 0 && (
                <Descriptions.Item label={`Thư viện ảnh (${data.gallery.length} ảnh)`}>
                  <BaseRow gutter={[12, 12]}>
                    {data.gallery.map((img: string, index: number) => (
                      <BaseCol xs={24} sm={12} md={8} lg={6} key={index}>
                        <BaseImage
                          src={img.startsWith('http') ? img : `${apiURL}/${img}`}
                          style={{
                            width: '100%',
                            height: '160px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                          }}
                          alt={`${data.title} gallery ${index}`}
                        />
                      </BaseCol>
                    ))}
                  </BaseRow>
                </Descriptions.Item>
              )}
            </StyledDescriptions>

            {/* THÔNG TIN HỆ THỐNG */}
            <StyledDescriptions title='Thông tin hệ thống' bordered column={2} size='small'>
              <Descriptions.Item label='Thời gian tạo'>
                {data.ngay_tao ? moment(data.ngay_tao).format('DD/MM/YYYY HH:mm') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label='Người tạo'>Admin</Descriptions.Item>
              <Descriptions.Item label='Thời gian cập nhật'>
                {data.ngay_cap_nhat ? moment(data.ngay_cap_nhat).format('DD/MM/YYYY HH:mm') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label='Người cập nhật'>Admin</Descriptions.Item>
            </StyledDescriptions>
          </BaseCol>
        )}
      </BaseRow>
    </BaseCard>
  );
};

export default XemChiTietQuanLiDuAn;
