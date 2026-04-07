import Link from "next/link";
import { Phone, MapPin, Clock, Camera } from "lucide-react";
import { Container } from "@/components/ui/container";

const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Cek Ongkir", href: "/cek-ongkir" },
  { label: "Tracking", href: "/tracking" },
  { label: "FAQ", href: "/faq" },
];

const serviceLinks = [
  { label: "Jasa Angkutan", href: "/layanan/angkutan" },
  { label: "Jasa Pindahan", href: "/layanan/pindahan" },
];

export function Footer() {
  return (
    <footer className="bg-brand-800 text-white">
      <Container className="py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white font-bold text-brand-700">
                FT
              </div>
              <div>
                <p className="text-lg font-bold leading-tight">Fardalin</p>
                <p className="text-xs font-medium leading-tight text-brand-200">
                  Trans
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-brand-200">
              Perusahaan pengiriman barang (logistik) berkualitas tinggi bertemu
              dengan dedikasi tanpa kompromi.
            </p>
            <p className="text-sm font-semibold italic text-gold-400">
              &ldquo;Move It Fast!&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-200">
              Menu
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-200">
              Layanan
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-brand-100 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <p className="text-xs font-medium text-brand-300">Armada:</p>
                <p className="text-sm text-brand-100">
                  Pickup, Box, Truck, Fuso
                </p>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-200">
              Kontak
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <div className="text-sm text-brand-100">
                  <p>0811-242-787</p>
                  <p>0859-7317-2219</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <p className="text-sm text-brand-100">
                  Griya Cempaka Arum D.626, Cirebon 45171
                </p>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <p className="text-sm text-brand-100">Layanan 24 Jam</p>
              </li>
              <li className="flex items-start gap-2.5">
                <Camera className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <a
                  href="https://instagram.com/fardalin.trans"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-100 transition-colors hover:text-white"
                >
                  @fardalin.trans
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-brand-700">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 sm:flex-row">
          <p className="text-xs text-brand-300">
            &copy; {new Date().getFullYear()} Fardalin Trans. All rights reserved.
          </p>
          <p className="text-xs text-brand-400">
            Aman &middot; Cepat &middot; Terpercaya
          </p>
        </Container>
      </div>
    </footer>
  );
}
