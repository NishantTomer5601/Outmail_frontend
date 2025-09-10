'use client';
import React from 'react';
import CountUp, { useCountUp } from 'react-countup';

export default function CtaOne() {
  return (
    <div className= " bg-white text-black py-20 px-4 bg-gradient-to-l from-black via-[#6c00ff] to-black">
      {/* Insights Section */}
      <div className="max-w-6xl mx-auto text-center mt-30">
        <p className="text-sm text-[#6c00ff] font-medium mb-2">Why Visibility Matters</p>
        <h2 className="text-3xl text-white md:text-4xl font-bold mb-4">Most Resumes Never Get Seen. OutMail Changes That.</h2>
        <p className="text-white mb-8 max-w-2xl mx-auto">
          75% of job applications are never read by a human. OutMail helps you break through the noise and get your profile in front of real recruiters—fast, safe, and personalized.
        </p>

        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-center gap-12 text-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-[#ffff]">
              <CountUp end={3} duration={2.5} suffix="x" enableScrollSpy/>
            </h3>
            <p className="text-white">More Visibility</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#ffff]">
              <CountUp end={50} duration={2.5} suffix="+" enableScrollSpy/>
            </h3>
            <p className="text-white">Emails Sent Daily (Safe Limit)</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#ffff]">
              <CountUp end={10000} duration={2.5} suffix="+" enableScrollSpy/>
            </h3>
            <p className="text-white">Companies in Our Database</p>
          </div>
        </div>

        {/* CTA Box */}
        <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black rounded-2xl p-20 flex border border-white flex-col md:flex-row justify-between items-center shadow-xl">
          <div className="text-white max-w-md">
            <h3 className="text-2xl font-semibold mb-4">Start Your OutMail Journey Today</h3>
            <p className="mb-6 text-white/80">
              Don’t let your application get lost. OutMail gives you the tools to get noticed, connect directly, and land more interviews.
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
              Get Started Now
            </button>
          </div>
          <img
            src="/header.png"
            alt="OutMail Job Visibility"
            className="w-64 mt-10 md:mt-0 md:ml-8 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
