import { Link, useRouterState } from "@tanstack/react-router";
import {
  ClipboardCheck,
  History,
  LayoutGrid,
  Map,
  Wrench,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { LoginScreen } from "@/components/login-screen";
import { useGarage, claimLegacyInspections, ensureAdmin } from "@/lib/store";
import { useSession } from "@/lib/session";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Accueil", icon: LayoutGrid, match: (p: string) => p === "/" },
  {
    to: "/controle",
    label: "Contrôle",
    icon: ClipboardCheck,
    match: (p: string) => p.startsWith("/controle"),
  },
  {
    to: "/plan",
    label: "Plan",
    icon: Map,
    match: (p: string) => p.startsWith("/plan"),
  },
  {
    to: "/pieces",
    label: "Pièces",
    icon: Wrench,
    match: (p: string) => p.startsWith("/pieces"),
  },
  {
    to: "/historique",
    label: "Historique",
    icon: History,
    match: (p: string) => p.startsWith("/historique") || p.startsWith("/imprimer"),
  },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrated = useGarage((s) => s.hydrated);
  const accounts = useGarage((s) => s.accounts ?? []);
  const username = useSession((s) => s.username);
  const sessionReady = useSession((s) => s.ready);
  const current = accounts.find((account) => account.username === username);
  const label = current?.label ?? username;

  useEffect(() => {
    void Promise.resolve(useGarage.persist.rehydrate()).then(() => {
      useGarage.getState().setHydrated(true);
    });
    useSession.getState().restore();
  }, []);

  useEffect(() => {
    if (!hydrated || !username) return;
    ensureAdmin();
    claimLegacyInspections(username);
    if (!accounts.some((account) => account.username === username)) {
      useSession.getState().logout();
    }
  }, [hydrated, username, accounts]);

  if (!hydrated || !sessionReady) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background text-sm text-muted-foreground">
        Chargement…
      </div>
    );
  }

  if (!username) return <LoginScreen />;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="no-print sticky top-0 z-40 bg-ink text-paper">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
          <Link to="/" className="shrink-0" aria-label="Atelier HS4">
            <Logo className="text-paper" />
          </Link>
          <nav className="hidden items-center gap-0 md:flex">
            {NAV.map((item) => {
              const active = item.match(pathname);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative inline-flex h-14 items-center px-3.5 text-sm transition-colors duration-150",
                    active
                      ? "text-paper"
                      : "text-paper/55 hover:text-paper",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3 bottom-0 h-0.5 bg-primary" />
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <span className="max-w-32 truncate text-sm text-paper/80">
              {label}
              {current?.admin ? " · admin" : ""}
            </span>
            <button
              type="button"
              className="text-sm text-paper/70 hover:text-paper"
              onClick={() => useSession.getState().logout()}
            >
              Quitter
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 pt-6 pb-28 md:pb-12">
        {children}
      </main>

      <nav className="no-print fixed right-0 bottom-0 left-0 z-40 border-t border-border bg-ink pb-[env(safe-area-inset-bottom)] md:hidden">
        <ul className="grid grid-cols-5">
          {NAV.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-xs",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" strokeWidth={active ? 2.2 : 1.75} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
