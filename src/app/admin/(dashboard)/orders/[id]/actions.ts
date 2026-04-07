"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function addTrackingEvent(formData: FormData) {
  const supabase = await createClient();

  const shipmentId = formData.get("shipmentId") as string;
  const status = formData.get("status") as string;
  const location = formData.get("location") as string;

  const { error: eventError } = await supabase
    .from("tracking_events")
    .insert({
      shipment_id: shipmentId,
      status,
      location,
      completed: true,
    });

  if (eventError) {
    return { error: "Gagal menambah status. Silakan coba lagi." };
  }

  if (status === "Barang diterima oleh penerima") {
    await supabase
      .from("shipments")
      .update({ status: "delivered" })
      .eq("id", shipmentId);
  }

  revalidatePath(`/admin/orders/${shipmentId}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function cancelShipment(shipmentId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("shipments")
    .update({ status: "cancelled" })
    .eq("id", shipmentId);

  if (error) {
    return { error: "Gagal membatalkan order." };
  }

  // Add cancellation tracking event
  await supabase.from("tracking_events").insert({
    shipment_id: shipmentId,
    status: "Pengiriman dibatalkan",
    location: "-",
    completed: true,
  });

  revalidatePath(`/admin/orders/${shipmentId}`);
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteShipment(shipmentId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("shipments")
    .delete()
    .eq("id", shipmentId);

  if (error) {
    return { error: "Gagal menghapus order." };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateShipment(formData: FormData) {
  const supabase = await createClient();

  const shipmentId = formData.get("shipmentId") as string;
  const sender = formData.get("sender") as string;
  const receiver = formData.get("receiver") as string;
  const origin = formData.get("origin") as string;
  const destination = formData.get("destination") as string;
  const service = formData.get("service") as string;
  const vehicle = formData.get("vehicle") as string;

  const { error } = await supabase
    .from("shipments")
    .update({ sender, receiver, origin, destination, service, vehicle })
    .eq("id", shipmentId);

  if (error) {
    return { error: "Gagal mengupdate order." };
  }

  revalidatePath(`/admin/orders/${shipmentId}`);
  revalidatePath("/admin");
  return { success: true };
}
