import { Hero } from "@/components/home/Hero";
import { VisualizerSection } from "@/components/home/VisualizerSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CollectionGrid } from "@/components/home/CollectionGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <VisualizerSection />
      <AboutSection />
      <ServicesSection />
      <CollectionGrid />
    </>
  );
}
