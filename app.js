// ============================================================================
// Rent Anything Bengaluru — Interactive Concept, MapLibre Prototype & Poll
// ============================================================================

const HERO_SCREENS = [
  "assets/map-home-mockup.jpg",
  "assets/item-detail-mockup.jpg",
  "assets/lister-connect-mockup.jpg"
];

// Realistic Bengaluru Pins (Matching Personas & Requirements R1-R17 from PDF)
const BENGALURU_PINS = [
  {
    id: "item-1",
    type: "listing",
    title: "Sony FE 50mm f/1.4 GM Prime Lens",
    category: "Cameras",
    icon: "📷",
    pricePerDay: 600,
    weeklyPrice: 3500,
    deposit: 2000,
    condition: "Like New",
    area: "HSR Layout Sector 2",
    distanceKm: "1.2 km away",
    coords: [77.6418, 12.9141],
    owner: "Priya S.",
    rating: "4.8 ★ (24 rentals)",
    handoverSpot: "Silk Board Metro or Third Wave Coffee HSR",
    description: "Sharp f/1.4 prime lens for weddings & portraits. Comes with lens hood, UV filter, and padded pouch. Condition photos taken at handover.",
    bookedDays: [5, 6, 14, 15, 21]
  },
  {
    id: "item-2",
    type: "listing",
    title: "Coleman 4-Person WeatherMaster Tent",
    category: "Trekking",
    icon: "⛺",
    pricePerDay: 350,
    weeklyPrice: 1900,
    deposit: 2000,
    condition: "Like New",
    area: "Koramangala 4th Block",
    distanceKm: "0.9 km away",
    coords: [77.6265, 12.9345],
    owner: "Priya S.",
    rating: "4.9 ★ (19 rentals)",
    handoverSpot: "Third Wave Coffee, Koramangala 80Ft Rd",
    description: "Waterproof 4-person dome tent with rainfly & carry bag. Ideal for Kudremukh, Skandagiri or Coorg weekend treks. Setup takes 8 minutes.",
    bookedDays: [11, 12, 18, 19]
  },
  {
    id: "item-3",
    type: "wanted",
    title: "WANTED: 1080p Projector for Match Night (20–22 Oct)",
    category: "Wanted",
    icon: "🔍",
    pricePerDay: 500,
    weeklyPrice: null,
    deposit: 1500,
    condition: "Wanted Pin",
    area: "Near Indiranagar 100Ft Rd",
    distanceKm: "1.5 km away",
    coords: [77.6408, 12.9718],
    owner: "Karthik M. (Renter)",
    rating: "4.7 ★ (8 rentals)",
    handoverSpot: "Indiranagar Metro Station",
    description: "Looking for a bright HDMI projector for 2 nights this weekend to watch the match with friends. Budget up to ₹500/day. Can pick up Friday evening!",
    bookedDays: []
  },
  {
    id: "item-4",
    type: "listing",
    title: "Bosch GSB 500W Impact Drill + 50-Piece Bit Kit",
    category: "Tools",
    icon: "🔧",
    pricePerDay: 200,
    weeklyPrice: 950,
    deposit: 1000,
    condition: "Good",
    area: "HSR Layout Sector 7",
    distanceKm: "0.7 km away",
    coords: [77.6345, 12.9082],
    owner: "Rohan V.",
    rating: "4.9 ★ (31 rentals)",
    handoverSpot: "HSR BDA Complex",
    description: "Includes masonry, wood & metal drill bits, wall plugs, and spirit level. Perfect for hanging curtains, shelves, or frames over the weekend.",
    bookedDays: [3, 10, 24]
  },
  {
    id: "item-5",
    type: "listing",
    title: "BenQ TH575 Full HD 3800 Lumens Home Projector",
    category: "Party & AV",
    icon: "📽️",
    pricePerDay: 500,
    weeklyPrice: 2800,
    deposit: 2500,
    condition: "Like New",
    area: "Indiranagar 12th Main",
    distanceKm: "1.8 km away",
    coords: [77.6362, 12.9685],
    owner: "Aisha R.",
    rating: "4.9 ★ (15 rentals)",
    handoverSpot: "Indiranagar Metro / Third Wave 12th Main",
    description: "Super bright 1080p projector, works great even with ambient light. Includes HDMI cable, FireTV stick, and tripod stand.",
    bookedDays: [6, 7, 13, 20, 21]
  },
  {
    id: "item-6",
    type: "listing",
    title: "JBL PartyBox 110 Portable Bluetooth Speaker",
    category: "Party & AV",
    icon: "🔊",
    pricePerDay: 400,
    weeklyPrice: 2200,
    deposit: 1500,
    condition: "Like New",
    area: "Koramangala 5th Block",
    distanceKm: "1.1 km away",
    coords: [77.6195, 12.9358],
    owner: "Vikram N.",
    rating: "4.8 ★ (12 rentals)",
    handoverSpot: "Jyoti Nivas College Junction",
    description: "160W booming sound with dynamic LED light ring and 12-hour battery life. Great for house parties and terrace get-togethers.",
    bookedDays: [7, 14, 21, 28]
  },
  {
    id: "item-7",
    type: "listing",
    title: "Solid Pine Baby Cot + Organic Mattress (Monthly/Weekly)",
    category: "Baby & Home",
    icon: "🛏️",
    pricePerDay: 150,
    weeklyPrice: 400,
    deposit: 1500,
    condition: "Good",
    area: "Whitefield (ITPL Main Rd)",
    distanceKm: "0.8 km away",
    coords: [77.7482, 12.9715],
    owner: "Ananya & Dev",
    rating: "5.0 ★ (6 rentals)",
    handoverSpot: "Hoodi Metro Station",
    description: "Our toddler outgrew this sturdy pinewood cot. Available for ₹400/month or ₹150/day for visiting families settling into Whitefield.",
    bookedDays: [1, 2]
  },
  {
    id: "item-8",
    type: "wanted",
    title: "WANTED: GoPro Hero 11/12 for Gokarna Bike Trip",
    category: "Wanted",
    icon: "🔍",
    pricePerDay: 450,
    weeklyPrice: null,
    deposit: 2000,
    condition: "Wanted Pin",
    area: "Koramangala 1st Block",
    distanceKm: "1.3 km away",
    coords: [77.6321, 12.9279],
    owner: "Arjun K. (Renter)",
    rating: "4.9 ★ (11 rentals)",
    handoverSpot: "Sony World Signal",
    description: "Need an action camera with helmet mount for 3 days next weekend. Happy to pay ₹450/day + refundable UPI deposit.",
    bookedDays: []
  },
  {
    id: "item-9",
    type: "listing",
    title: "Decathlon Quechua 60L Trekking Backpack + Trekking Poles",
    category: "Trekking",
    icon: "🎒",
    pricePerDay: 180,
    weeklyPrice: 900,
    deposit: 800,
    condition: "Like New",
    area: "Indiranagar Double Rd",
    distanceKm: "1.6 km away",
    coords: [77.6465, 12.9762],
    owner: "Siddharth P.",
    rating: "4.8 ★ (22 rentals)",
    handoverSpot: "CMH Road Metro Station",
    description: "60L ergonomic rucksack with rain cover + 2 adjustable carbon trekking poles. Cleaned and sanitised after every trek.",
    bookedDays: [12, 13, 14]
  },
  {
    id: "item-10",
    type: "listing",
    title: "Kärcher K2 High-Pressure Car & Balcony Washer",
    category: "Tools",
    icon: "🚿",
    pricePerDay: 300,
    weeklyPrice: 1500,
    deposit: 1200,
    condition: "Good",
    area: "Whitefield Kadugodi",
    distanceKm: "2.1 km away",
    coords: [77.7560, 12.9655],
    owner: "Nikhil T.",
    rating: "4.7 ★ (14 rentals)",
    handoverSpot: "Kadugodi Tree Park Metro",
    description: "110 bar pressure washer with 6m hose and foam nozzle. Wash your car, bike, or mossy balcony tiles in 20 minutes.",
    bookedDays: [8, 16]
  }
];

