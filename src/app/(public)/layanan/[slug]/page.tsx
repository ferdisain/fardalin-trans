import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Truck, PackageOpen, Check, ArrowRight, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { CTABanner } from "@/components/sections/cta-banner";
import { services, fleets } from "@/data/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = services.find((s) => s.slug === slug);
    if (!service) return { title: "Layanan Tidak Ditemukan" };
    return {
      title: service.title,
      description: service.description,
    };
  });
}

const iconMap: Record<string, React.ReactNode> = {
  Truck: <Truck className="h-10 w-10" />,
  PackageOpen: <PackageOpen className="h-10 w-10" />,
};

export default async function LayananDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const serviceFleets = fleets.filter((f) => service.fleet.includes(f.id));

  return (
    <>
      <PageHeader
        title={service.title}
        description={service.description}
        breadcrumbs={[
          { label: "Layanan", href: "/layanan" },
          { label: service.title },
        ]}
      />

      {/* Service Details */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                {iconMap[service.icon]}
              </div>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Apa yang Termasuk?
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 rounded-lg bg-brand-50 px-4 py-3"
                  >
                    <Check className="h-5 w-5 shrink-0 text-brand-600" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fleet for this service */}
            <div className="mb-12">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Armada Tersedia
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {serviceFleets.map((fleet) => (
                  <Card key={fleet.id} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Truck className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{fleet.name}</h3>
                        <Badge>{fleet.capacity}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {fleet.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-brand-50 text-center">
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Tertarik dengan {service.title}?
              </h3>
              <p className="mb-6 text-gray-600">
                Cek ongkir atau langsung hubungi kami untuk konsultasi gratis.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/cek-ongkir" variant="primary" size="md">
                  Cek Ongkir
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink
                  href="https://wa.me/62811242787"
                  variant="whatsapp"
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp Kami
                </ButtonLink>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      <CTABanner />
    </>
  );
}
