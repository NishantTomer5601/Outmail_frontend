"use client";
import { Info } from "lucide-react";

export function NoteBox({ children }) {
  return (
    <div className="flex gap-4 bg-[#6c00ff]/10 border border-[#6c00ff]/30 rounded-xl p-5 my-6">
      <Info className="text-[#AD46FF] flex-shrink-0 mt-0.5" size={20} />
      <p className="text-white/70 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
