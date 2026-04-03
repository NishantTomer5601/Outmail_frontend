"use client";
import { Bell, Search, User, Menu } from "lucide-react";

export default function TPOTopBar({ onMenuClick, user }) {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Placement Officer Dashboard</h1>
          <p className="text-xs text-gray-400">{user?.institution?.name}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          <Search size={14} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            className="bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none w-40"
          />
        </div>

        {/* Notification */}
        <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-purple-600 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <User size={14} className="text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 leading-none">{user?.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">Placement Officer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
