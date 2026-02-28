import React from 'react';
import { BarChart2, Zap, Briefcase, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap size={28} className="text-white" />,
      title: 'Smart Automated Cold Outreach',
      desc: 'Send personalized emails to recruiters at scale, directly from your Gmail — safely throttled and fully automated.',
    },
    {
      icon: <BarChart2 size={28} className="text-white" />,
      title: 'Live Hiring Intelligence',
      desc: 'Stay ahead with real-time funding trends, hot-hiring news, and hiring spotlights — so you always know where the opportunities are.',
    },
    {
      icon: <Briefcase size={28} className="text-white" />,
      title: 'Curated Job Openings',
      desc: 'Browse roles ranked by an Outmail Priority Score — surfaced based on hiring urgency, company momentum, and recent funding signals.',
    },
    {
      icon: <Users size={28} className="text-white" />,
      title: 'Mentorship Sessions',
      desc: 'Connect with experienced professionals and alumni for live guidance on interviews, career paths, and building the right outreach strategy.',
    },
  ];

  return (
    <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black flex items-center justify-center px-8 py-20 min-h-screen" style={{

  }}>
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div className="text-white">
          <p className="text-sm font-medium text-indigo-300 uppercase tracking-wider mb-2">Everything You Need to Land the Job</p>
          <h2 className="text-4xl font-bold mb-10">
            One Platform. Every Edge You Need.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-4 p-6 rounded-xl  hover:bg-white/20 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-xl">
                <div className="bg-white/20 p-3 w-fit rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-white/80">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Dashboard image (mockup or actual image) */}
        <div className="w-full flex  justify-end ">
          <img
            src="/dashboard.jpg" 
            alt="Outmail Dashboard Preview"
            className="rounded-4xl shadow-xl  max-w-full transition-transform duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 translate-x-12 md:translate-x-24 lg:translate-x-32 "
            width={1000}
          />
        </div>
      </div>
    </div>
  );
}
