# Master Prompt: Outmail Offerings Page with Interactive Product Animations

> **Paste this entire prompt into VS Code Copilot to generate the complete Outmail Offerings page with all 5 interactive product animations.**

---

## Overview

Build a single-page React application at the route `/outmail/offerings` for **Outmail** — a SaaS placement infrastructure platform for universities. The page showcases 5 core product offerings, each with an **interactive 3-scene animated demo** that follows a storytelling structure: **The Problem → The Outmail Solution → The Intelligence Layer**.

The page must be **fully responsive** on mobile, tablet, and desktop screens.

**Tech stack:** React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React icons.

---

## PART 1: Design System & CSS Variables

Create a global CSS file with a **dark theme** using these exact HSL CSS variables:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Satisfy&display=swap');

:root {
  --background: 222 47% 5%;
  --foreground: 210 40% 98%;
  --card: 222 47% 8%;
  --card-foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 222 47% 5%;
  --secondary: 217 33% 17%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217 33% 12%;
  --muted-foreground: 215 20% 65%;
  --accent: 262 83% 65%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 210 40% 98%;
  --border: 217 33% 17%;
  --input: 217 33% 17%;
  --ring: 217 91% 60%;
  --radius: 0.75rem;
  --success: 142 76% 45%;
  --warning: 38 92% 50%;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, hsl(217 91% 60%), hsl(262 83% 65%));
  --gradient-surface: linear-gradient(180deg, hsl(222 47% 10%), hsl(222 47% 6%));
  --gradient-glow: radial-gradient(ellipse at top, hsl(217 91% 60% / 0.15), transparent 60%);
}
```

### Custom CSS Classes Required

```css
/* Glass card with blur and layered shadows */
.glass-card {
  background: hsl(var(--card) / 0.5);
  backdrop-filter: blur(16px);
  border: 1px solid hsl(var(--border) / 0.5);
  border-radius: 0.75rem;
  box-shadow:
    0 0 0 1px hsl(var(--border) / 0.3),
    0 4px 16px -4px hsl(0 0% 0% / 0.4),
    inset 0 1px 0 0 hsl(var(--foreground) / 0.03);
}

/* Phase/Offering card with gradient background and hover glow */
.phase-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid hsl(var(--border) / 0.5);
  padding: 2rem;
  background: linear-gradient(180deg, hsl(var(--card)), hsl(var(--background)));
  box-shadow:
    0 0 0 1px hsl(var(--border) / 0.2),
    0 8px 32px -8px hsl(0 0% 0% / 0.5),
    inset 0 1px 0 0 hsl(var(--foreground) / 0.03);
}
.phase-card::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.5s;
  background: var(--gradient-glow);
}
.phase-card:hover::before {
  opacity: 1;
}

/* Note box with left border accent */
.note-box {
  position: relative;
  padding: 1rem 1rem 1rem 1.5rem;
  border-radius: 0.5rem;
  border-left: 4px solid hsl(var(--primary));
  background: hsl(217 91% 8%);
}

/* Gradient text */
.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Glow effect for buttons */
.glow-effect {
  position: relative;
}
.glow-effect::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--gradient-primary);
  border-radius: inherit;
  filter: blur(20px);
  opacity: 0.3;
  z-index: -1;
  transition: opacity 0.3s ease;
}
.glow-effect:hover::after {
  opacity: 0.5;
}

/* Hero glow background */
.hero-glow {
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%);
  pointer-events: none;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
}

