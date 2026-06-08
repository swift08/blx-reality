import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "./followups";
export const Route = createFileRoute("/inventory")({
  head: () => ({ meta: [{ title: "Inventory · BLX Realty CRM" }] }),
  component: () => <Stub title="Inventory" subtitle="Units available, reserved & sold" />,
});
