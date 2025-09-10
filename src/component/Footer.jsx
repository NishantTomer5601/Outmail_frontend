import React from 'react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-l from-black via-[#6c00ff] to-black text-white px-6 pt-20 pb-10 relative">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2">
        
        {/* Left Column */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold mb-4">
            <Image src="/Logo_Outmail.png" alt="OutMail Logo" width={40} height={40} />
            <span className="text-white">OUTMAIL</span>
          </div>

          <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
            Boost your job visibility 3x with OutMail. Automate personalized outreach, connect directly with recruiters, and get noticed in today’s crowded job market.
          </p>

          <ul className="flex flex-wrap gap-4 text-sm text-white/80">
            <li><a href="/Aboutus" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Products</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Stay Connected</h3>
          <p className="text-sm text-white/60 mb-4">
            Join our newsletter for job search tips, product updates, and exclusive offers from OutMail.
          </p>

          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="px-5 py-3 rounded-full text-white w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white placeholder:text-white border border-amber-50"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/50">
        <p>© {new Date().getFullYear()} OUTMAIL. All rights reserved.</p>

      </div>
    </footer>
  );

  
}
