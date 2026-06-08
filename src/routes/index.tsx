import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TempBadge, StageBadge } from "@/components/temp-badge";
import { NewLeadDialog } from "@/components/new-lead-dialog";
import { useDashboardStats, useLeads, useProjects } from "@/lib/queries";
import { useAuth } from "@/hooks/use-auth";

type Stage = "new" | "contacted" | "interested" | "site_visit" | "negotiation" | "booking" | "converted" | "lost";
type Temp = "hot" | "warm" | "cold";

const stageLabels: Record<Stage, string> = {
  new: "New", contacted: "Contacted", interested: "Interested",
  site_visit: "Site Visit", negotiation: "Negotiation", booking: "Booking",
  converted: "Converted", lost: "Lost",
};

const tempLabels: Record<Temp, "Hot" | "Warm" | "Cold"> = {
  hot: "Hot", warm: "Warm", cold: "Cold",
};

const pipelineStages: Stage[] = ["new","contacted","interested","site_visit","negotiation","booking","converted"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · BLX Realty CRM" },
      { name: "description", content: "Real-time overview of BLX Realty sales, leads, follow-ups and bookings." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();
  const firstName = (user?.user_metadata?.full_name as string | undefined)?.split(" ")[0] ?? "there";
  return (
    <AppShell title={`Good morning, ${firstName}`} subtitle="Here's what's happening across BLX Realty today">
      <KPIRow />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <Pipeline />
          <RecentLeads />
        </div>
        <div className="space-y-6">
          <TopProjects />
        </div>
      </div>
    </AppShell>
  );
}

function formatINR(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${n.toLocaleString("en-IN")}`;
}

function KPIRow() {
  const { data, isLoading } = useDashboardStats();
  const kpis = [
    { label: "Total Leads", value: data?.leads ?? 0 },
    { label: "Hot Leads", value: data?.hot ?? 0 },
    { label: "Active Projects", value: data?.projects ?? 0 },
    { label: "Revenue", value: formatINR(data?.revenue ?? 0) },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((k) => (
        <Card key={k.label} className="border-border/60">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{k.label}</span>
            </div>
            <div className="mt-2 text-2xl font-display font-bold tracking-tight">
              {isLoading ? "—" : k.value}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Live from database
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Pipeline() {
  const { data: leads = [] } = useLeads();
  const counts = pipelineStages.map((s) => leads.filter((l) => l.stage === s).length);
  const max = Math.max(1, ...counts);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Pipeline</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">Active leads by stage</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
          {pipelineStages.map((s, i) => (
            <div key={s} className="rounded-xl bg-muted/50 p-3 flex flex-col">
              <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide truncate">{stageLabels[s]}</div>
              <div className="mt-2 text-xl font-display font-bold">{counts[i]}</div>
              <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(counts[i] / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RecentLeads() {
  const { data: leads = [], isLoading } = useLeads();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Leads</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">Latest activity across the team</p>
        </div>
        <NewLeadDialog />
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : leads.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No leads yet. Add your first lead to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-y bg-muted/30">
                  <th className="px-6 py-3 font-medium">Lead</th>
                  <th className="px-3 py-3 font-medium">Project</th>
                  <th className="px-3 py-3 font-medium">Budget</th>
                  <th className="px-3 py-3 font-medium">Stage</th>
                  <th className="px-3 py-3 font-medium">Temp</th>
                  <th className="px-6 py-3 font-medium text-right">Source</th>
                </tr>
              </thead>
              <tbody>
                {leads.slice(0, 8).map((l) => (
                  <tr key={l.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3">
                      <div className="font-medium text-foreground">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.phone || l.email || "—"}</div>
                    </td>
                    <td className="px-3 py-3 text-foreground">{l.projects?.name ?? "—"}</td>
                    <td className="px-3 py-3 font-medium">{l.budget || "—"}</td>
                    <td className="px-3 py-3"><StageBadge value={stageLabels[l.stage]} /></td>
                    <td className="px-3 py-3"><TempBadge value={tempLabels[l.temperature]} /></td>
                    <td className="px-6 py-3 text-right text-xs text-muted-foreground">{l.source || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TopProjects() {
  const { data: projects = [] } = useProjects();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {projects.length === 0 && (
          <p className="text-sm text-muted-foreground">No projects yet.</p>
        )}
        {projects.slice(0, 5).map((p) => (
          <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/40 transition-colors cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-chart-2 text-primary-foreground grid place-items-center font-display font-bold text-sm">
              {p.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{p.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {p.location || "—"}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{p.available_units ?? 0}</div>
              <div className="text-[11px] text-muted-foreground">available</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
