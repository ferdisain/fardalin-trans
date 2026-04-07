import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { CustomerHistoryForm } from "./customer-history-form";

export const metadata: Metadata = {
  title: "Riwayat Pengiriman",
  description:
    "Lihat riwayat semua pengiriman Anda di Fardalin Trans. Masukkan nama atau nomor telepon Anda.",
};

export default function RiwayatPage() {
  return (
    <>
      <PageHeader
        title="Riwayat Pengiriman"
        description="Lihat semua riwayat pengiriman Anda di Fardalin Trans."
        breadcrumbs={[{ label: "Riwayat" }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl">
            <Card className="p-6 lg:p-8">
              <CustomerHistoryForm />
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
