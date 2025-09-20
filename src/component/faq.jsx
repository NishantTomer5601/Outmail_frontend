'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/component/ui/badge';
import { MinusIcon, PlusIcon } from 'lucide-react';

const faqItems = [
  {
    id: '1',
    question: 'What is Outmail?',
    answer:
      'Outmail is a simple yet powerful tool for students, fresh graduates, and job seekers to boost their job visibility by automating personalized email outreach directly to recruiters.',
    category: 'general',
  },
  {
    id: '2',
    question: 'How does Outmail work?',
    answer:
      'Connect your Gmail, upload your resumes and templates, choose your target companies, and launch a campaign. Outmail sends personalized emails on your behalf, safely and efficiently.',
    category: 'general',
  },
  {
    id: '3',
    question: 'Can I personalize my emails?',
    answer:
      'Yes! You can upload multiple resumes and templates, and Outmail lets you tailor each campaign for different companies and roles.',
    category: 'technical',
  },
  {
    id: '4',
    question: 'Is my Gmail safe?',
    answer:
      'Absolutely. Outmail uses secure OAuth for Gmail connection, throttles sending to safe limits, and never stores your emails or shares your data.',
    category: 'technical',
  },
  {
    id: '5',
    question: 'What happens to my contact lists?',
    answer:
      'Your uploaded CSV contacts are deleted automatically after each campaign for your privacy and security.',
    category: 'privacy',
  },
  {
    id: '6',
    question: 'How many emails can I send?',
    answer:
      'Depending on your plan, you can send up to 500, 2,000, or 5,000 emails per month. Outmail enforces hourly and daily limits to keep your Gmail safe.',
    category: 'pricing',
  },
  {
    id: '7',
    question: 'Does Outmail guarantee a job?',
    answer:
      'No tool can guarantee a job, but Outmail guarantees your application will be seen by more recruiters, increasing your chances of landing interviews.',
    category: 'general',
  },
  {
    id: '8',
    question: 'Can I track my campaign status?',
    answer:
      'Yes, you can track the status of your campaigns and see which emails have been sent from your dashboard.',
    category: 'support',
  },
];

const categories = [
  { id: 'all', label: 'All' },
  { id: 'general', label: 'General' },
  { id: 'technical', label: 'Technical' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'support', label: 'Support' },
];

export default function Faq2() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const filteredFaqs =
    activeCategory === 'all'
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="min-h-screen bg-white text-black font-syne py-16 pb-24 bg-gradient-to-l from-black via-[#6c00ff] to-black">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 flex flex-col items-center">
          <Badge
            variant="outline"
            className="border-primary mb-4 px-10 py-1 text-xl font-medium tracking-wider uppercase"
          >
            FAQ&rsquo;s
          </Badge>

          <h2 className="mb-6 text-center text-4xl font-bold tracking-tight md:text-5xl text-white">
            Frequently Asked Questions
          </h2>

          <p className="max-w-2xl text-center text-white">
            Learn how Outmail helps you get noticed, connect directly with recruiters, and boost your job search success.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                activeCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              )}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className={cn(
                'border border-gray-200 bg-white shadow-md h-fit overflow-hidden rounded-xl',
                expandedId === faq.id ? 'shadow-lg' : ''
              )}
              style={{ minHeight: '88px' }}
            >
              <button
                onClick={() => toggleExpand(faq.id)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <div className="ml-4 flex-shrink-0">
                  {expandedId === faq.id ? (
                    <MinusIcon className="text-primary h-5 w-5" />
                  ) : (
                    <PlusIcon className="text-primary h-5 w-5" />
                  )}
                </div>
              </button>

              {expandedId === faq.id && (
                <div className="border-t border-gray-200 px-6 pt-2 pb-6">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="mb-4 text-white">Can’t find what you’re looking for?</p>
          <a
            href="/Contactus"
            className="px-4 py-3 bg-white text-black font-extrabold rounded-xl hover:bg-[#dbddd2] border-amber-100 transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
