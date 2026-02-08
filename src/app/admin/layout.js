"use client";
import AuthGuard from '@/component/AuthGuard';

export default function AdminDashboardLayout({ children }) {
  return (
    <AuthGuard allowedRoles={['TPO_ADMIN']}>
      {children}
    </AuthGuard>
  );
}