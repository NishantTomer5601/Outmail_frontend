"use client";

export function ToolsBox({ tools, title }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
      {title && (
        <p className="text-xs text-[#AD46FF] font-syne uppercase tracking-[0.2em] mb-3">
          {title}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {tools.map((tool, i) => (
          <span
            key={i}
            className="text-sm text-white/80 bg-[#6c00ff]/20 border border-[#6c00ff]/30 px-3 py-1.5 rounded-full"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
