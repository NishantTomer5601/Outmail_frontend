"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Check, Mail } from "lucide-react";
import React from "react";
import { EASE_BACK } from "@/component/motion/kit";

/**
 * Hero right-hand object.
 *
 * WHAT CHANGED, AND WHY
 *   The previous version named an invented person — "Priya Sharma · Talent ·
 *   Razorpay" — at a real, named company. That reads as a fabricated
 *   endorsement, and it is the kind of thing a brand team writes in about.
 *   The card now describes a ROLE at an anonymised employer, which is both
 *   honest and, as it turns out, more believable: a real product would not
 *   put a stranger's full name on a marketing page either.
 *
 *   The job card lost its company name for the same reason, and gained the
 *   skills the score was actually computed from — a number with its reason
 *   attached reads as data rather than decoration.
 *
 * Two cards at different translateZ depths, drifting on opposed cycles so
 * they never look mechanically linked, inside the hero's own perspective so
 * the cursor tilt moves them with the headline.
 *
 * Solid translucent panels, never backdrop-blur: these animate continuously,
 * and a backdrop-filter on a permanently-animating element is re-sampled
 * every single frame.
 */

const float = (reduce, dur, amp) =>
  reduce
    ? {}
    : {
        animate: { y: [0, -amp, 0] },
        transition: { duration: dur, repeat: Infinity, ease: "easeInOut" },
        style: { willChange: "transform" },
      };

const Glow = () => (
  <div
    aria-hidden
    className="absolute right-8 top-16 w-[340px] h-[340px]"
    style={{
      background:
        "radial-gradient(circle at center, color-mix(in srgb, var(--brand-primary) 32%, transparent), transparent 68%)",
    }}
  />
);

const Frame = ({ children }) => (
  <div
    className="relative w-full h-[380px] hidden lg:block"
    style={{ transformStyle: "preserve-3d" }}
  >
    <Glow />
    {children}
  </div>
);

export default function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <Frame>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.7, delay: 0.4, ease: EASE_BACK }}
        style={{ transform: "translateZ(90px)" }}
        className="absolute right-16 top-4 w-[266px]"
      >
        <motion.div
          {...float(reduce, 5.5, 10)}
          className="rounded-2xl border border-white/15 bg-[#171029]/90 p-5 shadow-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
              <Mail size={15} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">Engineering Manager</p>
              <p className="text-[11px] text-white/45 truncate">Fintech · Bengaluru</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
              <Check size={9} /> deliverable
            </span>
            <span className="font-mono text-[9px] text-white/30">emailed 09:14</span>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 34, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ duration: 0.7, delay: 0.75, ease: EASE_BACK }}
        style={{ transform: "translateZ(40px)" }}
        className="absolute right-4 top-48 w-[254px]"
      >
        <motion.div
          {...float(reduce, 7, 13)}
          className="rounded-2xl border border-white/12 bg-[#140e24]/90 p-5 shadow-2xl"
        >
          <div className="flex items-center justify-between mb-3">
            <Briefcase size={15} className="text-accent-light" />
            <span className="font-mono text-sm text-primary font-semibold">94</span>
          </div>
          <p className="text-sm font-semibold mb-1">Backend Intern</p>
          <p className="text-[11px] text-white/45 mb-3">Node, Postgres, payments · 3 of 3 skills</p>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-[94%] bg-gradient-to-r from-primary to-accent-light" />
          </div>
        </motion.div>
      </motion.div>
    </Frame>
  );
}
