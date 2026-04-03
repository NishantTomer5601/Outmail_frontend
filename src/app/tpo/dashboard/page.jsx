"use client";
import { useState } from "react";
import TPOSidebar from "@/component/tpo/TPOSidebar";
import TPOTopBar from "@/component/tpo/TPOTopBar";
import TPOOverviewCards from "@/component/tpo/TPOOverviewCards";
import TPOCharts from "@/component/tpo/TPOCharts";
import TPOStudentTable from "@/component/tpo/TPOStudentTable";
import TPOMentorshipPanel from "@/component/tpo/TPOMentorshipPanel";

export default function TPODashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const tpoUser = {
    name: user?.name || user?.display_name || "TPO Admin",
    college: user?.institution?.name || "Outmail Partner",
    role: "Placement Officer",
    avatar: user?.profile_picture || null,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <TPOSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        }`}
      >
        {/* Top Bar */}
        <TPOTopBar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          user={tpoUser}
        />

        {/* Content */}
        <main className="flex-1 p-6 space-y-8">

          {/* Welcome */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {tpoUser.name.split(" ")[1]} 
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {tpoUser.college} &nbsp;·&nbsp; Batch 2025–26 &nbsp;·&nbsp; Last updated: Today, 9:42 AM
              </p>
            </div>
            <div className="flex gap-3">
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>All Batches</option>
                <option>2026-2027</option>
                <option>2025-26</option>
                <option>2024-25</option>
              </select>
              <button className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium">
                Export Report
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <TPOOverviewCards />

          {/* Charts Row */}
          <TPOCharts />

          {/* Bottom Row — Student Table + Mentorship Panel */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <TPOStudentTable />
            </div>
            <div>
              <TPOMentorshipPanel />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
