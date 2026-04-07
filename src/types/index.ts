export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  fleet: string[];
}

export interface Fleet {
  id: string;
  name: string;
  description: string;
  capacity: string;
  icon: string;
  suitable: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  message: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface City {
  id: string;
  name: string;
}

export interface OngkirRate {
  price: { min: number; max: number };
  estimatedDays: { min: number; max: number };
  vehicle: string;
}

export interface TrackingEvent {
  timestamp: string;
  location: string;
  status: string;
  completed: boolean;
}

export interface TrackingResult {
  resi: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  service: string;
  events: TrackingEvent[];
}

export type ShipmentStatus = "active" | "delivered" | "cancelled";

export interface Shipment {
  id: string;
  resi: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  service: string;
  vehicle: string;
  status: ShipmentStatus;
  created_at: string;
  updated_at: string;
}
