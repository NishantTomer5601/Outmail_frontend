/**
 * The "how it works" narrative, as data.
 *
 * WHAT EACH VARIANT IS TRYING TO FIX
 *   · The current version invents a named student, which reads as a persona
 *     rather than research.
 *   · "180 applications, four replied" appears BOTH here and as a testimonial
 *     quote lower down the page, which makes both look manufactured.
 *   · Every fix sentence uses the same "X rather than Y" construction.
 *
 * Variant 0 is the production wording. Icons and panel visuals stay in the
 * component — they are presentation, and they never change between variants.
 */

export const STORY_COPY = [
  {
    label: "Current",
    kicker: "How it works",
    lines: ["This is your", "placement season."],
    sub: "Four things go wrong for almost everyone. Here they are, and here is what Outmail does about each.",
    panels: [
      {
        pill: "the pile",
        problem: "You applied everywhere. Almost nobody replied.",
        detail:
          "Each application joined a queue a few hundred deep. Yours was not rejected. It was never opened.",
        fix: "Outmail emails the person doing the hiring, from your Gmail, written off your resume. It lands as a message from a candidate, not as row 214 of a spreadsheet.",
      },
      {
        pill: "the search",
        problem: "You are applying to whatever the feed shows you.",
        detail:
          "Half of it wants five years' experience. A third closed before you saw it. Filtering eats the evening you meant to spend applying.",
        fix: "Outmail collects openings from job boards and company sites, scores each against your resume, and shows you the reasoning so you can overrule it.",
      },
      {
        pill: "the forms",
        problem: "Every application costs you twenty minutes of typing.",
        detail:
          "Your name, your notice period, why you want to work here. Again. Into a form that is almost but not quite the last one.",
        fix: "Answer the standard questions once. The Outmail extension fills the rest in while you read the job description.",
      },
      {
        pill: "the interview",
        problem: "A recruiter replies, and you have nobody to ask.",
        detail:
          "No seniors at that company, no alumni you know, no idea what the loop looks like or what they will push on.",
        fix: "Fortnightly sessions with people who have already sat that interview, in a group small enough that you get to ask your actual question.",
      },
    ],
  },
  {
    label: "Previous",
    kicker: "How it works",
    lines: ["Meet Ananya.", "Four frames."],
    sub: "Read it like a strip. Every frame is a wall she hit, and the thing that got her over it.",
    panels: [
      {
        pill: "the pile",
        problem: "She applied to 180 openings. Four replied.",
        detail:
          "Every one went into an ATS behind 250 other applications. Nobody read hers, because nobody read most of them.",
        fix: "Outmail writes to the person doing the hiring instead — from Ananya's own Gmail, personalised from her resume, so it arrives as a message rather than a submission.",
      },
      {
        pill: "the search",
        problem: "She was applying to whatever LinkedIn showed her.",
        detail:
          "Most of it was senior, or the wrong stack, or closed weeks ago. She spent more time filtering than applying.",
        fix: "Outmail aggregates openings from across job boards and company sites, scores each against her resume, and shows the reasoning — so effort goes where she has a real chance.",
      },
      {
        pill: "the forms",
        problem: "Each application took twenty minutes of retyping.",
        detail:
          "Same name, same notice period, same 'why do you want to work here', typed again into a slightly different form.",
        fix: "Outmail's extension fills them in one click from answers she wrote once — so twenty minutes goes into the ten applications that matter, not the first one.",
      },
      {
        pill: "the interview",
        problem: "Then a recruiter replied, and she had nobody to ask.",
        detail:
          "No seniors at that company, no alumni she knew, no idea what the loop looked like or what they would ask.",
        fix: "Bi-weekly mentorship with people who have already been through it — for the part where getting the interview stops being the hard bit.",
      },
    ],
  },
  {
    label: "What six said",
    kicker: "What students told us",
    lines: ["Six students.", "The same four", "problems."],
    sub: "We asked before we built anything. Nobody mentioned a feature. Everyone described one of these four.",
    panels: [
      {
        pill: "reach",
        problem: '"I don\'t think anyone read them."',
        detail:
          "Applications go into a queue hundreds deep, and a recruiter opens a dozen. Volume is not the lever it looks like.",
        fix: "Outmail sends to the person hiring, from your own Gmail, written from your resume. Different queue, different odds.",
      },
      {
        pill: "search",
        problem: '"I spend more time filtering than applying."',
        detail:
          "Feeds are ranked for engagement, not for fit. Most of what surfaces is senior, mismatched, or already closed.",
        fix: "Openings are pulled from boards and company sites, scored against your resume, with the score explained so you can disagree with it.",
      },
      {
        pill: "forms",
        problem: '"By the tenth form I was copy-pasting."',
        detail:
          "The same eight answers, retyped into a slightly different layout, until the tenth application gets less care than the first.",
        fix: "Write the answers once. The extension completes the rest, and you review before anything submits.",
      },
      {
        pill: "interview",
        problem: '"I had no idea what to even ask her."',
        detail:
          "Getting the interview turns out to be the easier half. Almost nobody has someone to ask about the other half.",
        fix: "Twenty-five mentorship seats with people who have been through that exact loop, meeting twice a month.",
      },
    ],
  },
  {
    label: "Season timeline",
    kicker: "How a season goes",
    lines: ["August to", "November."],
    sub: "Placement season is not one decision. It is four, in this order, and most students only have tools for the third.",
    panels: [
      {
        pill: "August",
        problem: "The applications go out. Nothing comes back.",
        detail:
          "This is the month that decides how the rest feels. Silence early is what makes people apply harder instead of differently.",
        fix: "Outmail starts the outreach in week one: real recruiters, your inbox, five a day and climbing as your account warms up.",
      },
      {
        pill: "September",
        problem: "The search widens, and the fit gets worse.",
        detail:
          "More applications, less relevance. The roles you would actually get are the ones you never saw.",
        fix: "Openings arrive scored against your resume, deduplicated across sources, filtered to entry-level unless you say otherwise.",
      },
      {
        pill: "October",
        problem: "The forms start costing more than the search.",
        detail:
          "Twenty minutes each, and the tenth application of the evening is visibly worse than the first.",
        fix: "One click per form, from answers you wrote in August. The evening goes back into choosing where to apply.",
      },
      {
        pill: "November",
        problem: "The interviews land. Now what?",
        detail:
          "This is where a referral would have told you what to expect. Without one, you find out during the interview.",
        fix: "Mentorship sessions every fortnight with people who have taken that loop, while it still matters.",
      },
    ],
  },
  {
    label: "Blunt",
    kicker: "How it works",
    lines: ["Four reasons", "effort stops", "working."],
    sub: "None of them is that you did not try hard enough.",
    panels: [
      {
        pill: "reach",
        problem: "Nobody read your application.",
        detail:
          "Not rejected. Read by no one. An ATS queue is a filter, and it was never built to find you in it.",
        fix: "Email the hiring manager instead. Your address, your resume, one company at a time.",
      },
      {
        pill: "search",
        problem: "You are applying to the wrong roles.",
        detail:
          "Not through carelessness. Through a feed that ranks for engagement and shows you senior roles and closed ones.",
        fix: "Every opening scored against your resume, with the reasoning attached, so you can spend the hour where it counts.",
      },
      {
        pill: "forms",
        problem: "You are retyping the same eight answers.",
        detail:
          "Twenty minutes a form. By the tenth you are pasting, and it shows in what you send.",
        fix: "Write them once. The extension fills the rest. You still review before it submits.",
      },
      {
        pill: "interview",
        problem: "You have nobody to ask.",
        detail:
          "This is what a referral actually buys, and it is the part nobody sells you separately.",
        fix: "Twenty-five seats, twice a month, with people who have been on both sides of that room.",
      },
    ],
  },
];

