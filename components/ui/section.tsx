import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Container } from "@/components/ui/container";

const sectionVariants = cva("relative py-20 sm:py-28", {
  variants: {
    tone: {
      default: "bg-background",
      muted: "bg-surface-muted",
      dark: "bg-brand-950 text-white",
    },
  },
  defaultVariants: {
    tone: "default",
  },
});

type SectionProps = ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    containerClassName?: string;
  };

export function Section({
  className,
  containerClassName,
  tone,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone }), className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  invert = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto mb-14 max-w-2xl",
        align === "center" ? "text-center" : "text-left mx-0",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-widest",
            invert ? "text-brand-300" : "text-brand-500 dark:text-brand-300",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className={cn("mt-4 text-lg", invert ? "text-white/70" : "text-slate-600 dark:text-slate-300")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
