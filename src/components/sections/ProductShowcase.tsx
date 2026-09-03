import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS, SHOWCASE_CATEGORIES } from "@/data/content";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";
import { cn } from "@/lib/utils";

export function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState(SHOWCASE_CATEGORIES[0]);

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.category === activeCategory ||
      (activeCategory === "Critical Care" &&
        ["Ventilator", "Patient Monitor", "Infusion Pump", "ECG Machine"].some(
          (kw) => p.name.includes(kw)
        ))
  ).slice(0, 3);

  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <span className="text-cyan text-xs font-medium tracking-[0.25em] uppercase mb-6 block">
            Product Showcase
          </span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Precision-Engineered.
          </h2>
        </SectionReveal>

        <AnimatedLineDivider className="my-12" />

        {/* Category Tabs */}
        <SectionReveal delay={0.2}>
          <div className="flex overflow-x-auto gap-2 pb-4 mb-12 scrollbar-hide">
            {SHOWCASE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 shrink-0",
                  activeCategory === cat
                    ? "bg-cyan/15 text-cyan border border-cyan/30"
                    : "text-white/40 border border-white/5 hover:border-white/15 hover:text-white/60 bg-transparent"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Product Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 overflow-hidden transition-all duration-500"
              >
                {/* Product Image */}
                <div className="aspect-[4/3] relative overflow-hidden bg-white/[0.02]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-2xl bg-cyan/[0.08] flex items-center justify-center text-cyan/40 group-hover:text-cyan group-hover:bg-cyan/[0.12] transition-all duration-500">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1}
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-cyan/0 group-hover:bg-cyan/[0.02] transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-6">
                  <span className="text-[10px] text-cyan/60 uppercase tracking-wider font-medium">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-2 mb-2 group-hover:text-gradient transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed line-clamp-2 mb-3">
                    {product.shortDescription}
                  </p>
                  <span className="text-sm font-semibold text-white/60">
                    {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price)}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <SectionReveal delay={0.1}>
          <div className="mt-12 text-center">
            <a
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-white/50 hover:text-cyan hover:border-cyan/30 text-sm font-medium transition-all duration-300"
            >
              View All Products
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
