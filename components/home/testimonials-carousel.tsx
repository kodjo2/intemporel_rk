"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Testimonial } from "@/types/site";

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

const reviewImages = [
  "/images/OIP (11).webp",
  "/images/OPEC.jpeg",
  "/images/th.jpeg",
  "/images/eaa7687c724ec4216fa5c4b5bae1c7ad.jpg",
];

export function TestimonialsCarousel({ items }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const activeCard = cardRefs.current[activeIndex];

    if (!activeCard) {
      return;
    }

    activeCard.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex, reduceMotion]);

  const compactQuote = (quote: string) => {
    if (quote.length <= 112) {
      return quote;
    }

    return `${quote.slice(0, 109).trimEnd()}...`;
  };

  const previous = () =>
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  const next = () => setActiveIndex((current) => (current + 1) % items.length);

  return (
    <div className="max-w-full space-y-4 overflow-hidden">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#f4d28b] sm:text-xs">
            Customer Reviews
          </p>
          <div className="flex flex-wrap items-center gap-3 text-white">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-3.5 fill-[#f4d28b] text-[#f4d28b]"
                />
              ))}
            </div>
            <p className="text-base font-semibold">4.8/5</p>
            <p className="text-xs text-white/70 sm:text-sm">
              Base sur {items.length} avis verifies
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Temoignage precedent"
            className="focus-ring inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-[#f4d28b] hover:text-[#f4d28b]"
            onClick={previous}
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Temoignage suivant"
            className="focus-ring inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-[#f4d28b] hover:text-[#f4d28b]"
            onClick={next}
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex max-w-full snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => {
          const active = index === activeIndex;
          const reviewImage = reviewImages[index % reviewImages.length];

          return (
            <motion.article
              key={item.name}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={[
                "w-[72%] max-w-full shrink-0 snap-center rounded-[1.4rem] border p-3.5 sm:w-[15rem] sm:p-4",
                active
                  ? "border-[#f4d28b]/40 bg-white text-zinc-950 shadow-2xl"
                  : "border-white/12 bg-white/8 text-white/88 backdrop-blur-sm",
              ].join(" ")}
              onClick={() => setActiveIndex(index)}
            >
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className={[
                          "size-3",
                          active
                            ? "fill-[#c9a24a] text-[#c9a24a]"
                            : "fill-[#f4d28b] text-[#f4d28b]",
                        ].join(" ")}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-balance text-sm leading-relaxed sm:text-[0.95rem]">
                    “{compactQuote(item.quote)}”
                  </blockquote>
                  <div className="mt-4 border-t border-current/10 pt-3">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p
                      className={[
                        "text-[0.65rem] uppercase tracking-[0.22em]",
                        active ? "text-zinc-500" : "text-white/60",
                      ].join(" ")}
                    >
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center pt-1">
                  <div className="relative size-24 overflow-hidden rounded-[50%] border border-current/10 bg-black/10 sm:size-28">
                    <Image
                      src={reviewImage}
                      alt={`Visuel associe au temoignage de ${item.name}.`}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div className="flex gap-2">
        {items.map((item, index) => (
          <button
            key={item.name}
            type="button"
            aria-label={`Afficher le temoignage ${index + 1}`}
            aria-pressed={index === activeIndex}
            className={[
              "focus-ring h-2.5 rounded-full transition-all",
              index === activeIndex
                ? "w-10 bg-[#f4d28b]"
                : "w-2.5 bg-white/28 hover:bg-white/45",
            ].join(" ")}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
