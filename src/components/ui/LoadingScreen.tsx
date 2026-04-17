"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const LOADING_FADE_DELAY_MS = 450;
const LOADING_DONE_DELAY_MS = 850;

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"visible" | "fading" | "done">("visible");

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setPhase("fading");
    }, LOADING_FADE_DELAY_MS);

    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, LOADING_DONE_DELAY_MS);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: "var(--z-loading)" as unknown as number,
        background: "var(--bg-deep)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "fading" ? 0 : 1,
        pointerEvents: phase === "fading" ? "none" : "all",
        transition: "opacity 0.4s ease",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Logo */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          animation: "loadingLogoIn 0.8s ease 0.3s both",
        }}
      >
        <Image
          src="/logo/marca-branca-cortada.png"
          alt="Autha Engenharia"
          width={340}
          height={90}
          priority
          style={{ objectFit: "contain", maxWidth: "min(340px, 70vw)" }}
        />
      </div>

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 2,
          background: "var(--gradient-brand)",
          boxShadow: "var(--glow-md)",
          animation: "scanLoading 1.4s ease-in-out forwards",
          zIndex: 3,
        }}
      />

      <style>{`
        @keyframes loadingLogoIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
