"use client";
import { useState } from "react";
import TPOPageShell from "@/component/tpo/TPOPageShell";
import { GraduationCap, Users, Star, CalendarDays, Clock, ChevronDown, ChevronUp } from "lucide-react";

const MENTORS = [
  {
    name:"Aditya Bahl",     role:"SWE @ Google",          domain:"Software Engineering",
    sessions:12, students:186, avgRating:4.9,
    bio:"Ex-Amazon, ex-Flipkart. 8 YOE. Specialises in system design and cold outreach for product companies.",
    upcoming:"15 Mar 2026 · Cold Email Masterclass",
    past:[
      { topic:"Cold Email Mastery",      date:"28 Feb 2026", attended:18, rating:4.9,
        reviews:[{ by:"Arjun M.",  text:"Best session I've attended. Got 3 replies the next day." },{ by:"Karan V.", text:"Super actionable tips, totally worth it." }]},
      { topic:"Cracking FAANG Interviews",date:"10 Feb 2026", attended:22, rating:4.8,
        reviews:[{ by:"Dev P.",   text:"Interview framework was excellent." },{ by:"Vikram R.", text:"Loved the mock Q&A." }]},
    ],
  },
  {
    name:"Neha Kapoor",     role:"PM @ Razorpay",         domain:"Product Management",
    sessions:9,  students:142, avgRating:4.7,
    bio:"BITS alum. Product leader with experience across fintech and consumer apps. Great at resume positioning.",
    upcoming:"18 Mar 2026 · Resume Workshop",
    past:[
      { topic:"Resume for Off-Campus",   date:"22 Feb 2026", attended:24, rating:4.7,
        reviews:[{ by:"Sneha I.", text:"Rewrote my resume using her framework — immediate results." },{ by:"Priya N.", text:"Very structured session." }]},
    ],
  },
  {
    name:"Rahul Jain",      role:"Data Scientist @ CRED",  domain:"Data & ML",
    sessions:7,  students:98,  avgRating:4.6,
    bio:"IIT Delhi grad. Works on credit-risk ML models. Coaches on SQL, case studies, and data interviews.",
    upcoming:"20 Mar 2026 · Data Interview Prep",
    past:[
      { topic:"Cracking Data Roles",     date:"14 Feb 2026", attended:21, rating:4.6,
        reviews:[{ by:"Aditya B.", text:"Case study walkthrough was gold." },{ by:"Riya S.", text:"Very deep on SQL tips." }]},
    ],
  },
];

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i=>(
        <Star key={i} size={11} className={i<=Math.round(count)?"text-yellow-400 fill-yellow-400":"text-gray-200 fill-gray-200"}/>
      ))}
    </div>
  );
}

export default function MentorshipPage() {
  const [expanded, setExpanded] = useState(null);

  return (
    <TPOPageShell title="Mentorship" subtitle="Expert sessions, attendance records, and student reviews">

      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon:CalendarDays, label:"Sessions Held",      value:"638", sub:"Since Aug 2025",           color:"purple" },
          { icon:Users,        label:"Total Attendances",  value:"1,840",sub:"Unique students: 208",    color:"blue"   },
          { icon:Star,         label:"Avg Session Rating", value:"4.7",  sub:"Based on 510 reviews",    color:"yellow" },
          { icon:Clock,        label:"Avg Session Length", value:"54 min",sub:"Per scheduled session",  color:"green"  },
        ].map(({icon:Icon,label,value,sub,color})=>(
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className={`inline-flex p-2.5 rounded-lg bg-${color}-50 mb-3`}>
              <Icon size={16} className={`text-${color}-600`}/>
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs font-medium text-gray-600 mt-0.5">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* Rating distribution */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Rating Distribution (510 reviews)</h3>
        <div className="space-y-2">
          {[
            { stars:5, count:310, pct:61 },
            { stars:4, count:148, pct:29 },
            { stars:3, count:36,  pct:7  },
            { stars:2, count:10,  pct:2  },
            { stars:1, count:6,   pct:1  },
          ].map(r=>(
            <div key={r.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-0.5 w-20 flex-shrink-0">
                {[1,2,3,4,5].map(i=>(
                  <Star key={i} size={10} className={i<=r.stars?"text-yellow-400 fill-yellow-400":"text-gray-200 fill-gray-200"}/>
                ))}
              </div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{width:`${r.pct}%`}}/>
              </div>
              <span className="text-xs text-gray-500 w-16 text-right">{r.count} ({r.pct}%)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor Cards */}
      <div className="space-y-4">
        {MENTORS.map((m)=>(
          <div key={m.name} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 font-bold text-base flex items-center justify-center flex-shrink-0">
                {m.name.split(" ").map(n=>n[0]).join("")}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <p className="font-semibold text-gray-900">{m.name}</p>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-md">{m.domain}</span>
                </div>
                <p className="text-sm text-gray-500">{m.role}</p>
                <p className="text-xs text-gray-400 mt-1">{m.bio}</p>
              </div>
              <div className="flex gap-6 text-center flex-shrink-0">
                <div>
                  <p className="text-xl font-bold text-gray-900">{m.sessions}</p>
                  <p className="text-xs text-gray-400">Sessions</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{m.students}</p>
                  <p className="text-xs text-gray-400">Attendances</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900">{m.avgRating}</p>
                  <p className="text-xs text-gray-400">Avg Rating</p>
                </div>
              </div>
              <button onClick={()=>setExpanded(expanded===m.name?null:m.name)} className="flex items-center gap-1 text-xs text-purple-600 font-medium border border-purple-200 rounded-lg px-3 py-1.5 hover:bg-purple-50 transition">
                {expanded===m.name?<><ChevronUp size={12}/>Hide</>:<><ChevronDown size={12}/>Sessions</>}
              </button>
            </div>

            {/* Upcoming */}
            <div className="px-6 py-3 bg-purple-50 border-t border-purple-100 flex items-center gap-2">
              <CalendarDays size={13} className="text-purple-500"/>
              <span className="text-xs text-purple-700 font-medium">Upcoming: {m.upcoming}</span>
            </div>

            {/* Expanded past sessions */}
            {expanded===m.name && (
              <div className="px-6 py-4 border-t border-gray-100 space-y-5">
                {m.past.map(s=>(
                  <div key={s.topic}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{s.topic}</p>
                        <p className="text-xs text-gray-400">{s.date} · {s.attended} attended</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <StarRow count={s.rating}/>
                        <span className="text-sm font-bold text-gray-700">{s.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {s.reviews.map(r=>(
                        <div key={r.by} className="bg-gray-50 rounded-lg px-3 py-2.5">
                          <p className="text-xs font-semibold text-gray-700 mb-0.5">{r.by}</p>
                          <p className="text-xs text-gray-500">"{r.text}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </TPOPageShell>
  );
}
