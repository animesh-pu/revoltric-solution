import { Link } from "react-router";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionReveal } from "@/components/animations";

export function CtaSection() {
  return (
    <section className="relative py-32 bg-navy-light overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan/[0.03] blur-[150px] rounded-full" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <SectionReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Need Medical Equipment or Lab Systems?
            <br />
            <span className="text-gradient">Let's Find the Right Solution.</span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <p className="mt-8 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
            Browse our full catalogue or book a consultation. Our specialists will help you select, configure, and deliver the right equipment for your facility.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.3}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/#contact">
              <Button className="group bg-cyan hover:bg-cyan-dim text-navy font-semibold px-8 py-3.5 rounded-lg text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                Browse Products
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+917978036219">
              <Button
                variant="outline"
                className="border-white/10 hover:border-cyan/30 text-white/70 hover:text-white font-medium px-8 py-3.5 rounded-lg text-base transition-all duration-300 bg-transparent hover:bg-white/[0.03]"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Book a Demo
              </Button>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
