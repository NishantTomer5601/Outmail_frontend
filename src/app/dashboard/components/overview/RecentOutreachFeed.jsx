import React from "react";
import { Clock, Mail } from "lucide-react";

const RecentOutreachFeed = () => {
  const activities = [
    { company: 'Swiggy', template: 'Tech Outreach', time: '1h ago' },
    { company: 'Paytm', template: 'Tech Outreach', time: '2h ago' },
    { company: 'Meesho', template: 'Tech Outreach', time: '3h ago' },
    { company: 'CRED', template: 'Tech Outreach', time: '4h ago' },
    { company: 'Razorpay', template: 'Tech Outreach', time: '5h ago' },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 h-full flex flex-col">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
          <Clock size={13} className="text-cyan-400" />
          Recent Outreach
        </h3>
        <p className="text-[11px] text-white/40">Last 5 emails sent</p>
      </div>
      <div className="flex-1 overflow-hidden space-y-1">
        {activities.map((activity, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 py-1.5 border-b border-white/5 last:border-0"
          >
            <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <Mail size={12} className="text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{activity.company}</p>
              <p className="text-[10px] text-white/40 truncate">{activity.template}</p>
            </div>
            <span className="text-[10px] text-white/35 flex-shrink-0">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOutreachFeed;