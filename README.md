# Rent Anything Bengaluru 🚀

A modern, map-first, peer-to-peer item rental platform built with **Next.js (App Router, React 19, TypeScript, Tailwind CSS)** and ready for **Supabase** backend integration.

Browse cameras, camping tents, tools, and projectors available around your street in Bengaluru — without login, with 150m privacy by default.

---

## 🛠️ Modern Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router + Turbopack)
- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/)
- **Interactive Vector Maps**: [MapLibre GL JS](https://maplibre.org/) with [OpenFreeMap](https://openfreemap.org/) Liberty & Positron vector tiles
- **Geocoding & Autocomplete**: Photon API (Komoot/OSM) & OpenStreetMap Nominatim reverse geocoding
- **Backend & Auth Ready**: [Supabase](https://supabase.com/) (`@supabase/ssr`, `@supabase/supabase-js`)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Run the Development Server

You can start the local development server in any of these ways:

#### Option A: One-Click (Windows)
Double-click [`start.bat`](start.bat). It will launch the development server and open your default browser.

#### Option B: PowerShell
```powershell
.\start.ps1
```

#### Option C: Terminal / npm
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Connecting Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard and run the schema script located in [`supabase/schema.sql`](supabase/schema.sql). This sets up:
   - `profiles` table (linked to Supabase Auth)
   - `rental_items` table (with latitude, longitude, and 150m fuzzy coordinates)
   - `rental_requests` table (with status tracking and phone reveal approval)
   - `neighbourhood_votes` table (for the launch poll)
   - Full Row Level Security (RLS) policies
3. Copy your project credentials into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```
4. The client is pre-wired in [`src/lib/supabase/client.ts`](src/lib/supabase/client.ts) (browser) and [`src/lib/supabase/server.ts`](src/lib/supabase/server.ts) (Server Components / Actions).

---

## 📁 Project Structure

```text
Rent_Anything/
├── public/
│   └── assets/                # App UI mockups and SVG logo
├── src/
│   ├── app/
│   │   ├── globals.css        # Global styles & map styling
│   │   ├── layout.tsx         # Root layout with metadata & fonts
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── Navbar.tsx         # Sticky navbar with live excitement meter
│   │   ├── Hero.tsx           # Hero section & interactive screen switcher
│   │   ├── AppPreview.tsx     # 3-step walkthrough & lightbox
│   │   ├── PrivacySection.tsx # Privacy & safety guarantee
│   │   ├── InteractiveMap.tsx # MapLibre GL map with filters & geocoding
│   │   ├── ExcitementPoll.tsx # Neighbourhood launch poll & leaderboard
│   │   ├── PersonasSection.tsx# Renter savings vs Owner earnings breakdown
│   │   └── Footer.tsx         # Footer with WhatsApp share integration
│   ├── context/
│   │   └── AppContext.tsx     # Global client state for votes & notifications
│   ├── data/
│   │   └── mockPins.ts        # Bengaluru mock pins & initial leaderboard
│   ├── lib/
│   │   └── supabase/          # Pre-configured Supabase SSR & browser clients
│   └── types/
│       └── index.ts           # TypeScript interfaces for pins, votes & requests
├── supabase/
│   └── schema.sql             # Production-ready PostgreSQL schema with RLS
├── next.config.ts
├── package.json
├── tsconfig.json
├── start.bat                  # One-click Windows starter
├── start.ps1                  # PowerShell starter
└── README.md
```
