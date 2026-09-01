import {
  Building,
  ScanSearch,
  FlaskConical,
  Radio,
  Stethoscope,
  GraduationCap,
  Microscope,
  HeartPulse,
} from "lucide-react";
import { INDUSTRIES } from "@/data/content";
import { SectionReveal, Stagger, AnimatedLineDivider } from "@/components/animations";

const ICON_MAP: Record<string, React.ReactNode> = {
  building: <Building className="w-7 h-7" />,
  "scan-search": <ScanSearch className="w-7 h-7" />,
  "flask-conical": <FlaskConical className="w-7 h-7" />,
  radio: <Radio className="w-7 h-7" />,
  stethoscope: <Stethoscope className="w-7 h-7" />,
  "graduation-cap": <GraduationCap className="w-7 h-7" />,
  microscope: <Microscope className="w-7 h-7" />,
  "heart-pulse": <HeartPulse className="w-7 h-7" />,
};

export function Industries() {
  return (
    <section id="industries" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <span className="text-cyan text-xs font-medium tracking-[0.25em] uppercase mb-6 block">
            Industries We Serve
          </span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Trusted Across Healthcare.
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="mt-6 text-lg text-white/40 max-w-2xl leading-relaxed">
            Serving diverse healthcare sectors with tailored solutions for each facility type.
          </p>
        </SectionReveal>

        <AnimatedLineDivider className="my-12" />

        {/* Horizontal scroll container for mobile, grid for desktop */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          <Stagger className="flex lg:grid lg:grid-cols-4 gap-4 min-w-max lg:min-w-0" staggerDelay={0.06}>
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.name}
                className="group flex items-center gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 hover:bg-cyan/[0.03] transition-all duration-500 min-w-[220px] lg:min-w-0 cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/30 group-hover:text-cyan group-hover:bg-cyan/10 transition-all duration-300 shrink-0">
                  {ICON_MAP[industry.icon]}
                </div>
                <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors whitespace-nowrap">
                  {industry.name}
                </span>
              </div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
