import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "./followups";
export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · BLX Realty CRM" }] }),
  component: () => <Stub title="Settings" subtitle="Users, roles & system configuration" />,
});
