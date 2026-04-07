"use client";

import { useState } from "react";
import { ArrowLeft, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cities } from "@/data/cities";
import { createShipment } from "./actions";

const serviceOptions = [
  { value: "Angkutan", label: "Jasa Angkutan" },
  { value: "Pindahan", label: "Jasa Pindahan" },
];

const vehicleOptions = [
  { value: "pickup", label: "Pickup (1-1.5 Ton)" },
  { value: "box", label: "Box (2-4 Ton)" },
  { value: "truck", label: "Truck (5-8 Ton)" },
  { value: "fuso", label: "Fuso (8-15 Ton)" },
];

const cityOptions = cities.map((c) => ({ value: c.name, label: c.name }));

export default function NewOrderPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await createShipment(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div>
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Dashboard
      </Link>

      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Buat Order Baru
      </h1>

      <Card className="mx-auto max-w-2xl p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              id="sender"
              name="sender"
              label="Nama Pengirim"
              placeholder="Nama pengirim"
              required
            />
            <Input
              id="receiver"
              name="receiver"
              label="Nama Penerima"
              placeholder="Nama penerima"
              required
            />
          </div>

          <Input
            id="receiver_phone"
            name="receiver_phone"
            type="tel"
            label="No. Telepon Penerima"
            placeholder="08xx-xxxx-xxxx"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              id="origin"
              name="origin"
              label="Kota Asal"
              placeholder="Pilih kota asal"
              options={cityOptions}
              required
            />
            <Select
              id="destination"
              name="destination"
              label="Kota Tujuan"
              placeholder="Pilih kota tujuan"
              options={cityOptions}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              id="service"
              name="service"
              label="Jenis Layanan"
              placeholder="Pilih layanan"
              options={serviceOptions}
              required
            />
            <Select
              id="vehicle"
              name="vehicle"
              label="Jenis Armada"
              placeholder="Pilih armada"
              options={vehicleOptions}
              required
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
            {loading ? "Membuat order..." : "Buat Order"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
