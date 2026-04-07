"use server";

import { createClient } from "@/lib/supabase/server";

export interface CustomerShipment {
  id: string;
  resi: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  service: string;
  vehicle: string;
  status: string;
  created_at: string;
}

export async function lookupCustomerHistory(
  query: string
): Promise<CustomerShipment[]> {
  const supabase = await createClient();
  const q = query.trim();

  if (!q) return [];

  // Search by receiver name or phone
  const { data, error } = await supabase
    .from("shipments")
    .select("id, resi, sender, receiver, origin, destination, service, vehicle, status, created_at")
    .or(`receiver.ilike.%${q}%,sender.ilike.%${q}%,receiver_phone.ilike.%${q}%,resi.ilike.%${q}%`)
    .order("created_at", { ascending: false })
    .limit(20);

  if (error) return [];
  return data || [];
}
