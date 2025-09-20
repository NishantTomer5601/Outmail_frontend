import React from 'react';
import { ShieldCheck, BarChart2, Settings, Zap } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Zap size={28} className="text-white" />,
      title: 'Automated Email Outreach',
      desc: 'Send personalized emails to recruiters at scale, directly from your Gmail.',
    },
    {
      icon: <Settings size={28} className="text-white" />,
      title: 'Personalization Made Easy',
      desc: 'Upload multiple resumes and templates to tailor your outreach for every company and role.',
    },
    {
      icon: <BarChart2 size={28} className="text-white" />,
      title: 'Smart Targeting',
      desc: 'Reach firms based on industry, recent funding stage, size, or location - or import your own curated list for precision outreach.',
    },
    {
      icon: <ShieldCheck size={28} className="text-white" />,
      title: 'Privacy & Safety First',
      desc: 'Your Gmail is protected with built-in sending limits and encrypted tokens. Contacts are deleted after each campaign.',
    },
  ];

  return (
    <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black flex items-center justify-center px-8 py-20 min-h-screen" style={{

  }}>
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left Side */}
        <div className="text-white">
          <p className="text-sm font-medium text-indigo-300 uppercase tracking-wider mb-2">Why Outmail Stands Out</p>
          <h2 className="text-4xl font-bold mb-10">
            Smarter Job Outreach, Built for You
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