// Initial Neighbourhood Leaderboard State
let excitementCount = parseInt(localStorage.getItem("ra_excitement_count") || "1428", 10);
let hasClickedQuickExcitement = localStorage.getItem("ra_quick_voted") === "true";

let neighbourhoodVotes = JSON.parse(localStorage.getItem("ra_area_votes") || JSON.stringify({
  "HSR Layout": 412,
  "Koramangala": 368,
  "Indiranagar": 319,
  "Whitefield": 184,
  "Bellandur / Sarjapur": 92,
  "JP Nagar / Jayanagar": 53
}));

let recentPledges = JSON.parse(localStorage.getItem("ra_recent_pledges") || JSON.stringify([
  { area: "HSR Layout", role: "Owner", text: "Can list my Coleman 4P Tent & Bosch Drill (₹250/day)" },
  { area: "Indiranagar", role: "Renter", text: "Would rent a 1080p Projector & JBL PartyBox for weekends" },
  { area: "Koramangala", role: "Both", text: "Want to rent a Sony 50mm lens + list my GoPro Hero 11" },
  { area: "Whitefield", role: "Renter", text: "Need a baby cot & stroller for 2 months" }
]));

let pollSelections = {
  "excitement-level-group": "Super Excited 🔥",
  "user-role-group": "both"
};

