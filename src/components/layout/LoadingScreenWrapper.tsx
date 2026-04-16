"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";

export function LoadingScreenWrapper() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (show)
    return (
      <LoadingScreen
        onComplete={() => {
          document.documentElement.scrollTop = 0;
          setShow(false);
        }}
      />
    );
  return null;
}
