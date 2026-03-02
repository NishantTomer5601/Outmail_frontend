"use client";

import Navbar from '@/component/Navbar';
import Hero from '@/component/Hero';
import React from 'react';
import AboutUs from '@/component/aboutuscontent';
import MissionValues from '@/component/visionmission';
import Footer from '@/component/Footer';
import Faq from '@/component/faq';
import Stickyscroll from '@/component/aboutusscroller';

function page() {
  return (
    <div>
      <Navbar />

      <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[4px] text-purple-400 font-medium mb-4">
            About Outmail
          </p>
          <h1 className="text-4xl sm:text-5xl font-syne font-semibold tracking-tight leading-tight mt-3 text-white">
            We Built the Unfair
            <br />
            <span className="bg-gradient-to-r from-[#b06cff] via-white to-[#b06cff] bg-clip-text text-transparent">
              Advantage You Deserved.
            </span>
          </h1>

          <p className="text-white/60 text-base sm:text-lg mt-6 leading-relaxed max-w-2xl mx-auto">
            The job market doesn&apos;t reward effort — it rewards visibility. Outmail was built to give every student and early-career professional a direct line to the people who actually make hiring decisions.
          </p>

          <div className="text-center mt-10">
            <button
              onClick={() => {
                const missionSection = document.getElementById('about-us');
                missionSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full border-2 border-white/30 text-white px-5 py-3 hover:bg-white hover:text-black transition duration-300"
            >
              ↓
            </button>
          </div>
        </div>
      </div>

      <div id="about-us"><AboutUs /></div>

      <div id="mission-values"><MissionValues /></div>

      <Faq />
      <Footer />
    </div>
  );
}

export default page;