let mapInstance = null;
let activeMarkers = [];
let selectedPin = BENGALURU_PINS[0];
let activeCategoryFilter = "all";

// ============================================================================
// Initialisation
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  updateExcitementUI();
  renderLeaderboard();
  renderRecentPledges();
  renderDetailPanel(selectedPin);
  initBengaluruMap();
});

// ============================================================================
// Hero App Screen Switcher & Lightbox
// ============================================================================
function switchHeroScreen(index, btnEl) {
  const img = document.getElementById("hero-phone-img");
  if (img && HERO_SCREENS[index]) {
    img.src = HERO_SCREENS[index];
  }
  document.querySelectorAll(".hero-screen-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");
}

function highlightMockupCard(index, btnEl) {
  document.querySelectorAll(".mockup-tab-btn").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  document.querySelectorAll(".mockup-card").forEach((card, idx) => {
    if (index === "all") {
      card.style.opacity = "1";
      card.classList.remove("highlighted");
    } else if (idx === index) {
      card.style.opacity = "1";
      card.classList.add("highlighted");
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      card.style.opacity = "0.45";
      card.classList.remove("highlighted");
    }
  });
}

function openLightbox(src, caption) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const cap = document.getElementById("lightbox-caption");
  img.src = src;
  cap.textContent = caption;
  modal.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox-modal").style.display = "none";
}

// ============================================================================
// One-Click Excitement Pulse & Neighbourhood Demand Poll
// ============================================================================
function triggerQuickExcitement() {
  if (!hasClickedQuickExcitement) {
    excitementCount += 1;
    hasClickedQuickExcitement = true;
    localStorage.setItem("ra_excitement_count", String(excitementCount));
    localStorage.setItem("ra_quick_voted", "true");
    showToast("🔥 Awesome! You're local #" + excitementCount.toLocaleString() + " excited for Rent Anything!");
  } else {
    showToast("💚 You're already counted! Scroll down to vote for your Bengaluru neighbourhood.");
  }
  updateExcitementUI();
}

function updateExcitementUI() {
  const formatted = excitementCount.toLocaleString();
  const navCount = document.getElementById("nav-excited-count");
  const heroCount = document.getElementById("hero-excited-counter");
  const mainBtn = document.getElementById("main-excited-btn");
  const btnText = document.getElementById("excited-btn-text");
  const feedback = document.getElementById("excited-feedback-msg");

  if (navCount) navCount.textContent = formatted;
  if (heroCount) heroCount.textContent = formatted;

  if (hasClickedQuickExcitement && mainBtn) {
    mainBtn.classList.add("voted");
    btnText.textContent = "You're In! (#" + formatted + " Excited in BLR)";
    if (feedback) {
      feedback.style.display = "block";
      feedback.textContent = `🎉 You’re #${formatted}! Now vote below for which Bengaluru neighbourhood we should launch first.`;
    }
  }
}

