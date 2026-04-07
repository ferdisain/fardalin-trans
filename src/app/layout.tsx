import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Fardalin Trans — Jasa Angkutan & Pindahan Cirebon",
    template: "%s | Fardalin Trans",
  },
  description:
    "Fardalin Trans — jasa pengiriman barang, angkutan, dan pindahan terpercaya dari Cirebon ke seluruh Indonesia. Aman, cepat, terpercaya. Layanan 24 jam.",
  keywords: [
    "jasa pengiriman barang cirebon",
    "jasa angkutan cirebon",
    "jasa pindahan cirebon",
    "ekspedisi cirebon",
    "fardalin trans",
    "logistik cirebon",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Fardalin Trans",
    title: "Fardalin Trans — Jasa Angkutan & Pindahan Cirebon",
    description:
      "Jasa pengiriman barang, angkutan, dan pindahan terpercaya dari Cirebon ke seluruh Indonesia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
