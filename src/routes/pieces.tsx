import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { VENDORS } from "@/lib/vendors";

export const Route = createFileRoute("/pieces")({ component: PiecesPage });

function PiecesPage() {
  const trikes = VENDORS.filter((v) => v.kind === "trike");
  const cox = VENDORS.filter((v) => v.kind === "cox");

  return (
    <AppShell>
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Fournisseurs
      </p>
      <h1 className="mt-1 text-3xl">Pièces à connaître</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Les vendeurs listés au verso du formulaire d'entretien HS4 — châssis
        Rewaco / Boom et moteur Cox.
      </p>

      <Group title="Trike Boom et Rewaco" items={trikes} />
      <Group title="Pièces moteur Cox" items={cox} />
    </AppShell>
  );
}

function Group({
  title,
  items,
}: {
  title: string;
  items: typeof VENDORS;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-xl">{title}</h2>
      <ul className="mt-3 grid gap-2">
        {items.map((v) => (
          <li key={v.url}>
            <a
              href={v.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-3 rounded-xl bg-card px-4 py-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
            >
              <div className="min-w-0">
                <p className="truncate text-sm text-foreground">{v.name}</p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {v.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-2">
                <Badge className="hidden sm:inline-flex">{v.note}</Badge>
                <ArrowUpRight className="size-4 text-muted-foreground" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
