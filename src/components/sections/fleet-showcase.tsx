import { Car, Package, Truck, Container as ContainerIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fleets } from "@/data/services";

const iconMap: Record<string, React.ReactNode> = {
  Car: <Car className="h-8 w-8" />,
  Package: <Package className="h-8 w-8" />,
  Truck: <Truck className="h-8 w-8" />,
  Container: <ContainerIcon className="h-8 w-8" />,
};

export function FleetShowcase() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Mau kirim barang tapi masih bingung pilih armada?
          </p>
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Pilih Armada Sesuai Kebutuhan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Pilih sesuai kebutuhan, kami siap kirim kapan aja!
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleets.map((fleet, index) => (
            <Card key={fleet.id} hover className={`text-center stagger-${index + 1}`}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                {iconMap[fleet.icon]}
              </div>
              <h3 className="mb-1 text-xl font-bold text-gray-900">
                {fleet.name}
              </h3>
              <Badge className="mb-3">{fleet.capacity}</Badge>
              <p className="mb-3 text-sm text-gray-600">{fleet.description}</p>
              <p className="text-xs text-gray-500">
                <span className="font-medium">Cocok untuk:</span>{" "}
                {fleet.suitable}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
