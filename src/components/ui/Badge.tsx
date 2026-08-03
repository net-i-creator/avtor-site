import { HTMLAttributes } from "react";

type BadgeVariant = "flame" | "muted" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const styles: Record<BadgeVariant, string> = {
  flame: "bg-flame-dim text-flame border border-flame/30",
  muted: "bg-white/5 text-ink-muted border border-ink-border",
  outline: "bg-transparent text-white border border-ink-border",
};

export function Badge({
  className = "",
  variant = "flame",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
