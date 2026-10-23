import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Geerams Cleaning Services",
    short_name: "Geerams Cleaning Services",
    description: "Cleaning chemicals and bulk hygiene supplies from Geerams Cleaning Services in Kanye, Botswana.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A3B8B",
    theme_color: "#1A3B8B",
    orientation: "portrait-primary",
    lang: "en",
    categories: ["business", "productivity"],
    icons: [
      { src: "/facilities-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/facilities-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "maskable" }
    ]
  };
}
