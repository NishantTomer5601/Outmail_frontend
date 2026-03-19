"use client";

import Navbar from '@/component/Navbar';
import Hero from '@/component/Hero';
import React from 'react';
import AboutUs from '@/component/aboutuscontent';
import MissionValues from '@/component/visionmission';
import Footer from '@/component/Footer';
import Faq from '@/component/faq';
import Stickyscroll from '@/component/aboutusscroller';
import { motion } from 'framer-motion';

function page() {
  return (
    <div className="min-h-screen bg-[#0a0b14] text-white">
      <Navbar variant="dark" />

      <div className="relative overflow-hidden py-24">
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-xs uppercase tracking-[4px] text-[#AD46FF] font-medium mb-4">
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
              className="rounded-full border border-white/20 bg-white/5 text-white px-5 py-3 hover:bg-white/10 transition duration-300"
            >
              ↓
            </button>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-[10%] w-36 h-36 rounded-2xl border border-white/10 bg-[#6c00ff]/20 rotate-12 blur-[1px]"
        />
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-[12%] w-20 h-20 rounded-full border border-white/15 bg-[#ad46ff]/20"
        />
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-[20%] w-24 h-24 rounded-lg border border-white/10 bg-[#2f1a7a]/40 -rotate-12"
        />
      </div>

      <div id="about-us"><AboutUs /></div>

      <div id="mission-values"><MissionValues /></div>

      <Faq />
      <Footer variant="dark" />
    </div>
  );
}

export default page;
