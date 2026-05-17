"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Testimonial } from "@/types/site";

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

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
    <div className="max-w-full space-y-6 overflow-hidden">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#f4d28b]">
          <Quote className="size-4" />
          Clients prives
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Temoignage precedent"
            className="focus-ring inline-flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-[#f4d28b] hover:text-[#f4d28b]"
            onClick={previous}
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Temoignage suivant"
            className="focus-ring inline-flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:border-[#f4d28b] hover:text-[#f4d28b]"
            onClick={next}
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex max-w-full snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => {
          const active = index === activeIndex;

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
                "min-h-[14.5rem] w-[85%] max-w-full shrink-0 snap-center rounded-[1.6rem] border p-5 sm:w-[26rem] sm:p-6",
                active
                  ? "border-[#f4d28b]/40 bg-white text-zinc-950 shadow-2xl"
                  : "border-white/12 bg-white/8 text-white/88",
              ].join(" ")}
              onClick={() => setActiveIndex(index)}
            >
              <Quote
                className={
                  active ? "size-9 text-[#c9a24a]" : "size-9 text-[#f4d28b]"
                }
              />
              <blockquote className="mt-4 text-balance text-lg leading-relaxed sm:text-xl">
                “{compactQuote(item.quote)}”
              </blockquote>
              <div className="mt-5 border-t border-current/10 pt-4">
                <p className="text-base font-semibold">{item.name}</p>
                <p
                  className={[
                    "text-xs uppercase tracking-[0.24em]",
                    active ? "text-zinc-500" : "text-white/60",
                  ].join(" ")}
                >
                  {item.role}
                </p>
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
