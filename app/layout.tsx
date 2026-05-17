import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BackToTop } from "@/components/shared/back-to-top";
import { FloatingActions } from "@/components/shared/floating-actions";
import { StructuredData } from "@/components/shared/structured-data";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = buildMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
  image: siteConfig.ogImage,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${cormorant.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <StructuredData
            data={{
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              url: siteConfig.url,
              description: siteConfig.description,
              logo: `${siteConfig.url}${siteConfig.ogImage}`,
              sameAs: siteConfig.socialLinks.map((item) => item.href),
              image: `${siteConfig.url}${siteConfig.ogImage}`,
              email: siteConfig.contact.email,
              telephone: siteConfig.contact.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lome",
                streetAddress: siteConfig.contact.address,
                addressCountry: "TG",
              },
            }}
          />
          <a href="#main-content" className="skip-link">
            Aller au contenu principal
          </a>
          <div className="relative flex min-h-screen flex-col overflow-x-clip bg-[radial-gradient(circle_at_top,_rgba(196,163,98,0.14),_transparent_30%),linear-gradient(180deg,_rgba(250,246,239,0.96),_rgba(255,255,255,1))]">
            <SiteHeader />
            <main id="main-content" className="flex-1 pt-20 md:pt-24">
              {children}
            </main>
            <SiteFooter />
            <FloatingActions />
            <BackToTop />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
