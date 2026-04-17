"use client";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { COMPANY } from "@/lib/constants";

const WA_MSG = encodeURIComponent(
  "Olá! Vim pelo site da Autha Engenharia e gostaria de conversar com um engenheiro."
);

const WA_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function ContactSection() {
  return (
    <section
      id="contato"
      className="section-full section-snap"
      aria-label="Contato com a Autha Engenharia"
      style={{ position: "relative", background: "var(--bg-deep)", overflow: "hidden" }}
    >
      {/* ── Background glows ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse 70% 55% at 50% 58%, rgba(74,222,128,0.09) 0%, transparent 70%)",
      }} />
      <div aria-hidden="true" style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "60vw", height: "30vh", zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse at center top, rgba(74,222,128,0.04) 0%, transparent 70%)",
      }} />

      <div
        className="section-content flex flex-col justify-center min-h-[100dvh] py-24"
        style={{ position: "relative", zIndex: 10 }}
      >

        {/* ── Central content ── */}
        <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto", width: "100%" }}>

          {/* Eyebrow */}
          <FadeUp delay={0.05}>
            <span style={{
              display: "inline-block",
              fontFamily: "var(--font-text)",
              fontWeight: 500,
              fontSize: "13px",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              color: "var(--color-primary)",
              marginBottom: "28px",
            }}>
              FALE COM A AUTHA
            </span>
          </FadeUp>

          {/* Headline */}
          <FadeUp delay={0.12}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(34px, 6.8vw, 80px)",
              color: "var(--text-primary)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              marginBottom: "0",
            }}>
              Engenharia começa
            </h2>
          </FadeUp>

          <FadeUp delay={0.20}>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(34px, 6.8vw, 80px)",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              marginBottom: "32px",
              paddingBottom: "0.08em",
            }}
              className="text-gradient"
            >
              no diálogo direto.
            </h2>
          </FadeUp>

          {/* Body */}
          <FadeUp delay={0.28}>
            <div style={{ maxWidth: "560px", margin: "0 auto 44px" }}>
              <p style={{
                fontFamily: "var(--font-text)",
                fontSize: "clamp(14px, 1.15vw, 17px)",
                color: "var(--text-primary)",
                lineHeight: 1.7,
                textAlign: "center",
                letterSpacing: "0.01em",
                marginBottom: "20px",
              }}>
                Sem formulário. Sem fila de atendimento. Sua mensagem chega.
              </p>

              <p style={{
                fontFamily: "var(--font-text)",
                fontSize: "clamp(14px, 1.15vw, 17px)",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                textAlign: "center",
              }}>
                Direto ao engenheiro responsável pela frente que você precisa —
                pronto para discutir escopo, prazo e orçamento na mesma conversa.
              </p>
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={0.36}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="primary"
                size="lg"
                href={`${COMPANY.whatsappLink}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                style={{
                  fontSize: "clamp(14px, 1.3vw, 17px)",
                  padding: "18px clamp(28px, 5vw, 56px)",
                  gap: "12px",
                }}
              >
                {WA_ICON}
                Iniciar conversa no WhatsApp
              </Button>
            </div>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;
