import Image from "next/image";
import { Boxes } from "lucide-react";
import { cn } from "@/utils/cn";

// Las rutas con "placeholder" en products.ts marcan productos sin foto real todavía.
function isRealImage(image?: string): image is string {
  return Boolean(image) && !image!.includes("placeholder");
}

export function ProductVisual({
  name,
  image,
  className,
}: {
  name: string;
  image?: string;
  className?: string;
}) {
  if (isRealImage(image)) {
    return (
      <div className={cn("relative overflow-hidden rounded-t-2xl", className)}>
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-400",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.25),transparent_50%)]"
      />
      <Boxes aria-hidden className="size-14 text-white/90" />
      <span className="sr-only">{name}</span>
    </div>
  );
}
