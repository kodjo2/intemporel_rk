"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getHashSectionId() {
  return window.location.hash.replace("#", "");
}

export function SiteHeader() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.dataset.menuOpen = open ? "true" : "false";
    return () => {
      document.body.dataset.menuOpen = "false";
    };
  }, [open]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = siteConfig.nav
      .map((item) => item.sectionId)
      .filter((sectionId): sectionId is string => Boolean(sectionId));

    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActiveSection = () => {
      const hashSectionId = getHashSectionId();
      const scrollAnchor = window.scrollY + 180;
      const reachedPageBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 24;

      if (window.scrollY < 120) {
        setActiveSection("home");
        return;
      }

      if (reachedPageBottom) {
        setActiveSection("contact");
        return;
      }

      const currentSection = sections.reduce((activeId, section) => {
        return section.offsetTop <= scrollAnchor ? section.id : activeId;
      }, "home");

      if (hashSectionId && sectionIds.includes(hashSectionId)) {
        const hashSection = document.getElementById(hashSectionId);

        if (
          hashSection &&
          Math.abs(hashSection.getBoundingClientRect().top) < 220
        ) {
          setActiveSection(hashSectionId);
          return;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  const isActiveItem = (href: string, sectionId?: string) => {
    if (pathname === "/" && sectionId) {
      return activeSection === sectionId;
    }

    return isActivePath(pathname, href);
  };

  const handleSectionNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId?: string,
  ) => {
    if (pathname !== "/" || !sectionId) {
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", href);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(sectionId);
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-white/10 bg-[rgba(12,12,12,0.82)] text-white backdrop-blur-xl">
        <div className="container-luxe flex min-h-10 flex-wrap items-center justify-between gap-2 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/74">
          <p>Production sur mesure, vente et series limitees</p>
          <p>Lome • Atelier non ouvert au public • Livraison sur demande</p>
        </div>
      </div>
      <div className="container-luxe pt-3">
        <div
          className={cn(
            "flex min-h-16 items-center justify-between rounded-[2rem] px-4 transition-all duration-300 md:px-6",
            scrolled
              ? "glass-panel-strong border border-border/70 shadow-[0_20px_80px_rgba(0,0,0,0.16)]"
              : "border border-white/10 bg-[rgba(255,248,241,0.78)] shadow-[0_18px_70px_rgba(0,0,0,0.08)] backdrop-blur-xl",
          )}
        >
          <Link
            href="/"
            className="focus-ring flex items-center gap-3 rounded-full px-2 py-2"
            aria-label={`Retour a l'accueil ${siteConfig.name}`}
          >
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-xs font-bold tracking-[0.3em] text-accent">
              {siteConfig.shortName.slice(0, 2).toUpperCase()}
            </span>
            <span>
              <span className="block font-heading text-2xl font-semibold leading-none">
                {siteConfig.shortName}
              </span>
              <span className="block text-[0.62rem] uppercase tracking-[0.32em] text-muted-foreground">
                Production & vente
              </span>
            </span>
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-1 lg:flex"
          >
            {siteConfig.nav.map((item) => {
              const active = isActiveItem(item.href, item.sectionId);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) =>
                    handleSectionNavigation(event, item.href, item.sectionId)
                  }
                  className={cn(
                    "focus-ring rounded-full px-4 py-2 text-sm font-medium transition",
                    active
                      ? "bg-foreground text-background"
                      : "text-foreground/80 hover:bg-card hover:text-foreground",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden rounded-full border border-border/70 bg-background/80 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground xl:block">
              Reponse sous 24h
            </div>
            <Link
              href="/collections"
              className="focus-ring hidden min-h-11 items-center rounded-full border border-border/70 bg-background/80 px-5 text-sm font-medium transition hover:border-accent hover:text-accent lg:inline-flex"
            >
              Catalogue
            </Link>
            <Link
              href="/contact"
              className="focus-ring hidden min-h-11 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:bg-accent lg:inline-flex"
            >
              Commander
            </Link>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-card/80 lg:hidden"
              onClick={() => setOpen((current) => !current)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -24 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="container-luxe mt-3 lg:hidden"
          >
            <div className="glass-panel-strong rounded-[2rem] px-5 py-5">
              <nav aria-label="Navigation mobile" className="grid gap-2">
                {siteConfig.nav.map((item) => {
                  const active = isActiveItem(item.href, item.sectionId);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={(event) =>
                        handleSectionNavigation(
                          event,
                          item.href,
                          item.sectionId,
                        )
                      }
                      className={cn(
                        "focus-ring min-h-12 rounded-2xl px-4 py-3 text-base font-medium transition",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-background/75 hover:bg-muted",
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  className="focus-ring inline-flex min-h-12 items-center justify-center rounded-2xl bg-primary px-4 py-3 text-base font-medium text-primary-foreground transition hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  Commander
                </Link>
                <div className="mt-2 rounded-[1.5rem] border border-border/60 bg-background/70 p-4 text-sm text-muted-foreground">
                  Pieces visibles, demande directe et confirmation avant
                  production.
                </div>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
