"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { excitementCount, triggerExcitement } = useApp();

  return (
    <>
      {/* Top Announcement Banner */}
      <div className="bg-emerald-950/80 border-b border-emerald-500/20 py-2 px-4 text-center text-xs md:text-sm text-emerald-300 flex items-center justify-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>
          <strong>Coming Soon to Bengaluru:</strong> A faster, safer way to rent everyday gear from neighbours nearby.
        </span>
        <a
          href="#excitement-poll"
          className="font-bold underline text-emerald-400 hover:text-emerald-200 ml-1"
        >
          Vote for your area →
        </a>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <svg
              className="h-9 w-9 transition-transform group-hover:scale-105"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="navBgGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="55%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="navPinGrad" x1="16" y1="10" x2="48" y2="52" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#D1FAE5" />
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="60" height="60" rx="18" fill="url(#navBgGrad)" stroke="#6EE7B7" strokeOpacity="0.45" strokeWidth="2" />
              <path d="M14 44C22 39 42 39 50 44" stroke="#A7F3D0" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
              <path d="M32 11C22.611 11 15 18.611 15 28C15 39.25 32 52 32 52C32 52 49 39.25 49 28C49 18.611 41.389 11 32 11Z" fill="url(#navPinGrad)" />
              <circle cx="32" cy="27.5" r="9.5" fill="#064E3B" />
              <circle cx="32" cy="27.5" r="5" fill="#34D399" />
            </svg>
            <div className="flex flex-col">
              <span className="font-extrabold text-base md:text-lg tracking-tight text-white flex items-center gap-1.5">
                Rent Anything
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  BLR
                </span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:block">Open the map. Rent today.</span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#app-preview" className="hover:text-emerald-400 transition-colors">App Preview</a>
            <a href="#privacy-promise" className="hover:text-emerald-400 transition-colors">Privacy &amp; Safety</a>
            <a href="#live-map-demo" className="hover:text-emerald-400 transition-colors">Live Map</a>
            <a href="#excitement-poll" className="hover:text-emerald-400 transition-colors">Launch Poll</a>
            <a href="#personas" className="hover:text-emerald-400 transition-colors">How It Saves ₹</a>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={triggerExcitement}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <span>🔥 I&apos;m Excited!</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-950/25 text-[11px] font-mono text-slate-900 font-bold">
                {excitementCount.toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
