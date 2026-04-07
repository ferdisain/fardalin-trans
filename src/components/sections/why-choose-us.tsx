import { Zap, Shield, Award, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";

const usps = [
  {
    icon: <Zap className="h-7 w-7" />,
    title: "Pengiriman Cepat",
    description:
      "Sampai tujuan tanpa tunggu lama, barang sampai sebelum kamu sempat khawatir.",
  },
  {
    icon: <Shield className="h-7 w-7" />,
    title: "Keamanan Terjamin",
    description:
      "Barang aman, hati tenang. Dijaga sampai tujuan. Zero worry delivery.",
  },
  {
    icon: <Award className="h-7 w-7" />,
    title: "Terbukti Terpercaya",
    description:
      "Dipilih ribuan pelanggan dengan pengiriman yang bisa diandalkan.",
  },
  {
    icon: <Clock className="h-7 w-7" />,
    title: "Layanan 24 Jam",
    description:
      "Kapan saja, kami selalu siap jalan. Siang malam tetap jalan.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand-600 py-16 lg:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-200">
            Lebih dari sekedar jasa angkutan
          </p>
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            Kenapa Harus Pilih Fardalin Trans?
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((usp, index) => (
            <div
              key={usp.title}
              className={`rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all duration-[200ms] ease-[var(--ease-out-expo)] hover:bg-white/15 stagger-${index + 1}`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                {usp.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{usp.title}</h3>
              <p className="text-sm leading-relaxed text-brand-100">
                {usp.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
