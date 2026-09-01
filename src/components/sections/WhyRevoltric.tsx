import {
  Layers,
  ShieldCheck,
  Headphones,
  Cpu,
  Briefcase,
  Handshake,
} from "lucide-react";
import { ADVANTAGES } from "@/data/content";
import { SectionReveal, Stagger, AnimatedLineDivider } from "@/components/animations";

const ICON_MAP: Record<string, React.ReactNode> = {
  layers: <Layers className="w-6 h-6" />,
  "shield-check": <ShieldCheck className="w-6 h-6" />,
  headphones: <Headphones className="w-6 h-6" />,
  cpu: <Cpu className="w-6 h-6" />,
  briefcase: <Briefcase className="w-6 h-6" />,
  handshake: <Handshake className="w-6 h-6" />,
};

export function WhyRevoltric() {
  return (
    <section className="relative py-32 bg-navy-light">
      {/* Subtle top/bottom gradients */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionReveal>
          <span className="text-cyan text-xs font-medium tracking-[0.25em] uppercase mb-6 block">
            Why Choose Us
          </span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Why <span className="text-gradient">Revoltric?</span>
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="mt-6 text-lg text-white/40 max-w-2xl leading-relaxed">
            Built on deep product expertise, transparent pricing, and genuine understanding of how healthcare facilities operate.
          </p>
        </SectionReveal>

        <AnimatedLineDivider className="my-12" />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {ADVANTAGES.map((advantage) => (
            <div
              key={advantage.title}
              className="group relative p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 hover:bg-cyan/[0.02] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center text-cyan mb-6 group-hover:bg-cyan/15 transition-colors duration-300">
                {ICON_MAP[advantage.icon]}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">
                {advantage.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {advantage.description}
              </p>
              {/* Hover accent */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-cyan/0 to-transparent group-hover:via-cyan/40 transition-all duration-500" />
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
