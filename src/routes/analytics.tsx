import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { salesTeam } from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics · BLX Realty CRM" }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  return (
    <AppShell title="Analytics" subtitle="Sales productivity & business performance">
      <Card>
        <CardHeader><CardTitle>Sales Team Performance</CardTitle></CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-y bg-muted/30">
                <th className="px-6 py-3 font-medium">Executive</th>
                <th className="px-3 py-3 font-medium">Leads</th>
                <th className="px-3 py-3 font-medium">Site Visits</th>
                <th className="px-3 py-3 font-medium">Bookings</th>
                <th className="px-6 py-3 font-medium text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {salesTeam.map((s) => (
                <tr key={s.name} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-semibold">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 font-medium">{s.leads}</td>
                  <td className="px-3 py-3">{s.visits}</td>
                  <td className="px-3 py-3">{s.bookings}</td>
                  <td className="px-6 py-3 text-right font-semibold">{s.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </AppShell>
  );
}
