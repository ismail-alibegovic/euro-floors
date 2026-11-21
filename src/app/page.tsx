import { Hero } from "@/components/home/Hero";
import { VisualizerSection } from "@/components/home/VisualizerSection";
import { CollectionGrid } from "@/components/home/CollectionGrid";
import { MaterialStory } from "@/components/home/MaterialStory";
import { ServicesSection } from "@/components/home/ServicesSection";
import { GallerySection } from "@/components/home/GallerySection";
import { AboutSection } from "@/components/home/AboutSection";
import { QuoteSection } from "@/components/home/QuoteSection";

export default function Home() {
  return (
    <>
      <Hero />
      <VisualizerSection />
      <CollectionGrid />
      <MaterialStory />
      <ServicesSection />
      <GallerySection />
      <AboutSection />
      <QuoteSection />
    </>
  );
}
