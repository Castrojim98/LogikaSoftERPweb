import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 text-xl font-bold tracking-tight", className)}
      aria-label="LOGIKA SOFT — Inicio"
    >
      <Image
        src="/images/logos/logo.png"
        alt="LOGIKA SOFT"
        width={36}
        height={36}
        className="size-9 shrink-0"
        priority
      />
      <span>
        LOGIKA<span className="text-brand-500">SOFT</span>
      </span>
    </Link>
  );
}
