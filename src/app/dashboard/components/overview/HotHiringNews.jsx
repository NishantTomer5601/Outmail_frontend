import React from "react";
import { Zap, ExternalLink } from "lucide-react";

const HotHiringNews = () => {
  const news = [
    {
      id: 1,
      headline: 'OpenAI plans to triple engineering headcount in 2026',
      source: 'TechCrunch',
      tag: 'AI Hiring',
      tagColor: 'bg-purple-500/20 text-purple-300',
      time: '2h ago',
      url: 'https://techcrunch.com/2024/01/16/openai-hiring/',
    },
    {
      id: 2,
      headline: 'Stripe doubles down on India with 400 new roles in Bangalore',
      source: 'Economic Times',
      tag: 'FinTech',
      tagColor: 'bg-green-500/20 text-green-300',
      time: '5h ago',
      url: 'https://economictimes.indiatimes.com/tech/startups/stripe-india-hiring',
    },
    {
      id: 3,
      headline: 'Google lays off 200 in cloud, pivots to AI infrastructure roles',
      source: 'Bloomberg',
      tag: 'Big Tech',
      tagColor: 'bg-red-500/20 text-red-300',
      time: '8h ago',
      url: 'https://bloomberg.com/news/articles/2024-google-cloud-layoffs',
    },
    {
      id: 4,
      headline: 'Y Combinator startups on hiring spree — 1,200 roles open across W25 batch',
      source: 'YC Blog',
      tag: 'Startup',
      tagColor: 'bg-amber-500/20 text-amber-300',
      time: '1d ago',
      url: 'https://ycombinator.com/jobs',
    },
    {
      id: 5,
      headline: 'Razorpay seeks ML engineers as it expands into SEA markets',
      source: 'Inc42',
      tag: 'FinTech',
      tagColor: 'bg-green-500/20 text-green-300',
      time: '1d ago',
      url: 'https://inc42.com/buzz/razorpay-ml-expansion/',
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
            <Zap size={13} className="text-yellow-400" />
            Hot in the Hiring Market
          </h3>
          <p className="text-[11px] text-white/40">Click any article to read more</p>
        </div>
        <span className="text-[9px] uppercase tracking-widest text-white/30 border border-white/10 px-1.5 py-0.5 rounded">Live</span>
      </div>
      <div className="flex flex-col gap-0 flex-1 overflow-hidden">
        {news.map((item, i) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-start gap-2.5 py-2.5 ${
              i < news.length - 1 ? 'border-b border-white/5' : ''
            } group cursor-pointer`}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-white/90 leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
                {item.headline}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${item.tagColor}`}>{item.tag}</span>
                <span className="text-[10px] text-white/35">{item.source}</span>
                <span className="text-[10px] text-white/25">·</span>
                <span className="text-[10px] text-white/35">{item.time}</span>
              </div>
            </div>
            <ExternalLink size={11} className="text-white/20 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-1" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default HotHiringNews;