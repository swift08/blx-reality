export type LeadStage =
  | "New"
  | "Contacted"
  | "Connected"
  | "Interested"
  | "Site Visit"
  | "Negotiation"
  | "Booking"
  | "Converted"
  | "Lost";

export type Temperature = "Hot" | "Warm" | "Cold";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  project: string;
  budget: string;
  source: string;
  owner: string;
  stage: LeadStage;
  temperature: Temperature;
  updated: string;
}

export const stages: LeadStage[] = [
  "New",
  "Contacted",
  "Interested",
  "Site Visit",
  "Negotiation",
  "Booking",
  "Converted",
];

export const leads: Lead[] = [];

export const followUps: any[] = [];

export const projects: any[] = [];

export const salesTeam = [
  { name: "Aisha Khan", role: "Senior Executive", leads: 0, visits: 0, bookings: 0, revenue: "₹0" },
  { name: "Vikram Singh", role: "Executive", leads: 0, visits: 0, bookings: 0, revenue: "₹0" },
  { name: "Neha Patel", role: "Senior Executive", leads: 0, visits: 0, bookings: 0, revenue: "₹0" },
  { name: "Rahul Desai", role: "Executive", leads: 0, visits: 0, bookings: 0, revenue: "₹0" },
];
