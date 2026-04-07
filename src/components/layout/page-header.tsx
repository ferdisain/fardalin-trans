import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 pt-24 pb-12 lg:pt-28 lg:pb-16">
      <Container>
        {breadcrumbs && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1 text-sm text-brand-200">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Beranda
                </Link>
              </li>
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-1">
                  <ChevronRight className="h-3.5 w-3.5" />
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-3xl font-bold text-white lg:text-4xl animate-fade-up">
          {title}
        </h1>
        {description && (
          <p className="mt-3 max-w-2xl text-lg text-brand-100 animate-fade-up stagger-2">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
