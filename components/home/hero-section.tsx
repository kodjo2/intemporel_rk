"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduceMotion ? "0%" : "14%"],
  );

  return (
    <section
      ref={ref}
      className="relative isolate min-h-[92vh] overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="/images/hero-couture.jpeg"
          alt="Silhouette couture haut de gamme portant un large chapeau turquoise et une robe graphique orange, noire et bleue, photographiée sur fond orange lumineux."
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.58)_55%,rgba(0,0,0,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(196,163,98,0.28),_transparent_34%)]" />

      <div className="container-luxe relative flex min-h-[92vh] items-end pb-14 pt-36 sm:pb-18 sm:pt-40 lg:pb-20 lg:pt-44">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-white"
        >
          <h1 className="text-balance font-heading text-5xl font-semibold leading-[0.92] sm:text-6xl md:text-7xl lg:text-[6rem]">
            Couture haut de gamme, ligne pure.
          </h1>
          <p className="mt-5 max-w-xl text-balance text-sm text-white/76 sm:text-base lg:text-lg">
            Pieces sur mesure et rendez-vous prives pour une allure rare, nette
            et contemporaine.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-accent"
            >
              Reserver une consultation
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
