
import React from 'react';
import StackingCards from './stackcards';

const MembershipBenefits = () => {
  return (
    <section className=" bg-gradient-to-l from-black via-[#6c00ff] to-black  py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section - Text Content */}
        <div className="flex flex-col justify-center">
          <p className="text-white uppercase tracking-wide font-semibold mb-2">Why Outmail Membership?</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Unlock More Visibility, More Interviews, More Success
          </h2>
          <p className="text-lg text-white mb-8">
            Outmail membership gives you the tools to reach more recruiters, personalize your outreach, and protect your privacy—so you can focus on landing your next job.
          </p>

          {/* Benefit List */}
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg className="h-6 w-6 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-xl font-medium text-white">Reach 3x more companies with automated outreach</span>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-xl font-medium text-white">Personalize every email with multiple resumes and templates</span>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-xl font-medium text-white">Protect your privacy—contacts deleted after each campaign</span>
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-xl font-medium text-white">Track your campaign status and results in real time</span>
            </li>
          </ul>
        </div>

        {/* Right Section - Placeholder Box */}
        <div className="bg-[#5C1ED9] rounded-2xl w-full h-96 lg:h-[500px] shadow-lg flex items-center justify-center">
        

          {/* You can place an image or more complex content here */}
          {/* <p className="text-white text-2xl font-bold">Placeholder for Image/Content</p> */}
        </div>

      </div>
    </section>
  );
};

export default MembershipBenefits;