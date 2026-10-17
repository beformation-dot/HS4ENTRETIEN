import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Copy, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { InspectionCard } from "@/components/inspection-card";
import { NewInspectionButton } from "@/components/new-inspection";
import { Button } from "@/components/ui/button";
import { useGarage } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export const Route = createFileRoute("/historique")({
  component: HistoryPage,
});

function HistoryPage() {
  const inspections = useGarage((s) => s.inspections);
  const duplicate = useGarage((s) => s.duplicateInspection);
  const remove = useGarage((s) => s.deleteInspection);
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
            Carnet
          </p>
          <h1 className="mt-1 text-3xl">Historique</h1>
        </div>
        <NewInspectionButton label="Nouveau" size="sm" />
      </div>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Toutes les check-lists restent sur cet appareil. Dupliquez une fiche
        pour repartir des mêmes constats.
      </p>

      <div className="mt-6 grid gap-4">
        {inspections.length === 0 ? (
          <p className="rounded-xl bg-card p-6 text-sm text-muted-foreground shadow-[var(--shadow-border)]">
            Pas encore de contrôle enregistré.
          </p>
        ) : (
          inspections.map((i) => (
            <div key={i.id} className="grid gap-2">
              <InspectionCard inspection={i} />
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const copy = duplicate(i.id);
                    if (copy) {
                      void navigate({
                        to: "/controle/$id",
                        params: { id: copy.id },
                      });
                    }
                  }}
                >
                  <Copy className="size-4" />
                  Reprendre
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (window.confirm(`Supprimer le contrôle du ${formatDate(i.date)} ?`)) {
                      remove(i.id);
                    }
                  }}
                >
                  <Trash2 className="size-4" />
                  Supprimer
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </AppShell>
  );
}
