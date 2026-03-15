"use client";
import { useState } from "react";
import { ArrowUpDown, ChevronDown, Search } from "lucide-react";

const students = [
  { name: "Arjun Mehta",     branch: "CS",       emails: 142, openRate: 72, responses: 11, interviews: 3, jobs: 24, status: "active"   },
  { name: "Priya Nair",      branch: "CS",       emails: 118, openRate: 68, responses: 9,  interviews: 2, jobs: 18, status: "active"   },
  { name: "Rohan Sharma",    branch: "ECE",      emails: 95,  openRate: 61, responses: 6,  interviews: 1, jobs: 14, status: "active"   },
  { name: "Sneha Iyer",      branch: "Mech",     emails: 87,  openRate: 58, responses: 5,  interviews: 1, jobs: 12, status: "active"   },
  { name: "Karan Verma",     branch: "CS",       emails: 134, openRate: 74, responses: 13, interviews: 4, jobs: 31, status: "active"   },
  { name: "Ananya Kapoor",   branch: "EEE",      emails: 76,  openRate: 55, responses: 4,  interviews: 0, jobs: 9,  status: "inactive" },
  { name: "Dev Patel",       branch: "CS",       emails: 109, openRate: 66, responses: 8,  interviews: 2, jobs: 20, status: "active"   },
  { name: "Meera Krishnan",  branch: "Civil",    emails: 43,  openRate: 48, responses: 2,  interviews: 0, jobs: 6,  status: "inactive" },
  { name: "Vikram Rao",      branch: "CS",       emails: 128, openRate: 70, responses: 10, interviews: 3, jobs: 22, status: "active"   },
  { name: "Isha Gupta",      branch: "BioTech",  emails: 62,  openRate: 53, responses: 3,  interviews: 0, jobs: 8,  status: "inactive" },
];

const statusBadge = (s) =>
  s === "active"
    ? "bg-green-100 text-green-700"
    : "bg-gray-100 text-gray-500";

export default function TPOStudentTable() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.branch.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || s.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Student Performance Tracker</h3>
          <p className="text-xs text-gray-400 mt-0.5">Individual outreach activity for all subscribed students</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <Search size={12} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="text-xs bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none w-28"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-600 focus:outline-none"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Student", "Branch", "Emails", "Open Rate", "Replies", "Interviews", "Jobs Tracked", "Status"].map((h) => (
                <th key={h} className="text-left text-xs font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    {h}
                    {["Emails", "Open Rate", "Replies"].includes(h) && (
                      <ArrowUpDown size={10} className="text-gray-300" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.name} className="border-t border-gray-50 hover:bg-gray-50 transition">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="font-medium text-gray-800 whitespace-nowrap">{s.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs">{s.branch}</td>
                <td className="px-5 py-3 font-semibold text-gray-800">{s.emails}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-purple-500"
                        style={{ width: `${s.openRate}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{s.openRate}%</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-700">{s.responses}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs font-semibold ${s.interviews > 0 ? "text-green-600" : "text-gray-400"}`}>
                    {s.interviews > 0 ? `${s.interviews} ✓` : "—"}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-700">{s.jobs}</td>
                <td className="px-5 py-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusBadge(s.status)}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-100 flex items-center justify-between">
        <p className="text-xs text-gray-400">Showing {filtered.length} of {students.length} students</p>
        <button className="text-xs text-purple-600 font-medium hover:underline">View all →</button>
      </div>
    </div>
  );
}
