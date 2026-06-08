import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

import { AppSidebar } from "./app-sidebar";
import { AppTopbar } from "./app-topbar";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/followups", label: "Follow-ups", icon: PhoneCall },
  { to: "/sitevisits", label: "Site Visits", icon: CalendarCheck },
  { to: "/projects", label: "Projects", icon: Building2 },
  { to: "/developers", label: "Developers", icon: Briefcase },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/bookings", label: "Bookings", icon: FileText },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { location } = useRouterState();



  // Close sidebar on mobile when navigating
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);



  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar isOpen={sidebarOpen} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/45 z-20 md:hidden transition-all duration-200 animate-in fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <AppTopbar
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 p-6 space-y-6">{children}</main>
      </div>
    </div>
  );
}

