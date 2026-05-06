import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticated = () => {
  // 🔥 Replace with real auth logic
  return !!localStorage.getItem('token');
};

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to='/login' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