function selectPollOption(groupId, btnEl, value) {
  pollSelections[groupId] = value;
  const group = document.getElementById(groupId);
  if (group) {
    group.querySelectorAll(".role-btn").forEach(b => b.classList.remove("selected"));
  }
  btnEl.classList.add("selected");
}

function submitExcitementPoll(e) {
  e.preventDefault();
  const area = document.getElementById("poll-neighbourhood").value;
  const itemText = document.getElementById("poll-item").value.trim();
  const roleMap = { both: "Both", renter: "Renter", lister: "Owner" };
  const roleLabel = roleMap[pollSelections["user-role-group"]] || "Neighbour";

  if (!hasClickedQuickExcitement) {
    excitementCount += 1;
    hasClickedQuickExcitement = true;
    localStorage.setItem("ra_excitement_count", String(excitementCount));
    localStorage.setItem("ra_quick_voted", "true");
  }

  neighbourhoodVotes[area] = (neighbourhoodVotes[area] || 100) + 1;
  localStorage.setItem("ra_area_votes", JSON.stringify(neighbourhoodVotes));

  if (itemText) {
    recentPledges.unshift({
      area,
      role: roleLabel,
      text: itemText
    });
    recentPledges = recentPledges.slice(0, 5);
    localStorage.setItem("ra_recent_pledges", JSON.stringify(recentPledges));
  }

  updateExcitementUI();
  renderLeaderboard();
  renderRecentPledges();
  document.getElementById("poll-item").value = "";
  showToast(`🚀 Vote recorded for ${area}! Thanks for helping validate Rent Anything.`);
}

function renderLeaderboard() {
  const container = document.getElementById("neighbourhood-leaderboard");
  if (!container) return;

  const entries = Object.entries(neighbourhoodVotes).sort((a, b) => b[1] - a[1]);
  const target = 500;

  container.innerHTML = entries.map(([area, votes], idx) => {
    const pct = Math.min(100, Math.round((votes / target) * 100));
    const badge = idx === 0 ? "🥇 Leading Launch Zone" : `#${idx + 1}`;
    return `
      <div class="leaderboard-item">
        <div class="leaderboard-row">
          <span>${area} <small style="color:#34d399; font-family:var(--font-mono); margin-left:6px;">${badge}</small></span>
          <span style="font-family:var(--font-mono); color:#cbd5e1;">${votes} / ${target} votes (${pct}%)</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%;"></div>
        </div>
      </div>
    `;
  }).join("");
}

function renderRecentPledges() {
  const feed = document.getElementById("recent-pledges-feed");
  if (!feed) return;

  feed.innerHTML = recentPledges.map(p => `
    <div style="background:#070b14; border:1px solid var(--border); padding:9px 12px; border-radius:8px; display:flex; justify-content:space-between; gap:10px; align-items:center;">
      <div>
        <span style="color:#34d399; font-weight:700; font-family:var(--font-mono); font-size:0.76rem;">[${p.area} · ${p.role}]</span>
        <span style="color:#e2e8f0; margin-left:6px;">“${escapeHtml(p.text)}”</span>
      </div>
      <span style="font-size:0.72rem; color:var(--text-dim); white-space:nowrap;">just now</span>
    </div>
  `).join("");
}

function shareOnWhatsApp() {
  const msg = encodeURIComponent(
    "Hey! Check out 'Rent Anything' coming soon to Bengaluru — a free, map-first app to rent cameras, tents, drills & projectors from neighbours nearby. Vote for our neighbourhood here: " + window.location.href
  );
  window.open(`https://wa.me/?text=${msg}`, "_blank");
}

// ============================================================================
// Free Map & Geocoding APIs Linked in This Page (100% Free, No API Key Needed)
// 1. OpenFreeMap Liberty Vector API (Default): https://tiles.openfreemap.org/styles/liberty
// 2. OpenFreeMap Positron Vector API (Alternate): https://tiles.openfreemap.org/styles/positron
// 3. Photon (Komoot/OSM) Search API: https://photon.komoot.io/api/?q=...&lat=12.9716&lon=77.5946
// 4. OSM Nominatim Reverse Geocode API: https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=...&lon=...
// ============================================================================
const OPENFREEMAP_LIBERTY_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const OPENFREEMAP_POSITRON_STYLE = "https://tiles.openfreemap.org/styles/positron";
let usingPositronStyle = false;
let geocodeDebounceTimer = null;

