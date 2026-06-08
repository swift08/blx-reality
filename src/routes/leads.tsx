import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TempBadge, StageBadge } from "@/components/temp-badge";
import { NewLeadDialog } from "@/components/new-lead-dialog";
import { useLeads } from "@/lib/queries";

type Stage = "new" | "contacted" | "interested" | "site_visit" | "negotiation" | "booking" | "converted" | "lost";
type Temp = "hot" | "warm" | "cold";

const stageLabels: Record<Stage, string> = {
  new: "New", contacted: "Contacted", interested: "Interested",
  site_visit: "Site Visit", negotiation: "Negotiation", booking: "Booking",
  converted: "Converted", lost: "Lost",
};
const tempLabels: Record<Temp, "Hot" | "Warm" | "Cold"> = { hot: "Hot", warm: "Warm", cold: "Cold" };

export const Route = createFileRoute("/leads")({
  head: () => ({ meta: [{ title: "Leads · BLX Realty CRM" }] }),
  component: LeadsPage,
});

function LeadsPage() {
  const { data: leads = [], isLoading } = useLeads();
  const [q, setQ] = useState("");
  const filtered = leads.filter(
    (l) =>
      !q ||
      l.name.toLowerCase().includes(q.toLowerCase()) ||
      (l.phone ?? "").includes(q) ||
      (l.email ?? "").toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <AppShell title="Leads" subtitle="All customer enquiries across sources">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 h-10 px-3 rounded-lg bg-muted flex-1 max-w-md min-w-64">

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="bg-transparent outline-none text-sm flex-1"
              placeholder="Search by name, phone, email…"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Filters</Button>
            <NewLeadDialog />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-sm text-muted-foreground">
              {leads.length === 0 ? "No leads yet. Click 'Add Lead' to create your first one." : "No matches."}
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-y bg-muted/30">
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-3 py-3 font-medium">Project</th>
                  <th className="px-3 py-3 font-medium">Source</th>
                  <th className="px-3 py-3 font-medium">Budget</th>
                  <th className="px-3 py-3 font-medium">Stage</th>
                  <th className="px-3 py-3 font-medium">Temp</th>
                  <th className="px-6 py-3 font-medium text-right">Added</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-6 py-3">
                      <div className="font-medium">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.phone || l.email || "—"}</div>
                    </td>
                    <td className="px-3 py-3">{l.projects?.name ?? "—"}</td>
                    <td className="px-3 py-3 text-muted-foreground">{l.source ?? "—"}</td>
                    <td className="px-3 py-3 font-medium">{l.budget ?? "—"}</td>
                    <td className="px-3 py-3"><StageBadge value={stageLabels[l.stage]} /></td>
                    <td className="px-3 py-3"><TempBadge value={tempLabels[l.temperature]} /></td>
                    <td className="px-6 py-3 text-right text-xs text-muted-foreground">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </AppShell>
  );
}
