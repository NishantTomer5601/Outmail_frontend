"use client";
import React from 'react';
import { X, Home, BarChart3, Settings, Mail, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar({ isOpen, onClose }) {
  // Simple navigation items (no roles)
  const getNavigationItems = () => [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Campaigns', href: '/dashboard/campaigns', icon: Mail },
    { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { name: 'Templates', href: '/dashboard/templates', icon: FileText },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

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
  