"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addTrackingEvent } from "./actions";

const predefinedStatuses = [
  { value: "Barang diterima di gudang", label: "Barang diterima di gudang" },
  {
    value: "Barang sedang dimuat ke armada",
    label: "Barang sedang dimuat ke armada",
  },
  { value: "Barang dalam perjalanan", label: "Barang dalam perjalanan" },
  { value: "Transit di gudang", label: "Transit di gudang [kota]" },
  {
    value: "Barang tiba di gudang tujuan",
    label: "Barang tiba di gudang tujuan",
  },
  {
    value: "Barang sedang diantar ke penerima",
    label: "Barang sedang diantar ke penerima",
  },
  {
    value: "Barang diterima oleh penerima",
    label: "Barang diterima oleh penerima (SELESAI)",
  },
  { value: "custom", label: "Lainnya (tulis sendiri)" },
];

interface UpdateStatusFormProps {
  shipmentId: string;
  destination: string;
}

export function UpdateStatusForm({
  shipmentId,
  destination,
}: UpdateStatusFormProps) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [customStatus, setCustomStatus] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const status =
      selectedStatus === "custom" ? customStatus : selectedStatus;

    if (!status) {
      setError("Pilih status terlebih dahulu.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("shipmentId", shipmentId);
    formData.set("status", status);
    formData.set("location", location || destination);

    const result = await addTrackingEvent(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      // Reset form
      setSelectedStatus("");
      setCustomStatus("");
      setLocation("");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        id="status"
        label="Status"
        placeholder="Pilih status baru"
        options={predefinedStatuses}
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        required
      />

      {selectedStatus === "custom" && (
        <Input
          id="customStatus"
          label="Status Custom"
          placeholder="Tulis status..."
          value={customStatus}
          onChange={(e) => setCustomStatus(e.target.value)}
          required
        />
      )}

      <Input
        id="location"
        label="Lokasi"
        placeholder={`Contoh: ${destination}`}
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <Button type="submit" size="md" className="w-full" disabled={loading}>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
        {loading ? "Menambah..." : "Tambah Status"}
      </Button>

      {selectedStatus === "Barang diterima oleh penerima" && (
        <p className="rounded-lg bg-yellow-50 px-3 py-2 text-xs text-yellow-700">
          Status ini akan menandai pengiriman sebagai <strong>selesai</strong>.
        </p>
      )}
    </form>
  );
}
