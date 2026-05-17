"use client";

import { Accessibility, Eye, Type } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/shared/theme-toggle";

type ControlState = {
  contrast: boolean;
  textSize: boolean;
  motion: boolean;
};

const STORAGE_KEY = "romarice-accessibility";

function applyState(state: ControlState) {
  document.documentElement.dataset.contrast = state.contrast
    ? "high"
    : "default";
  document.documentElement.dataset.textSize = state.textSize
    ? "large"
    : "default";
  document.documentElement.dataset.motion = state.motion
    ? "reduced"
    : "default";
}

export function AccessibilityControls() {
  const [state, setState] = useState<ControlState>(() => {
    if (typeof window === "undefined") {
      return {
        contrast: false,
        textSize: false,
        motion: false,
      };
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return {
        contrast: false,
        textSize: false,
        motion: false,
      };
    }

    return JSON.parse(stored) as ControlState;
  });

  useEffect(() => {
    applyState(state);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <div className="fixed bottom-5 left-5 z-40 hidden w-[min(100%,20rem)] rounded-3xl p-3 shadow-2xl glass-panel-strong md:block">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-accent">
        <Accessibility className="size-4" />
        Accessibilite
      </div>
      <div className="grid gap-2">
        <button
          type="button"
          className="focus-ring flex min-h-12 items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 text-left"
          aria-pressed={state.contrast}
          onClick={() =>
            setState((current) => ({ ...current, contrast: !current.contrast }))
          }
        >
          <span className="flex items-center gap-3">
            <Eye className="size-4" />
            Contraste eleve
          </span>
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {state.contrast ? "On" : "Off"}
          </span>
        </button>
        <button
          type="button"
          className="focus-ring flex min-h-12 items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 text-left"
          aria-pressed={state.textSize}
          onClick={() =>
            setState((current) => ({ ...current, textSize: !current.textSize }))
          }
        >
          <span className="flex items-center gap-3">
            <Type className="size-4" />
            Taille du texte
          </span>
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {state.textSize ? "Plus" : "Norme"}
          </span>
        </button>
        <button
          type="button"
          className="focus-ring flex min-h-12 items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 text-left"
          aria-pressed={state.motion}
          onClick={() =>
            setState((current) => ({ ...current, motion: !current.motion }))
          }
        >
          <span className="flex items-center gap-3">
            <span
              className="size-2 rounded-full bg-accent"
              aria-hidden="true"
            />
            Reduire les animations
          </span>
          <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {state.motion ? "On" : "Off"}
          </span>
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3">
        <span className="text-sm font-medium">Theme</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
