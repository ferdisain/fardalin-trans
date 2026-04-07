import { Hero } from "@/components/sections/hero";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FleetShowcase } from "@/components/sections/fleet-showcase";
import { CTABanner } from "@/components/sections/cta-banner";
import { Testimonials } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <FleetShowcase />
      <Testimonials />
      <CTABanner />
    </>
  );
}
