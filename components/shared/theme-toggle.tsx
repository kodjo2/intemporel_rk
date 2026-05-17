"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Activer le theme clair" : "Activer le theme sombre"}
      className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/80 text-foreground transition hover:border-accent hover:text-accent"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <SunMedium className="size-5" />
      ) : (
        <MoonStar className="size-5" />
      )}
    </button>
  );
}
