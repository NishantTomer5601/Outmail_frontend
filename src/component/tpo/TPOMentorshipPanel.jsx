"use client";
import { Star, GraduationCap, CalendarCheck, Users } from "lucide-react";

const sessions = [
  {
    mentor: "Aditya Bahl",
    role: "SWE @ Google",
    topic: "Cold Email Mastery",
    date: "28 Feb 2026",
    attendees: 18,
    rating: 4.9,
    reviews: [
      { name: "Arjun M.", text: "Completely changed how I write outreach.", stars: 5 },
      { name: "Priya N.", text: "Super actionable and tailored advice.", stars: 5 },
    ],
  },
  {
    mentor: "Neha Kapoor",
    role: "PM @ Razorpay",
    topic: "Resume for Off-Campus",
    date: "22 Feb 2026",
    attendees: 24,
    rating: 4.7,
    reviews: [
      { name: "Karan V.", text: "Got 3 callbacks after implementing her tips.", stars: 5 },
      { name: "Sneha I.", text: "Very structured and real-world focused.", stars: 4 },
    ],
  },
  {
    mentor: "Rahul Jain",
    role: "Data Scientist @ CRED",
    topic: "Cracking Data Roles",
    date: "14 Feb 2026",
    attendees: 21,
    rating: 4.6,
    reviews: [
      { name: "Dev P.", text: "Loved the case study walkthrough.", stars: 5 },
      { name: "Vikram R.", text: "Good content, could go deeper on SQL.", stars: 4 },
    ],
  },
];

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={i <= Math.round(count) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
    </div>
  );
}

export default function TPOMentorshipPanel() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-0.5">
          <GraduationCap size={16} className="text-purple-600" />
          <h3 className="text-sm font-semibold text-gray-900">Mentorship Sessions</h3>
        </div>
        <p className="text-xs text-gray-400">Recent sessions & student feedback</p>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {[
          { icon: CalendarCheck, label: "Sessions", value: "638" },
          { icon: Users,         label: "Attended",  value: "1,840" },
          { icon: Star,          label: "Avg Rating", value: "4.7" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center py-4 gap-1">
            <Icon size={14} className="text-purple-500" />
            <p className="text-base font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Session List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-50 px-6 py-2">
        {sessions.map((s) => (
          <div key={s.mentor} className="py-4">
            {/* Mentor */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {s.mentor.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{s.mentor}</p>
                  <p className="text-xs text-gray-400">{s.role}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <StarRow count={s.rating} />
                  <span className="text-xs font-semibold text-gray-700">{s.rating}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{s.attendees} attended</p>
              </div>
            </div>

            {/* Topic + Date */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-md font-medium">{s.topic}</span>
              <span className="text-xs text-gray-400">{s.date}</span>
            </div>

            {/* Reviews */}
            <div className="space-y-2">
              {s.reviews.map((r) => (
                <div key={r.name} className="bg-gray-50 rounded-lg px-3 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-medium text-gray-700">{r.name}</p>
                    <StarRow count={r.stars} />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-100">
        <button className="text-xs text-purple-600 font-medium hover:underline">View all sessions →</button>
      </div>
    </div>
  );
}
