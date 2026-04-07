"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PrintLabelProps {
  shipment: {
    resi: string;
    sender: string;
    receiver: string;
    receiver_phone?: string | null;
    origin: string;
    destination: string;
    service: string;
    vehicle: string;
    created_at: string;
  };
}

export function PrintLabel({ shipment }: PrintLabelProps) {
  function handlePrint() {
    const printWindow = window.open("", "_blank", "width=400,height=600");
    if (!printWindow) return;

    const date = new Date(shipment.created_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const vehicle =
      shipment.vehicle.charAt(0).toUpperCase() + shipment.vehicle.slice(1);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Label - ${shipment.resi}</title>
        <style>
          @page { size: 100mm 150mm; margin: 0; }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Arial', sans-serif;
            width: 100mm;
            padding: 5mm;
            color: #000;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 3mm;
            margin-bottom: 3mm;
          }
          .logo {
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 1px;
          }
          .logo span { color: #006b3f; }
          .tagline {
            font-size: 8px;
            color: #666;
            margin-top: 1mm;
          }
          .resi-box {
            text-align: center;
            background: #f0f0f0;
            padding: 3mm;
            margin: 3mm 0;
            border: 1px dashed #000;
          }
          .resi-box .label { font-size: 8px; color: #666; }
          .resi-box .resi { font-size: 16px; font-weight: bold; font-family: monospace; letter-spacing: 1px; }
          .section {
            margin: 3mm 0;
            padding: 2mm 0;
          }
          .section-title {
            font-size: 8px;
            font-weight: bold;
            text-transform: uppercase;
            color: #666;
            letter-spacing: 0.5px;
            margin-bottom: 1mm;
          }
          .section-content {
            font-size: 11px;
            font-weight: bold;
          }
          .section-sub {
            font-size: 9px;
            color: #444;
          }
          .route {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 3mm 0;
            padding: 3mm;
            border: 1px solid #000;
          }
          .route .city {
            font-size: 14px;
            font-weight: bold;
          }
          .route .arrow {
            font-size: 18px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2mm;
            margin: 3mm 0;
          }
          .info-item .label { font-size: 8px; color: #666; }
          .info-item .value { font-size: 10px; font-weight: bold; }
          .footer {
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 2mm;
            margin-top: 3mm;
            font-size: 7px;
            color: #999;
          }
          @media print {
            body { width: 100mm; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo"><span>FT</span> Fardalin Trans</div>
          <div class="tagline">Jasa Angkutan & Pindahan Terpercaya</div>
        </div>

        <div class="resi-box">
          <div class="label">NOMOR RESI</div>
          <div class="resi">${shipment.resi}</div>
        </div>

        <div class="route">
          <div style="text-align:center;flex:1">
            <div class="label" style="font-size:8px;color:#666">ASAL</div>
            <div class="city">${shipment.origin}</div>
          </div>
          <div class="arrow">→</div>
          <div style="text-align:center;flex:1">
            <div class="label" style="font-size:8px;color:#666">TUJUAN</div>
            <div class="city">${shipment.destination}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Pengirim</div>
          <div class="section-content">${shipment.sender}</div>
        </div>

        <div class="section">
          <div class="section-title">Penerima</div>
          <div class="section-content">${shipment.receiver}</div>
          ${shipment.receiver_phone ? `<div class="section-sub">${shipment.receiver_phone}</div>` : ""}
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="label">Layanan</div>
            <div class="value">${shipment.service}</div>
          </div>
          <div class="info-item">
            <div class="label">Armada</div>
            <div class="value">${vehicle}</div>
          </div>
          <div class="info-item">
            <div class="label">Tanggal</div>
            <div class="value">${date}</div>
          </div>
          <div class="info-item">
            <div class="label">Telepon</div>
            <div class="value">0811-242-787</div>
          </div>
        </div>

        <div class="footer">
          fardalintrans.com | 0811-242-787 | @fardalin.trans
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  }

  return (
    <Button variant="outline" size="sm" onClick={handlePrint}>
      <Printer className="h-3.5 w-3.5" />
      Print Label
    </Button>
  );
}
