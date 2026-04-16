"use client";
import { useEffect, useState } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";

export default function ProgressBar() {
  const isDesktop = useIsDesktop();
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    if (isDesktop) return;

    let rafId: number | null = null;

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const maxScroll = docHeight - viewportHeight;
        if (maxScroll <= 0) {
          setWidth("0%");
          return;
        }
        const pct = Math.min((scrollY / maxScroll) * 100, 100);
        setWidth(`${pct}%`);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  if (isDesktop) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "var(--header-height-mobile, 60px)",
        left: 0,
        width,
        height: 3,
        background: "var(--gradient-brand)",
        zIndex: 51,
        pointerEvents: "none",
        transition: "width 0.1s linear",
      }}
    />
  );
}
