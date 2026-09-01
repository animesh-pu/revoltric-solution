import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Solutions } from "@/components/sections/Solutions";
import { WhyRevoltric } from "@/components/sections/WhyRevoltric";
import { Industries } from "@/components/sections/Industries";
import { ProjectSolutions } from "@/components/sections/ProjectSolutions";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { CtaSection } from "@/components/sections/CtaSection";
import { Contact } from "@/components/sections/Contact";

export default function Landing() {
  return (
    <div className="min-h-screen bg-navy">
      <Navigation />
      <Hero />
      <About />
      <Solutions />
      <WhyRevoltric />
      <Industries />
      <ProjectSolutions />
      <ProductShowcase />
      <CtaSection />
      <Contact />
      <Footer />
    </div>
  );
}
