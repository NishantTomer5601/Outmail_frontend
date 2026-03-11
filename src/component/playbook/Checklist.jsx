"use client";
import { CheckCircle2 } from "lucide-react";

export function Checklist({ items }) {
  return (
    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-5">
      <p className="text-xs text-emerald-400 font-syne uppercase tracking-[0.2em] mb-3">✓ Do</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-white/70 text-sm">
            <CheckCircle2
              className="text-emerald-400 flex-shrink-0 mt-0.5"
              size={16}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
