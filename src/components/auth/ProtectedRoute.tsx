
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const { data: userRole, isLoading: roleLoading } = useUserRole();
  const location = useLocation();

  console.log('ProtectedRoute: Loading states -', { loading, roleLoading });
  console.log('ProtectedRoute: User and role -', { user: !!user, userRole, requiredRole });
  console.log('ProtectedRoute: Current location -', location.pathname);

  if (loading || roleLoading) {
    console.log('ProtectedRoute: Still loading, showing spinner');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-spice-paprika"></div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute: No user, redirecting to auth');
    return <Navigate to="/auth" replace />;
  }

  if (requiredRole) {
    // If we have a required role but userRole is still loading/undefined, wait a bit more
    if (userRole === undefined || userRole === null) {
      console.log('ProtectedRoute: User role still undefined, showing spinner');
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-spice-paprika"></div>
        </div>
      );
    }

    if (userRole !== requiredRole) {
      console.log('ProtectedRoute: Insufficient role, redirecting to home. Expected:', requiredRole, 'Got:', userRole);
      return <Navigate to="/" replace />;
    }
  }

  console.log('ProtectedRoute: Access granted');
  return <>{children}</>;
};

export default ProtectedRoute;