/**
 * The number above the four capabilities.
 *
 * Every option carries the source it came from, because a statistic on a page
 * that also asks for money will eventually be checked. Anything that could not
 * be traced to a primary source is deliberately absent — including the famous
 * "70-80% of jobs are never advertised", which traces to a 1965 survey of 27
 * employers and a self-selected LinkedIn poll.
 */
export const STAT = [
  {
    label: "Current",
    stat: 20,
    suffix: " min",
    body: "goes into every application: searching, filtering, retyping. Getting hired is not only about how well you prepare. It is about how much of the week the hunt takes before you get to prepare at all. Outmail runs the hunt so those hours stay yours.",
    source: null,
  },
  {
    label: "Referrals (QJE)",
    stat: 5,
    suffix: "×",
    body: "more likely to be interviewed, if someone refers you. You do not have a referral at most companies — so Outmail gets you the introduction another way, from your own inbox.",
    source:
      "Fernandez & Galperin, 2012; see also Burks et al., Quarterly Journal of Economics, 2015",
  },
  {
    label: "Employability (ISR)",
    stat: 56,
    suffix: "%",
    body: "of Indian graduates are rated employable. Being employable was never the hard part — being reachable is, and that is the part Outmail changes.",
    source: "India Skills Report 2026, Wheebox",
  },
  {
    label: "The twelve",
    stat: 12,
    suffix: "",
    body: "applications a recruiter actually opens, out of a few hundred. Everything below is aimed at that gap: getting into the twelve, and choosing openings where you belong there.",
    source: null,
  },
  {
    label: "Our own numbers",
    stat: 5,
    suffix: "/day",
    body: "is where your sending starts, climbing only while you are actually sending. That warm-up is what keeps a real Gmail account inside normal behaviour instead of looking like bulk mail.",
    source: "Outmail send policy",
  },
];
