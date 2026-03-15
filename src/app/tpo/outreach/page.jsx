"use client";
import { useState } from "react";
import TPOPageShell from "@/component/tpo/TPOPageShell";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { Mail, TrendingUp, MousePointerClick, MessageSquareReply, ArrowUpRight } from "lucide-react";

const monthlySent = [
  { id: "Emails Sent", color: "#7C3AED", data: [{ x:"Oct",y:2800},{x:"Nov",y:3400},{x:"Dec",y:2900},{x:"Jan",y:4100},{x:"Feb",y:4800},{x:"Mar",y:5260}] },
  { id: "Replies",     color: "#10B981", data: [{ x:"Oct",y:180 },{x:"Nov",y:230 },{x:"Dec",y:195 },{x:"Jan",y:310 },{x:"Feb",y:360 },{x:"Mar",y:394 }] },
];

const openByDayData = [
  { day:"Mon",rate:58},{day:"Tue",rate:72},{day:"Wed",rate:69},{day:"Thu",rate:74},{day:"Fri",rate:61},{day:"Sat",rate:42},{day:"Sun",rate:31},
];

const topTemplates = [
  { name: "Funding Trigger Outreach", sent: 1840, opens: 1380, replies: 142, replyRate: 7.7 },
  { name: "Alumni Warm Intro",         sent: 960,  opens: 780,  replies: 98,  replyRate: 10.2 },
  { name: "Role-Specific Cold Email",  sent: 1240, opens: 810,  replies: 87,  replyRate: 7.0 },
  { name: "Referral Request",          sent: 680,  opens: 490,  replies: 71,  replyRate: 10.4 },
  { name: "Generic Follow-up",         sent: 2100, opens: 980,  replies: 48,  replyRate: 2.3 },
];

const topStudents = [
  { name:"Karan Verma",  emails:134, replies:13, rate:9.7  },
  { name:"Arjun Mehta",  emails:142, replies:11, rate:7.7  },
  { name:"Vikram Rao",   emails:128, replies:10, rate:7.8  },
  { name:"Dev Patel",    emails:109, replies:8,  rate:7.3  },
  { name:"Priya Nair",   emails:118, replies:9,  rate:7.6  },
];

export default function OutreachPage() {
  return (
    <TPOPageShell title="Cold Outreach" subtitle="College-wide email campaign performance and recruiter engagement metrics">

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon:Mail,                  label:"Total Emails Sent",    value:"28,460", sub:"Across all students",   color:"purple" },
          { icon:MousePointerClick,     label:"Avg Open Rate",         value:"64%",    sub:"Industry avg: 21%",    color:"blue"   },
          { icon:MessageSquareReply,    label:"Total Replies",         value:"1,934",  sub:"Reply rate: 6.8%",     color:"green"  },
          { icon:TrendingUp,            label:"Interviews Secured",    value:"187",    sub:"From cold outreach",   color:"orange" },
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

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Monthly Email Volume vs. Replies</h3>
          <p className="text-xs text-gray-400 mb-4">Oct 2025 – Mar 2026</p>
          <div className="h-60">
            <ResponsiveLine
              data={monthlySent}
              margin={{top:10,right:20,bottom:50,left:50}}
              axisBottom={{tickSize:0,tickPadding:10}}
              axisLeft={{tickSize:0,tickPadding:8,tickValues:5}}
              colors={d=>d.color}
              curve="monotoneX"
              enablePoints
              pointSize={7}
              pointBorderWidth={2}
              pointBorderColor={{from:"serieColor"}}
              enableGridX={false}
              theme={{textColor:"#6B7280",fontSize:11,grid:{line:{stroke:"#F3F4F6"}}}}
              legends={[{anchor:"bottom",direction:"row",translateY:46,itemWidth:120,itemHeight:14,itemTextColor:"#6B7280",symbolSize:8,symbolShape:"circle"}]}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Best Days to Send Cold Emails</h3>
          <p className="text-xs text-gray-400 mb-4">Average open rate by day of week</p>
          <div className="h-60">
            <ResponsiveBar
              data={openByDayData}
              keys={["rate"]}
              indexBy="day"
              margin={{top:10,right:10,bottom:40,left:40}}
              padding={0.35}
              colors={d=>d.index===1||d.index===3?"#7C3AED":"#C4B5FD"}
              borderRadius={4}
              axisBottom={{tickSize:0,tickPadding:8}}
              axisLeft={{tickSize:0,tickPadding:8,tickValues:4}}
              enableGridX={false}
              enableLabel={false}
              theme={{textColor:"#6B7280",fontSize:11,grid:{line:{stroke:"#F3F4F6"}}}}
            />
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Template Performance */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Email Template Performance</h3>
            <p className="text-xs text-gray-400 mt-0.5">Which templates are driving recruiter replies</p>
          </div>
          <div className="divide-y divide-gray-50">
            {topTemplates.map((t)=>(
              <div key={t.name} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-medium text-gray-800 truncate">{t.name}</p>
                  <div className="flex gap-3 mt-1 text-xs text-gray-400">
                    <span>{t.sent.toLocaleString()} sent</span>
                    <span>{t.opens.toLocaleString()} opens</span>
                    <span>{t.replies} replies</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                  t.replyRate>=8?"bg-green-100 text-green-700":t.replyRate>=5?"bg-yellow-100 text-yellow-700":"bg-red-50 text-red-500"
                }`}>
                  {t.replyRate}% reply
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Students */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Top Outreach Performers</h3>
            <p className="text-xs text-gray-400 mt-0.5">Students with highest recruiter reply rates</p>
          </div>
          <div className="divide-y divide-gray-50">
            {topStudents.map((s,i)=>(
              <div key={s.name} className="px-6 py-4 flex items-center gap-4">
                <span className="text-lg font-bold text-gray-200 w-6 text-center">{i+1}</span>
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {s.name.split(" ").map(n=>n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.emails} emails · {s.replies} replies</p>
                </div>
                <span className="text-sm font-bold text-purple-600">{s.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TPOPageShell>
  );
}
