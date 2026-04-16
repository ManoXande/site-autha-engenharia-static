"use client";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler;
}

const paddingMap: Record<"sm" | "md" | "lg", string> = {
  sm: "16px",
  md: "var(--space-6, 24px)",
  lg: "var(--space-8, 32px)",
};

const shimmerStyles = `
  @keyframes glass-shimmer {
    0%   { transform: translateX(-200%) skewX(-15deg); }
    100% { transform: translateX(200%)  skewX(-15deg); }
  }

  .glass-card {
    position: relative;
    overflow: hidden;
  }

  .glass-card::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      transparent 0%,
      rgba(248, 250, 252, 0.08) 40%,
      rgba(248, 250, 252, 0.12) 50%,
      rgba(248, 250, 252, 0.08) 60%,
      transparent 100%
    );
    width: 80%;
    top: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .glass-card:hover::after {
    opacity: 1;
    animation: glass-shimmer 0.7s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
  }

  .glass-card:hover {
    border-color: var(--border-hover);
    transform: translateY(-3px);
    box-shadow: var(--glow-sm);
  }
`;

export function GlassCard({
  children,
  className,
  padding = "md",
  style,
  onClick,
}: GlassCardProps) {
  const cardStyle: React.CSSProperties = {
    background: "var(--bg-glass)",
    backdropFilter: "var(--blur-glass)",
    WebkitBackdropFilter: "var(--blur-glass)",
    border: "1px solid var(--border-subtle)",
    borderRadius: "var(--radius-xl)",
    padding: paddingMap[padding],
    transition: "all 0.4s var(--ease-out-expo)",
    willChange: "transform, box-shadow, border-color",
    cursor: onClick ? "pointer" : undefined,
    ...style,
  };

  return (
    <>
      <style>{shimmerStyles}</style>
      <div
        className={cn("glass-card", className)}
        style={cardStyle}
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
}

export default GlassCard;
