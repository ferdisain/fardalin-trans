"use client";

import { useState } from "react";
import { Pencil, Loader2, X, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cities } from "@/data/cities";
import { updateShipment } from "./actions";

const serviceOptions = [
  { value: "Angkutan", label: "Jasa Angkutan" },
  { value: "Pindahan", label: "Jasa Pindahan" },
];

const vehicleOptions = [
  { value: "pickup", label: "Pickup" },
  { value: "box", label: "Box" },
  { value: "truck", label: "Truck" },
  { value: "fuso", label: "Fuso" },
];

const cityOptions = cities.map((c) => ({ value: c.name, label: c.name }));

interface EditOrderFormProps {
  shipment: {
    id: string;
    sender: string;
    receiver: string;
    origin: string;
    destination: string;
    service: string;
    vehicle: string;
  };
}

export function EditOrderForm({ shipment }: EditOrderFormProps) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.set("shipmentId", shipment.id);
    const result = await updateShipment(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setEditing(false);
    }
    setLoading(false);
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit Order
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input
          id="sender"
          name="sender"
          label="Pengirim"
          defaultValue={shipment.sender}
          required
        />
        <Input
          id="receiver"
          name="receiver"
          label="Penerima"
          defaultValue={shipment.receiver}
          required
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Select
          id="origin"
          name="origin"
          label="Asal"
          options={cityOptions}
          defaultValue={shipment.origin}
          required
        />
        <Select
          id="destination"
          name="destination"
          label="Tujuan"
          options={cityOptions}
          defaultValue={shipment.destination}
          required
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Select
          id="service"
          name="service"
          label="Layanan"
          options={serviceOptions}
          defaultValue={shipment.service}
          required
        />
        <Select
          id="vehicle"
          name="vehicle"
          label="Armada"
          options={vehicleOptions}
          defaultValue={shipment.vehicle}
          required
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex gap-2">
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setEditing(false);
            setError("");
          }}
        >
          <X className="h-4 w-4" />
          Batal
        </Button>
      </div>
    </form>
  );
}
