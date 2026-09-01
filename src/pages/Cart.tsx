import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import { PRODUCTS } from "@/data/content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";

interface CartItem {
  productId: string;
  quantity: number;
}

// Demo cart items
const DEMO_CART: CartItem[] = [
  { productId: "patient-monitor", quantity: 5 },
  { productId: "infusion-pump", quantity: 10 },
  { productId: "biochemistry-analyzer", quantity: 1 },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>(DEMO_CART);

  const cartProducts = items
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter(Boolean) as (CartItem & { product: typeof PRODUCTS[0] })[];

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

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
              {items.length} item{items.length !== 1 ? "s" : ""} in your cart
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <AnimatedLineDivider className="mb-12" />

        {cartProducts.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <p className="text-white/30 text-lg mb-4">Your cart is empty.</p>
            <Link to="/products">
              <Button className="bg-cyan text-navy font-semibold px-6 py-2.5 rounded-lg">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartProducts.map((item, index) => (
                <motion.div
                  key={item.productId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="flex gap-5 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl bg-cyan/[0.06] flex items-center justify-center text-cyan/30 shrink-0">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] text-cyan/50 uppercase tracking-wider">
                          {item.product.category}
                        </span>
                        <h3 className="text-base font-semibold text-white mt-1">
                          {item.product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-1.5 text-white/20 hover:text-red-400 transition-colors shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.productId, -1)}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, 1)}
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-base font-semibold text-white">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <SectionReveal delay={0.15}>
              <div className="lg:sticky lg:top-28 h-fit p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
                <h2 className="text-lg font-semibold text-white mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  {cartProducts.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-white/40 truncate mr-4">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-white/60 font-medium whitespace-nowrap">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal</span>
                    <span className="text-white/60">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Tax & shipping</span>
                    <span className="text-white/30">Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 mt-4">
                  <div className="flex justify-between mb-6">
                    <span className="text-base font-semibold text-white">Total</span>
                    <span className="text-xl font-bold text-gradient">{formatPrice(subtotal)}</span>
                  </div>
                  <Link to="/checkout">
                    <Button className="w-full bg-cyan hover:bg-cyan-dim text-navy font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <p className="text-[11px] text-white/20 text-center mt-3">
                    Tax and shipping will be calculated based on your location and order.
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
