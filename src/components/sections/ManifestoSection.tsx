import SectionBackground from "@/components/ui/SectionBackground";
import { FadeUp } from "@/components/animations/FadeUp";

export function ManifestoSection() {
  return (
    <section
      id="manifesto"
      className="section-full section-snap"
      aria-label="Manifesto e origem da Autha Engenharia"
      style={{ position: "relative" }}
    >
      <SectionBackground
        imageSrc="/images/sections/manifesto-authagraph.jpg"
        imageAlt="Mapa cartografico da Autha Engenharia -- manifesto da empresa"
        overlayVariant="none"
        objectPosition="center center"
        crossfadeManaged={true}
      />

      <div
        className="section-content flex flex-col justify-center min-h-screen py-20 lg:py-24"
        style={{ position: "relative", zIndex: "var(--z-content, 20)" }}
      >
        <div className="grid lg:grid-cols-2" style={{ gap: "clamp(40px, 7vw, 96px)", alignItems: "center" }}>

          {/* Left — headline */}
          <div>
            <FadeUp delay={0.1}>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-text)",
                  fontWeight: 400,
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.16em",
                  color: "var(--text-secondary)",
                  marginBottom: "28px",
                }}
              >
                QUEM SOMOS
              </span>
            </FadeUp>

            <FadeUp delay={0.25}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 5.5vw, 72px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                }}
              >
                Não medimos
                <br />
                áreas.{" "}
                <span className="text-gradient">Enxergamos</span>
                <br />
                <span className="text-gradient">territórios.</span>
              </h2>
            </FadeUp>
          </div>

          {/* Right — body + signature */}
          <div>
            {/* Body paragraphs */}
            <FadeUp delay={0.4}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-text)",
                    fontWeight: 400,
                    fontSize: "clamp(15px, 1.2vw, 18px)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                  }}
                >
                  O nome{" "}
                  <strong className="text-primary font-medium">Autha</strong> vem do{" "}
                  <strong className="text-primary font-medium">AuthaGraph</strong> — projeção
                  criada pelo arquiteto japonês{" "}
                  <strong className="text-primary font-medium">Hajime Narukawa</strong>{" "}
                  que rompeu com 450 anos de Mapa de Mercator. Narukawa não buscou uma
                  fórmula melhor:{" "}
                  <strong className="text-primary font-medium">questionou a premissa</strong>.
                  Levou o globo para a terceira dimensão, desdobrou em plano — e o mundo
                  enfim apareceu como é. Não foi precisão a mais. Foi{" "}
                  <strong className="text-primary font-medium">um método completamente novo</strong>.
                </p>

                <p
                  style={{
                    fontFamily: "var(--font-text)",
                    fontWeight: 400,
                    fontSize: "clamp(15px, 1.2vw, 18px)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.75,
                  }}
                >
                  É esse espírito que carregamos. O mercado aprimora a trena há décadas —{" "}
                  <strong className="text-primary font-medium">a Autha trocou de dimensão</strong>.
                  AuthaGrid, LiDAR e uma equipe que integra engenharia, jurídico e ambiental
                  em fluxo único, do campo ao cartório. Como Narukawa, não entregamos uma
                  versão melhor do que já existia.{" "}
                  <strong className="text-primary font-medium">
                    Entregamos a verdade do território.
                  </strong>
                </p>
              </div>
            </FadeUp>

            {/* Founders signature */}
            <FadeUp delay={0.55}>
              <div
                style={{
                  borderTop: "1px solid var(--border-subtle, rgba(255,255,255,0.08))",
                  paddingTop: "28px",
                  marginTop: "36px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    fontSize: "16px",
                    color: "var(--color-primary)",
                    marginBottom: "6px",
                  }}
                >
                  — Carlos Alexandre de Oliveira &amp; Sandro Serafini
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-text)",
                    fontWeight: 300,
                    fontSize: "13px",
                    color: "var(--text-muted, var(--text-secondary))",
                  }}
                >
                  Fundadores, Autha Engenharia e Mapeamento — desde 2020
                </p>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ManifestoSection;
