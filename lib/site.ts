import type { NavItem } from "@/types/site";

export const siteConfig = {
  name: "INTEMPOREL",
  shortName: "INTEMPOREL",
  description:
    "Maison de mode et couture haut de gamme. Pieces sur mesure, silhouettes signatures et experiences privees pour une clientele exigeante.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://romarice-couture.vercel.app",
  ogImage: "/images/hero-couture.jpeg",
  nav: [
    { href: "/#home", label: "Accueil", sectionId: "home" },
    { href: "/#about", label: "A propos", sectionId: "about" },
    {
      href: "/#collections",
      label: "Collections",
      sectionId: "collections",
    },
    { href: "/#services", label: "Services", sectionId: "services" },
    { href: "/#gallery", label: "Galerie", sectionId: "gallery" },
    {
      href: "/#testimonials",
      label: "Temoignages",
      sectionId: "testimonials",
    },
    { href: "/#contact", label: "Contact", sectionId: "contact" },
  ] satisfies NavItem[],
  contact: {
    email: "intemporel.rk@gmail.com",
    phone: "+228 70049090",
    address: "Lome, Togo",
    hours: "Lun - Sam, 10h00 - 19h30",
  },
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Pinterest", href: "https://pinterest.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
};

export function absoluteUrl(path: string) {
  return new URL(path, siteConfig.url).toString();
}
