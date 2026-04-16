"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayersProps {
  background: React.ReactNode;
  center?: React.ReactNode;
  foreground?: React.ReactNode;
  className?: string;
}

export default function ParallaxLayers({
  background,
  center,
  foreground,
  className,
}: ParallaxLayersProps) {
  const isDesktop = useIsDesktop();
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isDesktop) return;
      const container = containerRef.current;
      if (!container) return;

      const layers = [
        { el: bgRef.current, yPercent: -4 },
        { el: centerRef.current, yPercent: -8 },
        { el: fgRef.current, yPercent: -12 },
      ];

      layers.forEach(({ el, yPercent }) => {
        if (!el) return;
        gsap.to(el, {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef, dependencies: [isDesktop] }
  );

  if (!isDesktop) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <div>{background}</div>
        {center && <div>{center}</div>}
        {foreground && <div>{foreground}</div>}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      <div ref={bgRef} className="absolute inset-0" style={{ willChange: "transform" }}>
        {background}
      </div>

      {center && (
        <div ref={centerRef} className="absolute inset-0" style={{ willChange: "transform" }}>
          {center}
        </div>
      )}

      {foreground && (
        <div ref={fgRef} className="relative" style={{ willChange: "transform" }}>
          {foreground}
        </div>
      )}
    </div>
  );
}
