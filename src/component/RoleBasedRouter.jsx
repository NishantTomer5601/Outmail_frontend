"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * RoleBasedRouter - Automatically routes users based on their role
 * Place this in your main app or auth success page
 */
export default function RoleBasedRouter({ 
  children = null, 
  defaultPath = '/',
  showLoading = true 
}) {
  const { isAuthenticated, userRole, loading, navigateByRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Not authenticated - go to home/login
        router.push(defaultPath);
        return;
      }

      // Route based on user role
      const rolePath = navigateByRole();
      if (rolePath !== '/') {
        router.push(rolePath);
      }
    }
  }, [isAuthenticated, userRole, loading, router, defaultPath, navigateByRole]);

  // Show loading while determining route
  if (loading && showLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-black via-[#6c00ff] to-black">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Render children if provided, otherwise null (since we're routing)
  return children;
}