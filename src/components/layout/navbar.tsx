"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-[200ms] ease-[var(--ease-out-expo)]",
        scrolled
          ? "border-b border-gray-200/50 bg-white/90 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">
              FT
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight text-brand-800">
                Fardalin
              </span>
              <span className="text-xs font-medium leading-tight text-brand-600">
                Trans
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-[150ms]",
                  pathname === link.href
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <ButtonLink
              href="https://wa.me/62811242787"
              variant="whatsapp"
              size="sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="h-4 w-4" />
              Hubungi Kami
            </ButtonLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 lg:hidden"
            aria-label={isOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-16 right-0 bottom-0 z-50 w-72 bg-white shadow-xl lg:hidden",
          "transition-transform duration-[300ms] ease-[var(--ease-out-expo)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-3 text-base font-medium transition-colors duration-[150ms]",
                pathname === link.href
                  ? "bg-brand-50 text-brand-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <ButtonLink
              href="https://wa.me/62811242787"
              variant="whatsapp"
              size="md"
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone className="h-4 w-4" />
              Hubungi Kami
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
