"use server";

import { createClient } from "@/lib/supabase/server";
import type { TrackingResult, TrackingEvent } from "@/types";

export async function lookupTracking(
  resi: string
): Promise<TrackingResult | null> {
  const supabase = await createClient();

  // Cari shipment berdasarkan resi
  const { data: shipment, error: shipmentError } = await supabase
    .from("shipments")
    .select("*")
    .ilike("resi", resi.trim())
    .single();

  if (shipmentError || !shipment) {
    return null;
  }

  // Ambil tracking events untuk shipment ini
  const { data: events, error: eventsError } = await supabase
    .from("tracking_events")
    .select("*")
    .eq("shipment_id", shipment.id)
    .order("timestamp", { ascending: true });

  if (eventsError) {
    return null;
  }

  // Format ke TrackingResult (sesuai interface yang sudah ada)
  const trackingEvents: TrackingEvent[] = (events || []).map((event) => ({
    timestamp: event.timestamp
      ? new Date(event.timestamp).toLocaleString("id-ID", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "",
    location: event.location,
    status: event.status,
    completed: event.completed,
  }));

  return {
    resi: shipment.resi,
    sender: shipment.sender,
    receiver: shipment.receiver,
    origin: shipment.origin,
    destination: shipment.destination,
    service: `${shipment.service} - ${shipment.vehicle.charAt(0).toUpperCase() + shipment.vehicle.slice(1)}`,
    events: trackingEvents,
  };
}
