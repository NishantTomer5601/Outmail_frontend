"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const emailSchema = z.string().email();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
    setEmail("");
    setTimeout(() => {
      setSubscribed(false);
    }, 1000);
  };

  return (
    <footer className="bg-gradient-to-l from-black via-[#6c00ff] to-black text-white px-6 pt-20 pb-10 relative">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2">
        
        {/* Left Column */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold mb-4">
            <Image src="/Logo_Outmail.png" alt="Outmail Logo" width={40} height={40} />
            <span className="text-white">Outmail</span>
          </div>

          <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
            Boost your job visibility 5x with Outmail. Automate personalized outreach, connect directly with recruiters, and get noticed in today’s crowded job market.
          </p>

          <ul className="flex flex-wrap gap-4 text-sm text-white/80">
            <li><a href="/Aboutus" className="hover:underline">About Us</a></li>
            <li><a href="/terms" className="hover:underline">Terms and Conditions</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/faq" className="hover:underline">FAQ</a></li>
            <li><a href="/contactus" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
          <p className="text-sm text-white/60 mb-4">
            Join our newsletter for job search tips, product updates, and exclusive offers from Outmail.
          </p>

          <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              aria-label="Email address"
              className="px-5 py-3 rounded-full text-white w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white border border-amber-50"
            />
            <button
              type="submit"
              className={`px-6 py-3 rounded-full font-semibold transition duration-200 relative overflow-hidden focus:outline-none
                ${subscribed
                  ? 'animate-pop bg-gradient-to-r from-[#6c00ff] via-[#a100ff] to-[#6c00ff] text-white scale-110 shadow-lg'
                  : 'bg-white text-black hover:bg-gray-200'}
              `}
              disabled={subscribed}
            >
              {subscribed ? (
                <span className="animate-pop">Subscribed!</span>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
          {error && (
            <p className="text-red-400 mt-2 text-sm">{error}</p>
          )}
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/50">
        <p>© {new Date().getFullYear()} Outmail. All rights reserved.</p>

      </div>
    </footer>
  );
}

// Add this to your global CSS (e.g. src/app/globals.css):
/*
.animate-pop {
  animation: pop-burst 0.4s cubic-bezier(.68,-0.55,.27,1.55);
}
@keyframes pop-burst {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
*/
