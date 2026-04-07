import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Check, Clock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UpdateStatusForm } from "./update-status-form";
import { EditOrderForm } from "./edit-order-form";
import { OrderActions } from "./order-actions";
import { PrintLabel } from "./print-label";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: shipment } = await supabase
    .from("shipments")
    .select("*")
    .eq("id", id)
    .single();

  if (!shipment) {
    notFound();
  }

  const { data: events } = await supabase
    .from("tracking_events")
    .select("*")
    .eq("shipment_id", id)
    .order("timestamp", { ascending: true });

  const trackingEvents = events || [];
  const isDelivered = shipment.status === "delivered";
  const isCancelled = shipment.status === "cancelled";
  const latestEvent = trackingEvents[trackingEvents.length - 1];

  return (
    <div>
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Dashboard
      </Link>

      {/* Header with Status + Actions */}
      <div className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order {shipment.resi}
            </h1>
            <p className="text-sm text-gray-500">
              Dibuat{" "}
              {new Date(shipment.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <Badge
            variant={
              isDelivered
                ? "success"
                : isCancelled
                  ? "warning"
                  : "info"
            }
            className="text-sm"
          >
            {isDelivered
              ? "Terkirim"
              : isCancelled
                ? "Dibatalkan"
                : "Aktif"}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <PrintLabel shipment={shipment} />
          <OrderActions
            shipmentId={shipment.id}
            shipmentStatus={shipment.status}
            resi={shipment.resi}
            receiver={shipment.receiver}
            origin={shipment.origin}
            destination={shipment.destination}
            latestStatus={latestEvent?.status}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Detail Card + Edit */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Detail Pengiriman
            </h2>
            {!isDelivered && !isCancelled && (
              <EditOrderForm shipment={shipment} />
            )}
          </div>
          <dl className="grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-gray-500">Nomor Resi</dt>
              <dd className="font-mono font-semibold text-brand-600">
                {shipment.resi}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Layanan</dt>
              <dd className="font-medium text-gray-900">
                {shipment.service} -{" "}
                {shipment.vehicle.charAt(0).toUpperCase() +
                  shipment.vehicle.slice(1)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Pengirim</dt>
              <dd className="font-medium text-gray-900">{shipment.sender}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Penerima</dt>
              <dd className="font-medium text-gray-900">{shipment.receiver}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Asal</dt>
              <dd className="font-medium text-gray-900">{shipment.origin}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500">Tujuan</dt>
              <dd className="font-medium text-gray-900">
                {shipment.destination}
              </dd>
            </div>
          </dl>
        </Card>

        {/* Update Status / Completion / Cancelled */}
        {!isDelivered && !isCancelled && (
          <Card>
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              Update Status
            </h2>
            <UpdateStatusForm
              shipmentId={shipment.id}
              destination={shipment.destination}
              resi={shipment.resi}
              receiver={shipment.receiver}
              receiverPhone={shipment.receiver_phone}
              origin={shipment.origin}
            />
          </Card>
        )}

        {isDelivered && (
          <Card className="flex items-center justify-center bg-green-50">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Check className="h-7 w-7" />
              </div>
              <p className="text-lg font-bold text-green-800">
                Pengiriman Selesai
              </p>
              <p className="text-sm text-green-600">
                Barang telah diterima oleh penerima.
              </p>
            </div>
          </Card>
        )}

        {isCancelled && (
          <Card className="flex items-center justify-center bg-yellow-50">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                <Clock className="h-7 w-7" />
              </div>
              <p className="text-lg font-bold text-yellow-800">
                Order Dibatalkan
              </p>
              <p className="text-sm text-yellow-600">
                Pengiriman ini telah dibatalkan.
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* Timeline */}
      <Card className="mt-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Riwayat Status
        </h2>

        {trackingEvents.length === 0 ? (
          <p className="text-gray-500">Belum ada status.</p>
        ) : (
          <div className="relative">
            {trackingEvents.map((event, index) => {
              const isLast = index === trackingEvents.length - 1;
              return (
                <div key={event.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {!isLast && (
                    <div
                      className={`absolute top-6 left-[15px] h-full w-0.5 ${
                        event.completed ? "bg-brand-300" : "bg-gray-200"
                      }`}
                    />
                  )}
                  <div
                    className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      event.completed
                        ? "bg-brand-600 text-white"
                        : "border-2 border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {event.completed ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p
                      className={`font-medium ${
                        event.completed ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {event.status}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>
                        {new Date(event.timestamp).toLocaleString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
