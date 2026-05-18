import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.url),
    title,
    description,
    keywords: [
      "production sur mesure",
      "vente de robes",
      "mode femme togo",
      "commande de vetements",
      "collection femme",
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1469,
          height: 920,
          alt: "Modele feminin presente dans le catalogue INTEMPOREL.",
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    category: "fashion",
  };
}
