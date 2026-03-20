"use client";
import AuthGuard from '@/component/AuthGuard';

export default function AdminDashboardLayout({ children }) {
  return (
    <AuthGuard>
      {children}
    </AuthGuard>
  );
}