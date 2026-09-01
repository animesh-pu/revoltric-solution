import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Download,
  ShoppingCart,
  Tag,
  FileText,
  Calendar,
} from "lucide-react";
import { PRODUCTS } from "@/data/content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => PRODUCTS.find((p) => p.id === id), [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Product Not Found</h1>
          <p className="text-white/40 mb-8">The product you're looking for doesn't exist in our catalogue.</p>
          <Link to="/products">
            <Button className="bg-cyan text-navy font-semibold px-6 py-2.5 rounded-lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />

      {/* Breadcrumb */}
      <div className="pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-cyan transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <SectionReveal>
            <div className="aspect-square rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center relative overflow-hidden">
              <div className="w-32 h-32 rounded-3xl bg-cyan/[0.08] flex items-center justify-center text-cyan/30">
                <FileText className="w-12 h-12" />
              </div>
              <div className="absolute top-6 left-6">
                <span className="px-3 py-1.5 rounded-lg bg-cyan/10 text-cyan text-xs font-medium border border-cyan/20">
                  {product.category}
                </span>
              </div>
              {product.inStock && (
                <div className="absolute top-6 right-6">
                  <span className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                    In Stock
                  </span>
                </div>
              )}
            </div>
          </SectionReveal>

          {/* Info */}
          <SectionReveal delay={0.1}>
            <div className="flex flex-col justify-center">
              <span className="text-cyan text-xs font-medium tracking-[0.2em] uppercase mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-bold text-gradient">{formatPrice(product.price)}</span>
                <span className="text-xs text-white/25 ml-2">excl. taxes · shipping calculated at checkout</span>
              </div>

              <p className="text-lg text-white/45 leading-relaxed mb-8">
                {product.shortDescription}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link to="/cart">
                  <Button className="group bg-cyan hover:bg-cyan-dim text-navy font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </Link>
                <Link to="/schedule">
                  <Button
                    variant="outline"
                    className="border-white/10 hover:border-cyan/30 text-white/60 hover:text-white font-medium px-8 py-3.5 rounded-lg transition-all duration-300 bg-transparent"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book a Demo
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-white/10 hover:border-cyan/30 text-white/40 hover:text-white font-medium px-6 py-3.5 rounded-lg transition-all duration-300 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Brochure
                </Button>
              </div>

              {/* Applications Tags */}
              <div>
                <p className="text-xs text-white/30 uppercase tracking-wider mb-3">Applications</p>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1.5 text-xs text-white/50 bg-white/[0.04] rounded-lg border border-white/5"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      <AnimatedLineDivider className="max-w-7xl mx-auto px-6" />

      {/* Details Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Key Features */}
        <SectionReveal>
          <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="space-y-4">
              {product.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-cyan/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-cyan" />
                  </div>
                  <span className="text-sm text-white/60 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>

        {/* Technical Specifications */}
        <SectionReveal delay={0.1}>
          <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
            <h2 className="text-2xl font-bold text-white mb-6">Technical Specifications</h2>
            <div className="space-y-0">
              {Object.entries(product.specifications).map(([key, value], i) => (
                <div
                  key={key}
                  className={cn(
                    "flex items-center justify-between py-3",
                    i < Object.entries(product.specifications).length - 1
                      ? "border-b border-white/5"
                      : ""
                  )}
                >
                  <span className="text-sm text-white/40 flex items-center gap-2">
                    <Tag className="w-3 h-3 text-cyan/40" />
                    {key}
                  </span>
                  <span className="text-sm text-white/70 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <SectionReveal>
          <h2 className="text-2xl font-bold text-white mb-8">Related Products</h2>
        </SectionReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
            .slice(0, 3)
            .map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/products/${relatedProduct.id}`}
                  className="group block rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 overflow-hidden transition-all duration-500"
                >
                  <div className="aspect-[4/3] bg-white/[0.02] flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-cyan/[0.06] flex items-center justify-center text-cyan/30 group-hover:text-cyan transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] text-cyan/50 uppercase tracking-wider">
                      {relatedProduct.category}
                    </span>
                    <h3 className="text-base font-semibold text-white mt-1 group-hover:text-cyan transition-colors">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-sm text-white/40 mt-1">{formatPrice(relatedProduct.price)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
