import type { Metadata } from "next";
import Link from "next/link";
import { Truck, PackageOpen, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FleetShowcase } from "@/components/sections/fleet-showcase";
import { CTABanner } from "@/components/sections/cta-banner";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan jasa angkutan dan pindahan Fardalin Trans. Armada lengkap: Pickup, Box, Truck, Fuso. Melayani pengiriman ke seluruh Indonesia.",
};

const iconMap: Record<string, React.ReactNode> = {
  Truck: <Truck className="h-10 w-10" />,
  PackageOpen: <PackageOpen className="h-10 w-10" />,
};

export default function LayananPage() {
  return (
    <>
      <PageHeader
        title="Layanan Kami"
        description="Solusi pengiriman lengkap untuk segala kebutuhan — dari barang ringan hingga pindahan besar."
        breadcrumbs={[{ label: "Layanan" }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <Card key={service.slug} hover className="p-8">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  {iconMap[service.icon]}
                </div>
                <h2 className="mb-3 text-2xl font-bold text-gray-900">
                  {service.title}
                </h2>
                <p className="mb-6 leading-relaxed text-gray-600">
                  {service.description}
                </p>

                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Termasuk:
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {service.fleet.map((f) => (
                    <Badge key={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</Badge>
                  ))}
                </div>

                <Link
                  href={`/layanan/${service.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  Lihat Detail
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <FleetShowcase />
      <CTABanner />
    </>
  );
}
