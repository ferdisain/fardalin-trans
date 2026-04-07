import { Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="bg-gradient-to-r from-brand-700 to-brand-900 py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            Siap Kirim Barang Anda?
          </h2>
          <p className="mt-4 text-lg text-brand-100">
            Hubungi kami sekarang untuk konsultasi gratis dan penawaran harga
            terbaik. Kami siap melayani 24 jam!
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink
              href="https://wa.me/62811242787?text=Halo%20Fardalin%20Trans%2C%20saya%20ingin%20konsultasi%20pengiriman."
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="h-5 w-5" />
              WhatsApp Kami
            </ButtonLink>
            <ButtonLink href="/cek-ongkir" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-700">
              Cek Ongkir Dulu
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-brand-200">
            <span>📞 0811-242-787</span>
            <span>📞 0859-7317-2219</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
