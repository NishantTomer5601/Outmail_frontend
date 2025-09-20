"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link component
// Removed SVG logo import; using public folder image instead
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-gradient-to-l from-black via-[#6c00ff] to-black">
      <nav className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-2 text-2xl font-bold">
          <Image src="/Logo_Outmail.png" alt="Logo" width={40} height={40} />
          <span className="text-white">Outmail</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-white text-sm font-medium">
          <a href="/" className="hover:text-[#AD46FF] transition">Home</a>
          <a href="/Aboutus" className="hover:text-[#AD46FF] transition">About Us</a>
          <a href="/Pricing" className="hover:text-[#AD46FF] transition">Pricing</a>
          <a href="/Contactus" className="hover:text-[#AD46FF] transition">Contact Us</a>
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center">
          {/* Change a tag to Link component for client-side routing */}
          <Link
            href="/app-login"
            className="text-white bg-[#AD46FF] font-semibold rounded-full px-4 py-1.5 hover:bg-[#c289f0] transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu with Framer Motion for animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-sm z-50 flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col space-y-8 text-white text-xl font-medium">
              <a href="/" className="hover:text-[#AD46FF] transition text-center">Home</a>
              <a href="/Aboutus" className="hover:text-[#AD46FF] transition text-center">About Us</a>
              <a href="/Pricing" className="hover:text-[#AD46FF] transition text-center">Pricing</a>
              <a href="/Contactus" className="hover:text-[#AD46FF] transition text-center">Contact Us</a>
              
              {/* Change a tag to Link component for mobile menu */}
              <Link
                href="/app-login"
                className="text-center text-white bg-[#AD46FF] font-semibold rounded-full px-8 py-3 mt-4 hover:bg-[#c289f0] transition-colors"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;