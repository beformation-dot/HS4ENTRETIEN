import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Droplets, Gauge, ShieldAlert } from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { InspectionCard } from "@/components/inspection-card";
import { NewInspectionButton } from "@/components/new-inspection";
import { InstallAppButton } from "@/components/install-app";
import { SyncPanel } from "@/components/sync-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ITEMS, tally } from "@/lib/checklist";
import { useGarage } from "@/lib/store";
import { formatDate, formatKm } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const hydrated = useGarage((s) => s.hydrated);
  const vehicle = useGarage((s) => s.vehicle);
  const setVehicle = useGarage((s) => s.setVehicle);
  const inspections = useGarage((s) => s.inspections);

  const last = inspections[0];
  const lastT = last ? tally(last) : null;
  const drafts = inspections.filter((i) => i.status === "draft");
  const latestMaint = inspections.find(
    (i) =>
      i.maintenance.oilEngine ||
      i.maintenance.oilGearbox ||
      i.maintenance.tires ||
      i.maintenance.pads,
  )?.maintenance;

  return (
    <AppShell>
      <section className="overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
        <img
          src="/images/hero.jpg"
          alt="Atelier HS4 — Rewaco dans l'atelier"
          className="h-auto w-full object-cover"
        />
        <div className="flex flex-col justify-between p-5 sm:p-7">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Fiche atelier · Rewaco HS4
            </p>
            <h1 className="mt-2 max-w-md text-4xl sm:text-5xl">
              Entretien & check-list
            </h1>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              {ITEMS.length} points de contrôle, plan annoté et carnet de
              vidanges — la feuille papier, dans la poche.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <NewInspectionButton label="Démarrer un contrôle" />
            <InstallAppButton />
            <Button variant="outline" asChild>
              <Link to="/plan">Voir le plan</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)]">
        <div className="grid sm:grid-cols-3 sm:divide-x sm:divide-border">
          <Stat
            icon={Gauge}
            label="Kilométrage"
            value={hydrated ? formatKm(vehicle.km) : "—"}
          />
          <Stat
            icon={ShieldAlert}
            label="Dernier contrôle"
            value={hydrated && last ? formatDate(last.date) : "Aucun"}
            hint={
              lastT
                ? `${lastT.fail} HS · ${lastT.warn} à surveiller`
                : `${ITEMS.length} points à passer`
            }
          />
          <Stat
            icon={Droplets}
            label="Vidange moteur"
            value={
              hydrated && latestMaint?.oilEngine
                ? formatDate(latestMaint.oilEngine)
                : "Non renseignée"
            }
          />
        </div>
      </section>

      {drafts.length > 0 ? (
        <section className="mt-8">
          <SectionHead title="Contrôle en cours" href="/controle" />
          <div className="mt-3 grid gap-3">
            {drafts.slice(0, 2).map((d) => (
              <InspectionCard key={d.id} inspection={d} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-8 rounded-xl bg-card p-5 shadow-[var(--shadow-border)]">
        <h2 className="text-2xl">Fiche véhicule</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ces infos pré-remplissent chaque nouvelle check-list.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Nom">
            <Input
              placeholder="Dupont"
              autoComplete="family-name"
              value={hydrated ? (vehicle.lastName ?? "") : ""}
              onChange={(e) => setVehicle({ lastName: e.target.value })}
            />
          </Field>
          <Field label="Prénom">
            <Input
              placeholder="Jean"
              autoComplete="given-name"
              value={hydrated ? (vehicle.firstName ?? "") : ""}
              onChange={(e) => setVehicle({ firstName: e.target.value })}
            />
          </Field>
        </div>
        <div className="mt-3">
          <Field label="Ligne">
            <Input
              placeholder="Adresse, téléphone…"
              value={hydrated ? (vehicle.line ?? "") : ""}
              onChange={(e) => setVehicle({ line: e.target.value })}
            />
          </Field>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Field label="Immatriculation">
            <Input
              className="uppercase"
              placeholder="AA-123-BB"
              value={hydrated ? vehicle.plate : ""}
              onChange={(e) =>
                setVehicle({ plate: e.target.value.toUpperCase() })
              }
            />
          </Field>
          <Field label="Année mise en circulation">
            <Input
              placeholder="2004"
              inputMode="numeric"
              value={hydrated ? vehicle.year : ""}
              onChange={(e) => setVehicle({ year: e.target.value })}
            />
          </Field>
          <Field label="Kilométrage actuel">
            <Input
              placeholder="42850"
              inputMode="numeric"
              value={hydrated ? vehicle.km : ""}
              onChange={(e) => setVehicle({ km: e.target.value })}
            />
          </Field>
        </div>
      </section>

      <SyncPanel />

      <section className="mt-8">
        <SectionHead title="Historique" href="/historique" />
        <div className="mt-3 grid gap-3">
          {!hydrated ? (
            <div className="h-28 rounded-xl bg-card" />
          ) : inspections.length === 0 ? (
            <EmptyHistory />
          ) : (
            inspections.slice(0, 3).map((i) => (
              <InspectionCard key={i.id} inspection={i} />
            ))
          )}
        </div>
      </section>

      <section className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link
          to="/plan"
          className="group overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
        >
          <img
            src="/images/diagram.jpg"
            alt="Plan annoté du HS4"
            className="h-36 w-full object-cover object-center"
          />
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl">Plan de contrôle</h2>
              <p className="text-sm text-muted-foreground">
                Repérez chaque numéro sur le trike.
              </p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
          </div>
        </Link>
        <Link
          to="/pieces"
          className="group overflow-hidden rounded-xl bg-card shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
        >
          <img
            src="/images/engine.jpg"
            alt="Moteur Cox du Rewaco HS4"
            className="h-36 w-full object-cover object-center"
          />
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl">Vendeurs de pièces</h2>
              <p className="text-sm text-muted-foreground">
                Rewaco, Boom et Cox — les adresses du formulaire.
              </p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
          </div>
        </Link>
      </section>
    </AppShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" strokeWidth={1.75} />
        <span className="text-xs font-medium tracking-[0.14em] uppercase">
          {label}
        </span>
      </div>
      <p className="mt-2 font-display text-3xl tracking-[0.02em] tabular-nums">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

function SectionHead({ title, href }: { title: string; href: string }) {
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-2xl">{title}</h2>
      <Link
        to={href}
        className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase hover:text-foreground"
      >
        Tout voir
      </Link>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function EmptyHistory() {
  return (
    <div className="rounded-xl bg-card p-6 text-center shadow-[var(--shadow-border)]">
      <Badge>Vierge</Badge>
      <p className="mt-3 text-sm text-muted-foreground">
        Aucun contrôle enregistré. La check-list reste sur cet appareil.
      </p>
      <div className="mt-4 flex justify-center">
        <NewInspectionButton label="Premier contrôle" size="sm" />
      </div>
    </div>
  );
}
