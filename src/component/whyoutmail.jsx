'use client';
import React from 'react';

const problems = [
  {
    icon: '👻',
    problem: '"You apply. They ghost. Repeat."',
    twist: "You're not being ignored — you're invisible.",
    solution:
      'Outmail makes you proactive. Reach recruiters directly, before a job post even goes live.',
  },
  {
    icon: '💀',
    problem: '"Your resume dies in the ATS."',
    twist: 'Job portals work for companies, not you.',
    solution:
      "Outmail works for you. Cold email bypasses ATS entirely and lands straight in a recruiter's personal inbox.",
  },
  {
    icon: '🎯',
    problem: '"Everyone applies. Nobody stands out."',
    twist: 'A cold email with context beats 300 portal submissions every time.',
    solution:
      'Outmail personalises every outreach with live hiring signals — so you arrive as a person, not a PDF.',
  },
];

export default function WhyOutmail() {
  return (
    <section className="bg-gradient-to-l from-black via-[#6c00ff] to-black py-24 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[4px] text-purple-400 font-medium">
            Why Visibility Matters
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-syne font-semibold text-white leading-tight">
            Most Resumes Never Get Seen.
            <br />
            <span className="bg-gradient-to-r from-[#b06cff] via-white to-[#b06cff] bg-clip-text text-transparent">
              Outmail Changes That.
            </span>
          </h2>
        </div>

        {/* 3 Problem → Twist cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((item, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 flex flex-col gap-6 hover:border-purple-500/50 transition-all duration-300"
            >
              {/* Problem */}
              <div>
                <span className="text-4xl mb-5 block">{item.icon}</span>
                <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {item.problem}
                </p>
              </div>

              {/* Animated underline divider */}
              <div className="w-10 h-[2px] bg-purple-500/60 group-hover:w-full transition-all duration-500 rounded-full" />

              {/* Twist + Solution */}
              <div>
                <p className="text-purple-300 font-semibold text-sm mb-2">{item.twist}</p>
                <p className="text-white/60 text-sm leading-relaxed">{item.solution}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
