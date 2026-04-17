import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politica de Privacidade",
  description:
    "Politica de Privacidade da Autha Engenharia e Mapeamento. Conheca como coletamos, utilizamos e protegemos seus dados pessoais em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade/" },
};

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="min-h-screen bg-[var(--bg-deep)] text-[var(--color-content-primary)]">
      {/* Header simples */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-[var(--color-brand-primary)] transition-colors hover:text-[var(--color-content-primary)]"
          >
            &larr; Voltar ao site
          </Link>
          <span className="text-xs uppercase tracking-widest text-[var(--color-content-tertiary)]">
            Autha Engenharia
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <h1
          className="mb-8 text-3xl font-bold leading-tight md:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Politica de Privacidade
        </h1>

        <p className="mb-8 text-sm text-[var(--color-content-tertiary)]">
          Ultima atualizacao: 17 de abril de 2026
        </p>

        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            1. Introducao
          </h2>
          <p className="mb-4 leading-relaxed text-[var(--color-content-secondary)]">
            A Autha Engenharia e Mapeamento, inscrita no CNPJ 38.489.344/0001-89,
            valoriza a privacidade dos seus usuarios e esta comprometida com a
            protecao dos dados pessoais, em conformidade com a Lei Geral de
            Protecao de Dados (LGPD - Lei n 13.709/2018).
          </p>
          <p className="leading-relaxed text-[var(--color-content-secondary)]">
            Esta Politica de Privacidade explica como coletamos, utilizamos,
            armazenamos e protegemos suas informacoes quando voce acessa nosso
            site ou entra em contato conosco.
          </p>
        </section>

        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            2. Dados Coletados
          </h2>
          <p className="mb-4 leading-relaxed text-[var(--color-content-secondary)]">
            Podemos coletar as seguintes categorias de dados:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[var(--color-content-secondary)]">
            <li>
              <strong className="text-[var(--color-content-primary)]">
                Dados de identificacao:
              </strong>{" "}
              nome, e-mail, telefone, informacoes fornecidas voluntariamente via
              formulario ou WhatsApp.
            </li>
            <li>
              <strong className="text-[var(--color-content-primary)]">
                Dados de navegacao:
              </strong>{" "}
              endereco IP, tipo de navegador, paginas visitadas, tempo de
              permanencia e cookies (ver secao 6).
            </li>
            <li>
              <strong className="text-[var(--color-content-primary)]">
                Dados tecnicos:
              </strong>{" "}
              dimensoes de tela, idioma preferido e outras informacoes do
              dispositivo para melhorar a experiencia.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            3. Finalidade do Tratamento
          </h2>
          <p className="mb-4 leading-relaxed text-[var(--color-content-secondary)]">
            Utilizamos seus dados para:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[var(--color-content-secondary)]">
            <li>Responder solicitacoes de orcamento e contato;</li>
            <li>Prestar servicos de engenharia, mapeamento e regularizacao;</li>
            <li>Enviar comunicacoes sobre projetos em andamento;</li>
            <li>Melhorar a experiencia de navegacao no site;</li>
            <li>Cumprir obrigacoes legais e regulatorias.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            4. Compartilhamento de Dados
          </h2>
          <p className="leading-relaxed text-[var(--color-content-secondary)]">
            Nao vendemos, alugamos ou comercializamos seus dados pessoais.
            Compartilhamos informacoes apenas quando necessario para execucao
            dos servicos contratados, cumprimento de obrigacoes legais ou com
            seu consentimento expresso.
          </p>
        </section>

        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            5. Seguranca
          </h2>
          <p className="leading-relaxed text-[var(--color-content-secondary)]">
            Adotamos medidas tecnicas e administrativas para proteger seus dados
            contra acessos nao autorizados, alteracoes, divulgacoes ou
            destruicao. Isso inclui comunicacao criptografada (HTTPS) e
            armazenamento seguro em servidores protegidos.
          </p>
        </section>

        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            6. Cookies
          </h2>
          <p className="leading-relaxed text-[var(--color-content-secondary)]">
            Utilizamos cookies essenciais para o funcionamento do site e cookies
            de desempenho/analise (Google Analytics) para entender como os
            visitantes interagem com as paginas. Voce pode desativar cookies nas
            configuracoes do seu navegador, mas isso pode afetar a funcionalidade
            do site.
          </p>
        </section>

        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            7. Seus Direitos (LGPD)
          </h2>
          <p className="mb-4 leading-relaxed text-[var(--color-content-secondary)]">
            Voce tem o direito de:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-[var(--color-content-secondary)]">
            <li>Confirmar a existencia de tratamento dos seus dados;</li>
            <li>Acessar seus dados pessoais;</li>
            <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
            <li>Solicitar a anonimizacao, bloqueio ou eliminacao de dados;</li>
            <li>Revogar o consentimento a qualquer momento;</li>
            <li>Solicitar a portabilidade dos dados.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            8. Contato
          </h2>
          <p className="mb-4 leading-relaxed text-[var(--color-content-secondary)]">
            Para exercer seus direitos ou esclarecer duvidas sobre esta Politica
            de Privacidade, entre em contato:
          </p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="mb-2 text-[var(--color-content-primary)]">
              <strong>Autha Engenharia e Mapeamento</strong>
            </p>
            <p className="text-sm text-[var(--color-content-secondary)]">
              E-mail: authamapeamento@gmail.com
            </p>
            <p className="text-sm text-[var(--color-content-secondary)]">
              WhatsApp: (49) 99971-9388
            </p>
            <p className="text-sm text-[var(--color-content-secondary)]">
              Endereco: Av. Fernando Machado, 703-D, Sala 01, Centro, Chapeco/SC
            </p>
          </div>
        </section>

        <section>
          <h2
            className="mb-4 text-xl font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            9. Alteracoes
          </h2>
          <p className="leading-relaxed text-[var(--color-content-secondary)]">
            Esta politica pode ser atualizada periodicamente. Recomendamos que
            voce a revise sempre que acessar o site. Alteracoes significativas
            serao comunicadas por meio dos nossos canais oficiais.
          </p>
        </section>
      </main>
    </div>
  );
}
