"use client";
import SectionBackground from "@/components/ui/SectionBackground";
import { GlassCard } from "@/components/ui/GlassCard";
import ServiceIcon from "@/components/ui/ServiceIcon";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import type { ServiceSectionData } from "@/types";

interface ServiceSectionProps {
  service: ServiceSectionData;
  /** 0-based position among all services */
  index: number;
}

const MOOD_OVERLAY: Record<string, string> = {
  warm: "radial-gradient(ellipse at 70% 50%, rgba(251,146,60,0.08) 0%, transparent 60%)",
  tech: "radial-gradient(ellipse at 30% 50%, rgba(110,231,183,0.08) 0%, transparent 60%)",
  authority:
    "radial-gradient(ellipse at 50% 80%, rgba(148,163,184,0.07) 0%, transparent 60%)",
  power: "radial-gradient(ellipse at 50% 20%, rgba(99,102,241,0.07) 0%, transparent 60%)",
  nature: "radial-gradient(ellipse at 60% 60%, rgba(74,222,128,0.1) 0%, transparent 60%)",
};

export function ServiceSection({ service, index }: ServiceSectionProps) {
  const isReverse = service.layoutReverse ?? false;
  const slideDir = isReverse ? -40 : 40;
  const moodGlow =
    MOOD_OVERLAY[service.mood ?? "tech"] ?? MOOD_OVERLAY.tech;

  return (
    <section
      id={service.id}
      className="section-full section-snap"
      aria-label={service.label}
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Cinematic background */}
      <SectionBackground
        imageSrc={service.backgroundImage}
        imageAlt={service.backgroundAlt}
        overlayVariant="none"
        imageReveal={service.imageRevealDirection}
        objectPosition={service.objectPosition}
        crossfadeManaged={true}
      />

      {/* Mood color overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: moodGlow,
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="section-content flex flex-col justify-center min-h-[100dvh] py-24"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div
          className={`flex flex-col ${isReverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}
          style={{ gap: "clamp(40px, 6vw, 80px)", alignItems: "flex-start" }}
        >
          {/* Text column */}
          <div style={{ flex: "0 0 auto", maxWidth: "480px", width: "100%" }}>
            <FadeUp delay={0.05}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-text)",
                  fontWeight: 500,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  color: "var(--color-primary)",
                  marginBottom: "16px",
                }}
              >
                {service.eyebrow ?? `FRENTE 0${index + 1}`}
              </span>
            </FadeUp>

            <FadeUp delay={0.12}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(24px, 4.5vw, 54px)",
                  color: "var(--text-primary)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.025em",
                  marginBottom: "20px",
                }}
              >
                {service.label}
              </h2>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: "clamp(14px, 1.3vw, 18px)",
                  color: "var(--color-secondary)",
                  lineHeight: 1.5,
                  marginBottom: "16px",
                  textShadow: "0 1px 12px rgba(0,0,0,0.8)",
                }}
              >
                {service.headline}
              </p>
            </FadeUp>

            <FadeUp delay={0.26}>
              <p
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: "clamp(13px, 1.1vw, 16px)",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                }}
              >
                {service.lead}
              </p>
            </FadeUp>

            {/* Social proof metric */}
            {service.proof && (
              <FadeUp delay={0.32}>
                <div
                  style={{
                    borderLeft: "2px solid var(--color-primary)",
                    paddingLeft: "16px",
                    marginBottom: "32px",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "clamp(22px, 3vw, 36px)",
                      color: "var(--color-primary)",
                      lineHeight: 1.1,
                    }}
                  >
                    {service.proof.metric}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-text)",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "var(--text-muted)",
                    }}
                  >
                    {service.proof.label}
                  </span>
                </div>
              </FadeUp>
            )}

            <FadeUp delay={0.38}>
              <Button
                variant="ghost"
                size="md"
                href={
                  service.whatsappMessage
                    ? `https://wa.me/5549999719388?text=${encodeURIComponent(
                        service.whatsappMessage
                      )}`
                    : service.cta.href
                }
              >
                {service.cta.text}
              </Button>
            </FadeUp>
          </div>

          {/* Feature cards */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              minWidth: 0,
            }}
          >
            {service.features.map((feat, fi) => (
              <div
                key={feat.title}
                style={{
                  animation: `serviceSlide 0.6s cubic-bezier(0.22,1,0.36,1) ${
                    0.2 + fi * 0.12
                  }s both`,
                  "--slide-x": `${slideDir}px`,
                } as React.CSSProperties}
              >
                <GlassCard padding="md">
                  <div
                    style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}
                  >
                    <div
                      style={{
                        flexShrink: 0,
                        width: "42px",
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "10px",
                        background: "rgba(74,222,128,0.08)",
                        border: "1px solid rgba(74,222,128,0.15)",
                      }}
                    >
                      <ServiceIcon
                        name={feat.icon}
                        size={20}
                        color="var(--color-primary)"
                        animate
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontFamily: "var(--font-text)",
                          fontWeight: 600,
                          fontSize: "clamp(13px, 1.05vw, 15px)",
                          color: "var(--text-primary)",
                          marginBottom: "5px",
                          margin: 0,
                        }}
                      >
                        {feat.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-text)",
                          fontSize: "clamp(12px, 0.88vw, 13px)",
                          color: "var(--text-secondary)",
                          lineHeight: 1.55,
                          margin: "6px 0 0",
                        }}
                      >
                        {feat.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes serviceSlide {
          from {
            opacity: 0;
            transform: translateX(var(--slide-x, 40px));
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}

export default ServiceSection;
