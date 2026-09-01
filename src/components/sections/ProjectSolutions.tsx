import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PROJECT_STEPS } from "@/data/content";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";

export function ProjectSolutions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-32 bg-navy-light">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-navy to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionReveal>
          <span className="text-cyan text-xs font-medium tracking-[0.25em] uppercase mb-6 block">
            Complete Project Solutions
          </span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            From Requirement to Delivery.
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="mt-6 text-lg text-white/40 max-w-2xl leading-relaxed">
            REVOLTRIC supports healthcare projects at every stage — from identifying requirements to installation and ongoing support.
          </p>
        </SectionReveal>

        <AnimatedLineDivider className="my-12" />

        {/* Steps Flow */}
        <div ref={ref} className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[8.33%] right-[8.33%] h-px">
            <div className="w-full h-full bg-white/5" />
            <motion.div
              className="absolute inset-y-0 left-0 h-full bg-gradient-to-r from-cyan/50 to-cyan/20"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {PROJECT_STEPS.map((step, index) => (
              <div key={step.step} className="relative group">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.15,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Step number circle */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-full border-2 border-white/10 bg-navy flex items-center justify-center group-hover:border-cyan/40 transition-all duration-500 relative z-10">
                      <span className="text-cyan font-bold text-sm">{step.step}</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-cyan/0 group-hover:bg-cyan/10 transition-colors duration-500 blur-xl" />
                  </div>

                  {/* Arrow (between steps on desktop) */}
                  {index < PROJECT_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-6 -right-2 text-white/10">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}

                  {/* Step info */}
                  <h3 className="text-sm font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed max-w-[180px]">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
