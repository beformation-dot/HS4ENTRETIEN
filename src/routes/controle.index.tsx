import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { InspectionCard } from "@/components/inspection-card";
import { NewInspectionButton } from "@/components/new-inspection";
import { useGarage } from "@/lib/store";

export const Route = createFileRoute("/controle/")({ component: ControleIndex });

function ControleIndex() {
  const inspections = useGarage((s) => s.inspections);
  const drafts = inspections.filter((i) => i.status === "draft");
  const done = inspections.filter((i) => i.status === "complete");

  return (
    <AppShell>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Check-list HS4
          </p>
          <h1 className="mt-1 text-3xl">Contrôle</h1>
        </div>
        <NewInspectionButton label="Nouveau" size="sm" />
      </div>

      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Passez les points un par un. Trois états comme sur le papier : bon,
        mauvais, HS. Le brouillon s'enregistre tout seul.
      </p>

      <section className="mt-8">
        <h2 className="text-xl">En cours</h2>
        <div className="mt-3 grid gap-3">
          {drafts.length === 0 ? (
            <p className="rounded-xl bg-card p-5 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
              Aucun brouillon. Lancez une check-list pour ce Rewaco.
            </p>
          ) : (
            drafts.map((i) => <InspectionCard key={i.id} inspection={i} />)
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl">Contrôles clos</h2>
        <div className="mt-3 grid gap-3">
          {done.length === 0 ? (
            <p className="text-sm text-muted-foreground">Pas encore de fiche close.</p>
          ) : (
            done.map((i) => <InspectionCard key={i.id} inspection={i} />)
          )}
        </div>
      </section>
    </AppShell>
  );
}
