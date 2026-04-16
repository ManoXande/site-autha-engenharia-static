"use client";

interface ScrollIndicatorProps {
  className?: string;
}

const scrollIndicatorStyles = `
  @keyframes scroll-bounce {
    0%   { transform: rotate(45deg) translateY(0);   opacity: 0.7; }
    50%  { transform: rotate(45deg) translateY(8px);  opacity: 1;   }
    100% { transform: rotate(45deg) translateY(0);   opacity: 0.7; }
  }

  @keyframes scroll-indicator-fadein {
    from { opacity: 0; transform: translateX(-50%) translateY(8px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0);   }
  }

  .scroll-indicator {
    animation: scroll-indicator-fadein 0.8s var(--ease-out-expo, cubic-bezier(0.16, 1, 0.3, 1)) both;
    animation-delay: 2.5s;
  }

  .scroll-indicator__arrow {
    animation: scroll-bounce 2s var(--ease-in-out, cubic-bezier(0.65, 0, 0.35, 1)) infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .scroll-indicator {
      animation: none;
      opacity: 1;
      transform: translateX(-50%);
    }
    .scroll-indicator__arrow {
      animation: none;
    }
  }
`;

export function ScrollIndicator({ className }: ScrollIndicatorProps) {
  return (
    <>
      <style>{scrollIndicatorStyles}</style>
      <div
        aria-hidden="true"
        className={`scroll-indicator${className ? ` ${className}` : ""}`}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "var(--z-content, 20)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0, // starts invisible; animation handles fade-in
        }}
      >
        {/* Label */}
        <span
          style={{
            fontFamily: "var(--font-text)",
            fontWeight: 300,
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--text-secondary)",
            whiteSpace: "nowrap",
          }}
        >
          Role para explorar
        </span>

        {/* Chevron arrow */}
        <div
          className="scroll-indicator__arrow"
          style={{
            width: "10px",
            height: "10px",
            borderBottom: "1.5px solid var(--text-secondary)",
            borderRight: "1.5px solid var(--text-secondary)",
            transform: "rotate(45deg)",
          }}
        />
      </div>
    </>
  );
}

export default ScrollIndicator;
