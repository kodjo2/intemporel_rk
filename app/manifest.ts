import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "INTEMPOREL",
    short_name: "INTEMPOREL",
    description: "Maison de mode et couture haut de gamme.",
    start_url: "/",
    display: "standalone",
    background_color: "#090909",
    theme_color: "#101010",
    lang: "fr-TG",
  };
}
