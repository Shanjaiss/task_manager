import { lazy, Suspense } from 'react';
import AppLayout from '../../Layout/AppLayout';
import Loader from '../../../components/loader/Loader';
import ProtectedRoute from '../../ProtectedRoutes';

const Tasks = lazy(() => import('./Tasks'));

const NotFound = lazy(() => import('../../../components/404/NotFound'));

const TasksRoutes = [
  {
    path: '/',
    element: <ProtectedRoute />, // 🔐 protect all below
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: 'tasks',
            element: (
              <Suspense fallback={<Loader fullScreen />}>
                <Tasks />
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

export default TasksRoutes;
