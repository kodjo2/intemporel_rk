"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Expand, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import type { CollectionLook } from "@/types/site";

type CollectionLookGalleryProps = {
  looks: CollectionLook[];
  collectionTitle: string;
};

export function CollectionLookGallery({
  looks,
  collectionTitle,
}: CollectionLookGalleryProps) {
  const reduceMotion = useReducedMotion();
  const [activeLook, setActiveLook] = useState<CollectionLook | null>(null);

  useEffect(() => {
    if (!activeLook) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveLook(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeLook]);

  return (
    <>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Habits a presenter
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {looks.map((look, index) => (
            <motion.button
              key={look.name}
              type="button"
              className="group overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/80 text-left shadow-lg"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.42,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setActiveLook(look)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={look.image}
                  alt={look.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 text-white">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/70">
                      {look.piece}
                    </p>
                    <p className="mt-1 text-lg font-semibold">{look.name}</p>
                  </div>
                  <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/25 backdrop-blur-sm">
                    <Expand className="size-4" />
                  </span>
                </div>
              </div>
              <div className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Legende
                </p>
                <p className="text-sm text-muted-foreground">{look.caption}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeLook ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/82 p-4 backdrop-blur-lg"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${activeLook.name} - ${collectionTitle}`}
            onClick={() => setActiveLook(null)}
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              className="relative grid w-full max-w-6xl gap-6 overflow-hidden rounded-[2rem] bg-zinc-950 p-4 text-white lg:grid-cols-[1.15fr_0.85fr]"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Fermer la photo"
                className="focus-ring absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-black/30"
                onClick={() => setActiveLook(null)}
              >
                <X className="size-5" />
              </button>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-black/40">
                <Image
                  src={activeLook.image}
                  alt={activeLook.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
              <div className="flex flex-col justify-center gap-5 p-4 lg:p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
                  {collectionTitle}
                </p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/65">
                    {activeLook.piece}
                  </p>
                  <h3 className="mt-2 text-4xl font-semibold sm:text-5xl">
                    {activeLook.name}
                  </h3>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                    Legende
                  </p>
                  <p className="mt-3 text-base text-white/78">
                    {activeLook.caption}
                  </p>
                </div>
                <p className="text-sm text-white/58">{activeLook.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
