"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, COMPANY } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const rafRef = useRef<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via elementFromPoint (RAF-based)
  const detectActiveSection = useCallback(() => {
    const cx = window.innerWidth / 2;
    const el = document.elementFromPoint(cx, 96);
    if (!el) return;
    const section = el.closest("section[id]") as HTMLElement | null;
    if (section?.id) {
      setActiveSection(section.id);
    }
  }, []);

  useEffect(() => {
    const onScrollOrResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(detectActiveSection);
    };
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    detectActiveSection();
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [detectActiveSection]);

  // Lock body scroll + focus trap + Escape key when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    if (menuOpen) {
      // Move focus to first focusable item in the menu
      const first = menuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)[0];
      first?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMenuOpen(false);
          hamburgerRef.current?.focus();
          return;
        }
        if (e.key !== "Tab" || !menuRef.current) return;

        const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }

    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const headerBg = scrolled
    ? "var(--header-bg-scrolled, rgba(3,7,18,0.90))"
    : "rgba(3,7,18,0.30)";

  const headerBlur = scrolled ? "blur(12px) saturate(1.8)" : "none";

  return (
    <>
      <header
        className={cn("fixed top-0 left-0 right-0 z-[50] transition-all duration-[400ms]")}
        style={{
          background: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
        }}
        role="banner"
      >
        <div
          className="flex items-center justify-between mx-auto"
          style={{
            height: "var(--header-height, 60px)",
            paddingLeft: "var(--container-padding, 1.5rem)",
            paddingRight: "var(--container-padding, 1.5rem)",
            maxWidth: "var(--container-max, 1280px)",
          }}
        >
          {/* Logo */}
          <a
            href="#hero"
            aria-label={`${COMPANY.name} — voltar ao início`}
            className="flex-shrink-0"
          >
            <Image
              src="/logo/marca-branca-cortada.png"
              alt={COMPANY.name}
              width={1136}
              height={300}
              priority
              className="transition-[height] duration-[400ms] object-contain"
              style={{
                height: scrolled ? "28px" : "36px",
                width: "auto",
              }}
            />
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Navegação principal"
          >
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors duration-200",
                    "text-[13px] font-medium uppercase tracking-[0.07em]",
                    isActive
                      ? "text-[var(--color-primary,#4ade80)]"
                      : "text-[var(--text-secondary,rgba(248,250,252,0.65))] hover:text-[var(--text-primary,#f8fafc)]"
                  )}
                  style={{ fontFamily: "var(--font-text)" }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              variant="secondary"
              size="sm"
              href="#contato"
            >
              Fale Conosco
            </Button>
          </div>

          {/* Hamburger button (mobile) */}
          <button
            ref={hamburgerRef}
            className="lg:hidden flex flex-col justify-center items-center gap-[6px] w-10 h-10 -mr-2"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span
              className="block w-6 bg-[var(--text-primary,#f8fafc)] rounded-full transition-transform duration-300"
              style={{
                height: "1.5px",
                transform: menuOpen ? "translateY(7.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block w-6 bg-[var(--text-primary,#f8fafc)] rounded-full transition-opacity duration-300"
              style={{
                height: "1.5px",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 bg-[var(--text-primary,#f8fafc)] rounded-full transition-transform duration-300"
              style={{
                height: "1.5px",
                transform: menuOpen ? "translateY(-7.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        aria-hidden={!menuOpen}
        className={cn(
          "fixed inset-0 lg:hidden flex flex-col items-center justify-center",
          "transition-opacity duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        style={{
          background: "rgba(3,7,18,0.97)",
          backdropFilter: "var(--blur-mobile-menu, blur(20px))",
          WebkitBackdropFilter: "var(--blur-mobile-menu, blur(20px))",
          zIndex: "var(--z-header, 50)",
        }}
      >
        <nav
          className="flex flex-col items-center"
          style={{ gap: "40px" }}
          aria-label="Navegação mobile"
        >
          {NAV_ITEMS.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="transition-all duration-300 text-[var(--text-primary,#f8fafc)] hover:text-[var(--color-primary,#4ade80)]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "24px",
                transform: menuOpen ? "translateY(0)" : "translateY(32px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.4s ease, opacity 0.4s ease`,
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
              }}
            >
              {item.label}
            </a>
          ))}

          <div
            style={{
              transform: menuOpen ? "translateY(0)" : "translateY(32px)",
              opacity: menuOpen ? 1 : 0,
              transition: `transform 0.4s ease, opacity 0.4s ease`,
              transitionDelay: menuOpen ? `${NAV_ITEMS.length * 60}ms` : "0ms",
            }}
          >
            <Button
              variant="primary"
              size="md"
              href="#contato"
              onClick={closeMenu}
            >
              Fale Conosco
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
