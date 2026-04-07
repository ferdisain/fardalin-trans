import type { Metadata } from "next";
import { Eye, Target, RefreshCw, Network, Shield, Zap } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { CTABanner } from "@/components/sections/cta-banner";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali Fardalin Trans — perusahaan pengiriman barang dan jasa pindahan terpercaya dari Cirebon. Aman, cepat, terpercaya.",
};

const values = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fast Delivery",
    description: "Pengiriman cepat dan tepat waktu ke seluruh Indonesia.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Safe & Guaranteed",
    description: "Keamanan barang terjamin dengan asuransi pengiriman.",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Stay Current",
    description:
      "Selalu mengikuti perkembangan terbaru dan dapat diandalkan dalam mengatasi pengiriman barang.",
  },
  {
    icon: <Network className="h-6 w-6" />,
    title: "Network",
    description:
      "Armada kendaraan perusahaan iterhubung dalam jaringan operasional untuk menjalankan pengiriman dengan efisien.",
  },
];

const timeline = [
  {
    year: "Awal Mula",
    title: "Fardalin Trans Berdiri",
    description:
      "Dimulai dari Cirebon dengan satu armada pickup, melayani pengiriman lokal.",
  },
  {
    year: "Berkembang",
    title: "Ekspansi Armada",
    description:
      "Menambah armada Box, Truck, dan Fuso untuk melayani kebutuhan pengiriman yang lebih besar.",
  },
  {
    year: "Saat Ini",
    title: "Melayani Seluruh Indonesia",
    description:
      "Kini melayani pengiriman ke seluruh Indonesia dengan layanan 24 jam dan ribuan pelanggan puas.",
  },
];

export default function TentangKamiPage() {
  return (
    <>
      <PageHeader
        title="Tentang Kami"
        description="Mengenal lebih dekat Fardalin Trans — partner pengiriman terpercaya Anda."
        breadcrumbs={[{ label: "Tentang Kami" }]}
      />

      {/* Company Profile */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 lg:text-4xl">
              Get to Know Fardalin Trans
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-600">
              <p>
                <strong className="text-gray-900">Fardalin Trans</strong> adalah
                perusahaan pengiriman barang (logistik) berkualitas tinggi bertemu
                dengan dedikasi tanpa kompromi. Kami hadir untuk memudahkan setiap
                pengiriman, menjaga keamanan barang, dan memberikan pengalaman
                kirim yang cepat dan nyaman.
              </p>
              <p>
                Dengan layanan kami, Anda bisa santai tanpa drama, karena
                kepercayaan Anda adalah prioritas utama. Berbasis di Cirebon,
                kami melayani pengiriman ke seluruh Indonesia dengan armada lengkap
                dan tim yang berpengalaman.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Visi & Misi */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2">
            <Card className="border-l-4 border-l-brand-600">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Visi</h3>
              </div>
              <p className="leading-relaxed text-gray-600">
                Menjadi perusahaan logistik terpercaya dan terdepan di Indonesia
                yang mengutamakan keamanan, kecepatan, dan kepuasan pelanggan.
              </p>
            </Card>
            <Card className="border-l-4 border-l-gold-500">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-600">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Misi</h3>
              </div>
              <ul className="space-y-2 leading-relaxed text-gray-600">
                <li>• Memberikan layanan pengiriman yang cepat dan aman</li>
                <li>• Menyediakan armada lengkap dan terawat</li>
                <li>• Mengutamakan kepuasan dan kepercayaan pelanggan</li>
                <li>• Menjangkau seluruh Indonesia dengan harga kompetitif</li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
            Prinsip Kami
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title} hover className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  {value.icon}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Perjalanan Kami
          </h2>
          <div className="mx-auto max-w-2xl">
            <div className="relative border-l-2 border-brand-200 pl-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative mb-10 last:mb-0">
                  <div className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-600 bg-white">
                    <div className="h-2 w-2 rounded-full bg-brand-600" />
                  </div>
                  <span className="text-sm font-semibold text-brand-600">
                    {item.year}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
