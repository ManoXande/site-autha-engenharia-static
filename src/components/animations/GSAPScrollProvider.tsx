"use client";
import { useEffect } from "react";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// GSAP and ScrollTrigger are lazy-loaded after mount via requestIdleCallback.
// This removes ~180KB from the critical JS path — parallax and image-reveal
// effects kick in only once the browser is idle after the LCP has painted.

const SECTION_IDS = [
  "hero",
  "manifesto",
  "impacto",
  "regularizacao",
  "mapeamento",
  "assistencia",
  "infraestrutura",
  "ambiental",
  "contato",
];

export function GSAPScrollProvider({ children }: { children: React.ReactNode }) {
  const isDesktop = useIsDesktop();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    // Capture cleanup reference so async init can register its teardown
    let killAll = () => {};

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // --- Parallax + scale on .section-bg ---
      SECTION_IDS.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const bg = section.querySelector<HTMLElement>(".section-bg");
        const overlay = section.querySelector<HTMLElement>(".section-overlay");

        if (bg) {
          const triggerConfig: ScrollTrigger.Vars = {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          };

          if (isDesktop) {
            gsap.fromTo(
              bg,
              { yPercent: -8 },
              { yPercent: 8, ease: "none", scrollTrigger: triggerConfig }
            );
          }

          gsap.fromTo(
            bg,
            { scale: 1.08 },
            { scale: 1, ease: "none", scrollTrigger: { ...triggerConfig } }
          );
        }

        if (overlay) {
          gsap.fromTo(
            overlay,
            { opacity: 1 },
            {
              opacity: 0.72,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });

      // --- Image reveal on .image-reveal elements ---
      const elements = document.querySelectorAll<HTMLElement>(".image-reveal");
      elements.forEach((el) => {
        let fromClipPath: string;
        if (el.classList.contains("image-reveal-left")) {
          fromClipPath = "inset(0 100% 0 0)";
        } else if (el.classList.contains("image-reveal-right")) {
          fromClipPath = "inset(0 0 0 100%)";
        } else {
          fromClipPath = "inset(100% 0 0 0)";
        }

        const triggerEl = el.closest("section") ?? el;
        gsap.fromTo(
          el,
          { clipPath: fromClipPath },
          {
            clipPath: "inset(0 0 0 0)",
            ease: "expo.out",
            scrollTrigger: {
              trigger: triggerEl,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      });

      killAll = () => ScrollTrigger.getAll().forEach((st) => st.kill());
    };

    // Delay GSAP init: wait until the browser is idle after paint
    // requestIdleCallback fires during browser idle time after LCP
    const scheduleInit = () => {
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(() => init(), { timeout: 2000 });
      } else {
        setTimeout(() => init(), 400);
      }
    };

    // Small initial delay so the loading screen exit animation completes first
    const timer = setTimeout(scheduleInit, 300);

    return () => {
      clearTimeout(timer);
      killAll();
    };
  }, [isDesktop, reducedMotion]);

  return <>{children}</>;
}
