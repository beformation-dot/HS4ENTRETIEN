import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-current", className)}>
      <svg
        viewBox="0 0 40 28"
        className="h-6 w-8 text-primary"
        aria-hidden="true"
      >
        <circle cx="8" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="18" cy="20" r="5" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="32" cy="20" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M8 20h10M18 20c3-8 8-11 14-12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M14 12h8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-[0.14em] uppercase">
        Atelier HS4
      </span>
    </span>
  );
}
