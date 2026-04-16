import Image from "next/image";
import { cn } from "@/lib/utils";

interface SectionBackgroundProps {
  imageSrc?: string;
  imageAlt?: string;
  objectPosition?: string;
  overlayVariant?: "default" | "hero" | "service" | "heavy" | "contact" | "none";
  priority?: boolean;
  solid?: boolean;
  imageReveal?: "up" | "left" | "right";
  parallax?: boolean;
  className?: string;
  /** When true, skips rendering the <Image> — the BackgroundCrossfade fixed layer supplies the image */
  crossfadeManaged?: boolean;
}

const overlayStyles: Record<string, React.CSSProperties> = {
  hero: { background: "var(--gradient-hero-overlay)" },
  service: { background: "var(--gradient-section-overlay)" },
  heavy: { background: "rgba(3,7,18,0.82)" },
  contact: { background: "rgba(3,7,18,0.84)" },
  default: {},
};

export default function SectionBackground({
  imageSrc,
  imageAlt = "",
  objectPosition = "center",
  overlayVariant = "default",
  priority = false,
  solid = false,
  imageReveal,
  parallax = false,
  className,
  crossfadeManaged = false,
}: SectionBackgroundProps) {
  return (
    <div
      className={cn(
        "section-bg",
        imageReveal && "image-reveal",
        imageReveal && `image-reveal-${imageReveal}`,
        parallax && "parallax-bg",
        className
      )}
    >
      {imageSrc && !solid && !crossfadeManaged && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 100vw"
          quality={85}
          priority={priority}
          style={{ objectFit: "cover", objectPosition }}
        />
      )}

      {solid && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--bg-deep)",
          }}
        />
      )}

      {overlayVariant !== "none" && (
        <div
          className="section-overlay"
          style={overlayStyles[overlayVariant] ?? {}}
        />
      )}
    </div>
  );
}
