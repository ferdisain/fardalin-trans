"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrackingTimeline } from "@/components/features/tracking-timeline";
import { lookupTracking } from "@/app/(public)/tracking/actions";
import type { TrackingResult } from "@/types";

export function TrackingForm() {
  const [resi, setResi] = useState("");
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSearched(false);

    try {
      const tracking = await lookupTracking(resi.trim());
      setResult(tracking);
      setNotFound(!tracking);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="resi"
          label="Nomor Resi"
          placeholder="Contoh: FT-2026-000001"
          value={resi}
          onChange={(e) => {
            setResi(e.target.value);
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
          {loading ? "Mencari..." : "Lacak Pengiriman"}
        </Button>
      </form>

      {searched && result && <TrackingTimeline result={result} />}

      {searched && notFound && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-center animate-fade-up">
          <p className="text-lg font-semibold text-red-800">
            Nomor resi tidak ditemukan
          </p>
          <p className="mt-1 text-sm text-red-600">
            Pastikan nomor resi yang Anda masukkan sudah benar, atau hubungi kami
            untuk bantuan.
          </p>
        </div>
      )}
    </div>
  );
}
