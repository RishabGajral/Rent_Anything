"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface ToastMessage {
  id: number;
  text: string;
}

interface AppContextType {
  excitementCount: number;
  hasVoted: boolean;
  visitorId: string;
  triggerExcitement: () => void;
  showToast: (msg: string) => void;
  activeLightbox: { src: string; caption: string } | null;
  openLightbox: (src: string, caption: string) => void;
  closeLightbox: () => void;
  isSupabaseConnected: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [excitementCount, setExcitementCount] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [visitorId, setVisitorId] = useState<string>("");
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; caption: string } | null>(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  useEffect(() => {
    // 1. Generate or retrieve persistent visitor UUID
    let vid = localStorage.getItem("ra_visitor_id");
    if (!vid) {
      vid =
        "v_" +
        (typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).substring(2) + Date.now().toString(36));
      localStorage.setItem("ra_visitor_id", vid);
    }
    setVisitorId(vid);

    const savedCount = localStorage.getItem("ra_excitement_count");
    const savedVoted = localStorage.getItem("ra_quick_voted");
    if (savedCount) setExcitementCount(parseInt(savedCount, 10));
    if (savedVoted === "true") setHasVoted(true);

    // 2. Fetch live counter from server route (backed by Supabase)
    async function syncStats() {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.count === "number") {
            setExcitementCount(data.count);
            localStorage.setItem("ra_excitement_count", String(data.count));
            setIsSupabaseConnected(true);
          }
        }
      } catch (err) {
        console.error("Error syncing stats:", err);
      }
    }

    syncStats();

    // 3. Optional Realtime WebSocket subscription if publishable anon key is provided
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const hasAnonKey = Boolean(
      supabaseUrl &&
        supabaseKey &&
        !supabaseKey.includes("placeholder") &&
        supabaseKey.length > 10
    );

    if (hasAnonKey) {
      const supabase = createClient();
      const channel = supabase
        .channel("platform_stats_sync")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "platform_stats",
            filter: "id=eq.excitement_count",
          },
          (payload) => {
            if (payload.new && payload.new.counter_value) {
              const updated = Number(payload.new.counter_value);
              setExcitementCount(updated);
              localStorage.setItem("ra_excitement_count", String(updated));
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, []);

  const showToast = (text: string) => {
    const id = Date.now();
    setToast({ id, text });
    setTimeout(() => {
      setToast((cur) => (cur?.id === id ? null : cur));
    }, 4500);
  };

  const triggerExcitement = async () => {
    if (hasVoted) {
      showToast("💚 You've already voted from this device! Scroll down to vote for your Bengaluru neighbourhood.");
      return;
    }

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId }),
      });

      const result = await res.json();

      if (result.rate_limited) {
        showToast("⚠️ " + (result.message || "Daily vote limit reached from your network."));
        return;
      }

      if (result.already_voted) {
        setHasVoted(true);
        localStorage.setItem("ra_quick_voted", "true");
        showToast("💚 You have already voted! Scroll down to vote for your neighbourhood.");
        return;
      }

      // Successful verified vote
      const newCount = result.count ? Number(result.count) : excitementCount + 1;
      setExcitementCount(newCount);
      setHasVoted(true);
      localStorage.setItem("ra_quick_voted", "true");
      localStorage.setItem("ra_excitement_count", String(newCount));
      showToast(`🔥 Awesome! You're local #${newCount.toLocaleString()} excited for Rent Anything!`);
    } catch (err) {
      const fallback = excitementCount + 1;
      setExcitementCount(fallback);
      setHasVoted(true);
      localStorage.setItem("ra_quick_voted", "true");
      localStorage.setItem("ra_excitement_count", String(fallback));
      showToast(`🔥 Awesome! You're local #${fallback.toLocaleString()} excited for Rent Anything!`);
    }
  };

  const openLightbox = (src: string, caption: string) => {
    setActiveLightbox({ src, caption });
  };

  const closeLightbox = () => {
    setActiveLightbox(null);
  };

  return (
    <AppContext.Provider
      value={{
        excitementCount,
        hasVoted,
        visitorId,
        triggerExcitement,
        showToast,
        activeLightbox,
        openLightbox,
        closeLightbox,
        isSupabaseConnected,
      }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-slate-900/95 px-5 py-3.5 text-sm font-medium text-emerald-300 shadow-2xl backdrop-blur-md transition-all animate-bounce">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
          <span>{toast.text}</span>
        </div>
      )}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              ✕
            </button>
            <img
              src={activeLightbox.src}
              alt={activeLightbox.caption}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
            <p className="p-3 text-center text-sm font-semibold text-slate-300">
              {activeLightbox.caption}
            </p>
          </div>
        </div>
      )}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}
