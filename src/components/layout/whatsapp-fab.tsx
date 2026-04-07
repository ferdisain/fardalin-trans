import { MessageCircle } from "lucide-react";

export function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/62811242787"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami via WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-[150ms] ease-[var(--ease-out-expo)] hover:scale-105 hover:shadow-xl active:scale-[0.97] motion-safe:animate-pulse-subtle"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
