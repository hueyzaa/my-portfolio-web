import { apiInstance } from '@app/api/core.api';
import { getDataById } from '@app/api/getData.api';
import { patchData } from '@app/api/updateData';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { apiURL } from '@app/configs/configs';
import { useAppDispatch } from '@app/hooks/reduxHooks';
import { appActions } from '@app/store/slices/appSlice';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import FormQuanLiDuAn from './FormQuanLiDuAn';
import ProjectFormPage from './components/ProjectFormPage';
import { ProjectEntity, ProjectFormValues } from './types';
import { PROJECT_PATH, STATUS_DRAFT, STATUS_PUBLISHED } from './constants';
import { getListData } from '@app/api/getData.api';

const SuaQuanLiDuAn = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const [initialData, setInitialData] = useState<ProjectEntity | null>(null);
  const [existingOrders, setExistingOrders] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const path = PROJECT_PATH;
  const title = `Sửa ${t('common.quan-li-du-an').toLowerCase()}`;

  const transformToFileList = (filePath: string | string[]) => {
    if (!filePath) return [];
    const paths = Array.isArray(filePath) ? filePath : [filePath];
    return paths.map((p, index) => ({
      uid: `-${index}`,
      name: p.split('/').pop() || 'image.png',
      status: 'done',
      url: p.startsWith('http') ? p : `${apiURL}/${p}`,
      thumbUrl: p.startsWith('http') ? p : `${apiURL}/${p}`,
      response: { path: p }
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const [data, listRes] = await Promise.all([
          getDataById(Number(id), path),
          getListData(path, { limit: 1000 })
        ]);

        if (data) {
          const formData = {
            ...data,
            status: data.status === STATUS_PUBLISHED,
            thumbnail: transformToFileList(data.thumbnail || ''),
            gallery: transformToFileList(data.gallery || []),
            tools: data.tools || data.tool_details?.map((t: any) => t.id) || []
          };
          setInitialData(formData as any);
          form.setFieldsValue(formData);
        }

        if (listRes?.data) {
          setExistingOrders(listRes.data.map((item: any) => item.order));
        }
      } catch (error) {
        console.error('Error fetching project data or orders:', error);
      }
    };
    fetchData();
  }, [id, path, form]);

  const goBack = () => {
    navigate('/quan-li-du-an');
  };

  const onUpdate = async (values: ProjectFormValues) => {
    setIsLoading(true);
    try {
      // 1. Process Thumbnail
      if (values.thumbnail && values.thumbnail.length > 0) {
        const item = values.thumbnail[0];
        if (item.originFileObj) {
          const formData = new FormData();
          formData.append('file', item.originFileObj);
          const res = await apiInstance.post('upload', formData);
          values.thumbnail = res?.data?.path;
        } else {
          values.thumbnail = item.response?.path || item.url?.replace(`${apiURL}/`, '');
        }
      } else {
        values.thumbnail = null;
      }

      // 2. Process Gallery
      if (values.gallery && values.gallery.length > 0) {
        const galleryPaths = [];
        for (const item of values.gallery) {
          if (item.originFileObj) {
            const formData = new FormData();
            formData.append('file', item.originFileObj);
            const res = await apiInstance.post('upload', formData);
            galleryPaths.push(res?.data?.path);
          } else {
            galleryPaths.push(item.response?.path || item.url?.replace(`${apiURL}/`, ''));
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

      await patchData(path, Number(id), payload, onSuccess);
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProjectFormPage
      title={title}
      formId='formSuaQuanLiDuAn'
      form={form}
      onFinish={onUpdate}
      onBack={goBack}
      onReset={() => (initialData ? form.setFieldsValue(initialData) : form.resetFields())}
      loading={isLoading}
      submitLabel='Cập nhật'
    >
      <FormQuanLiDuAn existingOrders={existingOrders} />
    </ProjectFormPage>
  );
};

export default SuaQuanLiDuAn;
