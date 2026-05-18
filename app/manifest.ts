import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "INTEMPOREL",
    short_name: "INTEMPOREL",
    description: "Production sur mesure et vente de pieces feminines.",
    start_url: "/",
    display: "standalone",
    background_color: "#090909",
    theme_color: "#101010",
    lang: "fr-TG",
  };
}