function initBengaluruMap() {
  const mapContainer = document.getElementById("bengaluru-map");
  if (!mapContainer || typeof maplibregl === "undefined") return;

  mapInstance = new maplibregl.Map({
    container: "bengaluru-map",
    style: OPENFREEMAP_LIBERTY_STYLE,
    center: [77.6410, 12.9420], // Central between Indiranagar, Koramangala & HSR
    zoom: 12.3
  });

  mapInstance.addControl(new maplibregl.NavigationControl(), "top-right");

  mapInstance.on("load", () => {
    renderMapPins(BENGALURU_PINS);
  });

  // Hide geocoding dropdown when clicking outside
  document.addEventListener("click", (e) => {
    const box = document.getElementById("geo-suggestions");
    const input = document.getElementById("map-search-input");
    if (box && e.target !== input && !box.contains(e.target)) {
      box.style.display = "none";
    }
  });
}

function toggleMapTileStyle() {
  if (!mapInstance) return;
  usingPositronStyle = !usingPositronStyle;
  const btn = document.getElementById("map-style-btn");
  if (usingPositronStyle) {
    mapInstance.setStyle(OPENFREEMAP_POSITRON_STYLE);
    if (btn) btn.textContent = "🗺️ Detailed Map";
    showToast("✨ Switched to OpenFreeMap Positron Light Style");
  } else {
    mapInstance.setStyle(OPENFREEMAP_LIBERTY_STYLE);
    if (btn) btn.textContent = "🗺️ Minimal Map";
    showToast("🗺️ Switched to OpenFreeMap Liberty Street Style");
  }
}

function renderMapPins(pins) {
  activeMarkers.forEach(m => m.remove());
  activeMarkers = [];

  if (!mapInstance) return;

  pins.forEach(pin => {
    const el = document.createElement("div");
    el.className = `rent-pin ${pin.type === "wanted" ? "wanted" : ""}`;
    el.innerHTML = pin.type === "wanted"
      ? `${pin.icon} Wanted · ₹${pin.pricePerDay}/d`
      : `${pin.icon} ₹${pin.pricePerDay}/day`;

    el.addEventListener("click", () => {
      selectedPin = pin;
      renderDetailPanel(pin);
      mapInstance.flyTo({ center: pin.coords, zoom: 14.2, speed: 1.2 });
    });

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat(pin.coords)
      .addTo(mapInstance);

    activeMarkers.push(marker);
  });
}

function filterMapCategory(category, btnEl) {
  activeCategoryFilter = category;
  document.querySelectorAll(".filter-pill").forEach(b => b.classList.remove("active"));
  if (btnEl) btnEl.classList.add("active");

  const filtered = BENGALURU_PINS.filter(p => {
    if (category === "all") return true;
    if (category === "Wanted") return p.type === "wanted";
    return p.category === category;
  });

  renderMapPins(filtered);
  if (filtered.length > 0) {
    selectedPin = filtered[0];
    renderDetailPanel(selectedPin);
  }
}

function handleMapSearch(query) {
  const q = query.trim().toLowerCase();
  const suggestionBox = document.getElementById("geo-suggestions");

  if (!q) {
    renderMapPins(BENGALURU_PINS);
    if (suggestionBox) suggestionBox.style.display = "none";
    return;
  }

  // Instant jump for common neighbourhoods
  if (q.includes("indiranagar")) flyToArea(77.6412, 12.9719, 13.8);
  else if (q.includes("koramangala")) flyToArea(77.6245, 12.9352, 13.8);
  else if (q.includes("hsr")) flyToArea(77.6387, 12.9121, 13.8);
  else if (q.includes("whitefield")) flyToArea(77.7499, 12.9698, 13.5);

  const filtered = BENGALURU_PINS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.area.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );

  renderMapPins(filtered.length > 0 ? filtered : BENGALURU_PINS);
  if (filtered.length > 0) {
    renderDetailPanel(filtered[0]);
  }

  // Query live free Photon (OpenStreetMap) Geocoding API biased to Bengaluru (12.9716, 77.5946)
  clearTimeout(geocodeDebounceTimer);
  if (q.length >= 3) {
    geocodeDebounceTimer = setTimeout(() => {
      fetchLivePlaceSuggestions(q);
    }, 280);
  } else if (suggestionBox) {
    suggestionBox.style.display = "none";
  }
}

