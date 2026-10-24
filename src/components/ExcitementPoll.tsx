"use client";

import React, { useState, useEffect } from "react";
import { INITIAL_NEIGHBOURHOOD_VOTES } from "@/data/mockPins";
import { Pledge } from "@/types";
import { useApp } from "@/context/AppContext";

export default function ExcitementPoll() {
  const { triggerExcitement, showToast } = useApp();

  const [votes, setVotes] = useState<Record<string, number>>(INITIAL_NEIGHBOURHOOD_VOTES);
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [selectedRole, setSelectedRole] = useState<"both" | "renter" | "lister">("both");
  const [selectedArea, setSelectedArea] = useState<string>("HSR Layout");
  const [itemInput, setItemInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [totalVotes, setTotalVotes] = useState<number>(0);

  // Load live votes and pledges from API
  useEffect(() => {
    async function fetchPollData() {
      try {
        const res = await fetch("/api/launch-poll");
        if (res.ok) {
          const data = await res.json();
          if (data.votes) setVotes(data.votes);
          if (data.pledges) setPledges(data.pledges);
          if (typeof data.totalVotes === "number") setTotalVotes(data.totalVotes);
        }
      } catch (err) {
        console.error("Error loading launch poll data:", err);
      }
    }

    fetchPollData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Also trigger global excitement counter
    triggerExcitement();

    try {
      const res = await fetch("/api/launch-poll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area: selectedArea,
          role: selectedRole,
          text: itemInput,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.votes) setVotes(data.votes);
        if (data.pledges) setPledges(data.pledges);
        setTotalVotes((prev) => prev + 1);
        setItemInput("");
        showToast(`🚀 Vote recorded for ${selectedArea}! Thank you for putting your area on the map.`);
      }
    } catch (err) {
      // Local optimistic fallback
      setVotes((prev) => ({
        ...prev,
        [selectedArea]: (prev[selectedArea] || 0) + 1,
      }));
      setTotalVotes((prev) => prev + 1);
      setItemInput("");
      showToast(`🚀 Vote recorded for ${selectedArea}!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const targetVotes = 100;
  const sortedVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]);

  return (
    <section id="excitement-poll" className="py-20 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Neighbourhood Launch Poll</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Bring Rent Anything to Your Neighbourhood First
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We are launching neighbourhood by neighbourhood. Cast your vote below to unlock peer-to-peer gear rentals in your street!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Voting Form */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>📍 Cast Your Real Vote</span>
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Role selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  How will you use Rent Anything?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "both", label: "🤝 Both" },
                    { id: "renter", label: "🎒 Renter" },
                    { id: "lister", label: "🏷️ Owner" },
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id as any)}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border text-center transition-all ${
                        selectedRole === r.id
                          ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area select */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Select Your Bengaluru Area
                </label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="HSR Layout">HSR Layout (Sectors 1–7)</option>
                  <option value="Koramangala">Koramangala (Blocks 1–8)</option>
                  <option value="Indiranagar">Indiranagar (100Ft / 12th Main)</option>
                  <option value="Whitefield">Whitefield / ITPL / Kadugodi</option>
                  <option value="Bellandur / Sarjapur">Bellandur / Sarjapur Road</option>
                  <option value="JP Nagar / Jayanagar">JP Nagar / Jayanagar</option>
                </select>
              </div>

              {/* Pledge item text */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Optional: What gear would you list or rent?
                </label>
                <p className="text-[11px] text-slate-400 mb-2">
                  (e.g., &ldquo;Can list my Sony 50mm lens&rdquo; or &ldquo;Want to rent a tent&rdquo;)
                </p>
                <input
                  type="text"
                  value={itemInput}
                  onChange={(e) => setItemInput(e.target.value)}
                  placeholder="e.g. GoPro Hero 12, Projector, Drill..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all active:scale-98"
              >
                {isSubmitting ? "Submitting..." : `🚀 Vote to Launch ${selectedArea}`}
              </button>
            </form>

            {/* Live Pledges Feed */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>💬 Real Community Pledges</span>
                <span className="text-[10px] text-emerald-400 font-mono">Live</span>
              </div>
              <div className="flex flex-col gap-2">
                {pledges.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 text-center text-xs text-slate-400 italic">
                    No item pledges yet. Be the first neighbour to pledge gear for your area above!
                  </div>
                ) : (
                  pledges.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs flex items-center justify-between gap-3"
                    >
                      <div className="truncate">
                        <span className="font-mono font-bold text-emerald-400">
                          [{p.area} · {p.role}]
                        </span>{" "}
                        <span className="text-slate-300">&ldquo;{p.text}&rdquo;</span>
                      </div>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap">just now</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Leaderboard Progress */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🏆 Live Bengaluru Leaderboard</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time vote progress towards opening each neighbourhood
                </p>
              </div>
              <span className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                Goal: {targetVotes} Votes
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {sortedVotes.map(([area, count], idx) => {
                const pct = Math.min(100, Math.round((count / targetVotes) * 100));
                const isLeading = count > 0 && idx === 0;

                return (
                  <div key={area} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                      <span className="flex items-center gap-2 text-slate-200">
                        <span>{idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`}</span>
                        <span>{area}</span>
                        {isLeading && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                            Leading Zone
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {count > 0 ? (
                          <>
                            <strong className="text-emerald-400">{count}</strong> / {targetVotes} votes ({pct}%)
                          </>
                        ) : (
                          <span className="text-slate-500">0 votes · Be the first!</span>
                        )}
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(count > 0 ? pct : 0, 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 leading-relaxed flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <span>
                Total Verified Votes Cast:{" "}
                <strong className="text-emerald-400 font-mono text-sm">{totalVotes}</strong>. The first neighbourhood to reach{" "}
                <strong>{targetVotes} votes</strong> will be the initial launch zone with immediate peer-to-peer item listings!
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
