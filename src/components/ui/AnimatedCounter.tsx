"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { ImpactStatFormat } from "@/types";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  format?: ImpactStatFormat;
  className?: string;
  style?: React.CSSProperties;
}

function formatValue(value: number, format?: ImpactStatFormat): string {
  switch (format) {
    case "area":
      // unit "ha" is rendered separately as suffix at 0.6em
      return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 }).format(
        Math.round(value)
      );
    case "currency": {
      // "R$" prefix and "M+" suffix are rendered at 0.6em; return just the number
      return value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
    }
    case "number":
    default:
      return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 0,
      }).format(Math.round(value));
  }
}

export default function AnimatedCounter({
  value,
  suffix,
  prefix,
  label,
  duration = 1800,
  format,
  className,
  style,
}: AnimatedCounterProps) {
  const reducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState<string>(
    reducedMotion ? formatValue(value, format) : formatValue(0, format)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(formatValue(value, format));
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          startTimeRef.current = null;

          const tick = (timestamp: number) => {
            if (startTimeRef.current === null) {
              startTimeRef.current = timestamp;
            }
            const elapsed = timestamp - startTimeRef.current;
            const t = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const progress = 1 - Math.pow(1 - t, 3);
            const current = progress * value;
            setDisplayed(formatValue(current, format));

            if (t < 1) {
              rafRef.current = requestAnimationFrame(tick);
            } else {
              setDisplayed(formatValue(value, format));
            }
          };

          rafRef.current = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, duration, format, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "clamp(28px, 3.2vw, 52px)",
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          whiteSpace: "nowrap",
          fontVariantNumeric: "tabular-nums",
          lineHeight: 1,
        }}
      >
        {prefix && (
          <span style={{ fontSize: "0.6em", fontFamily: "var(--font-display)" }}>
            {prefix}
          </span>
        )}
        {displayed}
        {suffix && (
          <span style={{ fontSize: "0.6em", fontFamily: "var(--font-display)" }}>
            {suffix}
          </span>
        )}
      </div>

      <p
        style={{
          fontFamily: "var(--font-text)",
          fontWeight: 400,
          fontSize: "14px",
          color: "var(--text-secondary)",
          maxWidth: "160px",
          textAlign: "center",
          lineHeight: 1.4,
          marginTop: "8px",
        }}
      >
        {label}
      </p>
    </div>
  );
}