async function fetchLivePlaceSuggestions(query) {
  const suggestionBox = document.getElementById("geo-suggestions");
  if (!suggestionBox) return;

  try {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query + " Bengaluru")}&lat=12.9716&lon=77.5946&limit=4`;
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    const features = data.features || [];

    if (features.length === 0) {
      suggestionBox.style.display = "none";
      return;
    }

    suggestionBox.innerHTML = features.map(f => {
      const [lng, lat] = f.geometry.coordinates;
      const name = f.properties.name || f.properties.street || "Bengaluru Location";
      const sub = [f.properties.district, f.properties.city, f.properties.state].filter(Boolean).join(", ");
      return `
        <div class="geo-suggestion-item" onclick="selectGeoSuggestion(${lng}, ${lat}, '${escapeHtml(name)}')">
          <span>📍 <strong>${escapeHtml(name)}</strong> <small style="color:var(--text-muted);">${escapeHtml(sub)}</small></span>
          <span style="font-family:var(--font-mono); font-size:0.72rem; color:#34d399;">Fly →</span>
        </div>
      `;
    }).join("");
    suggestionBox.style.display = "block";
  } catch (err) {
    suggestionBox.style.display = "none";
  }
}

function selectGeoSuggestion(lng, lat, placeName) {
  const suggestionBox = document.getElementById("geo-suggestions");
  if (suggestionBox) suggestionBox.style.display = "none";
  flyToArea(lng, lat, 14.2);
  showToast(`📍 Centred map on ${placeName} via Photon OSM API`);
}

function flyToArea(lng, lat, zoom) {
  if (mapInstance) {
    mapInstance.flyTo({ center: [lng, lat], zoom, speed: 1.3 });
  }
}

function locateUserDemo() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        // Round coordinates to ~150m fuzzy privacy precision (3 decimal places)
        const fuzzyLat = Math.round(pos.coords.latitude * 1000) / 1000;
        const fuzzyLng = Math.round(pos.coords.longitude * 1000) / 1000;
        flyToArea(fuzzyLng, fuzzyLat, 14.3);

        try {
          const revUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${fuzzyLat}&lon=${fuzzyLng}`;
          const res = await fetch(revUrl, { headers: { "Accept-Language": "en" } });
          const data = await res.json();
          const areaName = (data.address && (data.address.suburb || data.address.neighbourhood || data.address.city_district)) || "your area";
          showToast(`📍 Located near ${areaName} (±150m fuzzy privacy zone applied)`);
        } catch (_) {
          showToast("📍 Centred on your ±150m fuzzy privacy zone!");
        }
      },
      () => {
        flyToArea(77.6387, 12.9121, 14.3);
        showToast("📍 Centred on HSR Layout (Simulated ±150m privacy zone)");
      },
      { timeout: 5000 }
    );
  } else {
    flyToArea(77.6387, 12.9121, 14.3);
    showToast("📍 Centred on HSR Layout (Simulated ±150m privacy zone)");
  }
}

