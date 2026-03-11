"use client";
import { Clock } from "lucide-react";

export function TimeBox({ time }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#6c00ff]/15 border border-[#6c00ff]/30 text-[#AD46FF] text-sm px-4 py-2 rounded-full mb-6">
      <Clock size={14} />
      <span className="font-syne">{time}</span>
    </div>
  );
}
