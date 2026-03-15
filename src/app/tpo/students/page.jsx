"use client";
import { useState } from "react";
import TPOPageShell from "@/component/tpo/TPOPageShell";
import { Search, Filter, Download, Mail, TrendingUp, BriefcaseBusiness, ArrowUpRight } from "lucide-react";

const ALL_STUDENTS = [
  { name: "Arjun Mehta",    branch: "CS",       year: "Final", emails: 142, openRate: 72, responses: 11, interviews: 3, jobs: 24, score: 94, joined: "12 Aug 2025", status: "active"   },
  { name: "Karan Verma",    branch: "CS",       year: "Final", emails: 134, openRate: 74, responses: 13, interviews: 4, jobs: 31, score: 97, joined: "08 Aug 2025", status: "active"   },
  { name: "Vikram Rao",     branch: "CS",       year: "Final", emails: 128, openRate: 70, responses: 10, interviews: 3, jobs: 22, score: 91, joined: "15 Aug 2025", status: "active"   },
  { name: "Priya Nair",     branch: "CS",       year: "Final", emails: 118, openRate: 68, responses: 9,  interviews: 2, jobs: 18, score: 88, joined: "10 Aug 2025", status: "active"   },
  { name: "Dev Patel",      branch: "CS",       year: "Final", emails: 109, openRate: 66, responses: 8,  interviews: 2, jobs: 20, score: 85, joined: "19 Aug 2025", status: "active"   },
  { name: "Rohan Sharma",   branch: "ECE",      year: "Final", emails: 95,  openRate: 61, responses: 6,  interviews: 1, jobs: 14, score: 76, joined: "22 Aug 2025", status: "active"   },
  { name: "Sneha Iyer",     branch: "Mech",     year: "Final", emails: 87,  openRate: 58, responses: 5,  interviews: 1, jobs: 12, score: 72, joined: "20 Aug 2025", status: "active"   },
  { name: "Ananya Kapoor",  branch: "EEE",      year: "Final", emails: 76,  openRate: 55, responses: 4,  interviews: 0, jobs: 9,  score: 61, joined: "25 Aug 2025", status: "inactive" },
  { name: "Isha Gupta",     branch: "BioTech",  year: "Final", emails: 62,  openRate: 53, responses: 3,  interviews: 0, jobs: 8,  score: 54, joined: "30 Aug 2025", status: "inactive" },
  { name: "Meera Krishnan", branch: "Civil",    year: "Final", emails: 43,  openRate: 48, responses: 2,  interviews: 0, jobs: 6,  score: 41, joined: "05 Sep 2025", status: "inactive" },
  { name: "Aditya Bose",    branch: "CS",       year: "Pre-final", emails: 98, openRate: 64, responses: 7, interviews: 1, jobs: 16, score: 80, joined: "02 Sep 2025", status: "active" },
  { name: "Riya Saxena",    branch: "ECE",      year: "Pre-final", emails: 71, openRate: 59, responses: 5, interviews: 0, jobs: 11, score: 65, joined: "08 Sep 2025", status: "active" },
];

const scoreTier = (s) => {
  if (s >= 90) return { label: "Top Performer", cls: "bg-purple-100 text-purple-700" };
  if (s >= 70) return { label: "On Track",      cls: "bg-green-100 text-green-700"   };
  if (s >= 50) return { label: "Needs Nudge",   cls: "bg-yellow-100 text-yellow-700" };
  return { label: "At Risk", cls: "bg-red-100 text-red-600" };
};

export default function StudentsPage() {
  const [search, setSearch]   = useState("");
  const [branch, setBranch]   = useState("all");
  const [status, setStatus]   = useState("all");
  const [selected, setSelected] = useState(null);

  const branches = ["all", ...Array.from(new Set(ALL_STUDENTS.map((s) => s.branch)))];

  const filtered = ALL_STUDENTS.filter((s) => {
    const q = search.toLowerCase();
    return (
      (branch === "all" || s.branch === branch) &&
      (status === "all" || s.status === status) &&
      (s.name.toLowerCase().includes(q) || s.branch.toLowerCase().includes(q))
    );
  });

  return (
    <TPOPageShell title="Students" subtitle="All subscribed students, their engagement scores and off-campus activity">

      {/* Summary bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Students",    value: ALL_STUDENTS.length,                              color: "purple" },
          { label: "Active",            value: ALL_STUDENTS.filter(s=>s.status==="active").length, color: "green"  },
          { label: "Top Performers",    value: ALL_STUDENTS.filter(s=>s.score>=90).length,       color: "blue"   },
          { label: "Need Attention",    value: ALL_STUDENTS.filter(s=>s.score<50).length,        color: "red"    },
        ].map(({ label, value, color }) => (
          <div key={label} className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm`}>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className={`text-xs font-medium mt-0.5 text-${color}-600`}>{label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-48">
            <Search size={13} className="text-gray-400" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name or branch…" className="text-sm bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none w-full" />
          </div>
          <select value={branch} onChange={e=>setBranch(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none">
            {branches.map(b=><option key={b} value={b}>{b==="all"?"All Branches":b}</option>)}
          </select>
          <select value={status} onChange={e=>setStatus(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-600 focus:outline-none">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition">
            <Download size={13}/> Export
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {["Student","Branch","Year","Emails","Open Rate","Replies","Interviews","Jobs","Score","Status","Actions"].map(h=>(
                  <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const tier = scoreTier(s.score);
                return (
                  <tr key={s.name} className="border-t border-gray-50 hover:bg-purple-50/30 transition cursor-pointer" onClick={()=>setSelected(s===selected?null:s)}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {s.name.split(" ").map(n=>n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{s.name}</p>
                          <p className="text-xs text-gray-400">Joined {s.joined}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{s.branch}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{s.year}</td>
                    <td className="px-5 py-3 font-semibold text-gray-800">{s.emails}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-purple-500" style={{width:`${s.openRate}%`}}/>
                        </div>
                        <span className="text-xs text-gray-600">{s.openRate}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-700">{s.responses}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold ${s.interviews>0?"text-green-600":"text-gray-400"}`}>
                        {s.interviews>0?`${s.interviews} ✓`:"—"}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-700">{s.jobs}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-gray-800">{s.score}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tier.cls}`}>{tier.label}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${s.status==="active"?"bg-green-100 text-green-700":"bg-gray-100 text-gray-500"}`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <button className="text-xs text-purple-600 font-medium hover:underline">View</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Expanded row detail */}
        {selected && (
          <div className="border-t border-purple-100 bg-purple-50/40 px-6 py-5">
            <p className="text-sm font-semibold text-gray-800 mb-3">{selected.name} — Activity Breakdown</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Mail,            label: "Emails Sent",     value: selected.emails       },
                { icon: TrendingUp,      label: "Open Rate",        value: `${selected.openRate}%` },
                { icon: ArrowUpRight,    label: "Recruiter Replies",value: selected.responses    },
                { icon: BriefcaseBusiness, label: "Jobs Tracked",  value: selected.jobs         },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-lg border border-purple-100 px-4 py-3 flex items-center gap-3">
                  <Icon size={16} className="text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-400">{label}</p>
                    <p className="text-base font-bold text-gray-900">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 py-3 border-t border-gray-100 flex justify-between items-center">
          <p className="text-xs text-gray-400">Showing {filtered.length} of {ALL_STUDENTS.length} students</p>
          <button className="text-xs text-purple-600 font-medium hover:underline">Invite more students →</button>
        </div>
      </div>
    </TPOPageShell>
  );
}
