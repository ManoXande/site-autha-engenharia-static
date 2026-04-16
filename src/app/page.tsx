import { HeroSection } from "@/components/sections/HeroSection";
import { ManifestoSection } from "@/components/sections/ManifestoSection";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ServiceSection } from "@/components/sections/ServiceSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SERVICES } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Manifesto — AuthaGraph, filosofia */}
      <ManifestoSection />

      {/* 3. Impacto — Números + TerritoryMap */}
      <ImpactSection />

      {/* 4–8. Frentes de serviço */}
      {SERVICES.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* 9. Contato */}
      <ContactSection />
    </>
  );
}
