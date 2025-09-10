import React from 'react';
import AboutUs from '@/component/aboutuscontent';
import { HeroScrollDemo } from './heroscroll';
import StackingCards from './stackcards';
import { DotBackgroundDemo } from './dot';
import WrapButton from './ui/wrap-button';

function Hero() {
  return (
    <div>
    <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block px-4 py-1 rounded-md">
          <span className="text-[#C0C0C0] hover:text-purple-400 transition font-syne text-base">
            Boost Your Job Visibility 3x with Smarter Outreach
          </span>
        </div>

        <h1 className="text-4xl text-white sm:text-5xl font-syne font-bold tracking-wide mt-6">
          Welcome to OutMail 🚀
        </h1>
        <h2 className="text-2xl text-white sm:text-3xl font-syne font-semibold tracking-wide mt-4">
          The easiest way for students, fresh graduates, and job seekers to get noticed by top companies.
        </h2>

        <p className="text-[#C0C0C0] text-base sm:text-lg mt-6 leading-relaxed max-w-2xl mx-auto">
          OutMail helps you stand out in a crowded job market by automating personalized email outreach directly to recruiters. No more resumes lost in portals—connect with the right companies, at the right time, with the right message.
        </p>

        <div className="mt-8">
          <div className="relative z-10 flex items-center justify-center space-x-4">
            {/* Get Started / WrapButton */}
            <button className="h-[50px] px-6 text-black font-extrabold rounded-full transition flex items-center">
              <WrapButton />
            </button>

            {/* Watch Demo */}
            <button className="h-[50px] px-6 bg-transparent border border-white text-white font-bold rounded-full hover:text-[#AD46FF] transition flex items-center">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
      {/* <HeroScrollDemo /> */}
     <div className='  
   -mt-10   /* small overlap for mobile */
    sm:-mt-14
    md:-mt-20
    lg:-mt-28
    xl:-mt-36  /* not too aggressive */



  
   bg-gradient-to-l from-black via-[#6c00ff] to-black '><StackingCards/></div> 
     
    </div>


   
  );
}

export default Hero;
