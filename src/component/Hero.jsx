import React from 'react';
import StackingCards from './stackcards';
import WrapButton from './ui/wrap-button';

function Hero() {
  return (
    <div className="bg-gradient-to-l from-black via-[#6c00ff] to-black">
      {/* Hero text block — 52vh leaves ~48vh showing the first card */}
      <div className="h-[52vh] flex flex-col justify-center pt-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-syne font-semibold tracking-tight leading-snug bg-gradient-to-r from-[#b06cff] via-white to-[#b06cff] bg-clip-text text-transparent">
            Where Smart Outreach Meets Real Opportunities and Expert Mentorship.
          </h1>

          <div className="mt-8 flex items-center justify-center gap-6">
            <WrapButton />
            <button className="text-white/80 font-medium text-sm hover:text-[#b06cff] transition-colors duration-200">
              Watch Demo →
            </button>
          </div>
        </div>
      </div>

      {/* Stacking cards — first card visible on initial load */}
      <StackingCards />
    </div>
  );
}

export default Hero;