/* Keyframe animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pulse-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
.animate-fade-up { animation: fadeUp 0.6s ease-out forwards; opacity: 0; }
.animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
```

---

## PART 2: Page Structure

The page has these sections in order:

### 2.1 — Fixed Header
- Fixed top, backdrop-blur, `bg-background/70`
- Left: Outmail logo + "Outmail" text (use `font-family: 'Satisfy', cursive` for the brand name)
- Right: "Pricing" link, "Contact" link, "Book a Call" button with gradient background
- On mobile: hide "Pricing" and "Contact" links, show only "Book a Call"

### 2.2 — Hero Section
- Padding: `pt-32 pb-20`
- Hero glow div with `animate-pulse-glow`
- Two floating geometric shapes (rounded rectangle and circle) using Framer Motion infinite animations
- Badge pill: "Core Offerings" with Rocket icon
- Main heading: `What **Outmail** Does for Your Students` (Outmail in gradient-text with Satisfy font)
- Subheading: "Outmail combines recruiter outreach, intelligent opportunity discovery, automated applications, placement analytics, and industry mentorship to improve off-campus placement outcomes for university students."
- All text center-aligned, staggered fade-up animations

### 2.3 — Offerings Section (5 Offering Cards + 5 Demos)
Each offering has a card followed by its interactive demo animation. Details below.

### 2.4 — CTA Section
- Heading: "Bring Structured Placement Support to Your Students"
- Subheading: "Empower your placement cell with outreach, discovery, automation, analytics, and mentorship — all in one platform."
- Two buttons: "Book a Call" (gradient) + "Contact Us" (bordered)

### 2.5 — Footer
- Left: Logo + tagline "Helping universities improve off-campus placement outcomes."
- Right columns: Links (Pricing, Terms and Conditions, Privacy Policy, FAQ) + Contact (contact@outmail.in)
- Bottom: "© 2026 Outmail. All rights reserved."

### 2.6 — Book a Call Modal
- Triggered by "Book a Call" buttons
- Animated modal with backdrop blur
- Phone icon, heading, text asking to email contact@outmail.in
- "Send Email" button linking to mailto:contact@outmail.in

---

## PART 3: Offering Cards

Each offering card uses the `.phase-card` CSS class and contains:
- A numbered label ("Offering 1", "Offering 2", etc.) in primary color uppercase
- An icon in a gradient-background rounded square
- Title and description
- Feature bullet list with CheckCircle2 icons
- A highlight note box

### Offering 1: Structured Recruiter Outreach
- **Icon:** Send
- **Description:** "Outmail runs personalized cold email outreach campaigns to recruiters on behalf of students, targeting companies that show strong hiring signals such as funding activity, hiring momentum, and industry growth."
- **Features:**
  - Personalized outreach campaigns sent on behalf of students
  - Targets companies with strong hiring signals — funding, growth, momentum
  - Higher probability of getting noticed and hired
  - Safe sending limits and compliance-first approach
- **Highlight:** "Students reach companies where their probability of getting noticed and hired is significantly higher."

### Offering 2: Intelligent Opportunity Discovery
- **Icon:** Search
- **Description:** "Students receive a curated list of job opportunities filtered by role, industry, and hiring activity. Each opportunity is ranked using an Outmail Score for smarter prioritization."
- **Features:**
  - Chances of the student getting shortlisted
  - Company hiring activity and momentum
  - Company reputation and work environment
  - Role and industry-based intelligent filtering
- **Highlight:** "The Outmail Score helps students prioritize high-probability and high-quality opportunities."

### Offering 3: Automated Job Applications
- **Icon:** FileCheck
- **Description:** "Students enter their profile details once on the Outmail dashboard. When they choose to apply for a job, Outmail automatically fills most of the application fields on their behalf."
- **Features:**
  - One-time profile setup on the Outmail dashboard
  - Auto-fill application fields for faster submissions
  - Apply to multiple opportunities at scale
  - Eliminates repetitive form filling entirely
- **Highlight:** "Students can apply faster and at scale, focusing their energy on preparation instead of paperwork."

### Offering 4: Placement Visibility & Analytics for Universities
- **Icon:** BarChart3
- **Description:** "Outmail provides placement dashboards for TPOs and placement cells, offering visibility into students' off-campus placement activity."
- **Features:**
  - Recruiter outreach executed and tracked
  - Companies contacted by students
  - Job applications submitted
  - Opportunities discovered and engagement levels
  - Institutional-level reporting and insights
- **Highlight:** "Universities can track and understand off-campus placement outcomes with complete transparency."

### Offering 5: Industry Mentorship & Career Guidance
- **Icon:** GraduationCap
- **Description:** "Outmail connects students with working professionals across tech, non-tech, and core roles through structured mentorship programs."
- **Features:**
  - Live mentorship sessions with industry professionals
  - Resume reviews and profile building workshops
  - Hiring trend discussions and market insights
  - Group Q&A sessions for targeted preparation
- **Highlight:** "Students prepare effectively for the roles and companies they are targeting with guidance from those who've been there."

---

## PART 4: Reusable DemoWrapper Component

Create a `DemoWrapper` component that handles all shared demo logic. Every demo uses this wrapper.

### Props:
```typescript
interface DemoScene {
  title: string;        // e.g. "The Problem", "Outmail Solution", "Intelligence Layer"
  subtitle: string;     // displayed above the scene content
  component: React.ComponentType<{ active: boolean }>;
}

interface DemoWrapperProps {
  scenes: DemoScene[];
  durations?: number[];     // ms per scene, default [7500, 5000, 6500]
  badge: ReactNode;         // pill badge above heading
  heading: string;          // section heading
  description: string;      // section description
  bottomCta: ReactNode;     // text below the demo container
}
```

### Behavior:
1. **Auto-cycling:** Scenes auto-advance using `setTimeout` based on `durations[activeScene]`. When the last scene ends, it loops back to scene 0.
2. **Scene selector buttons:** Horizontal row of numbered buttons. Clicking one pauses auto-play for 10 seconds, then resumes.
3. **Replay button:** Resets to scene 0 and resumes auto-play. Uses `RotateCcw` icon.
4. **Progress bar:** A thin gradient bar at the top of the scene container that animates from 0% to 100% width over the scene's duration using Framer Motion with `ease: "linear"`.
5. **Scene transitions:** Use `AnimatePresence mode="wait"` with `x: 40 → 0` on enter, `x: 0 → -40` on exit, duration 0.4s.
6. **Subtitle transitions:** Separate `AnimatePresence` for subtitle text, `y: -10 → 0` on enter, `y: 0 → 10` on exit.

### Visual Layout:
- Section padding: `px-6 py-20`, max-width `4xl`, centered
- Heading area: center-aligned with badge pill, h2 heading, description paragraph
- Scene selector: centered flex row with gap-2, buttons have rounded-xl styling
- Scene container: `rounded-3xl` with border, `bg-card/30 backdrop-blur-sm`, padding `p-6 md:p-10`
- Background: radial gradient glow overlay inside the container
- Box shadow: `0 0 60px -20px hsl(var(--primary) / 0.1), 0 16px 48px -16px hsl(0 0% 0% / 0.4)`
- Scene selector button active state: `bg-primary/15 text-primary border-primary/30`
- Scene selector button inactive: `bg-muted/20 text-muted-foreground border-border/20`
- On mobile (`sm:` breakpoint), scene button labels are hidden, only numbered squares show

---

## PART 5: Animation 1 — Recruiter Outreach Demo

**Heading:** "How Recruiter Outreach Works"
**Description:** "Watch how Outmail replaces random cold emails with intelligent, signal-driven recruiter outreach."
**Badge:** Send icon + "See It In Action" (accent color)
**Bottom CTA:** "Random cold emails → Signal-driven smart outreach"
**Durations:** [7000, 6500, 7000]

### Scene 1 — The Problem
**Subtitle:** "Most students reach out randomly to a small number of companies."

Visual: A Gmail-like compose window UI card.

**Animation sequence:**
1. Show a browser chrome bar (3 colored dots: red, yellow, green + "Gmail — Compose" label)
2. Under "Searching for companies…" label, reveal search queries one by one every 1800ms:
   - "startup companies hiring"
   - "companies hiring software engineers"
   - "recruiter email HR manager"
3. Each query appears in a row with Search icon. Active queries have `border-warning/30 bg-warning/5`. Inactive are `border-border/20 bg-muted/10`.
4. After all queries shown, reveal "Cold emails sent manually…" section. Show 3 email rows appearing every 800ms: "Generic email to Company 1…", "Company 2…", "Company 3…"
5. Final warning text: "Only 3 companies contacted. No targeting. No signals." with pulsing warning dot.

### Scene 2 — Outmail Outreach Engine
**Subtitle:** "Smart outreach campaigns. Personalized at scale."

Visual: Outmail-branded card with gradient border.

**Animation sequence (steps reveal every 1200ms):**
1. **Step 0 (immediate):** Student profile summary — avatar circle, "Rahul Sharma", "B.Tech CS · React, Node.js, Python" with green checkmark
2. **Step 1:** "Target Companies" section reveals 4 companies with staggered animation (delay: i * 0.15):
   - Razorpay — "Series F · Hiring 40+"
   - Zerodha — "Revenue growth · 12 openings"
   - CRED — "New funding · Expanding eng team"
   - Postman — "IPO prep · Hiring surge"
   Each row: Building2 icon, company name (bold), signal text (right-aligned muted)
3. **Step 2:** "Personalized Email" template card with accent border:
   ```
   Hi {{recruiter_name}},
   I'm Rahul, a B.Tech CS student with experience in backend development.
   I noticed {{company}} recently raised funding and is expanding…
   ```
   Template variables highlighted in accent color.
4. **Step 3:** "Launch Outreach" button appears with pulsing scale animation `[1, 1.03, 1]` repeating every 1.5s

### Scene 3 — Intelligence Layer
**Subtitle:** "Smart outreach powered by real hiring signals."

**Animation sequence:**
1. "Hiring Signals Processing" card. Grid of 2 columns, 6 signal items revealing every 350ms:
   - DollarSign — "Funding announcements" (success color)
   - TrendingUp — "Hiring momentum" (primary)
   - Users — "Headcount growth" (accent)
   - BarChart3 — "Job posting frequency" (warning)
   - Newspaper — "Industry news" (primary)
   - Activity — "Recruiter activity" (success)
   Each signal uses spring animation with stiffness 300. Active: `border-primary/30 bg-primary/5`
2. After all signals processed (600ms delay), show **email flow visualization**:
   - Three boxes in a row: `[Student] → [Outmail] → [Recruiter]`
   - Student box: primary colors. Outmail box: gradient background. Recruiter box: success colors.
   - Arrow icons between them animate `x: [0, 5, 0]` while sending
3. "Sending personalized emails…" text with pulsing primary dot
4. After 1400ms more, show delivered confirmation: "New email from student candidate" with "Recruiter inbox — Razorpay" subtitle, green border success card

---

## PART 6: Animation 2 — Opportunity Discovery Demo

**Heading:** "How Opportunity Discovery Works"
**Description:** "Watch how Outmail replaces endless scrolling with intelligent, curated job discovery."
**Badge:** Search icon + "See It In Action"
**Bottom CTA:** "Endless job searching → Smart, scored opportunities"
**Durations:** [7000, 5500, 7500]

### Scene 1 — The Problem
**Subtitle:** "Students spend hours searching across multiple platforms."

Visual: Job search tabs with scrolling results.

**Animation:**
1. Four tab pills cycling every 1800ms: "LinkedIn Jobs", "Indeed", "AngelList", "Company Sites". Active tab: `border-warning/30 bg-warning/10 text-warning`
2. Job list scrolling (position shifts every 900ms). 6 job entries:
   - "Senior Staff Engineer (10+ yrs)" — ❌ irrelevant, red border, strikethrough
   - "Sales Executive — Insurance" — ❌ irrelevant
   - "Software Intern — Unpaid" — ❌ irrelevant
   - "Manager — Operations" — ❌ irrelevant
   - "Jr. Developer — Remote" — ✅ match, green border
   - "Content Writer — Part-time" — ❌ irrelevant
3. Warning text: "Hours spent. Mostly irrelevant results."

### Scene 2 — Job Discovery Feed
**Subtitle:** "Curated, ranked, and filtered opportunities."

**Animation:**
1. Header: Search icon gradient box + "Job Discovery Feed" / "Curated. Ranked. Ready."
2. Filter pills: "Backend", "Entry Level", "Bangalore" with Filter icon
3. Four jobs reveal one by one every 500ms with spring animation (stiffness 200):
   - "Software Engineer — Backend" | Razorpay | Bangalore | Score: 94 (green)
   - "Data Analyst — Entry Level" | CRED | Bangalore | Score: 88 (primary)
   - "Product Associate" | Postman | Remote | Score: 82 (primary)
   - "Frontend Developer" | Zerodha | Bangalore | Score: 79 (accent)
   Score badge color: ≥90 = success, ≥80 = primary, else accent. Star icon before score.

### Scene 3 — Aggregation Engine
**Subtitle:** "Find the right opportunities faster."

**Animation:**
1. "Data Aggregation Pipelines" — 5 data sources reveal every 400ms with slide-in from left:
   - Globe — "Company career pages"
   - Briefcase — "Startup job boards"
   - ArrowUpRight — "Hiring APIs"
   - Users — "Recruitment platforms"
   - TrendingUp — "Market signals"
   Each gets a green checkmark on activation.
2. After 800ms delay, "AI Scoring Engine" card appears with accent border.
4. Four scoring factors animate with staggered progress bars (delay: i * 0.2):
   - Hiring urgency — 92%
   - Company growth — 85%
   - Candidate fit — 78%
   - Market reputation — 88%
   Progress bars use gradient fill, animate width from 0% to target over 0.8s.
5. Final badge: "Outmail Score: 94" with Target icon, success-colored

---

## PART 7: Animation 3 — Automated Job Applications Demo

**This demo uses its own internal scene management (NOT DemoWrapper)** but follows the same visual pattern.

**Heading:** "How Automated Applications Work"
**Description:** "Watch how Outmail transforms the job application process from tedious to instant."
**Badge:** Zap icon + "See It In Action"
**Bottom CTA:** "Enter details once → Apply everywhere instantly"
**Durations:** [7500, 5000, 6500]

### Scene 1 — The Problem
**Subtitle:** "Students repeatedly fill the same job applications again and again."

**Animation:**
1. Form card with browser chrome (3 dots + "Job Application — ExampleCorp")
2. Seven form fields with typewriter effect. Each character types at 45-80ms random interval. Fields complete after ~250ms pause, then next field starts:
   - Full Name: "Rahul Sharma" (User icon)
   - Email: "rahul@email.com" (Mail icon)
   - Phone: "+91 98765 43210" (Phone icon)
   - Resume: "resume_rahul.pdf" (FileText icon)
   - LinkedIn: "linkedin.com/in/rahul" (Link2 icon)
   - Education: "B.Tech CS — IIT Delhi" (GraduationCap icon)
   - Skills: "React, Node.js, Python" (Code2 icon)
3. **Blinking cursor** on active field: `opacity: [1, 0]` animation, 0.5s repeat
4. Active field: `border-primary/50 bg-primary/5 ring-1 ring-primary/20`
5. "Typing manually…" indicator with pulsing warning dot
6. After all fields typed, **stacked form cards** appear behind (up to 3), each offset by 12px x/y, decreasing opacity (0.15, 0.11, 0.07)

### Scene 2 — Outmail Profile
**Subtitle:** "Add your profile once."

**Animation:**
1. Outmail-branded card with Zap gradient icon + "Outmail Profile" / "Fill once. Apply everywhere."
2. Eight fields fill rapidly every 280ms:
   - Name, Email, Phone, Resume, LinkedIn, GitHub, Education, Skills
3. Each filled field transitions: icon becomes green CheckCircle2, border turns success green, background turns success green/5
4. Progress bar at bottom animates from 0% to 100% using gradient fill
5. Counter text: "X/8 completed"

### Scene 3 — Auto Apply Magic
**Subtitle:** "Apply to more opportunities. Spend less time on forms."

**Animation:**
1. **Job Card** appears first:
   - "Software Engineer — Backend" / "ExampleTech · Bangalore"
   - Score badge: "Score: 92"
   - Skill tags: Python, Django, PostgreSQL, Docker
   - "Apply with Outmail" button with Zap icon, pulsing scale `[1, 1.03, 1]`
2. After 1200ms, stage transitions to "applying"
3. **Auto-fill form** slides in below with `height: 0 → auto` animation:
   - "Auto-filling application…" label
   - 6 fields fill every 350ms: Name, Email, Resume, LinkedIn, Education, Skills
   - Each field gets:
     - Spring-animated CheckCircle2 (stiffness 400, damping 15)
     - Success green border/background
     - "auto-filled" label on the right
4. After all fields: **"Application Ready in Seconds"** success badge with CheckCircle2

---

## PART 8: Animation 4 — Placement Analytics Demo

**Heading:** "How Placement Analytics Works"
**Description:** "Watch how Outmail gives universities full visibility into off-campus placement outcomes."
**Badge:** BarChart3 icon + "See It In Action"
**Bottom CTA:** "Blind off-campus data → Complete institutional visibility"
**Durations:** [6000, 6000, 6500]

### Scene 1 — The Problem
**Subtitle:** "Universities lack visibility into off-campus placements."

**Animation:**
1. "Placement Cell Dashboard" browser card
2. Five rows reveal every 600ms:
   - "On-campus placements" → "156" (green, known)
   - "Off-campus placements" → "???" (red, unknown)
   - "Companies students contacted" → "???" (red)
   - "Applications submitted" → "???" (red)
   - "Student engagement level" → "???" (red)
3. Warning: "No visibility into off-campus placement activity." with AlertTriangle icon

### Scene 2 — TPO Dashboard
**Subtitle:** "Track every metric that matters."

**Animation:**
1. "TPO Dashboard" / "Complete placement visibility" header
2. **2×2 grid** of metric cards, revealing every 700ms with spring scale animation:
   - Users icon: "Students Onboarded" — "1,247" — "+89 this week"
   - Building2: "Companies Contacted" — "3,560" — "+340 this month"
   - FileText: "Applications Submitted" — "8,920" — "+1.2k this month"
   - Eye: "Opportunities Discovered" — "12,400" — "Updated daily"
3. After all metrics shown, **mini bar chart** appears:
   - 7 bars (Mon–Sun) with heights [35%, 42%, 55%, 48%, 62%, 70%, 85%]
   - Each bar uses gradient fill, animates height from 0 with staggered delay (i * 0.08)

### Scene 3 — Insights Layer
**Subtitle:** "Complete off-campus visibility."

**Animation:**
1. "Analytics & Insights" / "Real-time placement intelligence" header with PieChart icon
2. Four insight cards reveal every 700ms, sliding in from left:
   - Activity — "Outreach activity" — "3,560 emails sent"
   - TrendingUp — "Engagement rate" — "72% active students"
   - PieChart — "Application conversion" — "34% response rate"
   - Building2 — "Top hiring companies" — "Razorpay, CRED, Zerodha"
   Accent-colored borders when active
3. Final badge: "Complete off-campus visibility" with CheckCircle2, success green

---

## PART 9: Animation 5 — Mentorship Demo

**Heading:** "How Industry Mentorship Works"
**Description:** "Watch how Outmail connects students with real professionals for structured career guidance."
**Badge:** GraduationCap icon + "See It In Action"
**Bottom CTA:** "Random searching → Structured mentorship with real professionals"
**Durations:** [7000, 6000, 7000]

### Scene 1 — The Problem
**Subtitle:** "No structured guidance. Students search randomly."

**Animation:**
1. Google Search browser card
2. Four search queries reveal every 1500ms:
   - "how to prepare for product roles"
   - "data science interview tips reddit"
   - "best resume for freshers 2026"
   - "software engineer career path quora"
   Warning-colored when active. Search icon on each row.
3. After all shown: red error box: "No structured guidance. Scattered, unreliable advice." with pulsing destructive dot

### Scene 2 — Mentorship Planning
**Subtitle:** "Select interests. Outmail finds the right mentors."

**Animation (steps every 1200ms):**
1. Header: GraduationCap gradient icon + "Mentorship Setup" / "Tell us your goals"
2. **Step 1:** Three interest options animate in with staggered delay:
   - Code2 — "Software Engineering"
   - Briefcase — "Product Management"
   - BarChart3 — "Data Science"
   All get selected simultaneously with green CheckCircle2 checkmarks
3. **Step 2:** "Preferences saved. Matching mentors…" success confirmation
4. **Step 3:** "Find Mentors" button with pulsing scale animation

### Scene 3 — Smart Session Planning
**Subtitle:** "Connect students with real industry professionals."

**Animation:**
1. "Analyzing Signals" card — 3 signals reveal every 500ms:
   - Users — "Student demand signals"
   - TrendingUp — "Industry hiring trends"
   - Calendar — "Mentor availability"
   Each gets green checkmark on activation
2. After 600ms delay, "Upcoming Sessions" card appears with accent border
3. Three session cards reveal every 600ms, sliding in from left:
   - Star — "Resume Review Workshop" — Priya M. — Google — Tomorrow, 4 PM
   - TrendingUp — "Hiring Trends Discussion" — Amit K. — Razorpay — Wed, 6 PM
   - MessageSquare — "Mock Interview Session" — Sara J. — Microsoft — Fri, 5 PM
4. After all sessions: "Join Live Session" button with Video icon, gradient background

---

## PART 10: Responsive Design Requirements

1. **Mobile (< 640px):**
   - Header: Hide "Pricing" and "Contact" nav links
   - Hero heading: `text-4xl` (no lg size)
   - Scene selector: Show only numbered squares, hide text labels (`hidden sm:inline`)
   - Scene containers: `p-6` padding
   - Offering cards: full-width, single column
   - All demo cards: `max-w-sm` adapts to container

2. **Tablet (640px–1024px):**
   - Hero heading: `text-5xl`
   - Scene containers: `p-6 md:p-10`
   - Two-column grids remain 2-column

3. **Desktop (> 1024px):**
   - Hero heading: `text-6xl`
   - Max content width: `max-w-4xl` for offerings, `max-w-7xl` for header
   - All spacing and typography at full scale

4. **All breakpoints:**
   - Demo cards inside scenes use `min-h-[420px]` with `flex items-center justify-center`
   - Scene selector uses `flex-wrap` to handle overflow
   - All text uses `text-wrap: balance` on headings
   - Scroll behavior: smooth

---

## PART 11: Animation Technical Specifications

### Common Patterns Used Across All Demos:

1. **Timed reveal pattern:**
```typescript
useEffect(() => {
  if (!active) { resetState(); return; }
  let idx = 0;
  const interval = setInterval(() => {
    setRevealIdx(idx);
    idx++;
    if (idx >= items.length) clearInterval(interval);
  }, intervalMs);
  return () => clearInterval(interval);
}, [active]);
```

2. **Card shadow pattern:**
   - Normal cards: `boxShadow: "0 8px 32px -8px hsl(0 0% 0% / 0.5), inset 0 1px 0 hsl(var(--foreground) / 0.03)"`
   - Branded cards: add `"0 0 40px -10px hsl(var(--primary) / 0.2)"` prefix
   - Accent cards: use `hsl(var(--accent) / 0.15)` for glow

3. **Browser chrome pattern:**
   - Three dots: `w-2 h-2 rounded-full` in destructive/70, warning/70, success/70
   - Label: `text-xs text-muted-foreground font-medium`

4. **Status indicators:**
   - Success: `border-[hsl(var(--success))]/30 bg-[hsl(var(--success))]/5 text-[hsl(var(--success))]`
   - Warning: `border-warning/30 bg-warning/5 text-warning`
   - Error/Destructive: `border-destructive/20 bg-destructive/5 text-destructive`
   - Primary active: `border-primary/30 bg-primary/5 text-primary`
   - Inactive/dim: `border-border/20 bg-muted/10 text-muted-foreground/30`

5. **Spring animations:** `type: "spring", stiffness: 200-400, damping: 15`

6. **All scene components receive `{ active: boolean }` prop** and must reset all state when `active` becomes false.

---

## IMPORTANT NOTES

- Use `framer-motion` for all animations (`motion`, `AnimatePresence`, `useEffect`-driven state)
- Use `lucide-react` for all icons
- All colors must use the CSS variable system (e.g., `hsl(var(--primary))`, `text-primary`, `bg-card`)
- Never hardcode hex colors
- The page must work as a standalone route
- All demos must auto-play, loop, and support manual scene selection
- The page must be fully responsive on mobile, tablet, and desktop
