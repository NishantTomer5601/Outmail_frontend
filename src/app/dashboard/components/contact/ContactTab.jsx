import React, { useState } from "react";
import { Zap, Mail, Settings, CreditCard, Clock, Check } from "lucide-react";

const ContactForm = () => {
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPopup(true);
    setMessage("");
  };

  return (
    <div className="flex-1 space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl border border-white/20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Get In Touch
        </h2>

        <p className="text-white/70 mb-6 leading-relaxed text-sm">
          Have a question, found a bug, or want to explore a partnership? We’d love to hear from you. Fill in your message and our team will get back to you promptly.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-start gap-2.5">
            <Check size={15} className="text-purple-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/60 text-xs">All support requests are triaged within 2 business hours.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <Check size={15} className="text-purple-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/60 text-xs">For urgent technical issues, reach us directly at <a href="mailto:support@outmail.in" className="text-purple-400 hover:underline">support@outmail.in</a>.</p>
          </div>
          <div className="flex items-start gap-2.5">
            <Check size={15} className="text-purple-400 mt-0.5 flex-shrink-0" />
            <p className="text-white/60 text-xs">Partnership and enterprise enquiries are handled by our growth team.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Your Message
            </label>
            <textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none placeholder-gray-300"
              rows={5}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {showPopup && (
        <div className="fixed top-5 right-5 bg-purple-600 text-white px-4 py-2 rounded shadow-lg animate-fadeIn">
          We will get back to you in 24 hours.
        </div>
      )}
    </div>
  );
};

const ContactTab = () => {
  return (
    <div className="p-6 sm:p-8 font-syne text-white">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h1 className="text-2xl sm:text-3xl font-bold">Contact Us</h1>
          <span className="flex items-center gap-1.5 text-xs bg-green-500/15 border border-green-500/25 text-green-400 px-3 py-1 rounded-full font-medium">
            <Zap size={11} />
            We typically reply in &lt; 2 hours
          </span>
        </div>
        <p className="text-white/50 text-sm">Choose a support category or send us a message directly.</p>
      </div>

      <div className="max-w-6xl w-full bg-white/10 backdrop-blur-md shadow-lg border border-white/30 rounded-xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 flex flex-col gap-4">
          {[
            {
              icon: Mail,
              color: 'text-purple-400',
              bg: 'bg-purple-500/15 border-purple-500/25',
              title: 'General Enquiries',
              desc: 'Questions about features, onboarding, or anything else about Outmail.',
              email: 'hello@outmail.in',
            },
            {
              icon: Settings,
              color: 'text-cyan-400',
              bg: 'bg-cyan-500/15 border-cyan-500/25',
              title: 'Technical Support',
              desc: 'Issues with email sending, templates, attachments, or integrations.',
              email: 'support@outmail.in',
            },
            {
              icon: CreditCard,
              color: 'text-amber-400',
              bg: 'bg-amber-500/15 border-amber-500/25',
              title: 'Billing & Plans',
              desc: 'Subscription queries, invoices, refunds, or plan upgrades.',
              email: 'billing@outmail.in',
            },
          ].map((cat) => (
            <div
              key={cat.title}
              className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/25 transition-colors"
            >
              <div className={`p-2.5 rounded-lg border flex-shrink-0 ${cat.bg}`}>
                <cat.icon size={18} className={cat.color} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-white text-sm">{cat.title}</p>
                <p className="text-xs text-white/45 mt-0.5 mb-2 leading-relaxed">{cat.desc}</p>
                <a
                  href={`mailto:${cat.email}`}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {cat.email}
                </a>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <Clock size={15} className="text-white/35 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-white">Business Hours</p>
              <p className="text-xs text-white/45">Monday – Friday &nbsp;·&nbsp; 9 AM – 6 PM IST</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
};

export default ContactTab;