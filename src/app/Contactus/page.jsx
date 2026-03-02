"use client";

import Navbar from '@/component/Navbar'
import React from 'react'
import Footer from '@/component/Footer'
import GetInTouch from '@/component/getintouch'

function page() {
  return (
    <div>
      <Navbar/>

      {/* Hero */}
      <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black min-h-[60vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-16 text-center py-32">

          <p className="text-xs uppercase tracking-[4px] text-purple-400 font-medium mb-5">
            Contact &amp; Support
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Have a Question?
            <br />
            <span className="bg-gradient-to-r from-[#b06cff] via-white to-[#b06cff] bg-clip-text text-transparent">
              We&apos;re Here for You.
            </span>
          </h1>

          <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Whether you&apos;re a student with a question, a recruiter curious about partnerships,
            or a placement officer exploring campus plans &mdash; our team replies within 24 hours.
          </p>

          <button
            onClick={() => {
              document.getElementById('contact-us')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full border border-white/30 text-white px-5 py-3 hover:bg-white/10 transition duration-300"
          >
            &#8595;
          </button>

        </div>
      </div>

      {/* Form */}
      <div id="contact-us">
        <GetInTouch/>
      </div>

      <Footer/>
    </div>
  )
}

export default page
