import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { useProjects } from "@/lib/queries";

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects · BLX Realty CRM" }] }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data: projects = [], isLoading } = useProjects();
  return (
    <AppShell title="Projects" subtitle="Master repository of all listed projects">
      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading…</div>
      ) : projects.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-sm text-muted-foreground">No projects yet.</CardContent></Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((p) => (
            <Card key={p.id} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-32 bg-gradient-to-br from-primary via-chart-2 to-chart-3 relative" />
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold">{p.name}</h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-success/15 text-success">
                    {p.available_units ?? 0} avail.
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{p.developers?.name ?? "—"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {p.location ?? "—"}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <Stat label="Units" value={p.total_units ?? 0} />
                  <Stat label="Available" value={p.available_units ?? 0} />
                  <Stat label="Price" value={p.price_range ?? "—"} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-muted/50 py-2">
      <div className="text-sm font-semibold truncate px-1">{value}</div>
      <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}
