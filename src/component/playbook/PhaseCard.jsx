"use client";
import { motion } from "framer-motion";

export function PhaseCard({ phase, title, id, children }) {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 md:p-10 scroll-mt-8"
    >
      {/* Phase header */}
      <div className="flex items-start gap-5 mb-8">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#6c00ff] to-[#AD46FF] flex items-center justify-center shadow-lg shadow-purple-900/40">
          <span className="text-white font-syne font-bold text-xl">{phase}</span>
        </div>
        <div>
          <p className="text-xs text-[#AD46FF] font-syne uppercase tracking-[0.2em] mb-1">
            Phase {phase}
          </p>
          <h2 className="font-syne text-2xl md:text-3xl font-bold text-white leading-snug">
            {title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="border-t border-white/8 pt-6">{children}</div>
    </motion.div>
  );
}
