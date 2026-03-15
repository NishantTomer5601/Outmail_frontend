"use client";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

// ── 1. Email activity over 6 months ────────────────────────────────────────
const emailTrendData = [
  {
    id: "Emails Sent",
    color: "#7C3AED",
    data: [
      { x: "Oct", y: 2800 },
      { x: "Nov", y: 3400 },
      { x: "Dec", y: 2900 },
      { x: "Jan", y: 4100 },
      { x: "Feb", y: 4800 },
      { x: "Mar", y: 5200 },
    ],
  },
  {
    id: "Responses",
    color: "#10B981",
    data: [
      { x: "Oct", y: 180 },
      { x: "Nov", y: 230 },
      { x: "Dec", y: 195 },
      { x: "Jan", y: 310 },
      { x: "Feb", y: 360 },
      { x: "Mar", y: 390 },
    ],
  },
];

// ── 2. Top sectors targeted by students ────────────────────────────────────
const sectorData = [
  { sector: "SWE", count: 112 },
  { sector: "Product", count: 78 },
  { sector: "Data / ML", count: 64 },
  { sector: "Finance", count: 48 },
  { sector: "Consulting", count: 35 },
  { sector: "DevOps", count: 29 },
];

// ── 3. Student engagement funnel ───────────────────────────────────────────
const funnelData = [
  { id: "Email Sent", value: 312, color: "#7C3AED" },
  { id: "Opened", value: 200, color: "#6D28D9" },
  { id: "Replied", value: 94, color: "#A78BFA" },
  { id: "Interviewed", value: 52, color: "#C4B5FD" },
  { id: "Offer", value: 21, color: "#DDD6FE" },
];

// ── 4. Outreach by top companies ───────────────────────────────────────────
const companyData = [
  { company: "Google", emails: 940, replies: 58 },
  { company: "Microsoft", emails: 820, replies: 64 },
  { company: "Razorpay", emails: 610, replies: 52 },
  { company: "Meesho", emails: 540, replies: 48 },
  { company: "Zepto", emails: 490, replies: 37 },
  { company: "Goldman", emails: 380, replies: 22 },
];

export default function TPOCharts() {
  return (
    <div className="space-y-6">

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Email Trend Line Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-900">Email Activity — Last 6 Months</h3>
            <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">Oct → Mar</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">Total emails sent by your students vs. recruiter responses</p>
          <div className="h-64">
            <ResponsiveLine
              data={emailTrendData}
              margin={{ top: 10, right: 20, bottom: 50, left: 50 }}
              axisBottom={{ tickRotation: 0, tickSize: 0, tickPadding: 10 }}
              axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 5 }}
              colors={(d) => d.color}
              curve="monotoneX"
              enablePoints
              pointSize={7}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              enableGridX={false}
              gridYValues={5}
              theme={{ textColor: "#6B7280", fontSize: 11, grid: { line: { stroke: "#F3F4F6" } } }}
              legends={[{
                anchor: "bottom",
                direction: "row",
                translateY: 46,
                itemWidth: 120,
                itemHeight: 14,
                itemTextColor: "#6B7280",
                symbolSize: 8,
                symbolShape: "circle",
              }]}
            />
          </div>
        </div>

        {/* Sector Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-900">Outreach by Industry Sector</h3>
            <span className="text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2 py-1 rounded-md">No. of students</span>
          </div>
          <p className="text-xs text-gray-400 mb-4">How your students are diversifying their cold outreach targets</p>
          <div className="h-64">
            <ResponsiveBar
              data={sectorData}
              keys={["count"]}
              indexBy="sector"
              margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
              padding={0.35}
              colors={["#7C3AED", "#6D28D9", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE"]}
              colorBy="indexValue"
              borderRadius={4}
              axisBottom={{ tickSize: 0, tickPadding: 8 }}
              axisLeft={{ tickSize: 0, tickPadding: 8, tickValues: 4 }}
              enableGridX={false}
              enableLabel={false}
              theme={{ textColor: "#6B7280", fontSize: 11, grid: { line: { stroke: "#F3F4F6" } } }}
            />
          </div>
        </div>

      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Engagement Funnel Pie */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Recruitment Funnel</h3>
          <p className="text-xs text-gray-400 mb-4">From cold email → offer across your cohort</p>
          <div className="h-52">
            <ResponsivePie
              data={funnelData}
              colors={(d) => d.data.color}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              innerRadius={0.55}
              padAngle={2}
              cornerRadius={3}
              enableArcLabels={false}
              enableArcLinkLabels={false}
              theme={{ textColor: "#6B7280", fontSize: 11 }}
            />
          </div>
          <div className="mt-3 space-y-1.5">
            {funnelData.map((d) => (
              <div key={d.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-gray-600">{d.id}</span>
                </div>
                <span className="font-semibold text-gray-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companies Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Top Companies Targeted</h3>
          <p className="text-xs text-gray-400 mb-5">Companies receiving the most outreach from your students</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-400 pb-3">Company</th>
                <th className="text-right text-xs font-medium text-gray-400 pb-3">Emails Sent</th>
                <th className="text-right text-xs font-medium text-gray-400 pb-3">Replies</th>
                <th className="text-right text-xs font-medium text-gray-400 pb-3">Reply Rate</th>
                <th className="text-right text-xs font-medium text-gray-400 pb-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {companyData.map((row, i) => {
                const rate = ((row.replies / row.emails) * 100).toFixed(1);
                return (
                  <tr key={row.company} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="py-3 flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 text-xs font-bold flex items-center justify-center">
                        {row.company[0]}
                      </span>
                      <span className="font-medium text-gray-800">{row.company}</span>
                    </td>
                    <td className="py-3 text-right text-gray-600">{row.emails.toLocaleString()}</td>
                    <td className="py-3 text-right text-gray-600">{row.replies}</td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        parseFloat(rate) >= 7 ? "bg-green-100 text-green-700" :
                        parseFloat(rate) >= 5 ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-50 text-red-600"
                      }`}>
                        {rate}%
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end">
                        <div className="h-6 w-16 flex items-end gap-px">
                          {[3, 5, 4, 7, 6, 8].map((h, j) => (
                            <div
                              key={j}
                              className="flex-1 rounded-sm bg-purple-400 opacity-70"
                              style={{ height: `${h * 8}%` }}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
