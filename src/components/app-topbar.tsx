import { Button } from "@/components/ui/button";

export function AppTopbar({
  title,
  subtitle,
  onMenuToggle,
}: {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
}) {
  return (
    <header className="h-16 border-b bg-card flex items-center gap-4 px-6 sticky top-0 z-10">
      {/* Mobile hamburger */}
      <button className="md:hidden mr-2" onClick={onMenuToggle} aria-label="Toggle menu">
        <span className="sr-only">Menu</span>
        {/* Placeholder for menu icon */}
        <div className="h-5 w-5 bg-muted rounded" />
      </button>
      <div className="flex-1 min-w-0">
        <h1 className="text-lg font-semibold text-foreground truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
      </div>
      {/* Search placeholder */}
      <div className="hidden lg:flex items-center gap-2 w-80 px-3 h-10 rounded-lg bg-muted text-muted-foreground">
        <div className="h-4 w-4 bg-muted rounded" />
        <input
          placeholder="Search…"
          className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
        />
        <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-background border">⌘K</kbd>
      </div>
      {/* Bell placeholder */}
      <Button variant="ghost" size="icon" className="relative">
        <div className="h-5 w-5 bg-muted rounded" />
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
      </Button>
      {/* New Lead placeholder */}
      <Button className="gap-2">
        <div className="h-4 w-4 bg-muted rounded" /> New Lead
      </Button>
    </header>
  );
}
