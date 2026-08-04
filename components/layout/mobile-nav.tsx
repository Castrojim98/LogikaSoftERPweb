"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type NavItem } from "@/config/site";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-10 items-center justify-center rounded-full hover:bg-brand-50 dark:hover:bg-white/10"
      >
        {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute inset-x-0 top-full overflow-hidden border-b border-border-subtle bg-background shadow-xl"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-brand-50 dark:hover:bg-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <Button href="/contacto" className="mt-3 w-full justify-center" onClick={() => setOpen(false)}>
                Solicitar Cotización
              </Button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
