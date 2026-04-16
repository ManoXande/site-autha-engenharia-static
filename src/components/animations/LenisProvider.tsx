"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Lenis no longer imports gsap — uses requestAnimationFrame directly.
// This removes GSAP from the critical JS path; GSAPScrollProvider lazy-loads it.

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!isDesktop || reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
    });

    lenisRef.current = lenis;

    // Drive Lenis with the browser's own rAF loop instead of gsap.ticker —
    // same result, zero extra dependency on the critical path.
    let rafId: number;
    const loop = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isDesktop, reducedMotion]);

  return <>{children}</>;
}
