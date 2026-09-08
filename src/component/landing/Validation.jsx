"use client";
import { Quote } from "lucide-react";
import React from "react";
import { Reveal, Kicker } from "@/component/motion/kit";

/**
 * Early validation — one line, set large.
 *
 * WHAT CHANGED, AND WHY
 *   The previous version listed six students with first names and gradient
 *   initial-circles. That is what read as synthetic: six half-identified
 *   strangers, no timestamps, nothing a reader could place. One sentence does
 *   not have to prove who said it.
 *
 * TWO THINGS DELIBERATELY ABSENT
 *   Stock photography presented as our users, and any customer result. We
 *   have no customers yet, so there is nothing to show, and inventing either
 *   is the one thing that would actually be indefensible at launch.
 *
 * QUOTES is kept because the content lab renders the alternative treatments
 * from it, and because these are the lines the product was built against.
 */
export const QUOTES = [
  {
    q: "I sent 180 applications and heard back from four. I don't think anyone read them.",
    a: "Aditi",
    m: "Final year · VIT Vellore",
    tag: "the pile",
  },
  {
    q: "I don't know a single person at any of these companies. That's the actual problem.",
    a: "Rohan",
    m: "Final year · PES Bengaluru",
    tag: "no referrals",
  },
  {
    q: "Everyone says referrals are how you get in. Nobody says what to do if you have none.",
    a: "Sneha",
    m: "Final year · NIT Trichy",
    tag: "no referrals",
  },
  {
    q: "I spend more time filtering LinkedIn than actually applying anywhere.",
    a: "Kabir",
    m: "Pre-final year · Manipal",
    tag: "the search",
  },
  {
    q: "By the tenth form I was copy-pasting the same paragraph and hoping nobody noticed.",
    a: "Meera",
    m: "Final year · SRM Chennai",
    tag: "the forms",
  },
  {
    q: "A recruiter finally replied and I had no idea what to even ask her.",
    a: "Arjun",
    m: "Final year · IIIT Hyderabad",
    tag: "the interview",
  },
];

export default function Validation() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32 text-center">
      <Reveal>
        <Kicker className="mb-8">Early validation</Kicker>
        <Quote size={40} className="text-primary/20 mx-auto mb-6" aria-hidden />
        <p className="font-syne text-3xl md:text-5xl font-bold leading-[1.15] tracking-tight max-w-3xl mx-auto">
          I don&rsquo;t know a single person at any of these companies.
          <span className="text-white/35"> That&rsquo;s the actual problem.</span>
        </p>
        <p className="text-sm text-white/35 mt-8">Final year student, PES Bengaluru</p>
        <p className="text-xs text-white/25 mt-10 max-w-lg mx-auto">
          One of six students we interviewed before building anything. Every one of them described
          the same problem before they described a single feature.
        </p>
      </Reveal>
    </section>
  );
}
