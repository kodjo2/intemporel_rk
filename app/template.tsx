"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (pathname !== "/") {
      return;
    }

    const hash = window.location.hash;

    if (hash && hash !== "#home") {
      return;
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    scrollToTop();

    const frameOne = window.requestAnimationFrame(() => {
      scrollToTop();

      const frameTwo = window.requestAnimationFrame(() => {
        scrollToTop();
      });

      return () => window.cancelAnimationFrame(frameTwo);
    });

    const timeoutId = window.setTimeout(scrollToTop, 160);

    return () => {
      window.cancelAnimationFrame(frameOne);
      window.clearTimeout(timeoutId);
    };
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
