import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      tone: {
        available: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
        upcoming: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
        beta: "bg-brand-100 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300",
        neutral: "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-300",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
