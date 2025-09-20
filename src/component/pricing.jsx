import React from 'react';

export default function ZPricing() {
  const memberships = [
    {
      level: 'Starter Plan',
      title: 'FREE',
      features: [
        'Send Up to 100 emails',
        'Store 3 resume + 3 email template',
        'Access to basic/fixed 100 company outreach',
        'Campaign status tracking',
      ],
      buttonText: 'Start with Starter',
      description: 'A perfect way to try Outmail and kickstart your job outreach journey.'
    },
    {
      level: 'Growth Plan',
      title: '₹129/month  (billed annually)',
      features: [
        'Send Up to 1,000+ emails/month',
        'Store 3 resumes + 3 templates',
        'Smart Company Targeting based on hiring trends',
        'Campaign analytics & performance reports',
        'Email support',
      ],
      buttonText: 'Go Growth',
      description: 'Unlock higher outreach power and advanced tools to maximize your job visibility.'
    },
    {
      level: 'Campus Plan',
      title: '₹1,499/month',
      features: [
        'Bulk student accounts under one license',
        'Admin dashboard for placement officers',
        'Full database access + smart targeting',
        'Campaign analytics & performance reports',
        'Priority support + onboarding assistance',
        'Shared company database for all students'
      ],
      buttonText: 'Contact Sales',
      description: 'Ideal for power users who want maximum reach and insights.'
    },
  ];

  return (
    <div className="text-white py-20 px-4 bg-gradient-to-l from-black via-[#6c00ff] to-black">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm font-medium text-indigo-300 uppercase tracking-wider mb-2">Subscription Plans</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tighter">
          Affordable Plans Designed to Maximize Your Job Visibility
        </h2>
        <p className="text-white/70 mb-12 max-w-2xl mx-auto">
          Outmail makes professional outreach simple and accessible. Choose a plan that matches your stage of job hunting—from first applications to advanced campaigns—and start connecting directly with recruiters.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {memberships.map((plan, idx) => (
            <div
              key={idx}
              className="group rounded-2xl border border-white p-8 text-left shadow-lg transition duration-300 bg-black hover:-translate-y-1 hover:scale-105 flex flex-col justify-between h-[480px]"
            >
              <span className="text-sm px-3 py-1 bg-white/10 rounded-full text-white/80 mb-4 inline-block">
                {plan.level}
              </span>
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-white/70 mb-6">
                {plan.description}
              </p>
              <ul className="mb-6 space-y-2 text-base text-white/90 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#6c00ff] text-xl leading-4">•</span> {feature}
                    </li>
                  ))}
              </ul>
              <a
                href="#" // Replace with actual link or action
                className="w-full block text-center py-2 px-4 rounded-full font-medium bg-white text-black shadow-lg transition hover:bg-gray-100"
                role="button"
                tabIndex={0}
              >
                {plan.buttonText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
