"use client";
import {
  Users,
  Mail,
  BriefcaseBusiness,
  TrendingUp,
  GraduationCap,
  Star,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const cards = [
  {
    label: "Total Students on Outmail",
    value: "312",
    sub: "+18 joined this month",
    trend: "up",
    icon: Users,
    color: "purple",
  },
  {
    label: "Total Cold Emails Sent",
    value: "28,460",
    sub: "Avg 91 emails / student",
    trend: "up",
    icon: Mail,
    color: "blue",
  },
  {
    label: "Avg Open Rate",
    value: "64%",
    sub: "Industry avg: 21%",
    trend: "up",
    icon: TrendingUp,
    color: "green",
  },
  {
    label: "Total Job Openings Tracked",
    value: "4,812",
    sub: "Avg 15 openings / student",
    trend: "up",
    icon: BriefcaseBusiness,
    color: "orange",
  },
  {
    label: "Mentor Sessions Held",
    value: "638",
    sub: "Across 24 expert mentors",
    trend: "up",
    icon: GraduationCap,
    color: "teal",
  },
  {
    label: "Avg Mentor Rating",
    value: "4.7 / 5",
    sub: "Based on 510 reviews",
    trend: "up",
    icon: Star,
    color: "yellow",
  },
  {
    label: "Recruiter Responses Received",
    value: "1,934",
    sub: "Response rate: 6.8%",
    trend: "up",
    icon: ArrowUpRight,
    color: "indigo",
  },
  {
    label: "Students with ≥1 Interview",
    value: "187",
    sub: "60% of active students",
    trend: "up",
    icon: TrendingUp,
    color: "pink",
  },
];

const colorMap = {
  purple: { bg: "bg-purple-50", text: "text-purple-600", badge: "bg-purple-100 text-purple-700" },
  blue:   { bg: "bg-blue-50",   text: "text-blue-600",   badge: "bg-blue-100 text-blue-700" },
  green:  { bg: "bg-green-50",  text: "text-green-600",  badge: "bg-green-100 text-green-700" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", badge: "bg-orange-100 text-orange-700" },
  teal:   { bg: "bg-teal-50",   text: "text-teal-600",   badge: "bg-teal-100 text-teal-700" },
  yellow: { bg: "bg-yellow-50", text: "text-yellow-600", badge: "bg-yellow-100 text-yellow-700" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", badge: "bg-indigo-100 text-indigo-700" },
  pink:   { bg: "bg-pink-50",   text: "text-pink-600",   badge: "bg-pink-100 text-pink-700" },
};

export default function TPOOverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map(({ label, value, sub, trend, icon: Icon, color }) => {
        const c = colorMap[color];
        return (
          <div key={label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2.5 rounded-lg ${c.bg}`}>
                <Icon size={18} className={c.text} />
              </div>
              {trend === "up" ? (
                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${c.badge}`}>
                  <ArrowUpRight size={11} /> Up
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                  <ArrowDownRight size={11} /> Down
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs font-medium text-gray-600 mt-0.5 leading-tight">{label}</p>
            <p className="text-xs text-gray-400 mt-1">{sub}</p>
          </div>
        );
      })}
    </div>
  );
}
