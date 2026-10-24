"use client";

import React from "react";

export default function PrivacySection() {
  const safetyFeatures = [
    {
      icon: "📍",
      title: "±150m Fuzzy Map Radius",
      description:
        "Pins on the public map show approximate neighbourhood zones, never an exact flat or building address. Your building is kept completely private.",
    },
    {
      icon: "🔒",
      title: "Mutual Approval Required",
      description:
        "Contact numbers and direct chat are revealed ONLY when the owner accepts the booking request. Zero unsolicited calls or spam messages.",
    },
    {
      icon: "🤝",
      title: "Public Landmark Handovers",
      description:
        "Suggested pickup and return spots are common public points: Metro stations, Third Wave Coffee, BDA complexes, or society gates.",
    },
    {
      icon: "📸",
      title: "Mutual Handover Condition Photos",
      description:
        "Both parties snap 3 quick photos at handover on pickup and return, protecting the refundable deposit and preventing condition disputes.",
    },
  ];

  return (
    <section id="privacy-promise" className="py-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-3">
            🛡️ Highest Privacy for Renters &amp; Owners
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Your Mobile Number &amp; Address Are Never Public
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We know the biggest hesitation in lending or renting from neighbours is privacy. On <strong>Rent Anything</strong>, both the renter&apos;s and the owner&apos;s personal details are strictly protected at every step.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyFeatures.map((feat) => (
            <div
              key={feat.title}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/30 transition-all flex flex-col items-start"
            >
              <div className="text-3xl mb-4 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
