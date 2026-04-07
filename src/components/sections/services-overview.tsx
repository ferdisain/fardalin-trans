import Link from "next/link";
import { Truck, PackageOpen, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { services } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Truck: <Truck className="h-8 w-8" />,
  PackageOpen: <PackageOpen className="h-8 w-8" />,
};

export function ServicesOverview() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Layanan Kami
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Solusi pengiriman lengkap untuk segala kebutuhan Anda
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
            <Link key={service.slug} href={`/layanan/${service.slug}`}>
              <Card hover className={`h-full stagger-${index + 1}`}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  {iconMap[service.icon]}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="mb-4 text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex items-center gap-1 text-sm font-semibold text-brand-600">
                  Selengkapnya
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
