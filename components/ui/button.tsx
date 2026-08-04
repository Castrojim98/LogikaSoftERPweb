import Link from "next/link";
import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500 hover:shadow-brand-500/30 active:bg-brand-700",
        secondary:
          "bg-white text-brand-900 shadow-lg shadow-brand-950/10 hover:bg-brand-50 dark:bg-brand-800 dark:text-white dark:hover:bg-brand-700",
        outline:
          "border border-white/30 text-white hover:bg-white/10 dark:border-brand-300/40",
        outlineDark:
          "border border-brand-200 text-brand-900 hover:bg-brand-50 dark:border-brand-700 dark:text-white dark:hover:bg-brand-800",
        ghost:
          "text-brand-900 hover:bg-brand-50 dark:text-white dark:hover:bg-brand-800/60",
        link: "text-brand-600 underline-offset-4 hover:underline dark:text-brand-300",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

type ButtonAsLink = ButtonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & { href: string };

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink;
    return <Link href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...(props as ButtonAsButton)} />;
}
