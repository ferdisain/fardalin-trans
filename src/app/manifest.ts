import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fardalin Trans — Jasa Angkutan & Pindahan",
    short_name: "Fardalin Trans",
    description:
      "Jasa pengiriman barang, angkutan, dan pindahan terpercaya dari Cirebon ke seluruh Indonesia.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f2",
    theme_color: "#006b3f",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["business", "logistics"],
    lang: "id",
  };
}
