"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatWhatsAppLink } from "@/lib/utils";

export function ContactForm() {
  const [form, setForm] = useState({
    nama: "",
    email: "",
    telepon: "",
    pesan: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const message = `Halo Fardalin Trans,\n\nNama: ${form.nama}\nEmail: ${form.email}\nTelepon: ${form.telepon}\n\nPesan:\n${form.pesan}`;
    const waLink = formatWhatsAppLink("0811-242-787", message);

    window.open(waLink, "_blank");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-8 text-center animate-fade-up">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <Send className="h-7 w-7" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900">Pesan Terkirim!</h3>
        <p className="text-gray-600">
          Kami akan segera membalas melalui WhatsApp. Terima kasih!
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ nama: "", email: "", telepon: "", pesan: "" });
          }}
          className="mt-4 text-sm font-medium text-brand-600 hover:underline"
        >
          Kirim pesan lagi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="nama"
        name="nama"
        label="Nama Lengkap"
        placeholder="Masukkan nama Anda"
        value={form.nama}
        onChange={handleChange}
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="email@contoh.com"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          id="telepon"
          name="telepon"
          type="tel"
          label="No. Telepon"
          placeholder="08xx-xxxx-xxxx"
          value={form.telepon}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pesan" className="text-sm font-medium text-gray-700">
          Pesan
        </label>
        <textarea
          id="pesan"
          name="pesan"
          rows={4}
          placeholder="Tuliskan pesan atau pertanyaan Anda..."
          value={form.pesan}
          onChange={handleChange}
          required
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base transition-colors duration-[150ms] placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
      </div>
      <Button type="submit" size="lg" className="w-full">
        <Send className="h-4 w-4" />
        Kirim via WhatsApp
      </Button>
      <p className="text-center text-xs text-gray-500">
        Pesan akan dikirim melalui WhatsApp untuk respons lebih cepat.
      </p>
    </form>
  );
}
