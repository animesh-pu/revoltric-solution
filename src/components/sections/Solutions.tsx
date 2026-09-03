import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scan,
  FlaskConical,
  HeartPulse,
  TestTubes,
  Building2,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import { SOLUTIONS } from "@/data/content";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ReactNode> = {
  scan: <Scan className="w-6 h-6" />,
  "flask-conical": <FlaskConical className="w-6 h-6" />,
  "heart-pulse": <HeartPulse className="w-6 h-6" />,
  "test-tubes": <TestTubes className="w-6 h-6" />,
  "building-2": <Building2 className="w-6 h-6" />,
  "plus-circle": <PlusCircle className="w-6 h-6" />,
};

export function Solutions() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="solutions" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <span className="text-cyan text-xs font-medium tracking-[0.25em] uppercase mb-6 block">
            Our Solutions
          </span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Complete Healthcare Solutions.
          </h2>
        </SectionReveal>
        <SectionReveal delay={0.2}>
          <p className="mt-6 text-lg text-white/40 max-w-2xl leading-relaxed">
            Every category tailored to support hospitals, diagnostic centres, and healthcare facilities with professional-grade products and services.
          </p>
        </SectionReveal>

        <AnimatedLineDivider className="my-12" />

        {/* Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((solution, index) => {
            const isExpanded = expandedId === solution.id;
            return (
              <SectionReveal key={solution.id} delay={index * 0.08}>
                <motion.div
                  layout
                  className={cn(
                    "group relative rounded-2xl border transition-all duration-500 overflow-hidden cursor-pointer",
                    isExpanded
                      ? "border-cyan/30 bg-cyan/[0.04]"
                      : "border-white/5 bg-white/[0.02] hover:border-cyan/15 hover:bg-white/[0.03]"
                  )}
                  onClick={() => setExpandedId(isExpanded ? null : solution.id)}
                >
                  {/* Card Content */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
                        isExpanded
                          ? "bg-cyan/15 text-cyan"
                          : "bg-white/5 text-white/40 group-hover:text-cyan/70"
                      )}>
                        {ICON_MAP[solution.icon]}
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-white/20"
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {/* Expanded Products List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                      >
                        <div className="px-8 pb-8 border-t border-white/5 pt-4">
                          <p className="text-xs text-white/30 uppercase tracking-wider mb-3">
                            Products
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {solution.products.map((product) => (
                              <span
                                key={product}
                                className="px-3 py-1.5 text-xs text-white/50 bg-white/[0.04] rounded-lg border border-white/5"
                              >
                                {product}
                              </span>
                            ))}
                          </div>
                          <Link
                            to={`/products?category=${solution.id}`}
                            className="mt-4 inline-flex items-center gap-2 text-xs text-cyan hover:text-white transition-colors font-medium"
                          >
                            Browse {solution.title} Products
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom accent line */}
                  <div className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300",
                    isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}>
                    <div className="h-full bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
                  </div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
