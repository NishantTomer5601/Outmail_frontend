"use client";
import AuthGuard from '@/component/AuthGuard';

export default function StudentDashboardLayout({ children }) {
  return (
    <AuthGuard allowedRoles={['STUDENT']}>
      {children}
    </AuthGuard>
  );
}