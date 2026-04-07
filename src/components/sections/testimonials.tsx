import { Star, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section className="bg-cream-dark py-16 lg:py-24">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Kepercayaan pelanggan adalah prioritas utama kami
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className={`relative stagger-${index + 1}`}>
              <Quote className="absolute top-4 right-4 h-8 w-8 text-brand-100" />
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold-500 text-gold-500"
                  />
                ))}
              </div>
              <p className="mb-4 leading-relaxed text-gray-600">
                &ldquo;{testimonial.message}&rdquo;
              </p>
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
