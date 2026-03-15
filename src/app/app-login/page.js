"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import { User, Mail, Key } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,#6c00ff_0%,#0f0f2d_60%,#000_100%)]">
      {/* Glassmorphism Card */}
      <div className="bg-transparent bg-purple-200 backdrop-blur-lg  border border-white/10 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-xl bg-purple-500">
            <Image src={Logo} alt="Logo" width={40} height={40} />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl text-white font-semibold mb-2">Complete Your Setup</h2>
        <p className="text-white/60 mb-6">
          Enter your email credentials to start sending campaigns
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-white/80">Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-3 text-white/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-white/80">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-white/50 w-5 h-5" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                required
              />
            </div>
          </div>

          {/* App Password */}
          <div>
            <label className="text-sm font-medium text-white/80">App Password</label>
            <div className="relative mt-1">
              <Key className="absolute left-3 top-3 text-white/50 w-5 h-5" />
              <input
                type="password"
                placeholder="Enter your app password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#a855f7]"
                required
              />
            </div>
            <p className="text-xs text-white/50 mt-1">
              Generate an app password from your Gmail security settings
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
}
