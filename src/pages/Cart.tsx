import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";
import { useCart, setCartQuantity, removeFromCart } from "@/lib/cart";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Cart() {
  const { lines, count, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />

      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-cyan transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <SectionReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Your <span className="text-gradient">Cart</span>
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="mt-3 text-white/40">
              {count === 0
                ? "Your cart is empty"
                : `${count} item${count !== 1 ? "s" : ""} in your cart`}
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <AnimatedLineDivider className="mb-12" />

        {lines.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <p className="text-white/30 text-lg mb-4">
              Your cart is empty. Add equipment from the catalogue to get
              started.
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-6 py-2.5 rounded-lg"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence initial={false}>
                {lines.map((item, index) => (
                  <motion.div
                    key={item.productId}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="flex gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all"
                  >
                    {/* Image */}
                    <Link
                      to={`/products/${item.productId}`}
                      className="w-20 h-20 rounded-xl bg-white/[0.02] shrink-0 overflow-hidden relative block"
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-cyan/[0.06] flex items-center justify-center text-cyan/30">
                          <ShoppingBag className="w-6 h-6" />
                        </div>
                      )}
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] text-cyan/50 uppercase tracking-wider">
                            {item.category}
                          </span>
                          <Link to={`/products/${item.productId}`}>
                            <h3 className="text-base font-semibold text-white mt-1 hover:text-cyan transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="p-1.5 text-white/20 hover:text-red-400 transition-colors shrink-0"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setCartQuantity(item.productId, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-medium text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              setCartQuantity(item.productId, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-base font-semibold text-white">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <SectionReveal delay={0.15}>
              <div className="lg:sticky lg:top-28 h-fit p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
                <h2 className="text-lg font-semibold text-white mb-6">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  {lines.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-white/40 truncate mr-4">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="text-white/60 font-medium whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal</span>
                    <span className="text-white/60">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Tax & shipping</span>
                    <span className="text-white/30">
                      Confirmed on quotation
                    </span>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 mt-4">
                  <div className="flex justify-between mb-6">
                    <span className="text-base font-semibold text-white">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gradient">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <Link to="/checkout">
                    <Button className="w-full bg-cyan hover:bg-cyan-dim text-navy font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <p className="text-[11px] text-white/20 text-center mt-3">
                    Prices exclude GST. Our team confirms the final quotation,
                    taxes and delivery before you pay.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
