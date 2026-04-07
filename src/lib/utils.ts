import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatWhatsAppLink(
  phone: string,
  message?: string
): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const intlPhone = cleanPhone.startsWith("0")
    ? `62${cleanPhone.slice(1)}`
    : cleanPhone;
  const url = `https://wa.me/${intlPhone}`;
  return message ? `${url}?text=${encodeURIComponent(message)}` : url;
}
