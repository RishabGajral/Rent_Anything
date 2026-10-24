"use client";

import React from "react";

export default function PersonasSection() {
  return (
    <section id="personas" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-3">
            💡 Built for Everyday Life in Bengaluru
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Save Thousands as a Renter. Earn Effortlessly as an Owner.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Why buy expensive gear for a single weekend when someone 500 metres away already owns it and barely uses it?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Renter Persona Card */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  Renter Persona
                </span>
                <span className="text-3xl">🎒</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                &ldquo;I only need it for 2 days. Why pay ₹45,000 to buy it?&rdquo;
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                You are heading to Skandagiri for a weekend sunrise trek, shooting a friend&apos;s engagement at Bangalore Palace, or hanging shelves in your new flat in HSR.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs space-y-2 mb-6">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Buying a high-end prime lens:</span>
                  <span className="line-through text-red-400 font-mono">₹75,000</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Renting for the weekend from a neighbour:</span>
                  <span className="text-emerald-400 font-bold font-mono">₹1,200</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold text-white text-sm">
                  <span>Net Savings in Your Pocket:</span>
                  <span className="text-emerald-400 font-mono font-extrabold">₹73,800 saved</span>
                </div>
              </div>
            </div>

            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>No upfront multi-year subscriptions</li>
              <li>Pick up and drop off 10 minutes away on foot or metro</li>
              <li>Fully refundable deposit returned instantly at handover</li>
            </ul>
          </div>

          {/* Owner Persona Card */}
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
                  Owner Persona
                </span>
                <span className="text-3xl">🏷️</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                &ldquo;My camera and camping gear just sit in the closet all month.&rdquo;
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Turn unused gear into predictable weekend income. You decide who rents, when it&apos;s available, and verify every renter with phone authentication before accepting.
              </p>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 text-xs space-y-2 mb-6">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Renting out 4-person tent (2 weekends/mo):</span>
                  <span className="text-emerald-400 font-mono font-bold">+₹1,400</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Renting out impact drill + pressure washer:</span>
                  <span className="text-emerald-400 font-mono font-bold">+₹1,200</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold text-white text-sm">
                  <span>Monthly Passive Income:</span>
                  <span className="text-emerald-400 font-mono font-extrabold">₹2,600 / month</span>
                </div>
              </div>
            </div>

            <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
              <li>100% control: reject any request with 1 tap</li>
              <li>Take mutual condition photos directly in the app</li>
              <li>Keep 100% of the rental fee at launch with zero fees</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
