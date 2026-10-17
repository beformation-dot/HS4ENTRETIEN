import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { tally } from "@/lib/checklist";
import type { Inspection } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDate, formatKm } from "@/lib/utils";

export function InspectionCard({ inspection }: { inspection: Inspection }) {
  const t = tally(inspection);
  return (
    <Link
      to="/controle/$id"
      params={{ id: inspection.id }}
      className="block rounded-xl bg-card p-4 shadow-[var(--shadow-border)] transition-[box-shadow] duration-150 hover:shadow-[var(--shadow-border-hover)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-2xl tracking-[0.04em]">
            {formatDate(inspection.date)}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {formatKm(inspection.km)}
            {inspection.plate ? ` · ${inspection.plate}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={inspection.status === "complete" ? "ok" : "default"}>
            {inspection.status === "complete" ? "Clos" : "Brouillon"}
          </Badge>
          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      </div>
      <Progress
        value={t.percent}
        className="mt-4"
        barClassName={t.fail > 0 ? "bg-bad" : t.warn > 0 ? "bg-warn" : "bg-ok"}
      />
      <div className="mt-2 flex gap-3 text-xs tabular-nums text-muted-foreground">
        <span>{t.percent}%</span>
        <span className="text-ok">{t.ok} OK</span>
        <span className="text-warn">{t.warn} att.</span>
        <span className="text-bad">{t.fail} HS</span>
      </div>
    </Link>
  );
}
