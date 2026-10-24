export interface RentalPin {
  id: string;
  type: "listing" | "wanted";
  title: string;
  category: string;
  icon: string;
  pricePerDay: number;
  weeklyPrice: number | null;
  deposit: number;
  condition: string;
  area: string;
  distanceKm: string;
  coords: [number, number]; // [longitude, latitude]
  owner: string;
  rating: string;
  handoverSpot: string;
  description: string;
  bookedDays: number[];
}

export interface NeighbourhoodVote {
  [area: string]: number;
}

export interface Pledge {
  area: string;
  role: string;
  text: string;
}

export interface GeoSuggestion {
  name: string;
  sub: string;
  coords: [number, number];
}
