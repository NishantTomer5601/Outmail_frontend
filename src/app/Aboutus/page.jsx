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
          <h1 className="text-4xl sm:text-5xl font-syne font-bold tracking-wide mt-6">
            About Us
          </h1>

          <p className="text-[#C0C0C0] text-base sm:text-lg mt-6 leading-relaxed">
            Automate your job search, create stunning resumes, and track every application —
            <br />
            <span className="block mt-2">all in one place.</span>
          </p>

          <div className="text-center mt-10">
            <button
              onClick={() => {
                const missionSection = document.getElementById('about-us');
                missionSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full border-2 border-white text-white px-5 py-3 hover:bg-white hover:text-black transition duration-300"
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
