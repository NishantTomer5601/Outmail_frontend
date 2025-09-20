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
        <h2 className="text-2xl sm:text-5xl font-syne font-semibold tracking-wide mt-4 bg-gradient-to-r from-[#6c00ff] to-white bg-clip-text text-transparent drop-shadow-lg">
          Stand Out. Get Noticed. Land Jobs Faster.
        </h2>

        <p className="text-2xl sm:text-3xl font-syne font-semibold tracking-wide mt-4 bg-gradient-to-r from-white to-[#6c00ff] bg-clip-text text-transparent drop-shadow-lg">
          Boost Your Job Visibility 5x with Smarter Outreach
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
