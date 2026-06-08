import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "./followups";
export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "Bookings · BLX Realty CRM" }] }),
  component: () => <Stub title="Bookings" subtitle="Customer booking workflows" />,
});
