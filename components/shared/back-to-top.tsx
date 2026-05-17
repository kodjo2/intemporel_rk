"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Revenir en haut de la page"
      className="focus-ring fixed bottom-6 right-5 z-40 inline-flex size-12 items-center justify-center rounded-full border border-border/60 bg-primary text-primary-foreground shadow-xl transition hover:-translate-y-0.5 hover:bg-accent md:bottom-6"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
