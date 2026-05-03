import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "next-themes";
import { useAppState } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { Moon, Sun, UserCog } from "lucide-react";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export function PageShell({ children, className, narrow }: PageShellProps) {
  const { theme, setTheme } = useTheme();
  const { role } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  const showSwitchRole = role && location.pathname !== "/" && location.pathname !== "/role";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
            RSIF Accountability Demonstrator
          </span>
          <div className="flex items-center gap-2">
            {showSwitchRole && (
              <button
                onClick={() => navigate("/role")}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border rounded-md px-2.5 py-1.5 bg-background transition-colors"
              >
                <UserCog className="h-3.5 w-3.5" />
                Switch Role
              </button>
            )}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            </button>
          </div>
        </div>
      </header>
      <main className={cn("container mx-auto px-4 py-8", narrow ? "max-w-2xl" : "max-w-5xl", className)}>
        {children}
      </main>
      <footer className="border-t mt-auto">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <p className="text-xs text-muted-foreground text-center">
            Academic Proof-of-Concept · Responsible and Sustainable Innovation Framework
          </p>
        </div>
      </footer>
    </div>
  );
}
