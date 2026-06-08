import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "./followups";
export const Route = createFileRoute("/sitevisits")({
  head: () => ({ meta: [{ title: "Site Visits · BLX Realty CRM" }] }),
  component: () => <Stub title="Site Visits" subtitle="Scheduled & completed property visits" />,
});
