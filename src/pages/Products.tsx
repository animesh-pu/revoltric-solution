import { useState, useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Search, X, ArrowRight, FileText } from "lucide-react";
import { PRODUCTS, SOLUTIONS } from "@/data/content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";
import { cn } from "@/lib/utils";

export default function Products() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = useMemo(
    () => [
      { id: null, label: "All Products" },
      ...SOLUTIONS.filter((s) => s.id !== "other").map((s) => ({
        id: s.id,
        label: s.title,
      })),
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        !activeCategory || product.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />

      {/* Header */}
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <span className="text-cyan text-xs font-medium tracking-[0.25em] uppercase mb-4 block">
              Products
            </span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              Medical Technology<br />
              <span className="text-gradient">Catalogue</span>
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="mt-6 text-lg text-white/40 max-w-2xl leading-relaxed">
              Professional-grade products curated for hospitals, diagnostic centres, and healthcare facilities.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <AnimatedLineDivider className="mb-12" />

        {/* Search and Filters */}
        <SectionReveal>
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-11 pr-10 py-3 bg-white/[0.03] border border-white/8 rounded-xl text-white placeholder:text-white/25 text-sm focus:outline-none focus:border-cyan/40 focus:ring-1 focus:ring-cyan/20 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id ?? "all"}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 shrink-0",
                    (activeCategory === cat.id || (!activeCategory && !cat.id))
                      ? "bg-cyan/15 text-cyan border border-cyan/30"
                      : "text-white/40 border border-white/5 hover:border-white/15 hover:text-white/60"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Results Count */}
        <p className="text-sm text-white/30 mb-8">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Link
                to={`/products/${product.id}`}
                className="group block rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 overflow-hidden transition-all duration-500"
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
                      <div className="w-16 h-16 rounded-2xl bg-cyan/[0.08] flex items-center justify-center text-cyan/30 group-hover:text-cyan group-hover:bg-cyan/[0.12] transition-all duration-500">
                        <FileText className="w-6 h-6" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-6">
                  <span className="text-[10px] text-cyan/50 uppercase tracking-wider font-medium">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-2 mb-2 group-hover:text-cyan transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-white/35 leading-relaxed line-clamp-2 mb-3">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white/80">
                      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(product.price)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-cyan/70 font-medium">
                      Details
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/30 text-lg">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory(null);
              }}
              className="mt-4 text-cyan text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
