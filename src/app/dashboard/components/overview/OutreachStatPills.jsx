import React from "react";
import { Mail, TrendingUp, Building, FileText } from "lucide-react";

const OutreachStatPills = ({ selectedPeriod }) => {
  const sentByPeriod = { '7': '40', '15': '81', '30': '159' };
  const companiesByPeriod = { '7': '8', '15': '16', '30': '30' };
  const stats = [
    {
      label: `Emails Sent (${selectedPeriod}d)`,
      value: sentByPeriod[selectedPeriod] || '40',
      icon: Mail,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15',
      border: 'border-purple-500/25',
    },
    {
      label: 'Total Emails Sent',
      value: '380',
      icon: TrendingUp,
      color: 'text-green-400',
      bg: 'bg-green-500/15',
      border: 'border-green-500/25',
    },
    {
      label: 'Companies Targeted',
      value: companiesByPeriod[selectedPeriod] || '8',
      icon: Building,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/15',
      border: 'border-cyan-500/25',
    },
    {
      label: 'Active Outreach',
      value: 'Cold Emails',
      icon: FileText,
      color: 'text-amber-400',
      bg: 'bg-amber-500/15',
      border: 'border-amber-500/25',
      truncate: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bg} ${stat.border} border backdrop-blur-md rounded-xl p-3 flex items-center gap-3`}
        >
          <div className="p-2 rounded-lg bg-white/10 flex-shrink-0">
            <stat.icon size={15} className={stat.color} />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-white/50 uppercase tracking-wide leading-tight">{stat.label}</p>
            <p className={`text-sm font-bold mt-0.5 ${stat.color} ${stat.truncate ? 'truncate' : ''}`}>{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OutreachStatPills;