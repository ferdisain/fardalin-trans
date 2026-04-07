"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Loader2, Package, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  lookupCustomerHistory,
  type CustomerShipment,
} from "./actions";

export function CustomerHistoryForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CustomerShipment[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSearched(false);

    try {
      const data = await lookupCustomerHistory(query);
      setResults(data);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="query"
          label="Cari berdasarkan nama, nomor telepon, atau nomor resi"
          placeholder="Contoh: Ahmad Fauzi atau 0812..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSearched(false);
          }}
          required
        />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          {loading ? "Mencari..." : "Cari Riwayat"}
        </Button>
      </form>

      {searched && results.length > 0 && (
        <div className="mt-6 space-y-3 animate-fade-up">
          <p className="text-sm font-medium text-gray-500">
            Ditemukan {results.length} pengiriman
          </p>
          {results.map((shipment) => (
            <Card key={shipment.id} hover className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/tracking?resi=${shipment.resi}`}
                      className="font-mono font-semibold text-brand-600 hover:underline"
                    >
                      {shipment.resi}
                    </Link>
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
                  </div>
                  <p className="mt-1 text-sm text-gray-600">
                    {shipment.origin} → {shipment.destination}
                  </p>
                  <p className="text-xs text-gray-500">
                    {shipment.sender} → {shipment.receiver}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(shipment.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Link
                  href={`/tracking?resi=${shipment.resi}`}
                  className="flex items-center gap-1 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600 transition-colors hover:bg-brand-100"
                >
                  Lacak
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {searched && results.length === 0 && (
        <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center animate-fade-up">
          <Package className="mx-auto mb-3 h-10 w-10 text-gray-300" />
          <p className="font-medium text-gray-700">
            Tidak ditemukan riwayat pengiriman
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Pastikan nama atau nomor telepon yang Anda masukkan sudah benar.
          </p>
        </div>
      )}
    </div>
  );
}
