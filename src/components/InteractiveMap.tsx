"use client";

import React, { useEffect, useRef, useState } from "react";
import { RentalPin, GeoSuggestion } from "@/types";
import { BENGALURU_PINS } from "@/data/mockPins";
import { useApp } from "@/context/AppContext";

const OPENFREEMAP_LIBERTY_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const OPENFREEMAP_POSITRON_STYLE = "https://tiles.openfreemap.org/styles/positron";

export default function InteractiveMap() {
  const { showToast, triggerExcitement } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const [selectedPin, setSelectedPin] = useState<RentalPin>(BENGALURU_PINS[0]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [geoSuggestions, setGeoSuggestions] = useState<GeoSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [isPositron, setIsPositron] = useState<boolean>(false);

  const categories = [
    { id: "all", label: "🌟 All Bengaluru Pins" },
    { id: "Cameras", label: "📷 Cameras & Lenses" },
    { id: "Trekking", label: "⛺ Trekking & Camping" },
    { id: "Wanted", label: "🔍 Wanted Pins" },
    { id: "Tools", label: "🔧 Tools & DIY" },
    { id: "Party & AV", label: "📽️ Party & Projectors" },
    { id: "Baby & Home", label: "🛏️ Baby & Home" },
  ];

  // Initialize MapLibre GL
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current) return;

      const maplibregl = (await import("maplibre-gl")).default;

      if (!isMounted) return;

      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: OPENFREEMAP_LIBERTY_STYLE,
        center: [77.641, 12.942],
        zoom: 12.3,
      });

      map.addControl(new maplibregl.NavigationControl(), "top-right");

      map.on("load", () => {
        if (!isMounted) return;
        mapRef.current = map;
        renderMarkers(map, BENGALURU_PINS, maplibregl);
      });
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Marker rendering helper
  const renderMarkers = (map: any, pins: RentalPin[], maplibregl: any) => {
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    pins.forEach((pin) => {
      const el = document.createElement("div");
      el.className = `rent-pin ${pin.type === "wanted" ? "wanted" : ""}`;
      el.innerHTML =
        pin.type === "wanted"
          ? `${pin.icon} Wanted · ₹${pin.pricePerDay}/d`
          : `${pin.icon} ₹${pin.pricePerDay}/day`;

      el.addEventListener("click", () => {
        setSelectedPin(pin);
        map.flyTo({ center: pin.coords, zoom: 14.2, speed: 1.2 });
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(pin.coords)
        .addTo(map);

      markersRef.current.push(marker);
    });
  };

  // Filter markers when category changes
  const handleCategorySelect = async (catId: string) => {
    setActiveCategory(catId);
    const filtered = BENGALURU_PINS.filter((p) => {
      if (catId === "all") return true;
      if (catId === "Wanted") return p.type === "wanted";
      return p.category === catId;
    });

    if (mapRef.current) {
      const maplibregl = (await import("maplibre-gl")).default;
      renderMarkers(mapRef.current, filtered, maplibregl);
      if (filtered.length > 0) {
        setSelectedPin(filtered[0]);
        mapRef.current.flyTo({ center: filtered[0].coords, zoom: 13.5, speed: 1.2 });
      }
    }
  };

  // Geocoding live search
  const handleSearchChange = async (val: string) => {
    setSearchQuery(val);
    const q = val.trim().toLowerCase();

    if (!q) {
      setShowSuggestions(false);
      if (mapRef.current) {
        const maplibregl = (await import("maplibre-gl")).default;
        renderMarkers(mapRef.current, BENGALURU_PINS, maplibregl);
      }
      return;
    }

    // Neighbourhood shortcuts
    if (q.includes("indiranagar")) flyToLocation(77.6412, 12.9719, 13.8);
    else if (q.includes("koramangala")) flyToLocation(77.6245, 12.9352, 13.8);
    else if (q.includes("hsr")) flyToLocation(77.6387, 12.9121, 13.8);
    else if (q.includes("whitefield")) flyToLocation(77.7499, 12.9698, 13.5);

    const filtered = BENGALURU_PINS.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    if (mapRef.current) {
      const maplibregl = (await import("maplibre-gl")).default;
      renderMarkers(mapRef.current, filtered.length > 0 ? filtered : BENGALURU_PINS, maplibregl);
      if (filtered.length > 0) setSelectedPin(filtered[0]);
    }

    if (q.length >= 3) {
      try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(q + " Bengaluru")}&lat=12.9716&lon=77.5946&limit=4`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const items: GeoSuggestion[] = (data.features || []).map((f: any) => ({
            name: f.properties.name || f.properties.street || "Bengaluru Location",
            sub: [f.properties.district, f.properties.city].filter(Boolean).join(", "),
            coords: f.geometry.coordinates,
          }));
          setGeoSuggestions(items);
          setShowSuggestions(items.length > 0);
        }
      } catch {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const flyToLocation = (lng: number, lat: number, zoom: number = 14) => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [lng, lat], zoom, speed: 1.3 });
    }
  };

  const handleSelectSuggestion = (s: GeoSuggestion) => {
    setShowSuggestions(false);
    setSearchQuery(s.name);
    flyToLocation(s.coords[0], s.coords[1], 14.2);
    showToast(`📍 Centred map on ${s.name} via Photon OSM`);
  };

  const toggleTileStyle = () => {
    if (!mapRef.current) return;
    const next = !isPositron;
    setIsPositron(next);
    mapRef.current.setStyle(next ? OPENFREEMAP_POSITRON_STYLE : OPENFREEMAP_LIBERTY_STYLE);
    showToast(next ? "✨ Switched to Positron Style" : "🗺️ Switched to Liberty Street Style");
  };

  const locateUser = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const fuzzyLat = Math.round(pos.coords.latitude * 1000) / 1000;
          const fuzzyLng = Math.round(pos.coords.longitude * 1000) / 1000;
          flyToLocation(fuzzyLng, fuzzyLat, 14.3);
          showToast("📍 Located near you (±150m fuzzy privacy zone applied)");
        },
        () => {
          flyToLocation(77.6387, 12.9121, 14.3);
          showToast("📍 Centred on HSR Layout (Simulated ±150m privacy zone)");
        },
        { timeout: 5000 }
      );
    } else {
      flyToLocation(77.6387, 12.9121, 14.3);
      showToast("📍 Centred on HSR Layout (Simulated ±150m privacy zone)");
    }
  };

  const handleSharePromoOnWhatsApp = () => {
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
    <section id="live-map-demo" className="py-20 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold mb-3">
            🗺️ Interactive Map Preview
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Try the Live Bengaluru Rental Map
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Click on any pin across Indiranagar, Koramangala, HSR Layout, or Whitefield to preview neighbourhood gear, and share the launch on WhatsApp!
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-5 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCategorySelect(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                activeCategory === c.id
                  ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-md shadow-emerald-500/20"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Map + Detail Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-3 sm:p-4 shadow-2xl">
          {/* Map Column */}
          <div className="lg:col-span-8 flex flex-col h-[520px] lg:h-[620px] rounded-2xl overflow-hidden relative border border-slate-800/80">
            {/* Top Overlay Search Bar */}
            <div className="absolute top-4 left-4 right-4 z-10 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search gear, camera, tent, or area (e.g. HSR)..."
                  className="w-full bg-slate-900/95 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 shadow-xl backdrop-blur-md focus:outline-none focus:border-emerald-500"
                />
                {showSuggestions && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 rounded-xl border border-slate-700 bg-slate-900/98 p-1.5 shadow-2xl z-20 backdrop-blur-md">
                    {geoSuggestions.map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectSuggestion(s)}
                        className="flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer hover:bg-slate-800 text-slate-200"
                      >
                        <span>
                          📍 <strong>{s.name}</strong> <small className="text-slate-400">{s.sub}</small>
                        </span>
                        <span className="text-emerald-400 font-mono text-[11px] font-bold">Fly →</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={locateUser}
                title="Locate me"
                className="px-3 py-2.5 rounded-xl bg-slate-900/95 border border-slate-700/80 text-xs font-semibold text-slate-200 shadow-xl hover:bg-slate-800 flex items-center gap-1.5"
              >
                <span>📍</span>
                <span className="hidden sm:inline">Locate</span>
              </button>

              <button
                onClick={toggleTileStyle}
                title="Switch map style"
                className="px-3 py-2.5 rounded-xl bg-slate-900/95 border border-slate-700/80 text-xs font-semibold text-slate-200 shadow-xl hover:bg-slate-800 flex items-center gap-1.5"
              >
                <span>🗺️</span>
                <span className="hidden sm:inline">{isPositron ? "Detailed" : "Minimal"}</span>
              </button>
            </div>

            {/* Map Container */}
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>

          {/* Right Detail Column */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl bg-slate-900/90 border border-slate-800/80 p-5 overflow-y-auto">
            <div>
              {/* Badge row */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                    selectedPin.type === "wanted"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  }`}
                >
                  {selectedPin.icon} {selectedPin.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  📍 {selectedPin.distanceKm}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white leading-snug mb-1">
                {selectedPin.title}
              </h3>
              <div className="text-xs text-slate-400 mb-4">
                Approximate Zone: <strong className="text-slate-200">{selectedPin.area}</strong>{" "}
                <span className="text-emerald-400 font-mono">(±150m privacy zone)</span>
              </div>

              {/* Price Box */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between mb-4">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {selectedPin.type === "wanted" ? "Budget / Day" : "Rental Price"}
                  </div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    ₹{selectedPin.pricePerDay}
                    <span className="text-xs font-medium text-slate-400">/day</span>
                  </div>
                  {selectedPin.weeklyPrice && (
                    <div className="text-[11px] text-slate-400">or ₹{selectedPin.weeklyPrice}/week</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Refundable Deposit
                  </div>
                  <div className="text-base font-bold text-slate-200 font-mono">
                    ₹{selectedPin.deposit}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    Condition: {selectedPin.condition}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {selectedPin.description}
              </p>

              {/* Handover & Owner card */}
              <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800 text-xs mb-4">
                <div className="flex items-center justify-between font-bold mb-1.5">
                  <span className="text-slate-200">👤 {selectedPin.owner}</span>
                  <span className="text-amber-400">{selectedPin.rating}</span>
                </div>
                <div className="text-slate-400 mb-1.5">
                  🤝 Suggested Handover:{" "}
                  <strong className="text-slate-200">{selectedPin.handoverSpot}</strong>
                </div>
                <div className="text-emerald-400 font-mono text-[11px]">
                  🔒 Phone &amp; address hidden until owner approves
                </div>
              </div>

              {/* Next 14 days calendar preview */}
              {selectedPin.type !== "wanted" && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>📅 Next 14 Days Availability</span>
                    <span className="text-emerald-400 text-[11px]">Green = Available</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 14 }, (_, i) => {
                      const dayNum = i + 1;
                      const isBooked = selectedPin.bookedDays.includes(dayNum);
                      return (
                        <div
                          key={dayNum}
                          title={isBooked ? "Booked" : "Available"}
                          className={`py-1 text-center rounded text-[10px] font-mono font-bold ${
                            isBooked
                              ? "bg-slate-800 text-slate-500 line-through"
                              : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          }`}
                        >
                          {dayNum} Oct
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2.5 mt-4 pt-3 border-t border-slate-800/80">
              {/* WhatsApp promotional share - primary clickable action */}
              <button
                onClick={handleSharePromoOnWhatsApp}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>📲 Share Rent Anything on WhatsApp</span>
              </button>

              {/* Informational booking state (disabled/non-clickable) */}
              <div className="w-full py-2 px-3 rounded-xl text-xs font-medium bg-slate-950/80 text-slate-400 border border-slate-800/80 flex items-center justify-center gap-2 select-none cursor-not-allowed">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
                <span>📅 Direct Booking Opens at Launch · Map Preview Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
