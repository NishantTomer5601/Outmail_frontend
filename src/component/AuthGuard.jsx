"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * AuthGuard component for role-based route protection
 * Usage: 
 * <AuthGuard allowedRoles={['TPO_ADMIN']}>
 *   <AdminComponent />
 * </AuthGuard>
 */
export default function AuthGuard({ 
  children, 
  allowedRoles = [], 
  fallbackPath = '/',
  showLoading = true 
}) {
  const { isAuthenticated, userRole, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not authenticated - redirect to home
      if (!isAuthenticated) {
        router.push(fallbackPath);
        return;
      }

      // Check role permissions
      if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // User doesn't have required role - redirect based on their actual role
        switch (userRole) {
          case 'TPO_ADMIN':
            router.push('/admin/dashboard');
            break;
          case 'STUDENT':
          default:
            router.push('/student/dashboard');
            break;
        }
        return;
      }
    }
  }, [isAuthenticated, userRole, loading, allowedRoles, router, fallbackPath]);

  // Show loading spinner while checking auth
  if (loading && showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-black via-[#6c00ff] to-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated or insufficient permissions
  if (!isAuthenticated || (allowedRoles.length > 0 && !allowedRoles.includes(userRole))) {
    return null;
  }

  return children;
}