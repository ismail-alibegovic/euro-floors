import { Hero } from "@/components/home/Hero";
import { VisualizerSection } from "@/components/home/VisualizerSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { GallerySection } from "@/components/home/GallerySection";

/** Home follows the reference's sequence: hero, 01 visualisation, 02 about, 03 offer list, 04 gallery; the footer closes it. */
export default function Home() {
  return (
    <>
      <Hero />
      <VisualizerSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
    </>
  );
}
