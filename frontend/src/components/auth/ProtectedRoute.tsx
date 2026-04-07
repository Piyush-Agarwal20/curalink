import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/hooks/useAuth';
import { UserType } from '@/lib/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredUserType?: UserType;
}

export const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user, checkAuth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if user has required user type
  if (requiredUserType && user?.userType !== requiredUserType) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath = user?.userType === UserType.PATIENT
      ? '/patient/dashboard'
      : '/researcher/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
