import { Hero } from "@/components/home/Hero";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { VisualizerSection } from "@/components/sections/VisualizerSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { GuideSection } from "@/components/sections/GuideSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { ProductDialog } from "@/components/ProductDialog";

/** One continuous page: hero → collections → visualizer → services → about → guide → contact (→ footer in the layout). */
export default function Home() {
  return (
    <>
      <Hero />
      <CollectionsSection />
      <VisualizerSection />
      <ServicesSection />
      <AboutSection />
      <GuideSection />
      <ContactSection />
      <ProductDialog />
    </>
  );
}
