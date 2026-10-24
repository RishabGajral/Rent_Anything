"use client";

import React from "react";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AppPreview from "@/components/AppPreview";
import PrivacySection from "@/components/PrivacySection";
import InteractiveMap from "@/components/InteractiveMap";
import ExcitementPoll from "@/components/ExcitementPoll";
import PersonasSection from "@/components/PersonasSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#070b14] selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <AppPreview />
          <PrivacySection />
          <InteractiveMap />
          <ExcitementPoll />
          <PersonasSection />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
