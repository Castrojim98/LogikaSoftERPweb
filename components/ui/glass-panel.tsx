import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export function GlassPanel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl shadow-brand-950/20 backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
