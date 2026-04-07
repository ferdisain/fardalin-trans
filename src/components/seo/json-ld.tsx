export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Fardalin Trans",
    alternateName: "Fardalin TransIndo",
    description:
      "Jasa pengiriman barang, angkutan, dan pindahan terpercaya dari Cirebon ke seluruh Indonesia. Aman, cepat, terpercaya. Layanan 24 jam.",
    url: "https://fardalin-trans.vercel.app",
    telephone: ["+62811242787", "+6285973172219"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Griya Cempaka Arum D.626",
      addressLocality: "Cirebon",
      addressRegion: "Jawa Barat",
      postalCode: "45171",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.73,
      longitude: 108.55,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: ["https://instagram.com/fardalin.trans"],
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    slogan: "Move It Fast With Fardalin Trans",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Layanan Pengiriman",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jasa Angkutan",
            description: "Layanan pengiriman barang ke seluruh Indonesia",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Jasa Pindahan",
            description: "Layanan pindahan rumah dan kantor profesional",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://fardalin-trans.vercel.app${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
