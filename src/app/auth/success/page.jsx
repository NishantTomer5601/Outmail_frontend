"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthSuccess() {
  const { login, isAuthenticated, userRole, loading } = useAuth();
  const router = useRouter();
  const [loginAttempted, setLoginAttempted] = useState(false);

  useEffect(() => {
    const handleAuthSuccess = async () => {
      // The backend has already set the HTTP-only cookie
      // Now we need to fetch user data and redirect based on role
      try {
        await login(); // This will call checkAuth and set user + role
        setLoginAttempted(true);
      } catch (error) {
        console.error('Login failed:', error);
        router.replace('/?error=login_failed');
      }
    };

    handleAuthSuccess();
  }, [login, router]);

  useEffect(() => {
    if (!loginAttempted || loading) return;

    if (!isAuthenticated) {
      router.replace('/?error=login_failed');
      return;
    }

    const rolePath = userRole === 'TPO_ADMIN' ? '/admin/dashboard' : '/student/dashboard';
    router.replace(rolePath);
  }, [loginAttempted, loading, isAuthenticated, userRole, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-black via-[#6c00ff] to-black">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-lg">Completing your login...</p>
        <p className="text-sm text-white/60 mt-2">Setting up your dashboard...</p>
      </div>
    </div>
  );
}