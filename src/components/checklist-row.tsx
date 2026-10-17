import { useState } from "react";
import type { ChecklistItem, ItemStatus } from "@/lib/types";
import { StatusToggle } from "@/components/status-toggle";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function ChecklistRow({
  item,
  status,
  note,
  onStatus,
  onNote,
}: {
  item: ChecklistItem;
  status: ItemStatus | undefined;
  note: string | undefined;
  onStatus: (s: ItemStatus | undefined) => void;
  onNote: (n: string) => void;
}) {
  const [open, setOpen] = useState(Boolean(note));
  const showNote = open || status === "warn" || status === "fail" || Boolean(note);

  return (
    <div
      id={`item-${item.id}`}
      className={cn(
        "scroll-mt-24 px-3 py-2.5 transition-colors duration-150",
        status === "fail" && "bg-bad/10",
        status === "warn" && "bg-warn/10",
        status === "ok" && "bg-ok/5",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="font-display w-8 shrink-0 text-xl tabular-nums text-muted-foreground">
          {item.num}
        </span>
        <button
          type="button"
          className="min-w-0 flex-1 text-left text-sm text-foreground"
          onClick={() => setOpen((v) => !v)}
        >
          {item.label}
        </button>
        <StatusToggle value={status} onChange={onStatus} />
      </div>
      {showNote ? (
        <div className="mt-2 ml-11">
          <Input
            value={note ?? ""}
            onChange={(e) => onNote(e.target.value)}
            placeholder="Note (optionnel)"
            className="h-10"
          />
        </div>
      ) : null}
    </div>
  );
}
