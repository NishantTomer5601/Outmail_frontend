"use client";
import React from 'react';
import { X, Home, BarChart3, Settings, Users, Mail, FileText, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar({ isOpen, onClose, userRole = 'STUDENT' }) {
  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [
      {
        name: 'Dashboard',
        href: userRole === 'TPO_ADMIN' ? '/admin/dashboard' : '/student/dashboard',
        icon: Home,
      },
      {
        name: 'Campaigns',
        href: userRole === 'TPO_ADMIN' ? '/admin/campaigns' : '/student/campaigns',
        icon: Mail,
      },
      {
        name: 'Analytics',
        href: userRole === 'TPO_ADMIN' ? '/admin/analytics' : '/student/analytics',
        icon: BarChart3,
      },
      {
        name: 'Templates',
        href: userRole === 'TPO_ADMIN' ? '/admin/templates' : '/student/templates',
        icon: FileText,
      },
    ];

    // Add admin-only items
    if (userRole === 'TPO_ADMIN') {
      baseItems.push(
        {
          name: 'Manage Students',
          href: '/admin/students',
          icon: Users,
        },
        {
          name: 'System Settings',
          href: '/admin/settings',
          icon: Shield,
        }
      );
    }

    baseItems.push({
      name: 'Settings',
      href: userRole === 'TPO_ADMIN' ? '/admin/profile' : '/student/profile',
      icon: Settings,
    });

    return baseItems;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'w-64' : 'lg:w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className={`flex items-center gap-3 ${!isOpen ? 'lg:justify-center' : ''}`}>
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className={`font-satisfy text-xl text-gray-900 ${!isOpen ? 'lg:hidden' : ''}`}>
              Outmail
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4">
          {/* Role badge */}
          <div className={`mb-6 ${!isOpen ? 'lg:hidden' : ''}`}>
            <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {userRole === 'TPO_ADMIN' ? 'TPO Admin' : 'Student'}
            </div>
          </div>

          <ul className="space-y-2">
            {getNavigationItems().map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    onClick={() => window.innerWidth < 1024 && onClose()}
                  >
                    <IconComponent size={20} />
                    <span className={`${!isOpen ? 'lg:hidden' : ''}`}>
                      {item.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
  