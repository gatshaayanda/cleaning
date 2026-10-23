import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Facilities",
    short_name: "Facilities",
    description: "Facilities management and maintenance in Botswana for commercial properties, offices, schools, retail and hospitality sites.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f766e",
    theme_color: "#0f766e",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["business", "productivity"],
    icons: [
      { src: "/facilities-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/facilities-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }
    ]
  };
}
