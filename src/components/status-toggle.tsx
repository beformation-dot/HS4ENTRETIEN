import { Frown, Meh, Smile } from "lucide-react";
import type { ItemStatus } from "@/lib/types";
import { STATUS_META } from "@/lib/checklist";
import { cn } from "@/lib/utils";

const OPTIONS: {
  value: ItemStatus;
  Icon: typeof Smile;
  active: string;
  idle: string;
}[] = [
  {
    value: "ok",
    Icon: Smile,
    active: "bg-ok text-ok-fg",
    idle: "text-ok/80 hover:bg-ok/15",
  },
  {
    value: "warn",
    Icon: Meh,
    active: "bg-warn text-warn-fg",
    idle: "text-warn hover:bg-warn/15",
  },
  {
    value: "fail",
    Icon: Frown,
    active: "bg-bad text-bad-fg",
    idle: "text-bad hover:bg-bad/15",
  },
];

export function StatusToggle({
  value,
  onChange,
  compact = false,
}: {
  value: ItemStatus | undefined;
  onChange: (next: ItemStatus | undefined) => void;
  compact?: boolean;
}) {
  return (
    <div
      className="inline-flex rounded-md bg-muted p-0.5 shadow-[var(--shadow-border)]"
      role="radiogroup"
      aria-label="État"
    >
      {OPTIONS.map(({ value: v, Icon, active, idle }) => {
        const selected = value === v;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={STATUS_META[v].label}
            title={STATUS_META[v].label}
            onClick={() => onChange(selected ? undefined : v)}
            className={cn(
              "inline-flex items-center justify-center rounded-sm transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96]",
              compact ? "size-9" : "size-11",
              selected ? active : idle,
            )}
          >
            <Icon className={compact ? "size-4" : "size-5"} strokeWidth={1.8} />
          </button>
        );
      })}
    </div>
  );
}
