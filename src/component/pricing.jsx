import React from 'react';

const plans = [
  {
    badge: 'Plan A',
    title: 'Smart Cold Outreach',
    tagline: 'Direct recruiter reach, at scale.',
    description:
      'For organisations that want to put their candidates directly in front of the right recruiters — bypassing ATS filters with personalised, signal-driven cold email campaigns.',
    features: [
      'Automated personalised cold email outreach',
      'Live hiring signal targeting (funding, headcount, job postings)',
      'Smart company database with priority scoring',
      'Multiple customisable email templates',
      'Campaign scheduling, throttling & safe sending',
      'Campaign analytics & performance reports',
    ],
    cta: 'Book a Call',
    highlight: false,
  },
  {
    badge: 'Plan B',
    title: 'Outreach + Job Intelligence',
    tagline: 'Everything in Plan A, plus curated job visibility.',
    description:
      'For organisations that want to combine direct recruiter outreach with a curated, signal-ranked job feed — so candidates can act on the right opportunities at exactly the right time.',
    features: [
      'Everything in Plan A',
      'Curated job openings ranked by Outmail Priority Score',
      'Hiring urgency & company momentum signals',
      'Funding & growth-stage filters',
      'Job bookmarking & application tracking',
      'Dedicated account support',
    ],
    cta: 'Book a Call',
    highlight: true,
  },
  {
    badge: 'Plan C',
    title: 'Custom Suite',
    tagline: 'Your tools, your combination.',
    description:
      'For organisations with specific needs. Pick any combination of cold outreach, job intelligence, and expert mentorship sessions — or request a fully tailored setup. Let\'s talk.',
    features: [
      'Choose any combination of Plan A & Plan B features',
      'Expert mentorship session access for candidates',
      'Bulk account management & admin dashboard',
      'Placement officer controls & reporting',
      'Custom integrations & onboarding assistance',
      'Priority support with dedicated account manager',
    ],
    cta: 'Get a Custom Quote',
    highlight: false,
  },
];

export default function ZPricing() {
  return (
    <div className="text-white py-20 px-4 bg-gradient-to-l from-black via-[#6c00ff] to-black">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm font-medium text-indigo-300 uppercase tracking-[4px] mb-3">
          Subscription Plans
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">
          Flexible Plans Built Around Your Organisation
        </h2>
        <p className="text-white/60 mb-12 max-w-2xl mx-auto text-base">
          No fixed price tags — every organisation is different. Pick the plan that matches your goals, and we&apos;ll work out the right arrangement on a call.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-8 text-left flex flex-col justify-between transition-all duration-300 hover:-translate-y-1
                ${plan.highlight
                  ? 'bg-[#0d0d0d] border-2 border-purple-500 shadow-[0_0_32px_rgba(108,0,255,0.25)]'
                  : 'bg-[#0d0d0d] border border-white/15 hover:border-purple-500/40'
                }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[3px] bg-purple-600 text-white px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              {/* Header */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-[3px] text-purple-400 font-medium">
                  {plan.badge}
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 mb-1">{plan.title}</h3>
                <p className="text-purple-300 text-sm font-medium mb-3">{plan.tagline}</p>
                <p className="text-white/55 text-sm leading-relaxed">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-purple-600/50 border border-purple-500/60 flex items-center justify-center text-[10px] text-purple-300">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className={`w-full block text-center py-3 px-4 rounded-full font-semibold text-sm transition-all duration-200
                  ${plan.highlight
                    ? 'bg-white text-black hover:bg-gray-100'
                    : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                role="button"
              >
                {plan.cta} →
              </a>
            </div>
          ))}
        </div>

        <p className="text-white/35 text-xs mt-10">
          All plans are discussed and scoped on a discovery call. No credit card required to connect.
        </p>
      </div>
    </div>
  );
}
