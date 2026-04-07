import type { Service, Fleet } from "@/types";

export const services: Service[] = [
  {
    slug: "angkutan",
    title: "Jasa Angkutan",
    description:
      "Layanan pengiriman barang ke seluruh Indonesia dengan armada lengkap. Dari barang ringan hingga muatan besar, kami siap kirim kapan aja.",
    icon: "Truck",
    features: [
      "Pengiriman door-to-door",
      "Asuransi barang",
      "Tracking real-time",
      "Layanan 24 jam",
      "Harga kompetitif",
      "Armada terawat",
    ],
    fleet: ["pickup", "box", "truck", "fuso"],
  },
  {
    slug: "pindahan",
    title: "Jasa Pindahan",
    description:
      "Mencari perusahaan pindahan yang terpercaya untuk meredakan stres pindahan Anda? Hanya Fardalin Trans yang layak dipertimbangkan!",
    icon: "PackageOpen",
    features: [
      "Packing profesional",
      "Bongkar & pasang furniture",
      "Asuransi barang pecah belah",
      "Tim berpengalaman",
      "Gratis survei lokasi",
      "Harga transparan tanpa biaya tersembunyi",
    ],
    fleet: ["box", "truck", "fuso"],
  },
];

export const fleets: Fleet[] = [
  {
    id: "pickup",
    name: "Pickup",
    description: "Cocok untuk barang ringan & cepat",
    capacity: "1 - 1.5 Ton",
    icon: "Car",
    suitable: "Barang kecil, dokumen, paket ringan",
  },
  {
    id: "box",
    name: "Box",
    description: "Barang lebih aman & terlindungi",
    capacity: "2 - 4 Ton",
    icon: "Package",
    suitable: "Elektronik, furniture kecil, barang berharga",
  },
  {
    id: "truck",
    name: "Truck",
    description: "Ideal untuk muatan besar",
    capacity: "5 - 8 Ton",
    icon: "Truck",
    suitable: "Pindahan rumah, material bangunan, stok toko",
  },
  {
    id: "fuso",
    name: "Fuso",
    description: "Efisien untuk distribusi skala besar",
    capacity: "8 - 15 Ton",
    icon: "Container",
    suitable: "Distribusi besar, pabrik, proyek konstruksi",
  },
];
