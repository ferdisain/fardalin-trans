import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFAB } from "@/components/layout/whatsapp-fab";
import { LocalBusinessJsonLd } from "@/components/seo/json-ld";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalBusinessJsonLd />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}
