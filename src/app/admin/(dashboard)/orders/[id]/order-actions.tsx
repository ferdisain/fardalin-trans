"use client";

import { useState } from "react";
import { Ban, Trash2, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cancelShipment, deleteShipment } from "./actions";
import { formatWhatsAppLink } from "@/lib/utils";

interface OrderActionsProps {
  shipmentId: string;
  shipmentStatus: string;
  resi: string;
  receiver: string;
  origin: string;
  destination: string;
  latestStatus?: string;
}

export function OrderActions({
  shipmentId,
  shipmentStatus,
  resi,
  receiver,
  origin,
  destination,
  latestStatus,
}: OrderActionsProps) {
  const [cancelling, setCancelling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const canCancel = shipmentStatus === "active";
  const statusText = latestStatus || "Barang dalam proses";

  const waMessage = `Halo ${receiver},\n\nUpdate pengiriman Fardalin Trans:\n📦 Resi: ${resi}\n📍 ${origin} → ${destination}\n\n📋 Status: ${statusText}\n\nTerima kasih telah menggunakan jasa Fardalin Trans!\nLacak pengiriman Anda di: fardalintrans.com/tracking`;

  async function handleCancel() {
    if (!confirm("Yakin ingin membatalkan order ini?")) return;
    setCancelling(true);
    await cancelShipment(shipmentId);
    setCancelling(false);
  }

  async function handleDelete() {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    await deleteShipment(shipmentId);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {/* WhatsApp Notification */}
      <a
        href={formatWhatsAppLink("0811-242-787", waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#1fb855] active:scale-[0.97]"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        Kirim Update via WA
      </a>

      {/* Cancel */}
      {canCancel && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          disabled={cancelling}
          className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800"
        >
          {cancelling ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Ban className="h-3.5 w-3.5" />
          )}
          {cancelling ? "Membatalkan..." : "Batalkan"}
        </Button>
      )}

      {/* Delete */}
      {confirmDelete ? (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={deleting}
            className="border-red-400 text-red-700 hover:bg-red-50 hover:text-red-800"
          >
            {deleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            {deleting ? "Menghapus..." : "Ya, hapus"}
          </Button>
          <button
            onClick={() => setConfirmDelete(false)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Batal
          </button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConfirmDelete(true)}
          className="text-red-500 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Hapus
        </Button>
      )}
    </div>
  );
}
