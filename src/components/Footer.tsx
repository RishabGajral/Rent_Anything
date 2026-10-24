"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

export default function Footer() {
  const { triggerExcitement } = useApp();

  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://rentanything.in";
    const promoMsg = encodeURIComponent(
      "Hey! 👋 We are launching Rent Anything soon in Bengaluru 🚀\n\n" +
      "It's a free, map-first way to rent cameras, camping gear, tools, and projectors directly from neighbours nearby — no buying expensive things you only need for a single weekend!\n\n" +
      "Check it out and vote to bring it to our neighbourhood first:\n" +
      url
    );
    window.open(`https://wa.me/?text=${promoMsg}`, "_blank");
  };

  return (
    <footer className="py-14 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <svg className="h-8 w-8" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="60" height="60" rx="18" fill="#10B981" />
              <circle cx="32" cy="28" r="9" fill="#064E3B" />
              <circle cx="32" cy="28" r="4" fill="#A7F3D0" />
            </svg>
            <div>
              <div className="font-extrabold text-white text-base">Rent Anything Bengaluru</div>
              <div className="text-xs text-slate-400">Map-first peer-to-peer item rentals</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={triggerExcitement}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all active:scale-95"
            >
              🔥 Add Your Excitement Vote
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              📲 Share on WhatsApp
            </button>
            <a
              href="#live-map-demo"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all"
            >
              🗺️ Map Preview
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            Built with ❤️ for Bengaluru neighbourhoods · Indiranagar · Koramangala · HSR Layout · Whitefield
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Next.js + Supabase Ready</span>
            <span>•</span>
            <span>OpenStreetMap &amp; MapLibre</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
