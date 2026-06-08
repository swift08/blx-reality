import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";


export const Route = createFileRoute("/followups")({
  head: () => ({ meta: [{ title: "Follow-ups · BLX Realty CRM" }] }),
  component: () => <Stub title="Follow-ups" subtitle="Calls, meetings, reminders" />,
});

export function Stub({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <AppShell title={title} subtitle={subtitle}>
      <Card>
        <CardContent className="p-12 text-center">

          <h3 className="font-display font-bold text-lg">Coming up next</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            This module is part of the BLX Realty CRM roadmap. We'll wire it up to the live database in the next iteration.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}
