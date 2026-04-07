"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { OngkirResult } from "@/components/features/ongkir-result";
import { cities } from "@/data/cities";
import { fleets } from "@/data/services";
import { getOngkirEstimate } from "@/data/dummy-ongkir";
import type { OngkirRate } from "@/types";

export function OngkirForm() {
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    weight: "",
    vehicle: "",
  });
  const [result, setResult] = useState<OngkirRate | null>(null);
  const [formData, setFormData] = useState<typeof form | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const estimate = getOngkirEstimate(
      form.origin,
      form.destination,
      form.vehicle,
      Number(form.weight)
    );
    setResult(estimate);
    setFormData({ ...form });
  }

  const cityOptions = cities.map((c) => ({ value: c.id, label: c.name }));
  const fleetOptions = fleets.map((f) => ({
    value: f.id,
    label: `${f.name} (${f.capacity})`,
  }));

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Select
            id="origin"
            label="Kota Asal"
            placeholder="Pilih kota asal"
            options={cityOptions}
            value={form.origin}
            onChange={(e) => setForm((p) => ({ ...p, origin: e.target.value }))}
            required
          />
          <Select
            id="destination"
            label="Kota Tujuan"
            placeholder="Pilih kota tujuan"
            options={cityOptions}
            value={form.destination}
            onChange={(e) =>
              setForm((p) => ({ ...p, destination: e.target.value }))
            }
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            id="weight"
            type="number"
            label="Berat Barang (kg)"
            placeholder="Contoh: 50"
            min="1"
            value={form.weight}
            onChange={(e) => setForm((p) => ({ ...p, weight: e.target.value }))}
            required
          />
          <Select
            id="vehicle"
            label="Jenis Armada"
            placeholder="Pilih armada"
            options={fleetOptions}
            value={form.vehicle}
            onChange={(e) =>
              setForm((p) => ({ ...p, vehicle: e.target.value }))
            }
            required
          />
        </div>
        <Button type="submit" size="lg" className="w-full">
          <Calculator className="h-5 w-5" />
          Cek Harga Sekarang
        </Button>
      </form>

      {result && formData && (
        <OngkirResult
          rate={result}
          origin={
            cities.find((c) => c.id === formData.origin)?.name ?? formData.origin
          }
          destination={
            cities.find((c) => c.id === formData.destination)?.name ??
            formData.destination
          }
          weight={Number(formData.weight)}
          vehicleName={
            fleets.find((f) => f.id === formData.vehicle)?.name ??
            formData.vehicle
          }
        />
      )}
    </div>
  );
}
