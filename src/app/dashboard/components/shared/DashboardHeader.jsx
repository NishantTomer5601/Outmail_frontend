import React from "react";
import { Menu } from "lucide-react";

const DashboardHeader = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <div className="">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded hover:bg-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-purple-500 lg:hidden"
        >
          <Menu className="text-white w-5 sm:w-6 h-5 sm:h-6" />
        </button>
        <div>
          <h2 className="text-lg sm:text-xl font-bold"></h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;