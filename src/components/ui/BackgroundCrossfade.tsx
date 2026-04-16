"use client";
import { useEffect, useRef } from "react";

interface BgSection {
  id: string;
  src: string;
  pos: string;
  // Per-section overlay baked alongside the image — equals the visual combination
  // of the old BASE_OVERLAY + the section's overlayVariant. Image and overlay now
  // change as a single atomic unit, eliminating scroll-phase desync.
  overlay: string;
}

// Hero: combined(BASE_OVERLAY + gradient-hero-overlay)
// Heavy: combined(BASE_OVERLAY + rgba(3,7,18,0.82)) ≈ 0.89–0.93 gradient
const HERO_OV =
  "linear-gradient(180deg, rgba(3,7,18,0.96) 0%, rgba(3,7,18,0.74) 35%, rgba(3,7,18,0.66) 62%, rgba(3,7,18,0.97) 100%)";
const HEAVY_OV =
  "linear-gradient(180deg, rgba(3,7,18,0.93) 0%, rgba(3,7,18,0.90) 38%, rgba(3,7,18,0.89) 62%, rgba(3,7,18,0.93) 100%)";

const SECTIONS: BgSection[] = [
  { id: "hero",           src: "/images/sections/hero-drone-cidade.jpg",           pos: "center 40%",    overlay: HERO_OV  },
  { id: "manifesto",      src: "/images/sections/manifesto-authagraph.jpg",         pos: "center center", overlay: HEAVY_OV },
  { id: "mapeamento",     src: "/images/sections/mapeamento-lidar-pointcloud.jpg",  pos: "center center", overlay: HEAVY_OV },
  { id: "regularizacao",  src: "/images/sections/regularizacao-golden-hour.jpg",    pos: "center 40%",    overlay: HEAVY_OV },
  { id: "assistencia",    src: "/images/sections/assistencia-pericia-mapa.jpg",     pos: "center 40%",    overlay: HEAVY_OV },
  { id: "infraestrutura", src: "/images/sections/infraestrutura-bim-lidar.jpg",     pos: "center center", overlay: HEAVY_OV },
  { id: "ambiental",      src: "/images/sections/ambiental-mata-atlantica.jpg",     pos: "center 60%",    overlay: HEAVY_OV },
];

const DESKTOP_BREAKPOINT = 1024;
const FADE_MS = 300;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

export function BackgroundCrossfade() {
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<"A" | "B">("A");
  const currentSrcRef = useRef<string>("");
  const rafIdRef = useRef<number>(0);
  const pendingCleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const layerA = layerARef.current;
    const layerB = layerBRef.current;
    if (!layerA || !layerB) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < DESKTOP_BREAKPOINT;
    const fadeDuration = reducedMotion || isMobile ? 0 : FADE_MS;

    SECTIONS.forEach(({ src }) => {
      if (src) new window.Image().src = src;
    });

    layerA.style.backgroundImage = `${SECTIONS[0].overlay}, url(${SECTIONS[0].src})`;
    layerA.style.backgroundPosition = SECTIONS[0].pos;
    layerA.style.opacity = "1";
    currentSrcRef.current = SECTIONS[0].src;

    const crossfadeTo = (section: BgSection, idx: number) => {
      if (!section.src || section.src === currentSrcRef.current) return;

      const upcoming = SECTIONS[idx + 1];
      if (upcoming?.src) new window.Image().src = upcoming.src;

      currentSrcRef.current = section.src;

      const isA = activeRef.current === "A";
      const substrate = isA ? layerA : layerB;
      const incoming = isA ? layerB : layerA;

      if (pendingCleanupRef.current) {
        pendingCleanupRef.current();
        pendingCleanupRef.current = null;
      }

      // Substrate stays at full opacity — acts as dark backdrop so incoming
      // image never flashes through an empty void during the fade-in.
      substrate.style.transition = "none";
      substrate.style.opacity = "1";

      // Stage incoming layer: correct overlay + image, start invisible
      incoming.style.transition = "none";
      incoming.style.opacity = "0";
      incoming.style.backgroundImage = `${section.overlay}, url(${section.src})`;
      incoming.style.backgroundPosition = section.pos;

      activeRef.current = isA ? "B" : "A";

      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = requestAnimationFrame(() => {
          if (fadeDuration > 0) {
            incoming.style.transition = `opacity ${fadeDuration}ms ${EASE}`;
          }
          incoming.style.opacity = "1";

          if (fadeDuration > 0) {
            const onEnd = () => {
              substrate.style.opacity = "0";
              pendingCleanupRef.current = null;
            };
            incoming.addEventListener("transitionend", onEnd, { once: true });
            pendingCleanupRef.current = () => {
              incoming.removeEventListener("transitionend", onEnd);
              substrate.style.opacity = "0";
            };
          } else {
            substrate.style.opacity = "0";
          }
        });
      });
    };

    // Center-based observer: fires when a section crosses the viewport midpoint.
    // Since sections are 100dvh, only ONE can be in this band at a time —
    // no scroll-direction race condition, hero always wins on scroll-back-up.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) crossfadeTo(SECTIONS[idx], idx);
          }
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafIdRef.current);
      if (pendingCleanupRef.current) pendingCleanupRef.current();
    };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 0,
    backgroundSize: "cover",
    opacity: 0,
    willChange: "opacity",
    pointerEvents: "none",
  };

  return (
    <>
      <div aria-hidden="true" ref={layerARef} style={base} />
      <div aria-hidden="true" ref={layerBRef} style={base} />
    </>
  );
}

export default BackgroundCrossfade;
