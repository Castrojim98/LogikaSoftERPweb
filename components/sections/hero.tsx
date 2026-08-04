"use client";

import { motion } from "framer-motion";
import { ArrowRight, Boxes, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass-panel";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const stats = [
  { value: 40, suffix: "+", label: "Proyectos entregados" },
  { value: 98, suffix: "%", label: "Satisfacción de clientes" },
  { value: 8, suffix: "", label: "Años de experiencia" },
  { value: 24, suffix: "/7", label: "Soporte técnico" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950 pb-24 pt-16 text-white sm:pt-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,163,227,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(30,90,168,0.35),transparent_40%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-brand-200"
            >
              <Sparkles aria-hidden className="size-4" />
              Software empresarial hecho a la medida
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Tecnología que impulsa el{" "}
              <span className="bg-gradient-to-r from-brand-300 to-white bg-clip-text text-transparent">
                crecimiento
              </span>{" "}
              de tu empresa
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/70"
            >
              En LOGIKA SOFT diseñamos y desarrollamos ERP, sistemas POS, CRM y
              aplicaciones a la medida para que tu negocio opere con más
              control, más datos y menos fricción.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button href="/contacto" size="lg">
                Solicitar Cotización
                <ArrowRight aria-hidden className="size-4" />
              </Button>
              <Button href="/productos" size="lg" variant="outline">
                Conocer Productos
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-white sm:text-4xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <GlassPanel className="relative ml-auto max-w-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-sm font-semibold text-white/70">Dashboard LogikaSoft ERP</span>
                <Boxes aria-hidden className="size-5 text-brand-300" />
              </div>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-white/70">Ventas del mes</span>
                  <span className="font-semibold text-white">$128.4M</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <span className="text-sm text-white/70">Órdenes activas</span>
                  <span className="font-semibold text-white">312</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
                  <span className="flex items-center gap-2 text-sm text-white/70">
                    <ShieldCheck aria-hidden className="size-4 text-emerald-400" />
                    Facturación electrónica
                  </span>
                  <span className="font-semibold text-emerald-400">Al día</span>
                </div>
                <div className="h-24 rounded-xl bg-gradient-to-br from-brand-500/40 to-brand-300/10" />
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
