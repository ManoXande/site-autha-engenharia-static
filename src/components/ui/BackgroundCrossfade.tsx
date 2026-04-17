"use client";
import { useEffect, useRef } from "react";

interface BgSection {
  id: string;
  src: string;
  optimizedSrc?: string;
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
  { id: "hero",           src: "/images/sections/hero-drone-cidade.jpg",          optimizedSrc: "/images/sections/optimized/hero-drone-cidade.webp",          pos: "center 40%",    overlay: HERO_OV  },
  { id: "manifesto",      src: "/images/sections/manifesto-authagraph.jpg",        optimizedSrc: "/images/sections/optimized/manifesto-authagraph.webp",        pos: "center center", overlay: HEAVY_OV },
  { id: "mapeamento",     src: "/images/sections/mapeamento-lidar-pointcloud.jpg", optimizedSrc: "/images/sections/optimized/mapeamento-lidar-pointcloud.webp", pos: "center center", overlay: HEAVY_OV },
  { id: "regularizacao",  src: "/images/sections/regularizacao-golden-hour.jpg",   optimizedSrc: "/images/sections/optimized/regularizacao-golden-hour.webp",   pos: "center 40%",    overlay: HEAVY_OV },
  { id: "assistencia",    src: "/images/sections/assistencia-pericia-mapa.jpg",    optimizedSrc: "/images/sections/optimized/assistencia-pericia-mapa.webp",    pos: "center 40%",    overlay: HEAVY_OV },
  { id: "infraestrutura", src: "/images/sections/infraestrutura-bim-lidar.jpg",    optimizedSrc: "/images/sections/optimized/infraestrutura-bim-lidar.webp",    pos: "center center", overlay: HEAVY_OV },
  { id: "ambiental",      src: "/images/sections/ambiental-mata-atlantica.jpg",    optimizedSrc: "/images/sections/optimized/ambiental-mata-atlantica.webp",    pos: "center 60%",    overlay: HEAVY_OV },
];

const DESKTOP_BREAKPOINT = 1024;
const FADE_MS = 300;
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

function supportsWebP() {
  try {
    const canvas = document.createElement("canvas");
    return canvas.toDataURL("image/webp").startsWith("data:image/webp");
  } catch {
    return false;
  }
}

function resolveSectionSrc(section: BgSection, preferOptimized: boolean) {
  return preferOptimized && section.optimizedSrc ? section.optimizedSrc : section.src;
}

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
    const preferOptimized = supportsWebP();
    const preloaded = new Set<string>();

    const preloadSection = (section?: BgSection) => {
      if (!section) return;
      const src = resolveSectionSrc(section, preferOptimized);
      if (!src || preloaded.has(src)) return;
      preloaded.add(src);
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
    };

    preloadSection(SECTIONS[0]);
    preloadSection(SECTIONS[1]);

    layerA.style.backgroundImage = `${SECTIONS[0].overlay}, url(${resolveSectionSrc(SECTIONS[0], preferOptimized)})`;
    layerA.style.backgroundPosition = SECTIONS[0].pos;
    layerA.style.opacity = "1";
    currentSrcRef.current = resolveSectionSrc(SECTIONS[0], preferOptimized);

    const crossfadeTo = (section: BgSection, idx: number) => {
      const src = resolveSectionSrc(section, preferOptimized);
      if (!src || src === currentSrcRef.current) return;

      preloadSection(SECTIONS[idx + 1]);

      currentSrcRef.current = src;

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

      // Stage incoming layer: correct overlay + chosen asset, start invisible.
      // Only the current and next sections are preloaded to keep bandwidth sane.
      incoming.style.transition = "none";
      incoming.style.opacity = "0";
      incoming.style.backgroundImage = `${section.overlay}, url(${src})`;
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
