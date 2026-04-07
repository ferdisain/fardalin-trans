import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { OngkirForm } from "@/components/features/ongkir-form";

export const metadata: Metadata = {
  title: "Cek Ongkir",
  description:
    "Cek ongkos kirim pengiriman barang dari Cirebon ke seluruh Indonesia. Fardalin Trans — jasa angkutan dan pindahan terpercaya.",
};

export default function CekOngkirPage() {
  return (
    <>
      <PageHeader
        title="Cek Ongkir"
        description="Hitung estimasi biaya pengiriman barang Anda dengan mudah."
        breadcrumbs={[{ label: "Cek Ongkir" }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Card className="p-6 lg:p-8">
              <OngkirForm />
            </Card>

            <div className="mt-8 rounded-2xl bg-brand-50 p-6">
              <h3 className="mb-3 font-bold text-gray-900">Cara Cek Ongkir:</h3>
              <ol className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    1
                  </span>
                  Pilih kota asal dan tujuan pengiriman
                </li>
                <li className="flex gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    2
                  </span>
                  Masukkan berat barang dalam kilogram
                </li>
                <li className="flex gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    3
                  </span>
                  Pilih jenis armada yang sesuai
                </li>
                <li className="flex gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    4
                  </span>
                  Klik &ldquo;Cek Harga Sekarang&rdquo; untuk melihat estimasi
                </li>
              </ol>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
