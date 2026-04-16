"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceIconProps {
  name: string;
  className?: string;
  animate?: boolean;
  triggerRef?: React.RefObject<HTMLElement | null>;
  size?: number;
  color?: string;
}

const ICON_PATHS: Record<string, React.ReactNode> = {
  integrate: (
    <>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
      <line x1="9" y1="7.5" x2="15" y2="4.5" />
      <line x1="9" y1="16.5" x2="15" y2="19.5" />
    </>
  ),
  cycle: (
    <>
      <path d="M4 12a8 8 0 0 1 14-5.2" />
      <path d="M20 12a8 8 0 0 1-14 5.2" />
      <polyline points="18 7 21 4 18 1" transform="translate(0 3)" />
      <polyline points="6 17 3 20 6 23" transform="translate(0 -3)" />
    </>
  ),
  result: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
      <polyline points="7.5 12 10.5 15 16.5 9" />
    </>
  ),
  authagrid: (
    <>
      <rect x="3" y="3" width="4" height="4" rx="0.5" />
      <rect x="10" y="3" width="4" height="4" rx="0.5" />
      <rect x="17" y="3" width="4" height="4" rx="0.5" />
      <rect x="3" y="10" width="4" height="4" rx="0.5" />
      <rect x="10" y="10" width="4" height="4" rx="0.5" />
      <rect x="17" y="10" width="4" height="4" rx="0.5" />
      <rect x="3" y="17" width="4" height="4" rx="0.5" />
      <rect x="10" y="17" width="4" height="4" rx="0.5" />
      <rect x="17" y="17" width="4" height="4" rx="0.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  lidar: (
    <>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="7" />
      <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
    </>
  ),
  map: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <circle cx="12" cy="14" r="2" />
      <line x1="12" y1="16" x2="12" y2="20" />
    </>
  ),
  legal: (
    <>
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="5" y1="8" x2="19" y2="8" />
      <path d="M5 8 L2 14 a3 3 0 0 0 6 0 Z" />
      <path d="M19 8 L16 14 a3 3 0 0 0 6 0 Z" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </>
  ),
  history: (
    <>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 15" />
      <path d="M3 12a9 9 0 0 1 2.6-6.4" strokeLinecap="round" />
      <polyline points="2 6 3 12 9 11" />
    </>
  ),
  handshake: (
    <>
      <rect x="2" y="9" width="7" height="6" rx="1" />
      <rect x="15" y="9" width="7" height="6" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="10.5" x2="15" y2="10.5" />
      <line x1="9" y1="13.5" x2="15" y2="13.5" />
    </>
  ),
  road: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="1" />
      <line x1="12" y1="6" x2="12" y2="8" strokeDasharray="2 2" />
      <line x1="12" y1="11" x2="12" y2="13" strokeDasharray="2 2" />
      <line x1="12" y1="16" x2="12" y2="18" strokeDasharray="2 2" />
    </>
  ),
  water: (
    <>
      <path d="M2 8 Q5 5 8 8 Q11 11 14 8 Q17 5 20 8 Q23 11 26 8" />
      <path d="M2 12 Q5 9 8 12 Q11 15 14 12 Q17 9 20 12 Q23 15 26 12" />
      <path d="M2 16 Q5 13 8 16 Q11 19 14 16 Q17 13 20 16 Q23 19 26 16" />
    </>
  ),
  precision: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
    </>
  ),
  analysis: (
    <>
      <rect x="2" y="2" width="18" height="16" rx="2" />
      <line x1="6" y1="18" x2="6" y2="13" />
      <line x1="10" y1="18" x2="10" y2="10" />
      <line x1="14" y1="18" x2="14" y2="14" />
      <circle cx="18" cy="18" r="3" />
      <line x1="20.1" y1="20.1" x2="22" y2="22" />
    </>
  ),
  embargo: (
    <>
      <path d="M12 2 L20 6 L20 12 C20 17 16 21 12 22 C8 21 4 17 4 12 L4 6 Z" />
      <line x1="9" y1="9" x2="15" y2="15" />
      <line x1="15" y1="9" x2="9" y2="15" />
    </>
  ),
  "legal-nature": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7 C9 9 8 11 9 14 C10 16 11 17 12 17 C13 17 14 16 15 14 C16 11 15 9 12 7 Z" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </>
  ),
};

const FALLBACK_ICON = (
  <>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="3" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="21" />
    <line x1="3" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="21" y2="12" />
    <line x1="5.6" y1="5.6" x2="7.8" y2="7.8" />
    <line x1="16.2" y1="16.2" x2="18.4" y2="18.4" />
    <line x1="18.4" y1="5.6" x2="16.2" y2="7.8" />
    <line x1="7.8" y1="16.2" x2="5.6" y2="18.4" />
  </>
);

export default function ServiceIcon({
  name,
  className,
  animate = true,
  triggerRef,
  size,
  color,
}: ServiceIconProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate) return;

    const svgEl = svgRef.current;
    if (!svgEl) return;

    const paths = Array.from(
      svgEl.querySelectorAll<SVGGeometryElement>("path, circle, line, rect, polyline, polygon, ellipse")
    );

    if (paths.length === 0) return;

    // Set initial state — hidden
    paths.forEach((p) => {
      try {
        const length = p.getTotalLength?.() ?? 100;
        p.style.strokeDasharray = String(length);
        p.style.strokeDashoffset = String(length);
        p.style.transition = "none";
      } catch {
        // SVG elements without getTotalLength (e.g. rect without path)
        p.style.opacity = "0";
      }
    });

    const triggerEl: Element = (triggerRef?.current ?? svgEl) as Element;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        let totalLength = 0;
        paths.forEach((p) => {
          try {
            totalLength += p.getTotalLength?.() ?? 100;
          } catch {
            /* noop */
          }
        });

        const startTime = performance.now();
        const duration = 1000;

        const easeOutExpo = (t: number) =>
          t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

        const tick = (now: number) => {
          const t = Math.min((now - startTime) / duration, 1);
          const progress = easeOutExpo(t);

          paths.forEach((p) => {
            try {
              const length = p.getTotalLength?.() ?? 100;
              p.style.strokeDashoffset = String(length * (1 - progress));
              p.style.opacity = "1";
            } catch {
              p.style.opacity = String(progress);
            }
          });

          if (t < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(triggerEl);

    return () => observer.disconnect();
  }, [animate, triggerRef]);

  const iconContent = ICON_PATHS[name] ?? FALLBACK_ICON;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      width={size}
      height={size}
      style={color ? { color } : undefined}
    >
      {iconContent}
    </svg>
  );
}
