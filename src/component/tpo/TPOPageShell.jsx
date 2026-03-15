"use client";
import { useState } from "react";
import TPOSidebar from "@/component/tpo/TPOSidebar";
import TPOTopBar from "@/component/tpo/TPOTopBar";

const tpoUser = {
  name: "Prof. Anita Sharma",
  college: "BITS Pilani — Pilani Campus",
  role: "Placement Officer",
};

export default function TPOPageShell({ children, title, subtitle }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <TPOSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"}`}>
        <TPOTopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} user={tpoUser} />
        <main className="flex-1 p-6">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
              {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
