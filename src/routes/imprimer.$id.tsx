import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Frown, Meh, Printer, Smile } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { ITEMS, SECTIONS, itemsForSection, tally } from "@/lib/checklist";
import { useGarage } from "@/lib/store";
import type { ItemStatus } from "@/lib/types";
import { cn, formatDate, formatKm } from "@/lib/utils";

export const Route = createFileRoute("/imprimer/$id")({
  component: PrintPage,
});

function PrintPage() {
  const { id } = Route.useParams();
  const inspection = useGarage((s) => s.inspections.find((i) => i.id === id));
  const vehicle = useGarage((s) => s.vehicle);
  const update = useGarage((s) => s.updateInspection);
  const [pdfBusy, setPdfBusy] = useState(false);

  if (!inspection) {
    return (
      <AppShell>
        <h1 className="text-3xl">Fiche introuvable</h1>
        <Button className="mt-4" asChild>
          <Link to="/historique">Retour</Link>
        </Button>
      </AppShell>
    );
  }

  const stats = tally(inspection);

  return (
    <AppShell>
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl">Impression</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Mise en page proche du formulaire papier.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            disabled={pdfBusy}
            onClick={() => {
              setPdfBusy(true);
              void import("@/lib/inspection-pdf")
                .then((mod) => mod.downloadInspectionPdf(inspection))
                .finally(() => setPdfBusy(false));
            }}
          >
            <Download className="size-4" />
            {pdfBusy ? "PDF…" : "Télécharger le PDF"}
          </Button>
          <Button onClick={() => window.print()}>
            <Printer className="size-4" />
            Imprimer
          </Button>
        </div>
      </div>

      <article className="print-sheet rounded-xl bg-paper p-5 text-ink shadow-[var(--shadow-border)] print:rounded-none print:bg-white print:p-0 print:shadow-none">
        <header className="border-b-2 border-ink pb-3">
          <p className="font-display text-center text-lg tracking-[0.12em] uppercase">
            Entretien et check-list de vérification
          </p>
          <p className="font-display text-center text-2xl tracking-[0.16em] uppercase">
            Trike Rewaco HS4
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
            <Cell label="Nom" value={vehicle.lastName || "—"} />
            <Cell label="Prénom" value={vehicle.firstName || "—"} />
            <Cell label="Ligne" value={vehicle.line || "—"} />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <Cell label="Date" value={formatDate(inspection.date)} />
            <Cell label="Kilomètre" value={formatKm(inspection.km)} />
            <Cell label="N° immatriculation" value={inspection.plate || "—"} />
            <Cell label="Année" value={inspection.year || "—"} />
          </div>
        </header>

        <div className="mt-4 columns-1 gap-6 sm:columns-2 print:columns-2">
          {SECTIONS.map((s) => (
            <section key={s.id} className="mb-4 break-inside-avoid">
              <h2 className="bg-ink px-2 py-1 font-display text-xs tracking-[0.16em] text-paper uppercase">
                {s.title}
              </h2>
              <ul>
                {itemsForSection(s.id).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-2 border-b border-ink/15 py-1 text-xs"
                  >
                    <span className="w-5 tabular-nums text-ink/60">{item.num}</span>
                    <span className="min-w-0 flex-1">
                      {item.label}
                      {inspection.notes[item.id] ? (
                        <span className="print-note mt-0.5 block text-xs italic">
                          {inspection.notes[item.id]}
                        </span>
                      ) : null}
                    </span>
                    <Marks value={inspection.items[item.id]} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mt-4 border-t-2 border-ink pt-3 text-sm">
          <p className="font-display tracking-[0.12em] uppercase">Observations</p>
          <textarea
            className="print-note mt-1 min-h-20 w-full resize-y bg-transparent text-sm focus-visible:outline-none"
            value={inspection.observation}
            placeholder="Ajouter une observation avant d'imprimer…"
            onChange={(e) => update(id, { observation: e.target.value })}
          />
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <Cell label="Vidange moteur" value={formatDate(inspection.maintenance.oilEngine)} />
            <Cell label="Vidange boîte" value={formatDate(inspection.maintenance.oilGearbox)} />
            <Cell label="Changement pneu" value={inspection.maintenance.tires || "—"} />
            <Cell label="Changement plaquette" value={inspection.maintenance.pads || "—"} />
          </div>
          {inspection.maintenance.other ? (
            <p className="mt-2 text-xs">Divers : {inspection.maintenance.other}</p>
          ) : null}
          <p className="mt-3 text-xs text-ink/60">
            {stats.ok} bon état · {stats.warn} mauvais · {stats.fail} HS ·{" "}
            {stats.todo} non notés / {ITEMS.length}
          </p>
        </section>
      </article>
    </AppShell>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-ink/20 px-2 py-1">
      <p className="text-[10px] tracking-[0.12em] uppercase">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function Marks({ value }: { value: ItemStatus | undefined }) {
  return (
    <span className="flex gap-0.5">
      <Mark Icon={Smile} on={value === "ok"} tone="text-ok" />
      <Mark Icon={Meh} on={value === "warn"} tone="text-warn" />
      <Mark Icon={Frown} on={value === "fail"} tone="text-bad" />
    </span>
  );
}

function Mark({
  Icon,
  on,
  tone,
}: {
  Icon: typeof Smile;
  on: boolean;
  tone: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-5 items-center justify-center rounded-sm border border-ink/25",
        on ? tone : "text-ink/20",
      )}
    >
      <Icon className="size-3.5" strokeWidth={on ? 2.2 : 1.4} />
    </span>
  );
}
