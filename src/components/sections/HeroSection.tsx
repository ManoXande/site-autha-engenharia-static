"use client";
import { useEffect, useRef } from "react";
import SectionBackground from "@/components/ui/SectionBackground";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { Button } from "@/components/ui/Button";
import { WordReveal } from "@/components/animations/WordReveal";
import { FadeUp } from "@/components/animations/FadeUp";
import { COMPANY } from "@/lib/constants";

export function HeroSection() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // Target the Next.js Image inside section-bg for zoom-out entry
    const section = document.getElementById("hero");
    if (!section) return;

    const img = section.querySelector<HTMLImageElement>(".section-bg img");
    if (!img) return;

    imgRef.current = img;

    // Start at scale(1.08), animate to scale(1.0) over 2s ease-out-quart
    img.style.transform = "scale(1.08)";
    img.style.transition = "transform 2s cubic-bezier(0.25, 1, 0.5, 1)";
    img.style.willChange = "transform";

    // Trigger on next frame to ensure browser registers initial state
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.transform = "scale(1.0)";
      });
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="hero"
      className="section-full section-snap"
      aria-label="Apresentação da Autha Engenharia"
      style={{ position: "relative" }}
    >
      <SectionBackground
        imageSrc="/images/sections/hero-drone-cidade.jpg"
        imageAlt="Vista aérea cinematográfica capturada por drone — Autha Engenharia"
        overlayVariant="none"
        priority={true}
        objectPosition="center 40%"
        crossfadeManaged={true}
      />

      <div
        className="section-content flex flex-col justify-center min-h-[100dvh] pt-24 pb-24"
        style={{ position: "relative", zIndex: "var(--z-content, 20)" }}
      >
        <div style={{ maxWidth: "48rem" }}>
          {/* Eyebrow label */}
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
                marginBottom: "24px",
              }}
            >
              ENGENHARIA DE PRECISÃO
            </span>
          </FadeUp>

          {/* H1 */}
          <h1 aria-label="Mapear melhor é decidir melhor.">
            <WordReveal
              text="Mapear melhor"
              as="span"
              initialDelay={300}
              staggerMs={55}
              inViewport={true}
              className="block"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(38px, 9.5vw, 104px)",
                color: "var(--text-primary)",
                lineHeight: 0.95,
                letterSpacing: "-0.03em",
              }}
            />
            <FadeUp delay={0.62} as="span">
              <span
                className="block text-gradient"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(38px, 9.5vw, 104px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                e decidir melhor.
              </span>
            </FadeUp>
          </h1>

          {/* Subtítulo */}
          <FadeUp delay={0.75}>
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.35vw, 20px)",
                color: "#c8d3e0",
                marginBottom: "40px",
                marginTop: "24px",
                maxWidth: "560px",
                lineHeight: 1.6,
              }}
            >
              Tecnologia, precisão e visão estratégica para proteger, regularizar e
              valorizar seu patrimônio.
            </p>
          </FadeUp>

          {/* CTAs */}
          <FadeUp delay={0.9}>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button
                variant="primary"
                size="lg"
                href="#mapeamento"
                data-magnetic="true"
              >
                Ver Frentes de Atuação
              </Button>

              <Button
                variant="secondary"
                size="lg"
                href={COMPANY.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Solicitar Diagnóstico
              </Button>
            </div>
          </FadeUp>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

export default HeroSection;
