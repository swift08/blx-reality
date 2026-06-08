import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "./followups";
export const Route = createFileRoute("/developers")({
  head: () => ({ meta: [{ title: "Developers · BLX Realty CRM" }] }),
  component: () => <Stub title="Developers" subtitle="Centralized developer database" />,
});
