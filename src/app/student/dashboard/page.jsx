"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Charts from "@/component/dashboard/charts";
import Sidebar from "@/component/dashboard/sidebar";
import TopBar from "@/component/dashboard/topbar";

export default function StudentDashboard() {
  const { user, userRole } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#051424] font-[Plus_Jakarta_Sans]">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        userRole={userRole}
      />
      
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'} bg-gradient-to-br from-[#0E1C2D] via-[#051424] to-[#283647] min-h-screen`}> 
        {/* Top Bar */}
        <TopBar 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          userRole={userRole}
        />
        
        {/* Dashboard Content */}
        <main className="p-8 md:p-12 lg:p-16">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-[3.5rem] leading-tight font-extrabold tracking-tight text-[#D5E4FA] mb-2 drop-shadow-lg" style={{letterSpacing: '-0.04em'}}>
              Welcome back, {user?.name || user?.display_name || 'Student'}!
            </h1>
            <p className="text-lg text-[#CFC2D7]">
              Here’s an overview of your email campaigns and performance.
            </p>
          </div>

          {/* Student-specific stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-[#0E1C2D]/90 backdrop-blur-xl p-8 rounded-xl shadow-2xl" style={{boxShadow:'0px 24px 48px rgba(0,0,0,0.4)'}}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.75rem] uppercase tracking-widest text-[#988CA0] font-semibold mb-1">My Campaigns</p>
                  <p className="text-3xl font-extrabold text-[#D5E4FA]">12</p>
                </div>
                <div className="p-3 bg-[#9333EA]/20 rounded-lg shadow-lg">
                  <svg className="w-7 h-7 text-[#9333EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-[#0E1C2D]/90 backdrop-blur-xl p-8 rounded-xl shadow-2xl" style={{boxShadow:'0px 24px 48px rgba(0,0,0,0.4)'}}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.75rem] uppercase tracking-widest text-[#988CA0] font-semibold mb-1">Emails Sent</p>
                  <p className="text-3xl font-extrabold text-[#D5E4FA]">1,234</p>
                </div>
                <div className="p-3 bg-[#A855F7]/20 rounded-lg shadow-lg">
                  <svg className="w-7 h-7 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-[#0E1C2D]/90 backdrop-blur-xl p-8 rounded-xl shadow-2xl" style={{boxShadow:'0px 24px 48px rgba(0,0,0,0.4)'}}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.75rem] uppercase tracking-widest text-[#988CA0] font-semibold mb-1">Open Rate</p>
                  <p className="text-3xl font-extrabold text-[#D5E4FA]">68%</p>
                </div>
                <div className="p-3 bg-[#9333EA]/20 rounded-lg shadow-lg">
                  <svg className="w-7 h-7 text-[#9333EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-[#0E1C2D]/90 backdrop-blur-xl p-8 rounded-xl shadow-2xl" style={{boxShadow:'0px 24px 48px rgba(0,0,0,0.4)'}}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.75rem] uppercase tracking-widest text-[#988CA0] font-semibold mb-1">Responses</p>
                  <p className="text-3xl font-extrabold text-[#D5E4FA]">89</p>
                </div>
                <div className="p-3 bg-[#A855F7]/20 rounded-lg shadow-lg">
                  <svg className="w-7 h-7 text-[#A855F7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="mt-12">
            <Charts userRole={userRole} />
          </div>

          {/* Mentorship Sessions */}
          <div className="bg-[#283647]/90 backdrop-blur-xl rounded-xl shadow-2xl mt-12" style={{boxShadow:'0px 24px 48px rgba(0,0,0,0.4)'}}>
            <div className="p-8 border-b border-[#4D4354]/20">
              <h2 className="text-[1.5rem] font-bold text-[#D5E4FA] tracking-tight">Mentorship Sessions</h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example mentors */}
              {[
                { name: 'Ankit Sharma', role: 'SD1', company: 'Swiggy' },
                { name: 'Priya Iyer', role: 'SD2', company: 'Paytm' },
                { name: 'Rahul Verma', role: 'Staff Engineer', company: 'PhonePe' },
                { name: 'Sneha Agarwal', role: 'SD1', company: 'Meesho' },
                { name: 'Vikram Singh', role: 'SD2', company: 'Razorpay' },
                { name: 'Aishwarya Nair', role: 'Principal Engineer', company: 'Zepto' },
              ].map((mentor, idx) => (
                <div key={idx} className="bg-[#0E1C2D]/80 rounded-lg p-6 flex flex-col items-center shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9333EA] to-[#A855F7] flex items-center justify-center text-2xl font-bold text-white mb-3">
                    {mentor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-lg font-semibold text-[#D5E4FA]">{mentor.name}</div>
                  <div className="text-sm text-[#CFC2D7] mt-1">{mentor.role} @ {mentor.company}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Openings */}
          <div className="bg-[#283647]/90 backdrop-blur-xl rounded-xl shadow-2xl mt-12" style={{boxShadow:'0px 24px 48px rgba(0,0,0,0.4)'}}>
            <div className="p-8 border-b border-[#4D4354]/20">
              <h2 className="text-[1.5rem] font-bold text-[#D5E4FA] tracking-tight">Fresher Job Openings</h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example jobs */}
              {[
                { title: 'Software Engineer - Fresher', company: 'CRED', location: 'Bangalore' },
                { title: 'Graduate Trainee Engineer', company: 'Groww', location: 'Bangalore' },
                { title: 'Backend Developer - Entry Level', company: 'Zerodha', location: 'Bangalore' },
                { title: 'Frontend Developer - Fresher', company: 'Zomato', location: 'Gurgaon' },
                { title: 'SDE Intern', company: 'Paytm', location: 'Noida' },
                { title: 'Junior Software Engineer', company: 'PhonePe', location: 'Bangalore' },
              ].map((job, idx) => (
                <div key={idx} className="bg-[#0E1C2D]/80 rounded-lg p-6 flex flex-col shadow-lg">
                  <div className="text-lg font-semibold text-[#D5E4FA]">{job.title}</div>
                  <div className="text-sm text-[#CFC2D7] mt-1">{job.company} &middot; {job.location}</div>
                  <button className="mt-4 px-4 py-2 rounded-lg font-bold text-white bg-gradient-to-tr from-[#DDB8FF] to-[#9333EA] shadow hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/60">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-[#283647]/90 backdrop-blur-xl rounded-xl shadow-2xl mt-12" style={{boxShadow:'0px 24px 48px rgba(0,0,0,0.4)'}}>
            <div className="p-8 border-b border-[#4D4354]/20">
              <h2 className="text-[1.75rem] font-bold text-[#D5E4FA] tracking-tight">Recent Campaigns</h2>
            </div>
            <div className="p-8">
              <div className="text-center py-8 text-[#988CA0]">
                <p>Your recent email campaigns will appear here.</p>
                <button className="mt-6 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-tr from-[#DDB8FF] to-[#9333EA] shadow-lg hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#9333EA]/60">
                  Create New Campaign
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}