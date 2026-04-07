import type { TrackingResult } from "@/types";

const trackingData: Record<string, TrackingResult> = {
  "FT-2026-001234": {
    resi: "FT-2026-001234",
    sender: "Budi Santoso",
    receiver: "Ahmad Fauzi",
    origin: "Cirebon",
    destination: "Jakarta",
    service: "Angkutan - Truck",
    events: [
      {
        timestamp: "2026-04-07 08:00",
        location: "Gudang Cirebon",
        status: "Barang diterima di gudang",
        completed: true,
      },
      {
        timestamp: "2026-04-07 10:30",
        location: "Gudang Cirebon",
        status: "Barang sedang dimuat ke armada",
        completed: true,
      },
      {
        timestamp: "2026-04-07 12:00",
        location: "Cirebon",
        status: "Barang dalam perjalanan",
        completed: true,
      },
      {
        timestamp: "2026-04-07 18:00",
        location: "Jakarta",
        status: "Barang tiba di gudang tujuan",
        completed: true,
      },
      {
        timestamp: "2026-04-08 09:00",
        location: "Jakarta",
        status: "Barang sedang diantar ke penerima",
        completed: false,
      },
      {
        timestamp: "",
        location: "Jakarta",
        status: "Barang diterima oleh penerima",
        completed: false,
      },
    ],
  },
  "FT-2026-005678": {
    resi: "FT-2026-005678",
    sender: "Siti Rahayu",
    receiver: "Dewi Lestari",
    origin: "Cirebon",
    destination: "Bandung",
    service: "Pindahan - Box",
    events: [
      {
        timestamp: "2026-04-06 09:00",
        location: "Rumah Pengirim, Cirebon",
        status: "Tim tiba di lokasi, mulai packing",
        completed: true,
      },
      {
        timestamp: "2026-04-06 12:00",
        location: "Cirebon",
        status: "Packing selesai, barang dimuat",
        completed: true,
      },
      {
        timestamp: "2026-04-06 13:00",
        location: "Cirebon",
        status: "Barang dalam perjalanan ke Bandung",
        completed: true,
      },
      {
        timestamp: "2026-04-06 17:00",
        location: "Bandung",
        status: "Barang tiba di lokasi tujuan",
        completed: true,
      },
      {
        timestamp: "2026-04-06 19:00",
        location: "Bandung",
        status: "Bongkar muat selesai, diterima penerima",
        completed: true,
      },
    ],
  },
  "FT-2026-009999": {
    resi: "FT-2026-009999",
    sender: "PT. Maju Bersama",
    receiver: "CV. Karya Mandiri",
    origin: "Cirebon",
    destination: "Surabaya",
    service: "Angkutan - Fuso",
    events: [
      {
        timestamp: "2026-04-05 07:00",
        location: "Gudang Cirebon",
        status: "Barang diterima di gudang",
        completed: true,
      },
      {
        timestamp: "2026-04-05 09:00",
        location: "Gudang Cirebon",
        status: "Barang dimuat ke Fuso",
        completed: true,
      },
      {
        timestamp: "2026-04-05 10:00",
        location: "Cirebon",
        status: "Barang dalam perjalanan",
        completed: true,
      },
      {
        timestamp: "2026-04-06 06:00",
        location: "Semarang",
        status: "Transit di gudang Semarang",
        completed: true,
      },
      {
        timestamp: "2026-04-06 08:00",
        location: "Semarang",
        status: "Melanjutkan perjalanan ke Surabaya",
        completed: true,
      },
      {
        timestamp: "2026-04-07 05:00",
        location: "Surabaya",
        status: "Barang tiba di gudang Surabaya",
        completed: false,
      },
      {
        timestamp: "",
        location: "Surabaya",
        status: "Barang diantar ke penerima",
        completed: false,
      },
    ],
  },
};

export function getTrackingResult(resi: string): TrackingResult | null {
  return trackingData[resi.toUpperCase()] ?? trackingData[resi] ?? null;
}

export const sampleResiNumbers = Object.keys(trackingData);
