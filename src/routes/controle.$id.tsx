import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Download, Printer, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { ChecklistRow } from "@/components/checklist-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  ITEMS,
  SECTIONS,
  itemsForSection,
  sectionTally,
  tally,
} from "@/lib/checklist";
import { useGarage } from "@/lib/store";
import type { ItemStatus, SectionId, StatusFilter } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/controle/$id")({
  component: InspectionEditor,
});

const FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Tous" },
  { id: "todo", label: "À faire" },
  { id: "ok", label: "OK" },
  { id: "warn", label: "Attention" },
  { id: "fail", label: "HS" },
];

function InspectionEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const inspection = useGarage((s) => s.inspections.find((i) => i.id === id));
  const update = useGarage((s) => s.updateInspection);
  const setStatus = useGarage((s) => s.setItemStatus);
  const setNote = useGarage((s) => s.setItemNote);
  const remove = useGarage((s) => s.deleteInspection);
  const setVehicle = useGarage((s) => s.setVehicle);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [section, setSection] = useState<SectionId | "all">("all");
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    document.getElementById(hash)?.scrollIntoView({ block: "center" });
  }, [id]);

  const stats = tally(inspection);

  const visible = useMemo(() => {
    return ITEMS.filter((item) => {
      if (section !== "all" && item.section !== section) return false;
      const s = inspection?.items[item.id];
      if (filter === "todo") return !s;
      if (filter === "ok" || filter === "warn" || filter === "fail") {
        return s === filter;
      }
      return true;
    });
  }, [filter, section, inspection]);

  if (!inspection) {
    return (
      <AppShell>
        <h1 className="text-3xl">Contrôle introuvable</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette fiche n'est plus dans l'historique.
        </p>
        <Button className="mt-4" asChild>
          <Link to="/controle">Retour</Link>
        </Button>
      </AppShell>
    );
  }

  const current = inspection;

  function complete() {
    update(id, { status: "complete" });
    setVehicle({
      km: current.km,
      plate: current.plate,
      year: current.year,
    });
  }

  return (
    <AppShell>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            {inspection.status === "complete" ? "Fiche close" : "Brouillon"}
          </p>
          <h1 className="mt-1 text-3xl">Check-list HS4</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/imprimer/$id" params={{ id }}>
              <Printer className="size-4" />
              Imprimer
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={pdfBusy}
            onClick={() => {
              setPdfBusy(true);
              void import("@/lib/inspection-pdf")
                .then((mod) => mod.downloadInspectionPdf(current))
                .finally(() => setPdfBusy(false));
            }}
          >
            <Download className="size-4" />
            {pdfBusy ? "PDF…" : "PDF"}
          </Button>
          {inspection.status === "draft" ? (
            <Button size="sm" variant="ok" onClick={complete}>
              <Check className="size-4" />
              Clôturer
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => update(id, { status: "draft" })}
            >
              Rouvrir
            </Button>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <Meta
          label="Date"
          value={inspection.date}
          type="date"
          onChange={(v) => update(id, { date: v })}
        />
        <Meta
          label="Kilomètre"
          value={inspection.km}
          onChange={(v) => update(id, { km: v })}
        />
        <Meta
          label="Immatriculation"
          value={inspection.plate}
          className="uppercase"
          onChange={(v) => update(id, { plate: v.toUpperCase() })}
        />
        <Meta
          label="Année"
          value={inspection.year}
          onChange={(v) => update(id, { year: v })}
        />
      </div>

      <div className="sticky top-14 z-30 -mx-4 mt-5 border-y border-border bg-background/95 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm tabular-nums text-muted-foreground">
            <span className="text-foreground">{stats.done}</span> / {stats.total}
          </p>
          <p className="text-xs tabular-nums">
            <span className="text-ok">{stats.ok} OK</span>
            <span className="mx-2 text-warn">{stats.warn} att.</span>
            <span className="text-bad">{stats.fail} HS</span>
          </p>
        </div>
        <Progress
          value={stats.percent}
          className="mt-2"
          barClassName={
            stats.fail > 0 ? "bg-bad" : stats.warn > 0 ? "bg-warn" : "bg-ok"
          }
        />
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "h-9 shrink-0 rounded-md px-3 text-xs tracking-[0.12em] uppercase transition-colors duration-150",
                filter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <SectionChip
          active={section === "all"}
          onClick={() => setSection("all")}
          label="Tout"
        />
        {SECTIONS.map((s) => {
          const st = sectionTally(inspection, s.id);
          return (
            <SectionChip
              key={s.id}
              active={section === s.id}
              onClick={() => setSection(s.id)}
              label={s.title}
              count={`${st.done}/${st.total}`}
              alert={st.fail > 0}
            />
          );
        })}
      </nav>

      <div className="mt-4 space-y-6">
        {(section === "all" ? SECTIONS : SECTIONS.filter((s) => s.id === section)).map(
          (s) => {
            const rows = itemsForSection(s.id).filter((item) =>
              visible.some((v) => v.id === item.id),
            );
            if (rows.length === 0) return null;
            return (
              <section key={s.id} className="rounded-xl bg-card py-2 shadow-[var(--shadow-border)]">
                <header className="flex items-baseline justify-between px-4 pt-3 pb-1">
                  <div>
                    <h2 className="text-lg">{s.title}</h2>
                    <p className="text-xs text-muted-foreground">{s.blurb}</p>
                  </div>
                </header>
                <div className="divide-y divide-border/60">
                  {rows.map((item) => (
                    <ChecklistRow
                      key={item.id}
                      item={item}
                      status={inspection.items[item.id]}
                      note={inspection.notes[item.id]}
                      onStatus={(st: ItemStatus | undefined) =>
                        setStatus(id, item.id, st)
                      }
                      onNote={(n) => setNote(id, item.id, n)}
                    />
                  ))}
                </div>
              </section>
            );
          },
        )}
        {visible.length === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Aucun point dans ce filtre.
          </p>
        ) : null}
      </div>

      <section className="mt-8 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h2 className="text-xl">Observation</h2>
        <Textarea
          className="mt-3"
          placeholder="Notes de contrôle, bruits, fuites, pièces à commander…"
          value={inspection.observation}
          onChange={(e) => update(id, { observation: e.target.value })}
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Maint
            label="Vidange moteur faite le"
            value={inspection.maintenance.oilEngine}
            onChange={(v) =>
              update(id, {
                maintenance: { ...inspection.maintenance, oilEngine: v },
              })
            }
          />
          <Maint
            label="Vidange boîte faite le"
            value={inspection.maintenance.oilGearbox}
            onChange={(v) =>
              update(id, {
                maintenance: { ...inspection.maintenance, oilGearbox: v },
              })
            }
          />
          <Maint
            label="Changement de pneu"
            value={inspection.maintenance.tires}
            onChange={(v) =>
              update(id, {
                maintenance: { ...inspection.maintenance, tires: v },
              })
            }
          />
          <Maint
            label="Changement plaquette"
            value={inspection.maintenance.pads}
            onChange={(v) =>
              update(id, {
                maintenance: { ...inspection.maintenance, pads: v },
              })
            }
          />
        </div>
        <div className="mt-3">
          <Label htmlFor="maint-other">Divers</Label>
          <Input
            id="maint-other"
            className="mt-1.5"
            value={inspection.maintenance.other}
            onChange={(e) =>
              update(id, {
                maintenance: { ...inspection.maintenance, other: e.target.value },
              })
            }
          />
        </div>
      </section>

      <div className="mt-8 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (window.confirm("Supprimer cette check-list ?")) {
              remove(id);
              void navigate({ to: "/controle" });
            }
          }}
        >
          <Trash2 className="size-4" />
          Supprimer
        </Button>
      </div>
    </AppShell>
  );
}

function Meta({
  label,
  value,
  onChange,
  type = "text",
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
      />
    </div>
  );
}

function Maint({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <Input type="date" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function SectionChip({
  active,
  onClick,
  label,
  count,
  alert,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: string;
  alert?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-10 shrink-0 items-center gap-2 rounded-md px-3 text-xs tracking-[0.08em] uppercase transition-colors duration-150",
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
      )}
    >
      {label}
      {count ? (
        <span className={cn("tabular-nums", alert && !active && "text-bad")}>
          {count}
        </span>
      ) : null}
    </button>
  );
}
