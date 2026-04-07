import { Home, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center py-24">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <p className="text-8xl font-extrabold text-brand-600">404</p>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="mt-2 text-gray-600">
            Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href="/" variant="primary" size="md">
              <Home className="h-4 w-4" />
              Ke Beranda
            </ButtonLink>
            <ButtonLink href="/kontak" variant="outline" size="md">
              <ArrowLeft className="h-4 w-4" />
              Hubungi Kami
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
