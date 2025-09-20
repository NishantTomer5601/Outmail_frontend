"use client";

import Navbar from '@/component/Navbar'
import Hero from '@/component/Hero'
import React from 'react'
import Partners from '@/component/Partners'
import Faq from '@/component/faq'
import Footer from '@/component/Footer'
import GetInTouch from '@/component/getintouch'



function page() {
  return (
    <div>
      <Navbar/>

      <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black ">   
      

      <div className="container mx-auto px-4 text-center">
        <div className="inline-block  px-4 py-1 border-white/30 rounded-md">

        </div>

        <h1 className="text-4xl sm:text-5xl px-4  font-syne font-bold tracking-wide mt-25">
          Get in Touch with Outmail
        </h1>
        <p className="text-[#C0C0C0] text-base sm:text-lg mt-6 mb-25 leading-relaxed">
          Have a question, feedback, or need help with your job search journey? Fill out the form below and our team will get back to you as soon as possible. We’re here to help you get noticed and land more interviews!
        </p>

        <div className="text-center -mt-10">
            <button
              onClick={() => {
                const missionSection = document.getElementById('contact-us');
                missionSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-full border-2 border-white text-white px-5 py-3 hover:bg-white hover:text-black transition duration-300"
            >
              ↓
            </button>
          </div>



      



      </div>
      </div>
    <div id="contact-us"> <GetInTouch/></div> 

      {/* <Partners/> */}

      {/* <Faq/> */}
      <Footer/>


    </div>
  )
}

export default page
