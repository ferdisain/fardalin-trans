import { MapPin, Weight, Truck, Clock, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import type { OngkirRate } from "@/types";

interface OngkirResultProps {
  rate: OngkirRate;
  origin: string;
  destination: string;
  weight: number;
  vehicleName: string;
}

export function OngkirResult({
  rate,
  origin,
  destination,
  weight,
  vehicleName,
}: OngkirResultProps) {
  const waMessage = `Halo Fardalin Trans, saya ingin mengirim barang:\n\nAsal: ${origin}\nTujuan: ${destination}\nBerat: ${weight} kg\nArmada: ${vehicleName}\n\nMohon info harga pastinya. Terima kasih!`;

  return (
    <Card className="mt-6 border-brand-200 bg-brand-50 animate-fade-up">
      <h3 className="mb-4 text-lg font-bold text-gray-900">Estimasi Ongkir</h3>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4 text-brand-600" />
          <span>
            {origin} → {destination}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Weight className="h-4 w-4 text-brand-600" />
          <span>{weight} kg</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="h-4 w-4 text-brand-600" />
          <span>{vehicleName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4 text-brand-600" />
          <span>
            {rate.estimatedDays.min}-{rate.estimatedDays.max} hari
          </span>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-white p-4 text-center">
        <p className="text-sm text-gray-500">Estimasi Biaya</p>
        <p className="text-2xl font-bold text-brand-700">
          {formatCurrency(rate.price.min)} - {formatCurrency(rate.price.max)}
        </p>
      </div>

      <ButtonLink
        href={`https://wa.me/62811242787?text=${encodeURIComponent(waMessage)}`}
        variant="whatsapp"
        size="md"
        className="w-full"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Phone className="h-4 w-4" />
        Pesan Sekarang via WhatsApp
      </ButtonLink>

      <p className="mt-3 text-center text-xs text-gray-500">
        * Harga estimasi. Hubungi kami untuk harga pasti.
      </p>
    </Card>
  );
}
