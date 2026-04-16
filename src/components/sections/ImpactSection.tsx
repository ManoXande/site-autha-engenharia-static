"use client";
import { useRef } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import TerritoryMap from "@/components/ui/TerritoryMap";
import { FadeUp } from "@/components/animations/FadeUp";
import { IMPACT_STATS } from "@/lib/constants";

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="impacto"
      ref={sectionRef}
      className="section-full section-snap"
      aria-label="Números de impacto da Autha Engenharia"
      style={{
        position: "relative",
        background: "var(--bg-deep)",
        overflow: "hidden",
      }}
    >
      {/* Dot grid background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(74,222,128,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          zIndex: 1,
        }}
      />

      {/* Radial green glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          right: "-10%",
          transform: "translateY(-50%)",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(74,222,128,0.06) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Territory Map — background right side, desktop */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
          width: "min(480px, 45vw)",
          opacity: 0.45,
          zIndex: 2,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="hidden lg:flex"
      >
        <TerritoryMap />
      </div>

      {/* Content */}
      <div
        className="section-content flex flex-col justify-center min-h-[100dvh] py-24"
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* Eyebrow */}
        <FadeUp delay={0.1}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-text)",
              fontWeight: 500,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--color-primary)",
              marginBottom: "16px",
            }}
          >
            IMPACTO TERRITORIAL
          </span>
        </FadeUp>

        <FadeUp delay={0.2}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(30px, 6vw, 68px)",
              color: "var(--text-primary)",
              lineHeight: 1.0,
              letterSpacing: "-0.025em",
              marginBottom: "16px",
            }}
          >
            Dados que{" "}
            <span className="text-gradient">ganham vida</span>
            <br />
            no território.
          </h2>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p
            style={{
              fontFamily: "var(--font-text)",
              fontSize: "clamp(14px, 1.2vw, 18px)",
              color: "var(--text-secondary)",
              maxWidth: "520px",
              lineHeight: 1.65,
              marginBottom: "60px",
            }}
          >
            Números reais de um trabalho que transforma territórios, protege
            patrimônios e gera decisões mais precisas em todo o Brasil.
          </p>
        </FadeUp>

        {/* Stats grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: "clamp(24px, 4vw, 48px)", maxWidth: "900px" }}
        >
          {IMPACT_STATS.map((stat, i) => (
            <div key={`${stat.label}-${i}`} style={{ minWidth: 0 }}>
              <FadeUp delay={0.35 + i * 0.1}>
              <div
                style={{
                  borderTop: "1px solid rgba(74,222,128,0.25)",
                  paddingTop: "20px",
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  format={stat.format}
                  label={stat.label}
                  duration={1800}
                  style={{ alignItems: "flex-start", textAlign: "left" }}
                />
              </div>
              </FadeUp>
            </div>
          ))}
        </div>

        {/* Mobile territory map */}
        <FadeUp delay={0.8}>
          <div
            className="flex lg:hidden flex-col items-center"
            style={{ marginTop: "48px", opacity: 0.65 }}
          >
            <span
              style={{
                fontFamily: "var(--font-text)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--color-primary)",
                marginBottom: "12px",
              }}
            >
              Base de Operações — Oeste Catarinense
            </span>
            <TerritoryMap />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export default ImpactSection;
