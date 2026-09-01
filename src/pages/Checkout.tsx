import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, CreditCard, Building, Truck, ShieldCheck } from "lucide-react";
import { PRODUCTS } from "@/data/content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

const DEMO_ITEMS = [
  { productId: "patient-monitor", quantity: 5 },
  { productId: "infusion-pump", quantity: 10 },
  { productId: "biochemistry-analyzer", quantity: 1 },
];

type Step = "shipping" | "payment" | "confirmation";

export default function Checkout() {
  const [step, setStep] = useState<Step>("shipping");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
    notes: "",
  });

  const cartProducts = DEMO_ITEMS.map((item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return product ? { ...item, product } : null;
  }).filter(Boolean) as { productId: string; quantity: number; product: typeof PRODUCTS[0] }[];

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "shipping", label: "Shipping", icon: <Truck className="w-4 h-4" /> },
    { key: "payment", label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
    { key: "confirmation", label: "Confirmation", icon: <Check className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />

      <div className="pt-32 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-cyan transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>

          <SectionReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              <span className="text-gradient">Checkout</span>
            </h1>
          </SectionReveal>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex items-center justify-center gap-0">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    step === s.key
                      ? "bg-cyan text-navy"
                      : steps.findIndex((x) => x.key === step) > i
                      ? "bg-cyan/20 text-cyan"
                      : "bg-white/5 text-white/25"
                  }`}
                >
                  {steps.findIndex((x) => x.key === step) > i ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    s.icon
                  )}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${
                    step === s.key ? "text-white" : "text-white/30"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-12 sm:w-20 h-px mx-3 bg-white/8" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <AnimatedLineDivider className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === "shipping" && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Truck className="w-5 h-5 text-cyan" />
                    Shipping Information
                  </h2>
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm text-white/50">Full Name *</Label>
                        <Input id="name" name="name" required value={formData.name} onChange={handleChange}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="Your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm text-white/50">Email *</Label>
                        <Input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="you@email.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm text-white/50">Phone *</Label>
                        <Input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="+91 00000 00000" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company" className="text-sm text-white/50">Company / Hospital</Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleChange}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="Organization name" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-sm text-white/50">Delivery Address *</Label>
                      <Input id="address" name="address" required value={formData.address} onChange={handleChange}
                        className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="Street address, building, floor" />
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm text-white/50">City *</Label>
                        <Input id="city" name="city" required value={formData.city} onChange={handleChange}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="City" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm text-white/50">State *</Label>
                        <Input id="state" name="state" required value={formData.state} onChange={handleChange}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="State" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-sm text-white/50">PIN Code *</Label>
                        <Input id="pincode" name="pincode" required value={formData.pincode} onChange={handleChange}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="000000" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm text-white/50">Order Notes (Optional)</Label>
                      <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange}
                        className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 rounded-xl min-h-[80px] resize-none"
                        placeholder="Special delivery instructions or requirements" />
                    </div>
                  </div>
                  <Button onClick={() => setStep("payment")} className="mt-8 bg-cyan hover:bg-cyan-dim text-navy font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                    Continue to Payment
                  </Button>
                </motion.div>
              )}

              {step === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-cyan" />
                    Payment Details
                  </h2>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-sm text-white/50">Name on Card *</Label>
                      <Input id="cardName" name="cardName" required value={formData.cardName} onChange={handleChange}
                        className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="As printed on card" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-sm text-white/50">Card Number *</Label>
                      <Input id="cardNumber" name="cardNumber" required value={formData.cardNumber} onChange={handleChange}
                        className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl font-mono" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="cardExpiry" className="text-sm text-white/50">Expiry *</Label>
                        <Input id="cardExpiry" name="cardExpiry" required value={formData.cardExpiry} onChange={handleChange}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl font-mono" placeholder="MM / YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardCvv" className="text-sm text-white/50">CVV *</Label>
                        <Input id="cardCvv" name="cardCvv" type="password" required value={formData.cardCvv} onChange={handleChange}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl font-mono" placeholder="•••" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-6 text-xs text-white/25">
                    <ShieldCheck className="w-4 h-4 text-cyan/40" />
                    <span>Your payment information is encrypted and secure.</span>
                  </div>

                  <div className="flex gap-3 mt-8">
                    <Button variant="outline" onClick={() => setStep("shipping")}
                      className="border-white/10 text-white/50 hover:text-white px-6 py-3 rounded-lg bg-transparent">
                      Back
                    </Button>
                    <Button onClick={() => setStep("confirmation")}
                      className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                      Place Order — {formatPrice(subtotal)}
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === "confirmation" && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 rounded-full bg-cyan/15 flex items-center justify-center mx-auto mb-8">
                    <Check className="w-10 h-10 text-cyan" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Order Placed Successfully</h2>
                  <p className="text-white/40 max-w-md mx-auto mb-2">
                    Your order <span className="text-cyan font-mono text-sm">ORD-{Date.now().toString().slice(-6)}</span> has been received.
                  </p>
                  <p className="text-white/30 text-sm max-w-md mx-auto mb-8">
                    Our team will review your order and get in touch within 24 hours to confirm delivery timelines and any additional details.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/dashboard">
                      <Button className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-6 py-2.5 rounded-lg">
                        View in Dashboard
                      </Button>
                    </Link>
                    <Link to="/products">
                      <Button variant="outline" className="border-white/10 text-white/50 hover:text-white px-6 py-2.5 rounded-lg bg-transparent">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          {step !== "confirmation" && (
            <SectionReveal delay={0.1}>
              <div className="lg:sticky lg:top-28 h-fit p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {cartProducts.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-white/40 truncate mr-3">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="text-white/60 font-medium whitespace-nowrap">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Subtotal</span>
                    <span className="text-white/60">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">Tax & shipping</span>
                    <span className="text-white/30">At confirmation</span>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-white">Total</span>
                    <span className="text-lg font-bold text-gradient">{formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
