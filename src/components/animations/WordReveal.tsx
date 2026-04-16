"use client";

import { motion } from "framer-motion";

interface WordRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  initialDelay?: number; // ms
  staggerMs?: number;    // ms between words
  className?: string;
  style?: React.CSSProperties;
  /** When true, animate immediately (no viewport detection) — use for sections in viewport on load */
  inViewport?: boolean;
}

export function WordReveal({
  text,
  as: Tag = "h2",
  initialDelay = 0,
  staggerMs = 60,
  className,
  style,
  inViewport = false,
}: WordRevealProps) {
  const words = text.split(" ");

  return (
    <Tag
      aria-label={text}
      className={className}
      style={{ display: "block", ...style }}
    >
      {words.map((word, index) => {
        const delay = initialDelay / 1000 + index * (staggerMs / 1000);

        return (
          <motion.span
            key={`${word}-${index}`}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
            }}
          >
            <motion.span
              initial={{ y: "100%", opacity: 0, rotateX: -10 }}
              {...(inViewport
                ? { animate: { y: 0, opacity: 1, rotateX: 0 } }
                : {
                    whileInView: { y: 0, opacity: 1, rotateX: 0 },
                    viewport: { once: true, margin: "-60px" },
                  })}
              transition={{
                duration: 0.7,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                display: "inline-block",
                transformOrigin: "bottom center",
              }}
            >
              {word}
            </motion.span>
            {/* Space separator between words */}
            {index < words.length - 1 && (
              <span style={{ display: "inline-block", width: "0.28em" }} />
            )}
          </motion.span>
        );
      })}
    </Tag>
  );
}

export default WordReveal;
