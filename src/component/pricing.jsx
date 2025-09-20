import React from 'react';

export default function ZPricing() {
  const memberships = [
    {
      level: 'Starter Plan',
      title: '₹299/month',
      features: [
        'Up to 500 emails/month',
        'Store 1 resume + 1 email template',
        'Access to basic company database filters',
        'Campaign status tracking',
      ],
      buttonText: 'Start with Starter',
      description: 'Perfect for students and early job seekers.'
    },
    {
      level: 'Growth Plan',
      title: '₹799/month',
      features: [
        'Up to 2,000 emails/month',
        'Store 3 resumes + 3 templates',
        'Advanced filters: industry, size, funding stage, roles',
        'Priority campaign speed',
        'Email support',
      ],
      buttonText: 'Go Growth',
      description: 'Best for serious job hunters aiming for visibility at scale.'
    },
    {
      level: 'Pro Plan',
      title: '₹1,499/month',
      features: [
        'Up to 5,000 emails/month',
        'Unlimited resumes and templates',
        'Full database access + smart targeting',
        'Campaign analytics & performance reports',
        'Priority support + onboarding assistance',
      ],
      buttonText: 'Unlock Pro',
      description: 'Ideal for power users who want maximum reach and insights.'
    },
  ];

  return (
    <div className="text-white py-20 px-4 bg-gradient-to-l from-black via-[#6c00ff] to-black">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm font-medium text-indigo-300 uppercase tracking-wider mb-2">Subscription Plans</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">
          Simple, Affordable Plans for Every Job Seeker
        </h2>
        <p className="text-white/70 mb-12 max-w-2xl mx-auto">
          Choose the plan that fits your job search journey. Outmail helps you reach more companies, personalize your outreach, and boost your chances of landing interviews.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {memberships.map((plan, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-white p-8 text-left shadow-lg transition duration-300 bg-black hover:bg-[#5C1ED9] hover:-translate-y-1 hover:scale-105"
            >
              <span className="text-sm px-3 py-1 bg-white/10 rounded-full text-white/80 mb-4 inline-block">
                {plan.level}
              </span>
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-white/70 mb-6">
                {plan.description}
              </p>
              <ul className="mb-6 space-y-2 text-sm text-white/90">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#6c00ff] text-xl leading-4">•</span> {feature}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full text-center py-2 px-4 rounded-full font-medium bg-white text-black transition group-hover:bg-black group-hover:text-white`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
