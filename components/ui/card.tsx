import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border-subtle bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/5",
        className,
      )}
      {...props}
    />
  );
}

export function CardIcon({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-800 dark:text-brand-300",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3 className={cn("mb-2 text-lg font-semibold text-foreground", className)} {...props} />
  );
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p className={cn("text-sm leading-relaxed text-slate-600 dark:text-slate-300", className)} {...props} />
  );
}
