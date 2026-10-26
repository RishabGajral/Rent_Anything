"use client";

import React, { useState, useRef } from "react";
import { useApp } from "@/context/AppContext";

export default function AppPreview() {
  const { openLightbox } = useApp();
  const [activeStep, setActiveStep] = useState<number | "all">("all");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);

  const steps = [
    {
      title: "Step 1: Open the Map & Browse",
      tagline: "No login, no paywalls, zero friction",
      description:
        "Open the site on your phone or laptop. Immediately see verified rental gear around Indiranagar, Koramangala, HSR Layout, or Whitefield. Tap any pin to see rates, condition, and availability.",
      img: "/assets/map-home-mockup.jpg",
      badge: "Discovery First",
    },
    {
      title: "Step 2: Transparent Pricing & Dates",
      tagline: "Know the daily, weekly & deposit rate upfront",
      description:
        "Every listing shows transparent rates, security deposit, owner trust ratings, and next 14 days availability calendar. Tap 'Request to Rent' in seconds.",
      img: "/assets/item-detail-mockup.jpg",
      badge: "Zero Hidden Fees",
    },
    {
      title: "Step 3: Safe Handover & Connection",
      tagline: "Privacy protected until both sides approve",
      description:
        "Personal phone numbers and private addresses remain completely private until the owner approves the request. Once approved, connect directly on WhatsApp to coordinate pickup at a safe spot.",
      img: "/assets/lister-connect-mockup.jpg",
      badge: "Privacy by Default",
    },
  ];

  const handleSelectStep = (step: number | "all") => {
    setActiveStep(step);
    requestAnimationFrame(() => {
      if (step === "all") {
        gridContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      } else {
        const targetEl = cardRefs.current[step];
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }
    });
  };

  return (
    <section id="app-preview" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-3">
            📱 Sneak Peek at the App
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            How Rent Anything Works in 3 Simple Steps
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Here is what the upcoming <strong>Rent Anything</strong> app looks like — built so you can find what you need near you, book it in seconds, and pick it up safely in your neighbourhood.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => handleSelectStep("all")}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeStep === "all"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              All Steps
            </button>
            {steps.map((s, idx) => (
              <button
                key={s.title}
                onClick={() => handleSelectStep(idx)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeStep === idx
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/25"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                Step {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Step Mockup Cards */}
        <div ref={gridContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const isSelected = activeStep === idx;
            const isDimmed = activeStep !== "all" && activeStep !== idx;
            return (
              <div
                key={step.title}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => {
                  if (isDimmed) handleSelectStep(idx);
                }}
                className={`flex-col rounded-2xl bg-slate-900 p-5 shadow-xl transition-all duration-300 hover:border-emerald-500/40 md:hover:-translate-y-1 ${
                  isDimmed
                    ? "hidden md:flex md:opacity-35 border border-slate-800 cursor-pointer"
                    : isSelected
                    ? "flex opacity-100 border-2 border-emerald-500 ring-4 ring-emerald-500/15 md:scale-[1.02]"
                    : "flex opacity-100 border border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    {step.badge}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">0{idx + 1} / 03</span>
                </div>

                <div
                  className="overflow-hidden rounded-xl bg-slate-950 mb-5 relative group cursor-pointer border border-slate-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(step.img, step.title);
                  }}
                >
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-semibold text-white gap-1.5">
                    <span>🔍 Expand Mockup</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5">{step.title}</h3>
                <div className="text-xs font-medium text-emerald-400 mb-2">{step.tagline}</div>
                <p className="text-sm text-slate-400 leading-relaxed mt-auto">{step.description}</p>

                {/* Mobile quick-step navigation when viewing a single step */}
                {activeStep !== "all" && (
                  <div className="flex md:hidden items-center justify-between gap-2 mt-5 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectStep(idx > 0 ? idx - 1 : "all");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                    >
                      {idx > 0 ? `← Step ${idx}` : "← All Steps"}
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectStep("all");
                      }}
                      className="text-xs text-slate-400 underline"
                    >
                      Show All 3
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectStep(idx < steps.length - 1 ? idx + 1 : "all");
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold"
                    >
                      {idx < steps.length - 1 ? `Step ${idx + 2} →` : "All Steps ✓"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
