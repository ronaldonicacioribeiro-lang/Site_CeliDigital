import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LogoCarousel } from "@/components/sections/LogoCarousel";
import { Services } from "@/components/sections/Services";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TrafficSection } from "@/components/sections/TrafficSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LogoCarousel />
        <Services />
        <BentoGrid />
        <HowItWorks />
        <ProcessSection />
        <TrafficSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
