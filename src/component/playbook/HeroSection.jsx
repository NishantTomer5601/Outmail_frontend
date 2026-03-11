"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-l from-black via-[#6c00ff] to-black py-24 px-6 overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-700 rounded-full blur-[120px] opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-900 rounded-full blur-[100px] opacity-25" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Logo + Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <Image src="/logo-nav.png" alt="Outmail Logo" width={52} height={52} />
          <span className="text-white font-satisfy text-3xl">Outmail</span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xs font-syne uppercase tracking-[0.25em] text-[#AD46FF] mb-4"
        >
          Partnership Resource
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-syne text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          The SaaS Builder{" "}
          <span className="bg-gradient-to-r from-[#AD46FF] to-[#6c00ff] bg-clip-text text-transparent">
            Playbook
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          A battle-tested, phase-by-phase guide for resource-constrained founders
          who want to build real SaaS products — with clarity, discipline, and leverage.
        </motion.p>

        {/* Phase nav pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          {[
            { label: "Phase 0 · Foundation", href: "#phase-0" },
            { label: "Phase 1 · MVP", href: "#phase-1" },
            { label: "Phase 2 · Validation", href: "#phase-2" },
            { label: "Phase 3 · Scale", href: "#phase-3" },
            { label: "Phase 4 · GTM", href: "#phase-4" },
            { label: "Phase 5 · Operate", href: "#phase-5" },
          ].map(({ label, href }, i) => (
            <a
              key={i}
              href={href}
              className="text-sm text-white/70 hover:text-white border border-white/20 hover:border-[#AD46FF] hover:bg-[#6c00ff]/20 px-4 py-2 rounded-full transition-all duration-200"
            >
              {label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
