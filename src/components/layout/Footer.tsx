"use client";
import { COMPANY } from "@/lib/constants";

const LINK_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-text)",
  fontWeight: 300,
  fontSize: "13px",
  color: "var(--text-secondary, rgba(248,250,252,0.55))",
  textDecoration: "none",
  transition: "color 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

function SocialLink({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={LINK_STYLE}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color =
          "var(--color-primary, #4ade80)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color =
          "var(--text-secondary, rgba(248,250,252,0.55))")
      }
    >
      {children}
    </a>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-deep, #020408)",
        position: "relative",
        paddingTop: "56px",
        paddingBottom: "44px",
        marginTop: "0",
      }}
    >
      {/* Soft gradient separator (top) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(74,222,128,0.10) 25%, rgba(74,222,128,0.18) 50%, rgba(74,222,128,0.10) 75%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="mx-auto"
        style={{
          maxWidth: "var(--container-max, 1280px)",
          paddingLeft: "var(--container-padding, 1.5rem)",
          paddingRight: "var(--container-padding, 1.5rem)",
        }}
      >
        {/* Single-row layout: 3 columns on desktop, stacked on mobile */}
        <div
          className="flex flex-col items-center gap-7 lg:flex-row lg:items-center lg:justify-between"
        >
          {/* Left — company identity */}
          <div className="flex flex-col items-center gap-1 lg:items-start">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "13px",
                color: "var(--text-primary)",
                letterSpacing: "0.02em",
              }}
            >
              {COMPANY.name}
            </span>
            <span
              style={{
                fontFamily: "var(--font-text)",
                fontWeight: 300,
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              {COMPANY.address} — {COMPANY.city}
            </span>
          </div>

          {/* Center — social links */}
          <div className="flex items-center gap-5">
            <SocialLink
              href={`${COMPANY.whatsappLink}?text=${encodeURIComponent("Olá! Vim pelo site da Autha Engenharia.")}`}
              label="WhatsApp da Autha Engenharia"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </SocialLink>

            <span aria-hidden="true" style={{ color: "var(--border-subtle)", fontSize: "13px" }}>|</span>

            <SocialLink
              href={COMPANY.instagramLink}
              label="Instagram da Autha Engenharia"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              Instagram
            </SocialLink>

            <span aria-hidden="true" style={{ color: "var(--border-subtle)", fontSize: "13px" }}>|</span>

            <SocialLink
              href={`mailto:${COMPANY.email}`}
              label="E-mail da Autha Engenharia"
              external={false}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
              E-mail
            </SocialLink>
          </div>

          {/* Right — legal */}
          <div className="flex flex-col items-center gap-1 lg:items-end">
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontWeight: 300,
                fontSize: "12px",
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              &copy; {currentYear} Autha Engenharia
            </p>
            <p
              style={{
                fontFamily: "var(--font-text)",
                fontWeight: 300,
                fontSize: "12px",
                color: "var(--text-muted)",
                margin: 0,
              }}
            >
              CNPJ {COMPANY.cnpj}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
