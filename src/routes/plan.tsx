import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { StatusToggle } from "@/components/status-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HOTSPOTS } from "@/lib/diagram";
import { ITEM_BY_ID, ITEMS, STATUS_META } from "@/lib/checklist";
import { emptyInspection, useGarage } from "@/lib/store";
import { useSession } from "@/lib/session";
import type { ItemStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/plan")({ component: PlanPage });

function PlanPage() {
  const inspections = useGarage((s) => s.inspections);
  const username = useSession((s) => s.username);
  const mine = inspections.filter((i) => i.owner === username);
  const vehicle = useGarage((s) => s.vehicle);
  const addInspection = useGarage((s) => s.addInspection);
  const setItemStatus = useGarage((s) => s.setItemStatus);
  const [activeId, setActiveId] = useState<string>("1");

  const draft = mine.find((i) => i.status === "draft") ?? mine[0] ?? null;

  const item = ITEM_BY_ID[activeId] ?? ITEMS[0];
  const status = draft?.items[item.id];

  function ensureDraft() {
    if (draft) return draft.id;
    const insp = emptyInspection(vehicle, username ?? "");
    addInspection(insp);
    return insp.id;
  }

  function selectPoint(itemId: string) {
    setActiveId(itemId);
    document.getElementById("plan-point")?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }
  function onStatus(next: ItemStatus | undefined) {
    const id = ensureDraft();
    setItemStatus(id, item.id, next);
  }

  return (
    <AppShell>
      <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
        Repérage
      </p>
      <h1 className="mt-1 text-3xl">Plan du trike</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Schéma du formulaire. Touchez un numéro : seul ce point s’affiche
        en dessous.
      </p>

      <div className="relative mt-5 overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
        <img
          src="/images/diagram.jpg"
          alt="Schéma annoté du Rewaco HS4, formulaire d'entretien"
          className="w-full bg-paper"
        />
        {HOTSPOTS.map((h) => {
          const point = ITEM_BY_ID[h.id];
          if (!point) return null;
          return (
            <button
              key={h.id}
              type="button"
              title={`${point.num}. ${point.label}`}
              aria-label={`Point ${point.num}, ${point.label}`}
              onClick={() => selectPoint(h.id)}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              className={cn(
                "absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-xs font-semibold shadow-[var(--shadow-border)] sm:size-9",
                h.id === activeId
                  ? "z-10 scale-110 bg-paper text-ink ring-2 ring-primary"
                  : "bg-primary text-primary-foreground",
              )}
            >
              {point.num}
            </button>
          );
        })}
      </div>

      <div
        id="plan-point"
        className="mt-4 scroll-mt-20 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]"
      >
        <label className="block text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Point
          <select
            className="mt-1.5 h-11 w-full rounded-md bg-background px-3 text-sm text-foreground normal-case tracking-normal shadow-[var(--shadow-border)]"
            value={item.id}
            onChange={(e) => selectPoint(e.target.value)}
          >
            {ITEMS.map((it) => (
              <option key={it.id} value={it.id}>
                {it.num}. {it.label}
              </option>
            ))}
          </select>
        </label>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-2xl tabular-nums">{item.num}</p>
            <h2 className="mt-1 text-xl normal-case tracking-normal">
              {item.label}
            </h2>
          </div>
          {status ? (
            <Badge
              variant={status === "ok" ? "ok" : status === "warn" ? "warn" : "fail"}
            >
              {STATUS_META[status].short}
            </Badge>
          ) : (
            <Badge>Non noté</Badge>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <StatusToggle value={status} onChange={onStatus} />
          {draft ? (
            <Button variant="outline" size="sm" asChild>
              <Link to="/controle/$id" params={{ id: draft.id }}>
                Ouvrir la fiche
              </Link>
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">
              Le premier point crée un brouillon.
            </p>
          )}
        </div>
      </div>

      <section className="mt-6 grid gap-3 sm:grid-cols-3">
        <figure className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
          <img
            src="/images/avant.jpg"
            alt="Roue avant du trike"
            className="h-44 w-full object-cover"
          />
          <figcaption className="p-4">
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Avant
            </p>
            <p className="mt-1 text-sm">Roue, fourche et frein avant</p>
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
          <img
            src="/images/engine.jpg"
            alt="Moteur Cox aircooled"
            className="h-44 w-full object-cover"
          />
          <figcaption className="p-4">
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Points 47–61
            </p>
            <p className="mt-1 text-sm">Moteur Cox — carbu, allumage, courroie</p>
          </figcaption>
        </figure>
        <figure className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
          <img
            src="/images/arriere.jpg"
            alt="Roue et bras arrière du trike"
            className="h-44 w-full object-cover"
          />
          <figcaption className="p-4">
            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
              Arrière
            </p>
            <p className="mt-1 text-sm">Roue, bras et soufflets</p>
          </figcaption>
        </figure>
      </section>

      <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <Legend swatch="bg-ok" label="Bon état" />
        <Legend swatch="bg-warn" label="Mauvais état" />
        <Legend swatch="bg-bad" label="HS / ne fonctionne pas" />
        <Legend swatch="bg-muted" label="Non noté" />
      </div>
    </AppShell>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("size-2.5 rounded-full", swatch)} />
      {label}
    </span>
  );
}
