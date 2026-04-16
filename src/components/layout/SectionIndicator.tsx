"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SECTION_NAMES } from "@/lib/constants";

const SECTIONS = [
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

export function SectionIndicator() {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0]);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="hidden lg:flex flex-col fixed right-8 top-1/2 -translate-y-1/2 z-40"
      style={{ gap: "var(--dot-gap, 16px)" }}
      aria-label="Navegação por seções"
    >
      {SECTIONS.map((id) => {
        const isActive = activeSection === id;
        const isHovered = hoveredSection === id;
        const label = SECTION_NAMES[id] ?? id;

        return (
          <div key={id} className="relative flex items-center justify-end">
            {/* Tooltip */}
            <div
              aria-hidden="true"
              className="absolute right-full mr-3 whitespace-nowrap pointer-events-none"
              style={{
                fontFamily: "var(--font-text)",
                fontWeight: 300,
                fontSize: "12px",
                color: "var(--text-secondary, rgba(248,250,252,0.65))",
                background: "rgba(3,7,18,0.80)",
                padding: "4px 8px",
                borderRadius: "4px",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 150ms ease",
                pointerEvents: "none",
              }}
            >
              {label}
            </div>

            {/* Dot */}
            <button
              onClick={() => handleClick(id)}
              onMouseEnter={() => setHoveredSection(id)}
              onMouseLeave={() => setHoveredSection(null)}
              aria-label={label}
              className={cn(
                "relative flex-shrink-0 rounded-full",
                "transition-all duration-300 cursor-pointer"
              )}
              style={{
                width: "8px",
                height: "8px",
                border: isActive
                  ? "1.5px solid rgba(74,222,128,0.8)"
                  : "1.5px solid rgba(248,250,252,0.55)",
                background: isActive
                  ? "var(--color-primary, #4ade80)"
                  : "transparent",
                transform: isActive ? "scale(1.3)" : "scale(1)",
                boxShadow: isActive
                  ? "var(--glow-sm, 0 0 8px rgba(74,222,128,0.5))"
                  : "0 0 0 1.5px rgba(0,0,0,0.5)",
                outline: "none",
              }}
            >
              {/* Hover ring */}
              {isHovered && (
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    width: "22px",
                    height: "22px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    border: "1.5px solid rgba(74,222,128,0.40)",
                    borderRadius: "9999px",
                  }}
                />
              )}
            </button>
          </div>
        );
      })}
    </nav>
  );
}
