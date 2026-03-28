import React, { useState, useEffect } from "react";
import { Clock, Mail } from "lucide-react";
import { api } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

const RecentOutreachFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/student/analytics');
        if (response.data.success) {
          setActivities(response.data.recentOutreach || []);
        }
      } catch (error) {
        console.error("Failed to fetch recent outreach:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

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
        {loading ? (
          <div className="flex items-center justify-center h-20 text-white/30 text-xs">Loading...</div>
        ) : activities.length === 0 ? (
          <div className="flex items-center justify-center h-20 text-white/30 text-xs">No recent activity</div>
        ) : (
          activities.map((activity, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 py-1.5 border-b border-white/5 last:border-0"
            >
              <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Mail size={12} className="text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{activity.company}</p>
                <p className="text-[10px] text-white/40 truncate">{activity.subject}</p>
              </div>
              <span className="text-[10px] text-white/35 flex-shrink-0">
                {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentOutreachFeed;