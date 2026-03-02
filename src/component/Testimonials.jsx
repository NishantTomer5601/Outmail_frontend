import React from 'react';
import { StaggerTestimonials } from './ui/stagger-testimonials';

export default function Testimonials() {
  return (
    <div className="text-white px-4 py-20 bg-gradient-to-l from-black via-[#6c00ff] to-black">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[4px] text-purple-400 font-medium mb-3">
          Student Stories
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Real Students. Real Results.
        </h2>
        <p className="text-white/55 max-w-xl mx-auto text-sm mb-12">
          From cold outreach campaigns to mentorship sessions — here&apos;s what students across India are saying about Outmail.
        </p>

        <StaggerTestimonials />
      </div>
    </div>
  );
}
