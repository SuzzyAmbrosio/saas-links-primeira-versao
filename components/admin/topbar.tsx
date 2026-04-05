"use client";

import { Bell, Mail, Search } from "lucide-react";

type TopbarProps = {
  userEmail?: string | null;
};

export default function Topbar({ userEmail }: TopbarProps) {
  const initial = (userEmail?.[0] || "S").toUpperCase();

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="top-search flex items-center px-3 text-slate-400">
        <Search size={16} />
        <input
          className="ml-2 w-full border-0 bg-transparent text-sm outline-none"
          placeholder=""
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="relative text-slate-500">
          <Mail size={18} />
        </div>

        <div className="relative text-slate-500">
          <Bell size={18} />
          <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            2
          </span>
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-xs font-bold text-white">
          {initial}
        </div>
      </div>
    </div>
  );
}
