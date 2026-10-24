"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { HERO_SCREENS } from "@/data/mockPins";

export default function Hero() {
  const { excitementCount, hasVoted, triggerExcitement, openLightbox } = useApp();
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);

  const screenTitles = ["1. Map Home", "2. Item Detail", "3. Safe Handover"];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Map-First Peer-to-Peer Rental Network
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Open the map. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Rent from neighbours
              </span>{" "}
              today.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-6">
              Need a <strong>50mm lens</strong> for a cousin&apos;s wedding, a <strong>camping tent</strong> for a weekend trek, a <strong>Bosch drill</strong> for 2 hours, or a <strong>projector</strong> for match night? Stop buying things you use once. Rent from verified neighbours 800m away.
            </p>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 italic mb-8 max-w-xl">
              &ldquo;Open the page and immediately see a map full of items available around your street — no login required to browse, and 100% free to use.&rdquo;
            </div>

            {/* Excitement Box */}
            <div className="w-full max-w-xl p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-emerald-500/30 shadow-xl mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                    Validation Meter
                  </div>
                  <div className="text-sm font-medium text-slate-200">
                    Are you excited for Rent Anything in Bengaluru?
                  </div>
                </div>
                <button
                  onClick={triggerExcitement}
                  className={`px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap ${
                    hasVoted
                      ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/40"
                      : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25"
                  }`}
                >
                  <span>🔥</span>
                  <span>{hasVoted ? "You're In! (#" + excitementCount.toLocaleString() + ")" : "Yes, I'm Excited!"}</span>
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>⚡ Live Bengaluru Count:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {excitementCount.toLocaleString()} locals excited
                </span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xl">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">0%</div>
                <div className="text-[11px] text-slate-400">Commission at Launch</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">90s</div>
                <div className="text-[11px] text-slate-400">To List Any Item</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-base sm:text-lg font-bold text-emerald-400 font-mono">±150m</div>
                <div className="text-[11px] text-slate-400">Privacy Fuzzy Radius</div>
              </div>
            </div>
          </div>

          {/* Right Column: Phone Screen Mockup Switcher */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-[36px] p-3 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-slate-700 shadow-2xl">
              <div
                className="overflow-hidden rounded-[28px] bg-slate-950 relative group cursor-pointer"
                onClick={() => openLightbox(HERO_SCREENS[activeScreenIndex], screenTitles[activeScreenIndex])}
              >
                <img
                  src={HERO_SCREENS[activeScreenIndex]}
                  alt="Rent Anything Bengaluru Screen"
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-102"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-white gap-1.5 backdrop-blur-xs">
                  <span>🔍 Click to expand</span>
                </div>
              </div>

              {/* Screen Tab Buttons */}
              <div className="grid grid-cols-3 gap-1.5 mt-3">
                {screenTitles.map((title, idx) => (
                  <button
                    key={title}
                    onClick={() => setActiveScreenIndex(idx)}
                    className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all ${
                      activeScreenIndex === idx
                        ? "bg-emerald-500 text-slate-950 shadow-md font-bold"
                        : "bg-slate-800/90 text-slate-400 hover:text-white hover:bg-slate-700"
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
