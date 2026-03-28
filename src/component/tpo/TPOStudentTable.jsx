"use client";
import React, { useState, useEffect } from "react";
import { ArrowUpDown, Search } from "lucide-react";
import { api } from "@/lib/api";

const statusBadge = (s) =>
  s === "active"
    ? "bg-green-100 text-green-700"
    : "bg-gray-100 text-gray-500";

export default function TPOStudentTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/admin/students');
        if (response.data.success) {
          setStudents(response.data.students || []);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filtered = students.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.branch.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
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
            {loading ? (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-gray-400 text-xs">
                  Loading students...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-gray-400 text-xs">
                  No students found
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id} className="border-t border-gray-50 hover:bg-gray-50 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800 whitespace-nowrap">{s.name}</span>
                        <span className="text-[10px] text-gray-400 truncate max-w-[120px]">{s.email}</span>
                      </div>
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
              ))
            )}
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
