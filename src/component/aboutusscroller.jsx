'use client';
import Image from 'next/image';

const painPoints = [
  {
    num: '01',
    heading: 'You apply. You wait. You get ghosted.',
    body: "Hundreds of candidates hit the same job portal within hours of a posting. Your resume gets filtered by an algorithm before a single human ever reads it. The system is not broken — it was just never built for you.",
  },
  {
    num: '02',
    heading: 'The best roles never get posted publicly.',
    body: "Over 70% of jobs are filled through direct conversations, referrals, and proactive outreach — before they ever appear on LinkedIn or Naukri. If you're only applying to posted jobs, you're competing in the most crowded lane.",
  },
  {
    num: '03',
    heading: 'Nobody teaches you how to actually get a job.',
    body: "Colleges prepare you for exams. Nobody prepares you for cold emails, recruiter conversations, or how to position yourself in a market that moves faster than any syllabus.",
  },
];

const solutions = [
  {
    src: '/ColdOutreachAI_image.png',
    alt: 'Smart Cold Outreach Dashboard',
    heading: 'Reach recruiters before everyone else does.',
    body: 'Outmail surfaces real recruiter contacts tied to live hiring signals — funding rounds, headcount growth, new job postings. Your personalised email lands in their inbox directly, not lost in a portal queue.',
  },
  {
    src: '/JobAggregationAI_image.png',
    alt: 'Curated Job Openings',
    heading: 'See the hidden job market, ranked by urgency.',
    body: 'Our job intelligence feed curates roles by Outmail Priority Score — combining hiring urgency, company momentum, and funding stage. You act on signals, not stale listings.',
  },
  {
    src: '/MentorshipAI_image.png',
    alt: 'Expert Mentorship',
    heading: "Learn from people who’ve cracked it already.",
    body: 'Book sessions with professionals and alumni across industries. Get your resume reviewed, your outreach strategy sharpened, and your confidence backed by real-world experience.',
  },
];

export default function AboutUsScroller() {
  return (
    <main className="bg-[#0a0b14]">

      {/* SECTION 1: Pain Points — sticky left text, images scroll right */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left — sticky */}
          <div className="sticky top-0 h-screen flex flex-col justify-center px-8 lg:px-16">
            <p className="text-xs uppercase tracking-[4px] text-purple-400 font-medium mb-4">The Reality</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-8">
              Why Smart People
              <br />
              <span className="bg-gradient-to-r from-[#b06cff] via-white to-[#b06cff] bg-clip-text text-transparent">
                Still Don&apos;t Get Hired.
              </span>
            </h2>
            <div className="flex flex-col gap-7">
              {painPoints.map((p) => (
                <div key={p.num} className="flex items-start gap-4">
                  <span className="text-purple-400 font-bold text-sm mt-1 min-w-[24px]">{p.num}</span>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1">{p.heading}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — product images scroll up */}
          <div className="flex flex-col gap-8 py-24 px-6 items-center">
            {solutions.map((s) => (
              <figure key={s.src} className="w-full max-w-md rounded-2xl overflow-hidden border border-purple-500/30 shadow-lg">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={600}
                  height={380}
                  className="w-full h-auto object-cover object-top"
                />
              </figure>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: How Outmail Solves It — images sticky left, text scrolls right */}
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Left — each image stacks sticky */}
          <div className="flex flex-col">
            {solutions.map((s) => (
              <div key={s.src} className="sticky top-0 h-screen flex items-center justify-center px-8">
                <figure className="w-full max-w-md rounded-2xl overflow-hidden border border-purple-500/30 shadow-lg">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={600}
                    height={380}
                    className="w-full h-auto object-cover object-top"
                  />
                </figure>
              </div>
            ))}
          </div>

          {/* Right — solution text scrolls */}
          <div className="flex flex-col">
            {solutions.map((s, i) => (
              <div key={i} className="h-screen flex flex-col justify-center px-8 lg:px-16">
                <p className="text-xs uppercase tracking-[4px] text-purple-400 font-medium mb-4">How Outmail Solves It</p>
                <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                  <span className="bg-gradient-to-r from-[#b06cff] via-white to-[#b06cff] bg-clip-text text-transparent">
                    {s.heading}
                  </span>
                </h3>
                <p className="text-white/60 text-base leading-relaxed max-w-lg">{s.body}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  );
}
