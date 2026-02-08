"use client";
import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import Image from 'next/image';

export default function TopBar({ onMenuClick, user, userRole = 'STUDENT' }) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu and Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {userRole === 'TPO_ADMIN' ? 'Admin Panel' : 'My Dashboard'}
            </h1>
            <p className="text-sm text-gray-500">
              {userRole === 'TPO_ADMIN' ? 'Manage students and campaigns' : 'Track your email campaigns'}
            </p>
          </div>
        </div>

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3">
            {user?.profilePicture ? (
              <Image 
                src={user.profilePicture} 
                alt="Profile" 
                width={32} 
                height={32} 
                className="rounded-full"
              />
            ) : (
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
            )}
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                {user?.display_name || user?.name || user?.email || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {userRole === 'TPO_ADMIN' ? 'Administrator' : 'Student'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  