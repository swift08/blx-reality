import { useEffect, useState, useCallback } from "react";

export type AppRole = "super_admin" | "admin" | "sales_executive";

export interface AuthState {
  session: any | null;
  user: any | null;
  role: AppRole | null;
  loading: boolean;
}

export function useAuth(): AuthState & { signOut: () => Promise<void> } {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    role: null,
    loading: true,
  });

  // Sync with localStorage
  useEffect(() => {
    let saved = localStorage.getItem("blx-realty-session");
    if (!saved) {
      const defaultSession = {
        access_token: "mock-token",
        user: {
          id: "mock-user-id",
          email: "harshith@blxrealty.com",
          user_metadata: { full_name: "Harshith V Malipatil" },
        },
      };
      localStorage.setItem("blx-realty-session", JSON.stringify(defaultSession));
      saved = JSON.stringify(defaultSession);
    }
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState({
          session: parsed,
          user: parsed.user,
          role: "super_admin",
          loading: false,
        });
      } catch (e) {
        localStorage.removeItem("blx-realty-session");
        setState({ session: null, user: null, role: null, loading: false });
      }
    } else {
      setState({ session: null, user: null, role: null, loading: false });
    }
  }, []);

  const signOut = useCallback(async () => {
    localStorage.removeItem("blx-realty-session");
    setState({ session: null, user: null, role: null, loading: false });
  }, []);

  return { ...state, signOut };
}


