import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { TrackingForm } from "@/components/features/tracking-form";

export const metadata: Metadata = {
  title: "Lacak Pengiriman",
  description:
    "Lacak status pengiriman barang Anda secara real-time. Masukkan nomor resi untuk melihat posisi terkini.",
};

export default function TrackingPage() {
  return (
    <>
      <PageHeader
        title="Lacak Pengiriman"
        description="Pantau status pengiriman barang Anda secara real-time."
        breadcrumbs={[{ label: "Tracking" }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Card className="p-6 lg:p-8">
              <TrackingForm />
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
