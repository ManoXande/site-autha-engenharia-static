"use client";

import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: React.MouseEventHandler;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  tabIndex?: number;
  "data-magnetic"?: string;
  disabled?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}

const sizeStyles: Record<
  "sm" | "md" | "lg",
  { padding: string; fontSize: string }
> = {
  sm: { padding: "10px 20px", fontSize: "14px" },
  md: { padding: "14px 28px", fontSize: "16px" },
  lg: { padding: "16px 36px", fontSize: "16px" },
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className,
  style,
  type = "button",
  tabIndex,
  disabled,
  target,
  rel,
  ...ariaProps
}: ButtonProps) {
  const { padding, fontSize } = sizeStyles[size];

  // --- Shared base classes ---
  const baseClass = cn(
    "inline-flex items-center justify-center gap-2",
    "cursor-pointer select-none",
    "outline-none focus-visible:outline-none",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  // --- Variant-specific styles ---
  const primaryStyle: React.CSSProperties = {
    background: "var(--gradient-brand)",
    color: "var(--text-on-brand)",
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    minHeight: "52px",
    padding,
    borderRadius: "var(--radius-md)",
    border: "none",
    transition: "all 0.3s var(--ease-out-expo)",
    willChange: "transform, box-shadow",
    ...style,
  };

  const secondaryStyle: React.CSSProperties = {
    background: "transparent",
    color: "var(--text-primary)",
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize,
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    minHeight: "52px",
    padding,
    borderRadius: "var(--radius-md)",
    border: "1.5px solid rgba(248,250,252,0.20)",
    transition: "all 0.3s var(--ease-out-expo)",
    willChange: "transform, box-shadow, border-color, color",
    ...style,
  };

  const ghostStyle: React.CSSProperties = {
    background: "transparent",
    color: "var(--color-primary)",
    fontFamily: "var(--font-text)",
    fontWeight: 500,
    fontSize: "15px",
    padding: "8px 0",
    border: "none",
    transition: "all 0.3s var(--ease-out-expo)",
    willChange: "color",
    ...style,
  };

  const variantStyle =
    variant === "primary"
      ? primaryStyle
      : variant === "secondary"
        ? secondaryStyle
        : ghostStyle;

  // Ghost: arrow element rendered inside
  const arrowSpan =
    variant === "ghost" ? (
      <span
        className="btn-arrow"
        style={{
          display: "inline-block",
          transition: "transform 0.3s var(--ease-out-expo)",
        }}
      >
        →
      </span>
    ) : null;

  // Hover CSS injected globally once via a <style> tag pattern.
  // We use a data-variant attribute to target each variant precisely.
  const hoverStyles = `
    [data-btn="primary"]:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: var(--glow-md);
      background: var(--gradient-brand-hover);
    }
    [data-btn="primary"]:not(:disabled):active {
      transform: translateY(0);
    }
    [data-btn="primary"]:focus-visible {
      outline: 3px solid var(--border-active);
      outline-offset: 3px;
    }
    [data-btn="secondary"]:not(:disabled):hover {
      transform: translateY(-2px);
      box-shadow: var(--glow-sm);
      border-color: rgba(74,222,128,0.40);
      color: var(--color-primary);
    }
    [data-btn="secondary"]:not(:disabled):active {
      transform: translateY(0);
    }
    [data-btn="secondary"]:focus-visible {
      outline: 3px solid var(--border-active);
      outline-offset: 3px;
    }
    [data-btn="ghost"]:not(:disabled):hover {
      color: var(--color-secondary);
      text-decoration: underline;
    }
    [data-btn="ghost"]:not(:disabled):hover .btn-arrow {
      transform: translateX(4px);
    }
    [data-btn="ghost"]:focus-visible {
      outline: 2px solid var(--border-active);
      outline-offset: 2px;
    }
  `;

  const sharedProps = {
    "data-btn": variant,
    "data-magnetic": (ariaProps as Record<string, unknown>)["data-magnetic"] as
      | string
      | undefined,
    style: variantStyle,
    className: baseClass,
    tabIndex,
    onClick,
    disabled,
    ...Object.fromEntries(
      Object.entries(ariaProps).filter(([k]) => k.startsWith("aria-"))
    ),
  };

  const content = (
    <>
      <style>{hoverStyles}</style>
      {children}
      {arrowSpan}
    </>
  );

  if (href) {
    // Auto-detect external links for safety
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("//") ||
      target === "_blank";
    return (
      <a
        {...sharedProps}
        href={href}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
      >
        {content}
      </a>
    );
  }

  return (
    <button {...sharedProps} type={type}>
      {content}
    </button>
  );
}

export default Button;
