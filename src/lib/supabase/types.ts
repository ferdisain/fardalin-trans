export interface DbShipment {
  id: string;
  resi: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  service: string;
  vehicle: string;
  status: "active" | "delivered" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface DbTrackingEvent {
  id: string;
  shipment_id: string;
  timestamp: string;
  location: string;
  status: string;
  completed: boolean;
  created_at: string;
}
