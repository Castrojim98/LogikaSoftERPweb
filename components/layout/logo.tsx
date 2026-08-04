import Link from "next/link";
import { cn } from "@/utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 text-xl font-bold tracking-tight", className)}
      aria-label="LOGIKA SOFT — Inicio"
    >
      <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-black text-white">
        LS
      </span>
      <span>
        LOGIKA<span className="text-brand-500">SOFT</span>
      </span>
    </Link>
  );
}
