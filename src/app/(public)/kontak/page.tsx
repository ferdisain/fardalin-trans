import type { Metadata } from "next";
import { Phone, MapPin, Clock, Camera } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/features/contact-form";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Fardalin Trans untuk konsultasi pengiriman barang. Telepon, WhatsApp, atau kunjungi kantor kami di Cirebon.",
};

const contactInfo = [
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Telepon",
    values: ["0811-242-787", "0859-7317-2219"],
    href: "tel:+62811242787",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Alamat",
    values: ["Griya Cempaka Arum D.626", "Cirebon 45171"],
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "Jam Operasional",
    values: ["24 Jam / 7 Hari"],
  },
  {
    icon: <Camera className="h-5 w-5" />,
    label: "Instagram",
    values: ["@fardalin.trans"],
    href: "https://instagram.com/fardalin.trans",
  },
];

export default function KontakPage() {
  return (
    <>
      <PageHeader
        title="Hubungi Kami"
        description="Kami siap melayani pertanyaan dan kebutuhan pengiriman Anda."
        breadcrumbs={[{ label: "Kontak" }]}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Informasi Kontak
              </h2>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <Card key={info.label} className="flex items-start gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {info.label}
                      </p>
                      {info.values.map((val) =>
                        info.href ? (
                          <a
                            key={val}
                            href={info.href}
                            target={
                              info.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              info.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="block font-medium text-gray-900 transition-colors hover:text-brand-600"
                          >
                            {val}
                          </a>
                        ) : (
                          <p key={val} className="font-medium text-gray-900">
                            {val}
                          </p>
                        )
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Google Maps */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.3!2d108.55!3d-6.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDMnNDguMCJTIDEwOMKwMzMnMDAuMCJF!5e0!3m2!1sid!2sid!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Fardalin Trans"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Kirim Pesan
              </h2>
              <Card className="p-6 lg:p-8">
                <ContactForm />
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
