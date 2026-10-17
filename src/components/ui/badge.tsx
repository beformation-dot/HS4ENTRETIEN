import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium tracking-[0.1em] uppercase",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground",
        ok: "bg-ok/15 text-ok",
        warn: "bg-warn/15 text-warn",
        fail: "bg-bad/15 text-bad",
        solid: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
