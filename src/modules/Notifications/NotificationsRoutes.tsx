import { lazy, Suspense } from 'react';
import AppLayout from '../Layout/AppLayout';
import Loader from '../../components/loader/Loader';
import ProtectedRoute from '../ProtectedRoutes';

const Notifications = lazy(() => import('./Notifications'));
const NotFound = lazy(() => import('../../components/404/NotFound'));

const NotificationRoutes = [
  {
    path: '/',
    element: <ProtectedRoute />, // 🔐 protect all below
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: 'notifications',
            element: (
              <Suspense fallback={<Loader fullScreen />}>
                <Notifications />
              </Suspense>
            ),
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ],
  },
];

export default NotificationRoutes;
