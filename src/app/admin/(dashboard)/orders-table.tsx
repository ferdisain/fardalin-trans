"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Package, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Shipment {
  id: string;
  resi: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  vehicle: string;
  status: string;
  created_at: string;
}

const statusFilters = [
  { value: "all", label: "Semua" },
  { value: "active", label: "Aktif" },
  { value: "delivered", label: "Terkirim" },
  { value: "cancelled", label: "Dibatalkan" },
];

export function OrdersTable({ shipments }: { shipments: Shipment[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = shipments.filter((s) => {
    const matchesSearch =
      search === "" ||
      s.resi.toLowerCase().includes(search.toLowerCase()) ||
      s.sender.toLowerCase().includes(search.toLowerCase()) ||
      s.receiver.toLowerCase().includes(search.toLowerCase()) ||
      s.origin.toLowerCase().includes(search.toLowerCase()) ||
      s.destination.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="overflow-hidden p-0">
      {/* Search & Filter Bar */}
      <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari resi, pengirim, penerima, kota..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <div className="flex gap-1">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  statusFilter === f.value
                    ? "bg-brand-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <Package className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="text-gray-500">
            {shipments.length === 0
              ? "Belum ada order."
              : "Tidak ada order yang cocok dengan pencarian."}
          </p>
          {shipments.length === 0 && (
            <Link
              href="/admin/orders/new"
              className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline"
            >
              Buat order pertama →
            </Link>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-xs font-medium uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Resi</th>
                <th className="px-6 py-3">Pengirim</th>
                <th className="px-6 py-3">Rute</th>
                <th className="px-6 py-3">Armada</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${shipment.id}`}
                      className="font-mono font-semibold text-brand-600 hover:underline"
                    >
                      {shipment.resi}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">
                      {shipment.sender}
                    </p>
                    <p className="text-xs text-gray-500">
                      → {shipment.receiver}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {shipment.origin} → {shipment.destination}
                  </td>
                  <td className="px-6 py-4">
                    <Badge>
                      {shipment.vehicle.charAt(0).toUpperCase() +
                        shipment.vehicle.slice(1)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        shipment.status === "delivered"
                          ? "success"
                          : shipment.status === "cancelled"
                            ? "warning"
                            : "info"
                      }
                    >
                      {shipment.status === "active"
                        ? "Aktif"
                        : shipment.status === "delivered"
                          ? "Terkirim"
                          : "Dibatalkan"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(shipment.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-gray-200 px-6 py-3 text-xs text-gray-500">
            Menampilkan {filtered.length} dari {shipments.length} order
          </div>
        </div>
      )}
    </Card>
  );
}
