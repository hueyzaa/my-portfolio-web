import { apiInstance } from '@app/api/core.api';
import { postData } from '@app/api/postData.api';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { appActions } from '@app/store/slices/appSlice';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FormQuanLiDuAn from './FormQuanLiDuAn';
import ProjectFormPage from './components/ProjectFormPage';
import { ProjectFormValues } from './types';
import { PROJECT_PATH, STATUS_DRAFT, STATUS_PUBLISHED } from './constants';

const ThemQuanLiDuAn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const path = PROJECT_PATH;
  const title = `Thêm ${t('common.quan-li-du-an').toLowerCase()}`;

  const goBack = () => {
    navigate('/quan-li-du-an');
  };

  const onCreate = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      // 1. Upload Thumbnail
      if (values.thumbnail && values.thumbnail.length > 0) {
        const file = values.thumbnail[0].originFileObj;
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          const res = await apiInstance.post('upload', formData);
          values.thumbnail = res?.data?.path;
        } else {
          values.thumbnail = values.thumbnail[0].response?.path || values.thumbnail[0].url;
        }
      } else {
        values.thumbnail = null;
      }

      // 2. Upload Gallery
      if (values.gallery && values.gallery.length > 0) {
        const galleryPaths = [];
        for (const fileItem of values.gallery) {
          const file = fileItem.originFileObj;
          if (file) {
            const formData = new FormData();
            formData.append('file', file);
            const res = await apiInstance.post('upload', formData);
            galleryPaths.push(res?.data?.path);
          } else {
            galleryPaths.push(fileItem.response?.path || fileItem.url);
          }
        }
        values.gallery = galleryPaths;
      } else {
        values.gallery = [];
      }

      const onSuccess = () => {
        dispatch(appActions.toggleReload('DANH_SACH'));
        goBack();
      };

      const payload = {
        ...values,
        status: values.status ? STATUS_PUBLISHED : STATUS_DRAFT
      };

      await postData(path, payload, onSuccess);
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectFormPage
      title={title}
      formId='formThemQuanLiDuAn'
      form={form}
      onFinish={onCreate}
      onBack={goBack}
      onReset={() => form.resetFields()}
      loading={isLoading}
      submitLabel='Hoàn thành'
    >
      <FormQuanLiDuAn isEditing={false} />
    </ProjectFormPage>
  );
};

export default ThemQuanLiDuAn;
