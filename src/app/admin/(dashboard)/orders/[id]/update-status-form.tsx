"use client";

import { useState } from "react";
import { Plus, Loader2, MessageCircle } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addTrackingEvent } from "./actions";
import { formatWhatsAppLink } from "@/lib/utils";

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
  resi: string;
  receiver: string;
  receiverPhone?: string | null;
  origin: string;
}

export function UpdateStatusForm({
  shipmentId,
  destination,
  resi,
  receiver,
  receiverPhone,
  origin,
}: UpdateStatusFormProps) {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [customStatus, setCustomStatus] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showWaPrompt, setShowWaPrompt] = useState(false);
  const [lastStatus, setLastStatus] = useState("");

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
      setLastStatus(status);
      setShowWaPrompt(true);
      setSelectedStatus("");
      setCustomStatus("");
      setLocation("");
    }
    setLoading(false);
  }

  function getWaLink() {
    const phone = receiverPhone || "0811-242-787";
    const message = `Halo ${receiver},\n\nUpdate pengiriman Fardalin Trans:\n📦 Resi: ${resi}\n📍 ${origin} → ${destination}\n\n📋 Status terbaru:\n${lastStatus}\n\nLacak pengiriman Anda di:\nfardalintrans.com/tracking\n\nTerima kasih! 🙏`;
    return formatWhatsAppLink(phone, message);
  }

  return (
    <div>
      {showWaPrompt && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 animate-fade-up">
          <p className="mb-3 text-sm font-medium text-green-800">
            Status berhasil diupdate! Kirim notifikasi ke penerima?
          </p>
          <div className="flex gap-2">
            <a
              href={getWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1fb855] active:scale-[0.97]"
            >
              <MessageCircle className="h-4 w-4" />
              Kirim via WhatsApp
            </a>
            <button
              onClick={() => setShowWaPrompt(false)}
              className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-100"
            >
              Nanti saja
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
}
