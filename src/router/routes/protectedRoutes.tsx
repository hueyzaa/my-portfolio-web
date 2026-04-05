import React from 'react';
import { RouteObject } from 'react-router-dom';
import { withLoading } from '@app/hocs/withLoading.hoc';
import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import RequireAuth from '../guards/RequireAuth';
import { profileRoutes } from './profileRoutes';

// Lazy loaded page components
const Error404Page = React.lazy(() => import('@app/pages/Error/Error404Page'));
const HomePage = React.lazy(() => import('@app/pages/Home/Home'));
const VaiTroPage = React.lazy(() => import('@app/pages/VaiTro/VaiTro'));
const NguoiDungPage = React.lazy(() => import('@app/pages/NguoiDung/NguoiDung'));
const LogThaoTacPage = React.lazy(() => import('@app/pages/LogThaoTac/LogThaoTac'));
const CauHinhChungPage = React.lazy(() => import('@app/pages/CauHinhHeThong/CauHinhChung/CauHinhChung'));
const CauHinhHeThongPage = React.lazy(() => import('@app/pages/CauHinhHeThong/CauHinhThongTinHeThong/CauHinhHeThong'));
const QuanLyUploadPage = React.lazy(() => import('@app/pages/CauHinhHeThong/QuanLyUpload/QuanLyUpload'));
const QuanLiDuAnPage = React.lazy(() => import('@app/pages/QuanLiDuAn/QuanLiDuAn'));
const ThemQuanLiDuAnPage = React.lazy(() => import('@app/pages/QuanLiDuAn/ThemQuanLiDuAn'));
const SuaQuanLiDuAnPage = React.lazy(() => import('@app/pages/QuanLiDuAn/SuaQuanLiDuAn'));
const XemChiTietQuanLiDuAnPage = React.lazy(() => import('@app/pages/QuanLiDuAn/XemChiTietQuanLiDuAn'));
const CongNghePage = React.lazy(() => import('@app/pages/CongNghe/CongNghe'));
/*import-component-here*/

// Wrapped with loading HOC
const Error404 = withLoading(Error404Page);
const Home = withLoading(HomePage);
const VaiTro = withLoading(VaiTroPage);
const NguoiDung = withLoading(NguoiDungPage);
const LogThaoTac = withLoading(LogThaoTacPage);
const CauHinhChung = withLoading(CauHinhChungPage);
const CauHinhHeThong = withLoading(CauHinhHeThongPage);
const QuanLyUpload = withLoading(QuanLyUploadPage);
const QuanLiDuAn = withLoading(QuanLiDuAnPage);
const ThemQuanLiDuAn = withLoading(ThemQuanLiDuAnPage);
const SuaQuanLiDuAn = withLoading(SuaQuanLiDuAnPage);
const XemChiTietQuanLiDuAn = withLoading(XemChiTietQuanLiDuAnPage);
const CongNghe = withLoading(CongNghePage);
/*import-component-with-loading-here*/

/**
 * Protected routes
 * These routes require authentication and are wrapped with RequireAuth guard
 */
export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      ...profileRoutes,
      {
        path: 'tai-khoan',
        children: [
          {
            path: 'vai-tro',
            element: <VaiTro />
          },
          {
            path: 'nguoi-dung',
            element: <NguoiDung />
          }
        ]
      },
      {
        path: 'log-thao-tac',
        element: <LogThaoTac />
      },
      {
        path: 'quan-ly-upload',
        element: <QuanLyUpload />
      },
      {
        path: 'cau-hinh-chung',
        element: <CauHinhChung />
      },
      {
        path: 'he-thong',
        element: <CauHinhHeThong />
      },
      {
        path: 'quan-li-du-an',
        children: [
          {
            index: true,
            element: <QuanLiDuAn />
          },
          {
            path: 'them',
            element: <ThemQuanLiDuAn />
          },
          {
            path: 'sua/:id',
            element: <SuaQuanLiDuAn />
          },
          {
            path: 'xem/:id',
            element: <XemChiTietQuanLiDuAn />
          }
        ]
      },
      {
        path: 'cong-nghe',
        element: <CongNghe />
      },
      /*Declare route here*/
      {
        path: '*',
        element: <Error404 />
      }
    ]
  }
];
