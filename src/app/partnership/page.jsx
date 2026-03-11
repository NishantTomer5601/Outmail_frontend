"use client";

import { motion } from "framer-motion";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import {
  PhaseCard,
  NoteBox,
  ToolsBox,
  Checklist,
  Pitfalls,
  SectionHeading,
  TimeBox,
  NavProgress,
  HeroSection,
} from "@/component/playbook";

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Scroll progress bar — fixed top */}
      <NavProgress />

      <Navbar />

      <HeroSection />

      <main className="max-w-4xl mx-auto px-6 pb-24 pt-6">
        <NoteBox>
          This playbook assumes you are resource-constrained, time-constrained,
          and trying to build something real — not a demo or side project.
        </NoteBox>

        <div className="space-y-16 mt-16">
          {/* ── Phase 0 ── */}
          <PhaseCard phase={0} title="Founder & Platform Foundation" id="phase-0">
            <TimeBox time="2–4 hours (one-time setup)" />

            <div className="space-y-6">
              <div>
                <SectionHeading>Goal</SectionHeading>
                <p className="text-white/60 mt-2">
                  Establish absolute ownership, recoverability, and clarity across all tools
                  before you touch production code.
                </p>
              </div>

              <div>
                <SectionHeading>Why This Phase Matters</SectionHeading>
                <p className="text-white/60 mt-2">
                  In real startups, people leave, emails get locked, passwords are forgotten,
                  and access disputes kill momentum. Phase 0 prevents silent failure modes
                  that don't show up until it's too late.
                </p>
              </div>

              <div>
                <SectionHeading>Email &amp; Identity Strategy</SectionHeading>
                <p className="text-white/60 mt-2 mb-3">
                  Use <strong className="text-white">one primary Gmail account</strong> owned by the founder.
                  Never create separate inboxes for tools.
                </p>
                <div className="space-y-1 text-white/60">
                  <p>• Example: <code className="font-mono text-[#AD46FF] bg-[#6c00ff]/10 px-1.5 py-0.5 rounded text-sm">founder@gmail.com</code></p>
                  <p>• Aliases: <code className="font-mono text-[#AD46FF] bg-[#6c00ff]/10 px-1.5 py-0.5 rounded text-sm">founder+github@gmail.com</code>, <code className="font-mono text-[#AD46FF] bg-[#6c00ff]/10 px-1.5 py-0.5 rounded text-sm">founder+sentry@gmail.com</code></p>
                </div>
              </div>

              <ToolsBox tools={["Gmail (aliases)", "Google Password Manager"]} />

              <div>
                <SectionHeading>Core Platforms to Create</SectionHeading>
                <ul className="mt-3 space-y-2 text-white/60">
                  <li><strong className="text-white">GitHub</strong> — code, repos, CI</li>
                  <li><strong className="text-white">Notion</strong> — documentation, planning, decisions</li>
                  <li><strong className="text-white">Figma</strong> — UX flows, not visual polish</li>
                </ul>
              </div>

              <div>
                <SectionHeading>Non-Negotiables</SectionHeading>
                <ul className="mt-3 space-y-2 text-white/60">
                  <li>• 2FA enabled everywhere</li>
                  <li>• Recovery email &amp; phone configured</li>
                  <li>• No shared passwords</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Checklist
                  items={[
                    "Single Gmail with aliases",
                    "GitHub / Notion / Figma created",
                    "2FA + recovery verified",
                  ]}
                />
                <Pitfalls
                  items={[
                    "Multiple emails per tool",
                    "Using employee personal accounts",
                    "\"We'll fix security later\" thinking",
                  ]}
                />
              </div>
            </div>
          </PhaseCard>

          {/* ── Phase 1 ── */}
          <PhaseCard phase={1} title="Product Definition & MVP Build" id="phase-1">
            <TimeBox time="2–4 weeks" />

            <div className="space-y-6">
              <div>
                <SectionHeading>Goal</SectionHeading>
                <p className="text-white/60 mt-2">
                  Deliver a working MVP that completes one meaningful user journey end-to-end.
                </p>
              </div>

              <div>
                <SectionHeading>Real-World SaaS Focus</SectionHeading>
                <p className="text-white/60 mt-2">
                  Your MVP exists to learn, not to impress. Every extra abstraction slows learning.
                </p>
              </div>

              <ToolsBox
                title="Backend Stack"
                tools={["Node.js", "Express / Fastify", "PostgreSQL", "Prisma ORM"]}
              />

              <p className="text-white/60">
                Design APIs around real user actions. Avoid generic CRUD-first designs.
              </p>

              <ToolsBox
                title="Frontend Stack"
                tools={["Next.js", "Tailwind CSS", "Vercel (free tier)"]}
              />

              <div>
                <SectionHeading>Repository &amp; Branching Strategy</SectionHeading>
                <p className="text-white/60 mt-2 mb-3">
                  Use a <strong className="text-white">single repository</strong>.
                </p>
                <ul className="space-y-2 text-white/60">
                  <li>• <code className="font-mono text-[#AD46FF] bg-[#6c00ff]/10 px-1.5 py-0.5 rounded text-sm">main</code> branch → production</li>
                  <li>• Feature branches → short-lived</li>
                  <li>• No long-running dev branches</li>
                </ul>
              </div>

              <div>
                <SectionHeading>What NOT To Do</SectionHeading>
                <ul className="mt-3 space-y-2 text-white/60">
                  <li>• No microservices</li>
                  <li>• No Kafka, Redis, queues unless forced</li>
                  <li>• No "future-proofing"</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Checklist
                  items={[
                    "App deployed publicly",
                    "One user flow works fully",
                    "Auth + data persistence confirmed",
                  ]}
                />
                <Pitfalls
                  items={[
                    "Overengineering architecture",
                    "Local-only development",
                    "Chasing edge cases",
                  ]}
                />
              </div>
            </div>
          </PhaseCard>

          {/* ── Phase 2 ── */}
          <PhaseCard phase={2} title="Validation & Product Quality" id="phase-2">
            <TimeBox time="1–2 weeks (overlapping with MVP)" />

            <div className="space-y-6">
              <div>
                <SectionHeading>Goal</SectionHeading>
                <p className="text-white/60 mt-2">
                  Verify that users understand, trust, and extract value from your product.
                </p>
              </div>

              <ToolsBox
                title="UX & Feedback Strategy"
                tools={["Figma (flows only)", "Google Forms", "Zoom / Meet"]}
              />

              <p className="text-white/60">
                Focus on confusion, drop-offs, and hesitation — not compliments.
              </p>

              <div>
                <SectionHeading>Documentation</SectionHeading>
                <ul className="mt-3 space-y-2 text-white/60">
                  <li>• What problem we solve</li>
                  <li>• What we deliberately ignore</li>
                  <li>• Known limitations</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Checklist
                  items={[
                    "User flows documented",
                    "Feedback collected",
                    "Top 3 friction points identified",
                  ]}
                />
                <Pitfalls
                  items={[
                    "Ignoring negative feedback",
                    "UI polish before clarity",
                    "Assuming usage = value",
                  ]}
                />
              </div>
            </div>
          </PhaseCard>

          {/* ── Phase 3 ── */}
          <PhaseCard phase={3} title="Engineering Structure & Scale" id="phase-3">
            <TimeBox time="2–3 weeks (only after validation)" />

            <div className="space-y-6">
              <div>
                <SectionHeading>Goal</SectionHeading>
                <p className="text-white/60 mt-2">
                  Make the system safe, maintainable, and team-ready.
                </p>
              </div>

              <div>
                <SectionHeading>Architecture Evolution</SectionHeading>
                <p className="text-white/60 mt-2 mb-3">
                  Start with a modular monolith. Extract services only when:
                </p>
                <ul className="space-y-2 text-white/60">
                  <li>• Different scaling needs exist</li>
                  <li>• Teams block each other</li>
                  <li>• Operational risk is isolated</li>
                </ul>
              </div>

              <ToolsBox
                title="Multi-Repo Strategy"
                tools={["GitHub Organizations", "GitHub Actions"]}
              />

              <div>
                <SectionHeading>Security &amp; Ops</SectionHeading>
                <ul className="mt-3 space-y-2 text-white/60">
                  <li>• Env separation (dev / stage / prod)</li>
                  <li>• Secrets via platform env vars</li>
                  <li>• Role-based access</li>
                </ul>
              </div>

              <Pitfalls
                items={[
                  "Microservices for prestige",
                  "Manual deployments",
                  "Hardcoded secrets",
                ]}
              />
            </div>
          </PhaseCard>

          {/* ── Phase 4 ── */}
          <PhaseCard phase={4} title="Go-To-Market (Real SaaS)" id="phase-4">
            <TimeBox time="Ongoing (start early)" />

            <div className="space-y-6">
              <div>
                <SectionHeading>Goal</SectionHeading>
                <p className="text-white/60 mt-2">
                  Generate trust, conversations, and early revenue signals.
                </p>
              </div>

              <ToolsBox
                title="Marketing Foundations"
                tools={["Next.js landing page", "Google Docs", "Google Slides", "Loom"]}
              />

              <div>
                <SectionHeading>What Your Pitch Must Cover</SectionHeading>
                <ul className="mt-3 space-y-2 text-white/60">
                  <li>• Problem (why now)</li>
                  <li>• Who it is NOT for</li>
                  <li>• Differentiation vs competitors</li>
                  <li>• Operational credibility</li>
                  <li>• Security &amp; reliability posture</li>
                </ul>
              </div>

              <div>
                <SectionHeading>Sales Thinking (Early Stage)</SectionHeading>
                <p className="text-white/60 mt-2 mb-3">
                  You are not selling features. You are selling:
                </p>
                <ul className="space-y-2 text-white/60">
                  <li>• Reduced risk</li>
                  <li>• Time savings</li>
                  <li>• Operational confidence</li>
                </ul>
              </div>

              <div>
                <SectionHeading>SLA / SLO (Early)</SectionHeading>
                <ul className="mt-3 space-y-2 text-white/60">
                  <li>• Response times (human, honest)</li>
                  <li>• Uptime expectations</li>
                  <li>• Data handling clarity</li>
                </ul>
              </div>

              <Pitfalls
                items={[
                  "Feature dumping",
                  "Over-automation",
                  "Waiting for \"launch\"",
                ]}
              />
            </div>
          </PhaseCard>

          {/* ── Phase 5 ── */}
          <PhaseCard phase={5} title="Operate & Iterate" id="phase-5">
            <TimeBox time="Ongoing" />

            <div className="space-y-6">
              <div>
                <SectionHeading>Goal</SectionHeading>
                <p className="text-white/60 mt-2">
                  Operate SaaS as a learning system.
                </p>
              </div>

              <ToolsBox
                title="Monitoring & Analytics"
                tools={["Sentry (errors)", "PostHog / Plausible (usage)"]}
              />

              <p className="text-white/60">
                Track what users actually do — not what you hope they do.
              </p>

              <div>
                <SectionHeading>Support &amp; Trust</SectionHeading>
                <ul className="mt-3 space-y-2 text-white/60">
                  <li>• Clear support email</li>
                  <li>• Fast responses early</li>
                  <li>• Public reliability mindset</li>
                </ul>
              </div>

              <Pitfalls
                items={[
                  "Vanity metrics",
                  "Ignoring small failures",
                  "Shipping without learning",
                ]}
              />
            </div>
          </PhaseCard>
        </div>

        {/* Closing credits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t border-white/10 text-center space-y-3"
        >
          <p className="text-white/40 text-sm font-syne">
            © SaaS Builder Playbook — Built for founders who want clarity, discipline, and leverage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40">
            <a href="/Aboutus" className="hover:text-white/70 transition">About Us</a>
            <span>·</span>
            <a href="/Contactus" className="hover:text-white/70 transition">Contact Us</a>
            <span>·</span>
            <a
              href={`${process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.outmail.in"}/privacy-policy`}
              className="hover:text-white/70 transition"
            >
              Privacy Policy
            </a>
            <span>·</span>
            <a
              href={`${process.env.NEXT_PUBLIC_DOCS_URL || "https://docs.outmail.in"}/terms-and-conditions`}
              className="hover:text-white/70 transition"
            >
              Terms &amp; Conditions
            </a>
            <span>·</span>
            <a href="#faq-section" className="hover:text-white/70 transition">FAQ</a>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
