"use client";

import { motion } from "framer-motion";
import type { JSX } from "react";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
  as: Tag = "div",
}: FadeUpProps) {
  // Cast to `any` so framer-motion's polymorphic `as` prop is satisfied
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = motion[Tag as keyof typeof motion] as any;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}

export default FadeUp;
