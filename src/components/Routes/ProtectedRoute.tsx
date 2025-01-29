import { Navigate } from 'react-router-dom';
import { authAPI } from '../../api/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const user = authAPI.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !authAPI.isAdmin()) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
