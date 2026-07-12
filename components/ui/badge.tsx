import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "outline" | "accent";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-card text-card-foreground border border-border",
  outline: "bg-transparent text-foreground border border-border",
  accent: "bg-accent/15 text-accent border border-accent/30",
};

// Used for tech stack tags, skill pills, and status labels (e.g. "Featured").
export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 font-body text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
