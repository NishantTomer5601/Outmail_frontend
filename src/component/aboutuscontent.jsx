'use client';
import React from 'react';
import FlipMaskCard from './flipmask';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <section className="w-full px-4 sm:px-8 md:px-16 py-20 bg-gradient-to-l from-black via-[#6c00ff] to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* LEFT: TEXT CONTENT */}
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-indigo-300 uppercase tracking-wider mb-2">
            About Outmail
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Helping You Get Noticed, Not Ignored
          </h2>
          <p className="text-white/90 max-w-2xl text-base md:text-lg leading-relaxed mb-10">
            Outmail was created for students, fresh graduates, and job seekers who are tired of being lost in the crowd. We believe every candidate deserves a fair shot at being seen by recruiters—not just filtered out by algorithms or buried in portals.
          </p>

          <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
          <div className="mb-6">
            <span className="bg-white text-[#630dff] font-bold px-4 py-2 rounded-xl text-sm shadow-md border border-white group-hover:bg-[#ad46ff] group-hover:text-white transition">
              Visibility
            </span>
            <p className="text-white/90 text-base max-w-md leading-relaxed mt-2">
              We exist to boost your job visibility 5x by making direct, personalized outreach effortless and effective.
            </p>
          </div>
          <div className="mb-6">
            <span className="bg-white text-[#630dff] font-bold px-4 py-2 rounded-xl text-sm shadow-md border border-white group-hover:bg-[#ad46ff] group-hover:text-white transition">
              Empowerment
            </span>
            <p className="text-white/90 text-base max-w-md leading-relaxed mt-2">
              Outmail puts the power back in your hands—no more waiting, no more guessing. You choose who sees your profile and how you present yourself.
            </p>
          </div>
          <div className="mb-6">
            <span className="bg-white text-[#630dff] font-bold px-4 py-2 rounded-xl text-sm shadow-md border border-white group-hover:bg-[#ad46ff] group-hover:text-white transition">
              Simplicity
            </span>
            <p className="text-white/90 text-base max-w-md leading-relaxed mt-2">
              We make job outreach simple, safe, and smart—so you can focus on preparing for interviews, not sending emails.
            </p>
          </div>
        </div>

        {/* RIGHT: CARD OR IMAGE */}
        <div className="flex-1 w-full max-w-md">
          <FlipMaskCard />
        </div>
      </div>
    </section>
  );
}
