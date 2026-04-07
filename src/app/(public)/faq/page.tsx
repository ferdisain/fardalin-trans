import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { AccordionItem } from "@/components/ui/accordion";
import { ButtonLink } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { faqs } from "@/data/faq";
import { FAQJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering ditanyakan seputar layanan pengiriman Fardalin Trans. Temukan jawaban untuk pertanyaan Anda.",
};

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <PageHeader
        title="Pertanyaan Umum"
        description="Temukan jawaban untuk pertanyaan yang sering ditanyakan seputar layanan kami."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-6">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-brand-50 p-8 text-center">
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                Masih punya pertanyaan?
              </h3>
              <p className="mb-6 text-gray-600">
                Jangan ragu untuk menghubungi kami. Tim kami siap membantu 24 jam.
              </p>
              <ButtonLink
                href="https://wa.me/62811242787?text=Halo%20Fardalin%20Trans%2C%20saya%20punya%20pertanyaan."
                variant="whatsapp"
                size="md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-4 w-4" />
                Tanya via WhatsApp
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