// ============================================================================
// Render Side Detail Card (R4 Item Detail Card + R12 Request Flow)
// ============================================================================
function renderDetailPanel(pin) {
  const panel = document.getElementById("map-detail-panel");
  if (!panel || !pin) return;

  const isWanted = pin.type === "wanted";
  const calendarCells = Array.from({ length: 14 }, (_, i) => {
    const dayNum = i + 1;
    const isBooked = pin.bookedDays.includes(dayNum);
    return `<div class="cal-day ${isBooked ? "booked" : ""}" title="${isBooked ? "Booked" : "Available"}">${dayNum} Oct</div>`;
  }).join("");

  panel.innerHTML = `
    <div>
      <div class="detail-badge-row">
        <span class="detail-category-badge ${isWanted ? "wanted" : ""}">
          ${pin.icon} ${pin.category}
        </span>
        <span style="font-size:0.76rem; color:var(--text-muted); font-family:var(--font-mono);">
          📍 ${pin.distanceKm}
        </span>
      </div>

      <h3 style="font-size:1.2rem; line-height:1.3; margin-bottom:6px;">${pin.title}</h3>
      <div style="font-size:0.83rem; color:#94a3b8; margin-bottom:10px;">
        Approximate Zone: <strong style="color:#e2e8f0;">${pin.area}</strong> <span style="color:#34d399;">(±150m fuzzy pin)</span>
      </div>

      <div class="detail-price-box">
        <div>
          <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">
            ${isWanted ? "Budget / Day" : "Rental Price"}
          </div>
          <div class="detail-price-main">₹${pin.pricePerDay}<span style="font-size:0.85rem; font-weight:500;">/day</span></div>
          ${pin.weeklyPrice ? `<div style="font-size:0.75rem; color:var(--text-muted);">or ₹${pin.weeklyPrice}/week</div>` : ""}
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Refundable Deposit</div>
          <div style="font-size:1.05rem; font-weight:700; color:#e2e8f0; font-family:var(--font-mono);">₹${pin.deposit}</div>
          <div style="font-size:0.73rem; color:#34d399;">Condition: ${pin.condition}</div>
        </div>
      </div>

      <p style="font-size:0.86rem; color:var(--text-muted); margin-bottom:14px;">
        ${pin.description}
      </p>

      <div style="background:rgba(15,23,42,0.75); border:1px solid var(--border); padding:11px 13px; border-radius:10px; margin-bottom:14px; font-size:0.82rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
          <span>👤 <strong>${pin.owner}</strong></span>
          <span style="color:#fbbf24; font-weight:700;">${pin.rating}</span>
        </div>
        <div style="color:var(--text-muted); font-size:0.78rem; margin-bottom:4px;">
          🤝 Suggested Handover: <strong style="color:#cbd5e1;">${pin.handoverSpot}</strong>
        </div>
        <div style="color:#34d399; font-size:0.75rem; font-family:var(--font-mono);">
          🔒 Phone number &amp; address hidden until owner approves
        </div>
      </div>

      ${!isWanted ? `
        <div style="margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; color:var(--text-muted); margin-bottom:4px;">
            <span>📅 Next 14 Days Availability</span>
            <span style="color:#6ee7b7;">Green = Available</span>
          </div>
          <div class="calendar-mini-grid">
            ${calendarCells}
          </div>
        </div>
      ` : ""}
    </div>

    <div style="display:flex; flex-direction:column; gap:8px;">
      <button class="btn-excited-main" style="padding:12px 16px; font-size:0.92rem;" onclick="simulateRentRequest('${escapeHtml(pin.title)}', ${isWanted})">
        ${isWanted ? "🤝 I Have This! Send Offer to Renter" : "📅 Request to Rent (1-Tap Demo)"}
      </button>
      <div style="display:flex; gap:8px;">
        <button class="btn-secondary" style="flex:1; padding:9px; font-size:0.8rem;" onclick="shareOnWhatsApp()">
          📲 Share on WhatsApp
        </button>
        <button class="btn-secondary" style="padding:9px 12px; font-size:0.8rem;" onclick="showToast('🛡️ Thanks! Our community moderation team reviews reported listings promptly.')">
          🚩 Report
        </button>
      </div>
    </div>
  `;
}

function simulateRentRequest(itemTitle, isWanted) {
  triggerQuickExcitement();
  if (isWanted) {
    showToast(`🎉 Demo Offer Sent for "${itemTitle}"! Your excitement vote was also counted.`);
  } else {
    showToast(`🎉 Demo Request Sent for "${itemTitle}"! Once the owner accepts, you'll both connect on WhatsApp.`);
  }
}

// ============================================================================
// Utilities
// ============================================================================
function showToast(message) {
  const toast = document.getElementById("toast");
  const text = document.getElementById("toast-text");
  if (!toast || !text) return;
  text.textContent = message;
  toast.style.display = "flex";
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.style.display = "none";
  }, 4200);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
