import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ClipboardList,
  Truck,
  ShieldCheck,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";
import { useCart, clearCart } from "@/lib/cart";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

type Step = "details" | "review" | "done";

const PAYMENT_OPTIONS = [
  {
    value: "Bank Transfer",
    title: "Bank Transfer",
    description: "NEFT / IMPS / RTGS against our official quotation.",
  },
  {
    value: "UPI",
    title: "UPI",
    description: "Pay via any UPI app using the payment details we share.",
  },
  {
    value: "To be confirmed",
    title: "To be confirmed",
    description: "Our team will suggest the best option for your facility.",
  },
];

export default function Checkout() {
  const { lines, count, total } = useCart();
  const navigate = useNavigate();
  const createOrder = useMutation(api.crm.createOrder);
  const [step, setStep] = useState<Step>("details");
  const [placing, setPlacing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "Bank Transfer",
    notes: "",
  });

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      const result = await createOrder({
        customerName: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company || undefined,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        notes: form.notes || undefined,
        paymentMethod: form.paymentMethod,
        items: lines.map((line) => ({
          productId: line.productId,
          name: line.name,
          category: line.category,
          image: line.image,
          price: line.price,
          quantity: line.quantity,
        })),
      });
      setPlacedOrder(result.orderNumber);
      clearCart();
      setStep("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Order placement failed:", error);
      toast.error(
        error instanceof Error ? error.message : "Could not place your order. Please try again.",
      );
    } finally {
      setPlacing(false);
    }
  };

  const detailsComplete =
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.state.trim() &&
    form.pincode.trim();

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
      {step !== "done" && (
        <div className="max-w-6xl mx-auto px-6 mb-12">
          <div className="flex items-center justify-center gap-0">
            {[
              { key: "details", label: "Details", icon: <ClipboardList className="w-4 h-4" /> },
              { key: "review", label: "Review & Place", icon: <Truck className="w-4 h-4" /> },
            ].map((s, i) => {
              const active = step === s.key;
              const done = step === "review" && s.key === "details";
              return (
                <div key={s.key} className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                        active
                          ? "bg-cyan text-navy"
                          : done
                            ? "bg-cyan/20 text-cyan"
                            : "bg-white/5 text-white/25"
                      }`}
                    >
                      {done ? <Check className="w-3.5 h-3.5" /> : s.icon}
                    </div>
                    <span
                      className={`text-sm font-medium hidden sm:block ${
                        active ? "text-white" : "text-white/30"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i === 0 && <div className="w-12 sm:w-20 h-px mx-3 bg-white/8" />}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <AnimatedLineDivider className="mb-12" />

        {step === "done" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 max-w-2xl mx-auto"
          >
            <div className="w-20 h-20 rounded-full bg-cyan/15 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-cyan" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Order Request Received
            </h2>
            <p className="text-white/40 max-w-md mx-auto mb-2">
              Your order reference is{" "}
              <span className="text-cyan font-mono text-sm">{placedOrder}</span>.
            </p>
            <p className="text-white/30 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Our team will review your requirements and respond within one
              business day with the formal quotation, tax breakdown, delivery
              timelines and payment details. You can track this order anytime
              from your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/dashboard">
                <Button className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-6 py-2.5 rounded-lg">
                  View in Dashboard
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  variant="outline"
                  className="border-white/10 text-white/50 hover:text-white px-6 py-2.5 rounded-lg bg-transparent"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : lines.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="w-16 h-16 text-white/10 mx-auto mb-6" />
            <p className="text-white/30 text-lg mb-4">
              Your cart is empty — add products before checking out.
            </p>
            <Button
              onClick={() => navigate("/products")}
              className="bg-cyan text-navy font-semibold px-6 py-2.5 rounded-lg"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form Area */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {step === "details" && (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                      <ClipboardList className="w-5 h-5 text-cyan" />
                      Delivery & Contact Details
                    </h2>
                    <div className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm text-white/50">
                            Full Name *
                          </Label>
                          <Input id="name" required value={form.name} onChange={set("name")}
                            className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                            placeholder="Your full name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm text-white/50">
                            Email *
                          </Label>
                          <Input id="email" type="email" required value={form.email} onChange={set("email")}
                            className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                            placeholder="you@email.com" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-sm text-white/50">
                            Phone *
                          </Label>
                          <Input id="phone" type="tel" required value={form.phone} onChange={set("phone")}
                            className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                            placeholder="+91 79780 36219" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-sm text-white/50">
                            Company / Hospital
                          </Label>
                          <Input id="company" value={form.company} onChange={set("company")}
                            className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                            placeholder="Organization name" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm text-white/50">
                          Delivery Address *
                        </Label>
                        <Input id="address" required value={form.address} onChange={set("address")}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                          placeholder="Street address, building, floor" />
                      </div>
                      <div className="grid grid-cols-3 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-sm text-white/50">
                            City *
                          </Label>
                          <Input id="city" required value={form.city} onChange={set("city")}
                            className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                            placeholder="City" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state" className="text-sm text-white/50">
                            State *
                          </Label>
                          <Input id="state" required value={form.state} onChange={set("state")}
                            className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                            placeholder="State" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode" className="text-sm text-white/50">
                            PIN Code *
                          </Label>
                          <Input id="pincode" inputMode="numeric" required value={form.pincode} onChange={set("pincode")}
                            className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                            placeholder="000000" />
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <Label className="text-sm text-white/50">
                          Preferred Payment Method
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {PAYMENT_OPTIONS.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, paymentMethod: opt.value }))}
                              className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                                form.paymentMethod === opt.value
                                  ? "border-cyan/40 bg-cyan/[0.06]"
                                  : "border-white/5 bg-white/[0.02] hover:border-white/15"
                              }`}
                            >
                              <p className={`text-sm font-medium ${form.paymentMethod === opt.value ? "text-cyan" : "text-white/60"}`}>
                                {opt.title}
                              </p>
                              <p className="text-[10px] text-white/30 mt-1 leading-relaxed">
                                {opt.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm text-white/50">
                          Order Notes (Optional)
                        </Label>
                        <Textarea id="notes" value={form.notes} onChange={set("notes")}
                          className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 rounded-xl min-h-[80px] resize-none"
                          placeholder="Special delivery instructions or requirements" />
                      </div>
                    </div>
                    <Button
                      onClick={() => setStep("review")}
                      disabled={!detailsComplete}
                      className="mt-8 bg-cyan hover:bg-cyan-dim text-navy font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continue to Review
                    </Button>
                  </motion.div>
                )}

                {step === "review" && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                      <Truck className="w-5 h-5 text-cyan" />
                      Review Your Order
                    </h2>
                    <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 space-y-4">
                      <div>
                        <p className="text-xs text-white/30 uppercase tracking-wider mb-3">
                          {count} item{count !== 1 ? "s" : ""} ·{" "}
                          {form.paymentMethod}
                        </p>
                        <div className="space-y-2">
                          {lines.map((line) => (
                            <div key={line.productId} className="flex justify-between text-sm">
                              <span className="text-white/40">
                                {line.name} × {line.quantity}
                              </span>
                              <span className="text-white/70 font-medium">
                                {formatPrice(line.price * line.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-t border-white/5 pt-4 flex justify-between">
                        <span className="text-sm text-white/50">Estimated total</span>
                        <span className="text-lg font-bold text-gradient">
                          {formatPrice(total)}
                        </span>
                      </div>
                      <div className="text-xs text-white/25 leading-relaxed">
                        Final pricing, GST and delivery charges are confirmed on
                        the official quotation. No payment is taken on this
                        website.
                      </div>
                    </div>

                    <div className="flex gap-3 mt-8">
                      <Button
                        variant="outline"
                        onClick={() => setStep("details")}
                        className="border-white/10 text-white/50 hover:text-white px-6 py-3 rounded-lg bg-transparent"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePlaceOrder}
                        disabled={placing}
                        className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-60"
                      >
                        {placing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Placing order...
                          </>
                        ) : (
                          <>Place Order Request</>
                        )}
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-6 text-xs text-white/25">
                      <ShieldCheck className="w-4 h-4 text-cyan/40" />
                      <span>
                        Secure checkout — your details go straight to the
                        Revoltric Solutions team.
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            {step !== "done" && (
              <SectionReveal delay={0.1}>
                <div className="lg:sticky lg:top-28 h-fit p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-3 mb-4">
                    {lines.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span className="text-white/40 truncate mr-3">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-white/60 font-medium whitespace-nowrap">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/5 pt-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-semibold text-white">Total</span>
                      <span className="text-lg font-bold text-gradient">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
