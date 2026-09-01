import { SectionReveal, Stagger, AnimatedLineDivider } from "@/components/animations";

const PILLARS = [
  { label: "Complete Solutions", icon: "⬡" },
  { label: "Quality Products", icon: "◈" },
  { label: "Professional Support", icon: "◆" },
  { label: "Reliable Supply", icon: "●" },
  { label: "Hospital-Focused", icon: "◉" },
  { label: "Long-Term Relationships", icon: "◎" },
];

export function About() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <SectionReveal>
          <span className="text-cyan text-xs font-medium tracking-[0.25em] uppercase mb-6 block">
            About Revoltric
          </span>
        </SectionReveal>

        {/* Heading */}
        <SectionReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight max-w-5xl">
            Healthcare Solutions, Without the Complexity.
          </h2>
        </SectionReveal>

        {/* Description */}
        <SectionReveal delay={0.2}>
          <p className="mt-8 text-lg sm:text-xl text-white/45 leading-relaxed max-w-3xl">
            REVOLTRIC brings multiple hospital and diagnostic requirements together through a single professional solution partner. From radiology to pathology, from equipment to infrastructure — we simplify healthcare procurement so you can focus on what matters most: patient care.
          </p>
        </SectionReveal>

        <AnimatedLineDivider className="my-16" />

        {/* Pillars */}
        <Stagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6" staggerDelay={0.08}>
          {PILLARS.map((pillar) => (
            <div
              key={pillar.label}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 hover:bg-cyan/[0.03] transition-all duration-500 text-center"
            >
              <div className="text-2xl text-cyan/60 mb-3 group-hover:text-cyan transition-colors">
                {pillar.icon}
              </div>
              <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                {pillar.label}
              </span>
            </div>
          ))}
        </Stagger>

        {/* Stats */}
        <SectionReveal delay={0.1}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "100+", label: "Products" },
              { value: "6", label: "Solution Categories" },
              { value: "100%", label: "Quality Assurance" },
              { value: "24/7", label: "Support Available" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
