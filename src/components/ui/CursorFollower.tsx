"use client";
import { useEffect, useRef } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";

export function CursorFollower() {
  const isDesktop = useIsDesktop();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDesktop) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide native cursor
    document.body.style.cursor = "none";

    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let targetX = -100;
    let targetY = -100;
    let rafId: number;
    let isVisible = false;

    let magneticEl: HTMLElement | null = null;
    let magneticRafId: number | null = null;
    let magneticOffsetX = 0;
    let magneticOffsetY = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "0.8";
        ring.style.opacity = "0.3";
        dotX = targetX;
        dotY = targetY;
        ringX = targetX;
        ringY = targetY;
      }

      // Magnetic effect on hovered element
      const el = e.target as HTMLElement | null;
      const magnetic = el?.closest("[data-magnetic='true']") as HTMLElement | null;

      if (magnetic && magnetic !== magneticEl) {
        magneticEl = magnetic;
        ring.style.width = "52px";
        ring.style.height = "52px";
        ring.style.opacity = "0.6";
      } else if (!magnetic && magneticEl) {
        magneticEl = null;
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.opacity = "0.3";

        // Reset element translation
        if (magneticRafId !== null) {
          cancelAnimationFrame(magneticRafId);
          magneticRafId = null;
        }
        magneticOffsetX = 0;
        magneticOffsetY = 0;
      }

      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = (e.clientX - centerX) * 0.16;
        const dy = (e.clientY - centerY) * 0.16;

        // Clamp to max 4px
        magneticOffsetX = Math.max(-4, Math.min(4, dx));
        magneticOffsetY = Math.max(-4, Math.min(4, dy));

        magneticEl.style.transition = "transform 0.15s var(--ease-magnetic, ease-out)";
        magneticEl.style.transform = `translate(${magneticOffsetX}px, ${magneticOffsetY}px)`;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";

      if (magneticEl) {
        magneticEl.style.transform = "";
        magneticEl = null;
        ring.style.width = "36px";
        ring.style.height = "36px";
      }
    };

    const animate = () => {
      dotX = lerp(dotX, targetX, 0.8);
      dotY = lerp(dotY, targetY, 0.8);
      ringX = lerp(ringX, targetX, 0.12);
      ringY = lerp(ringY, targetY, 0.12);

      dot.style.transform = `translate(${dotX - 5}px, ${dotY - 5}px)`;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;

      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafId);
      if (magneticRafId !== null) cancelAnimationFrame(magneticRafId);
      document.body.style.cursor = "";

      // Cleanup any lingering magnetic transforms
      if (magneticEl) {
        magneticEl.style.transform = "";
      }
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: 10,
          height: 10,
          borderRadius: "9999px",
          background: "var(--color-primary)",
          opacity: 0,
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: "var(--z-cursor)" as unknown as number,
          transition: "opacity 0.2s",
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          width: 36,
          height: 36,
          border: "1.5px solid var(--color-primary)",
          borderRadius: "9999px",
          opacity: 0,
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: "var(--z-cursor)" as unknown as number,
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
          willChange: "transform",
        }}
      />
    </>
  );
}
