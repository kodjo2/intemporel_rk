"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import type { GalleryItem } from "@/types/site";

type GalleryShowcaseProps = {
  items: GalleryItem[];
  limit?: number;
  showFilters?: boolean;
};

export function GalleryShowcase({
  items,
  limit,
  showFilters = true,
}: GalleryShowcaseProps) {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState("Tous");
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = useMemo(
    () => ["Tous", ...new Set(items.map((item) => item.category))],
    [items],
  );
  const filtered = useMemo(() => {
    const base =
      filter === "Tous"
        ? items
        : items.filter((item) => item.category === filter);
    return typeof limit === "number" ? base.slice(0, limit) : base;
  }, [filter, items, limit]);

  useEffect(() => {
    if (!activeItem) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeItem]);

  return (
    <>
      {showFilters ? (
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const active = category === filter;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                className={cn(
                  "focus-ring min-h-11 rounded-full border px-4 text-sm font-medium transition",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border/70 bg-card/70 hover:border-accent hover:text-accent",
                )}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
      ) : null}

      <div
        className={cn(
          "grid gap-4 md:grid-cols-3 xl:grid-cols-4",
          showFilters ? "mt-8" : "mt-0",
        )}
      >
        {filtered.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            className="group overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/70 text-left shadow-md"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.45,
              delay: index * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setActiveItem(item)}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
              />
            </div>
            <div className="space-y-2 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                {item.category}
              </p>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-xs text-muted-foreground sm:text-sm">
                {item.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeItem ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4 backdrop-blur-lg"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={activeItem.title}
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              className="relative grid w-full max-w-6xl gap-6 overflow-hidden rounded-[2rem] bg-zinc-950 p-4 text-white lg:grid-cols-[1.1fr_0.9fr]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Fermer la lightbox"
                className="focus-ring absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/30"
                onClick={() => setActiveItem(null)}
              >
                <X className="size-5" />
              </button>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={activeItem.image}
                  alt={activeItem.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-4 lg:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                  {activeItem.category}
                </p>
                <h3 className="text-4xl font-semibold sm:text-5xl">
                  {activeItem.title}
                </h3>
                <p className="text-base text-white/74">
                  {activeItem.description}
                </p>
                <p className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-sm text-white/65">
                  {activeItem.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
