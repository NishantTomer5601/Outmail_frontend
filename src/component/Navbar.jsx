"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

function Navbar({ variant = "gradient" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, loading, logout } = useAuth();

  const isDark = variant === "dark";

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header
      className={`w-full ${
        isDark
          ? "sticky top-0 z-50 border-b border-white/10 bg-[#0a0b14]/70 backdrop-blur-xl"
          : "bg-gradient-to-l from-black via-[#6c00ff] to-black"
      }`}
    >
      <nav className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
          <Image src="/logo-nav.png" alt="Logo" width={40} height={40} />
          <span className="text-white font-satisfy text-2xl">Outmail</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-white text-lg font-medium">
          <Link href="/" className="hover:text-[#AD46FF] transition">Home</Link>
          <Link href="/Features" className="hover:text-[#AD46FF] transition">Features</Link>
          <Link href="/Pricing" className="hover:text-[#AD46FF] transition">Pricing</Link>
          <Link href="/Contactus" className="hover:text-[#AD46FF] transition">Contact Us</Link>
          <Link href="/partnership" className="hover:text-[#AD46FF] transition">Partnership</Link>
        </div>

        {/* User Section - Desktop */}
        <div className="hidden md:flex items-center">
          {loading ? (
            <div className="animate-pulse bg-white/20 rounded-full px-4 py-2 text-white">
              Loading...
            </div>
          ) : isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 transition-colors"
              >
                {user.profilePicture ? (
                  <Image 
                    src={user.profilePicture} 
                    alt="Profile" 
                    width={24} 
                    height={24} 
                    className="rounded-full"
                  />
                ) : (
                  <User size={20} />
                )}
                <span className="font-medium">{user.display_name || user.name || user.email}</span>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}
              className="text-white bg-[#AD46FF] font-semibold rounded-full px-4 py-1.5 hover:bg-[#c289f0] transition-colors"
            >
              Login
            </Link>
          )}
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
              <Link href="/" className="hover:text-[#AD46FF] transition text-center">Home</Link>
              <Link href="/Features" className="hover:text-[#AD46FF] transition text-center">Features</Link>
              <Link href="/Pricing" className="hover:text-[#AD46FF] transition text-center">Pricing</Link>
              <Link href="/Contactus" className="hover:text-[#AD46FF] transition text-center">Contact Us</Link>
              <Link href="/partnership" className="hover:text-[#AD46FF] transition text-center">Partnership</Link>
              
              {/* Mobile Auth Section */}
              {loading ? (
                <div className="animate-pulse bg-white/20 rounded-full px-8 py-3 text-center text-white">
                  Loading...
                </div>
              ) : isAuthenticated && user ? (
                <div className="flex flex-col space-y-4 items-center">
                  <div className="flex items-center gap-2 text-white">
                    {user.profilePicture ? (
                      <Image 
                        src={user.profilePicture} 
                        alt="Profile" 
                        width={32} 
                        height={32} 
                        className="rounded-full"
                      />
                    ) : (
                      <User size={24} />
                    )}
                      <div className="text-center">
                        <span>{user.display_name || user.name || user.email}</span>
                      </div>
                  </div>
                  
                  {/* Dashboard Link */}
                  <Link
                    href="/dashboard"
                    className="text-center text-white bg-[#AD46FF] font-semibold rounded-full px-8 py-3 hover:bg-[#c289f0] transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="text-center text-white bg-red-600 font-semibold rounded-full px-8 py-3 hover:bg-red-700 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}
                  className="text-center text-white bg-[#AD46FF] font-semibold rounded-full px-8 py-3 mt-4 hover:bg-[#c289f0] transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for user menu */}
      {isUserMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Navbar;