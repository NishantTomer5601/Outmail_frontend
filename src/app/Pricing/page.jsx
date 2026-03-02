"use client";
import Navbar from '@/component/Navbar'
import Hero from '@/component/Hero'
import React from 'react'
import AboutUs from '@/component/aboutuscontent'
import Pricing from '@/component/pricing'
import Footer from '@/component/Footer'
import Faq from '@/component/faq'
import Testimonials from '@/component/Testimonials'
import MembershipBenefits from '@/component/membershipbenefits'

function page() {
  return (
    <div>
      <Navbar/>

      <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black py-20">   
      

      <div className="container mx-auto px-4 text-center">
        <p className="text-xs uppercase tracking-[4px] text-purple-400 font-medium mb-4">
          Subscription Plans
        </p>

        <h1 className="text-4xl sm:text-5xl font-syne font-semibold tracking-tight leading-tight mt-3 text-white">
          Flexible Plans Built
          <br />
          <span className="bg-gradient-to-r from-[#b06cff] via-white to-[#b06cff] bg-clip-text text-transparent">
            Around Your Organisation.
          </span>
        </h1>

        <p className="text-white/60 text-base sm:text-lg mt-6 leading-relaxed max-w-2xl mx-auto">
          No fixed price tags — every organisation is different. Pick the plan that fits your goals and we&apos;ll work out the right arrangement on a call.
        </p>

        <div className="text-center mt-10">
          <button
            onClick={() => {
              const missionSection = document.getElementById('pricing');
              missionSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="rounded-full border-2 border-white/30 text-white px-5 py-3 hover:bg-white hover:text-black transition duration-300"
          >
            ↓
          </button>
        </div>

      </div>
      </div>
      <div id="pricing"><MembershipBenefits/></div>
      <div><Pricing/></div>
      
      <Testimonials/>
      <Faq/>
      <Footer/>

    </div>
  )
}

export default page
