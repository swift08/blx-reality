import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import logo from "@/assets/blx-logo.png";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in · BLX Realty CRM" }] }),
  beforeLoad: async () => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("blx-realty-session") : null;
    if (saved) throw redirect({ to: "/" });
  },
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const mockSession = {
        access_token: "mock-token",
        user: {
          id: "mock-user-id",
          email: email || "harshith@blxrealty.com",
          user_metadata: { full_name: name || "Harshith V Malipatil" },
        },
      };
      localStorage.setItem("blx-realty-session", JSON.stringify(mockSession));
      toast.success(mode === "signup" ? "Account created — welcome!" : "Welcome back");
      navigate({ to: "/" });
      // Reload page to refresh context state
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err: unknown) {
      toast.error("Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-sidebar text-sidebar-foreground p-12">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white grid place-items-center">
            <img src={logo} alt="BLX Realty" className="h-8 w-8 object-contain" />
          </div>
          <div>
            <div className="font-display font-bold text-lg">BLX Realty</div>
            <div className="text-[11px] uppercase tracking-[0.18em] opacity-70">CRM Suite</div>
          </div>
        </div>
        <div className="max-w-md">
          <h2 className="font-display text-3xl font-bold leading-tight">
            The operating system for your real estate business.
          </h2>
          <p className="mt-4 text-sm opacity-80">
            Every lead tracked. Every interaction recorded. Every salesperson accountable.
          </p>
        </div>
        <div className="text-xs opacity-60">© {new Date().getFullYear()} BLX Realty</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <Card className="w-full max-w-md border-border/60">
          <CardContent className="p-8">
            <div className="flex lg:hidden items-center gap-2 mb-6">
              <img src={logo} alt="BLX Realty" className="h-8 w-8" />
              <span className="font-display font-bold">BLX Realty</span>
            </div>
            <h1 className="text-2xl font-display font-bold">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "signin"
                ? "Sign in to manage your leads and bookings."
                : "Start tracking leads with the BLX Realty CRM."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Aisha Khan" required />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@blxrealty.com" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              {mode === "signin" ? "New to BLX Realty?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-primary font-medium hover:underline"
              >
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
