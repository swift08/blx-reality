import { Link, useRouterState } from "@tanstack/react-router";

import logo from "@/assets/blx-logo.png";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard" },
  { to: "/leads", label: "Leads" },
  { to: "/followups", label: "Follow-ups" },
  { to: "/sitevisits", label: "Site Visits" },
  { to: "/projects", label: "Projects" },
  { to: "/developers", label: "Developers" },
  { to: "/inventory", label: "Inventory" },
  { to: "/bookings", label: "Bookings" },
  { to: "/analytics", label: "Analytics" },
  { to: "/settings", label: "Settings" },
] as const;

export function AppSidebar({ isOpen }: { isOpen?: boolean }) {
  const { location } = useRouterState();
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border transform transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-lg bg-white grid place-items-center overflow-hidden">
          <img src={logo} alt="BLX Realty" className="h-7 w-7 object-contain" />
        </div>
        <div className="leading-tight">
          <div className="font-display font-bold tracking-tight">BLX Realty</div>
          <div className="text-[11px] text-sidebar-foreground/60 uppercase tracking-[0.18em]">CRM Suite</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {nav.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-xl bg-sidebar-accent/60 p-4 text-xs text-sidebar-foreground/80">
        <div className="font-semibold text-sidebar-foreground mb-1">Need help?</div>
        Reach the BLX ops desk for onboarding & training.
      </div>
    </aside>
  );
}
