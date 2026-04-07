import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 -left-20 h-72 w-72 rounded-full bg-gold-400 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-brand-400 blur-3xl" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100 backdrop-blur-sm animate-fade-up">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Layanan 24 Jam — Siap Melayani Kapan Saja
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-up stagger-2">
            Move It Fast
            <br />
            <span className="text-gold-400">With Fardalin Trans</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-100 animate-fade-up stagger-3">
            Jasa angkutan &amp; pindahan terpercaya dari Cirebon ke seluruh
            Indonesia. Pengiriman cepat, tepat, aman, sampai tujuan!
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up stagger-4">
            <ButtonLink href="/cek-ongkir" variant="secondary" size="lg">
              Cek Ongkir
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink
              href="https://wa.me/62811242787"
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="h-5 w-5" />
              Hubungi via WhatsApp
            </ButtonLink>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-brand-200 animate-fade-up stagger-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚚</span>
              <span>4 Jenis Armada</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span>Asuransi Barang</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span>Terbukti Terpercaya</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
