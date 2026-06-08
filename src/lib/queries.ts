import { useQuery } from "@tanstack/react-query";

export interface LeadRow {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  source: string;
  budget: string | null;
  stage: "new" | "contacted" | "interested" | "site_visit" | "negotiation" | "booking" | "converted" | "lost";
  temperature: "hot" | "warm" | "cold";
  created_at: string;
  projects?: { name: string } | null;
}

export interface ProjectRow {
  id: string;
  name: string;
  developer_id: string | null;
  location: string | null;
  total_units: number | null;
  available_units: number | null;
  price_range: string | null;
  created_at: string;
  developers?: { name: string } | null;
}

// In-memory collections to act as our local database
let mockProjects: ProjectRow[] = [
  {
    id: "proj-1",
    name: "Aurelia Heights",
    developer_id: "dev-1",
    location: "Koramangala, Bangalore",
    total_units: 120,
    available_units: 14,
    price_range: "₹2.1 - 4.5 Cr",
    created_at: new Date().toISOString(),
    developers: { name: "Prestige Estates" }
  },
  {
    id: "proj-2",
    name: "Skyline Meadows",
    developer_id: "dev-2",
    location: "Whitefield, Bangalore",
    total_units: 250,
    available_units: 42,
    price_range: "₹1.5 - 3.2 Cr",
    created_at: new Date().toISOString(),
    developers: { name: "Brigade Group" }
  }
];

let mockLeads: LeadRow[] = [
  {
    id: "lead-1",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@gmail.com",
    source: "Website",
    budget: "₹2.5 Cr",
    stage: "interested",
    temperature: "hot",
    created_at: new Date(Date.now() - 3600000).toISOString(),
    projects: { name: "Aurelia Heights" }
  },
  {
    id: "lead-2",
    name: "Priya Nair",
    phone: "+91 87654 32109",
    email: "priya.nair@outlook.com",
    source: "Referral",
    budget: "₹3.8 Cr",
    stage: "site_visit",
    temperature: "hot",
    created_at: new Date(Date.now() - 7200000).toISOString(),
    projects: { name: "Aurelia Heights" }
  },
  {
    id: "lead-3",
    name: "Amit Patel",
    phone: "+91 76543 21098",
    email: "amit.patel@yahoo.com",
    source: "Walk-in",
    budget: "₹1.8 Cr",
    stage: "new",
    temperature: "warm",
    created_at: new Date(Date.now() - 14400000).toISOString(),
    projects: { name: "Skyline Meadows" }
  }
];

let mockBookings = [
  { amount: 2500000 },
  { amount: 1500000 }
];

export function useLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: async (): Promise<LeadRow[]> => {
      return [...mockLeads];
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<ProjectRow[]> => {
      return [...mockProjects];
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const hotCount = mockLeads.filter(l => l.temperature === "hot").length;
      const revenue = mockBookings.reduce((sum, b) => sum + b.amount, 0);
      return {
        leads: mockLeads.length,
        hot: hotCount,
        projects: mockProjects.length,
        revenue,
      };
    },
  });
}

export async function addMockLead(lead: Omit<LeadRow, "id" | "created_at">) {
  const newLead: LeadRow = {
    ...lead,
    id: `lead-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    projects: lead.projects || { name: "Aurelia Heights" }
  };
  mockLeads = [newLead, ...mockLeads];
  return newLead;
}

