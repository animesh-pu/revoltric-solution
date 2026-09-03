import { useState } from "react";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";
import { useAuth } from "@/hooks/use-auth";

export function Contact() {
  const { user, isLoading: authLoading } = useAuth();
  const [searchParams] = useSearchParams();
  const quotedProduct = searchParams.get("product") || undefined;
  const createEnquiry = useMutation(api.crm.createEnquiry);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    requirement: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorText("");
    try {
      await createEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        requirement: formData.requirement || quotedProduct || undefined,
        message: formData.message || undefined,
        productName: quotedProduct,
        source: quotedProduct ? "quote" : "contact",
        userId: user?._id,
      });
      setStatus("sent");
    } catch (error) {
      console.error("Enquiry submission failed:", error);
      setStatus("error");
      setErrorText(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or contact us directly.",
      );
    }
  };

  const inputClass =
    "bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 focus:ring-cyan/20 h-12 rounded-xl";

  return (
    <section id="contact" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionReveal>
          <span className="text-cyan text-xs font-medium tracking-[0.25em] uppercase mb-6 block">
            Get In Touch
          </span>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Get in <span className="text-gradient">Touch.</span>
          </h2>
        </SectionReveal>

        <AnimatedLineDivider className="my-12" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <SectionReveal delay={0.15}>
            {status === "sent" ? (
              <div className="lg:col-span-3 rounded-2xl border border-cyan/20 bg-cyan/[0.03] p-10 text-center">
                <CheckCircle2 className="w-14 h-14 text-cyan mx-auto mb-5" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Enquiry Sent
                </h3>
                <p className="text-white/40 text-sm leading-relaxed max-w-md mx-auto">
                  Thank you{formData.name ? `, ${formData.name.split(" ")[0]}` : ""} — your
                  enquiry has been received by the Revoltric Solutions team.
                  We'll get back to you within one business day.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({
                      name: "",
                      company: "",
                      phone: "",
                      email: "",
                      requirement: "",
                      message: "",
                    });
                  }}
                  className="mt-8 border-white/10 text-white/50 hover:text-white px-6 py-2.5 rounded-lg bg-transparent"
                >
                  Send Another Enquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
                {quotedProduct && (
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-cyan/20 bg-cyan/[0.05] text-sm">
                    <Send className="w-4 h-4 text-cyan mt-0.5 shrink-0" />
                    <p className="text-cyan/90">
                      Requesting a quote for{" "}
                      <span className="font-semibold text-cyan">{quotedProduct}</span>.
                      Add quantities and requirements below.
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-white/50">
                      Name <span className="text-cyan">*</span>
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={inputClass}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-sm text-white/50">
                      Company / Hospital
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className={inputClass}
                      placeholder="Hospital or company name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm text-white/50">
                      Phone <span className="text-cyan">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={inputClass}
                      placeholder="+91 79780 36219"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-white/50">
                      Email <span className="text-cyan">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={inputClass}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirement" className="text-sm text-white/50">
                    Requirement
                  </Label>
                  <Input
                    id="requirement"
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className={inputClass}
                    placeholder="e.g. Radiology Equipment, Lab Setup, ICU Setup"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm text-white/50">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 focus:ring-cyan/20 rounded-xl min-h-[120px] resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{errorText}</p>
                )}

                <Button
                  type="submit"
                  disabled={status === "sending" || authLoading}
                  className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-8 py-3.5 rounded-lg text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Enquiry
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </SectionReveal>

          {/* Contact Info */}
          <SectionReveal delay={0.25}>
            <div className="lg:col-span-2 space-y-8">
              <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.02]">
                <h3 className="text-lg font-semibold text-white mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 mb-1">Phone</p>
                      <a href="tel:+917978036219" className="text-sm text-white/70 hover:text-cyan transition-colors">
                        +91 79780 36219
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 mb-1">Email</p>
                      <a href="mailto:revoltricsolutions@gmail.com" className="text-sm text-white/70 hover:text-cyan transition-colors">
                        revoltricsolutions@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 mb-1">Office Address</p>
                      <p className="text-sm text-white/70">
                        Sector 3, 6B, Niladri Vihar,<br />
                        Bhubaneswar — 751021<br />
                        Odisha, India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 mb-1">WhatsApp</p>
                      <a href="https://wa.me/917978036219" target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-cyan transition-colors">
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="rounded-2xl border border-white/5 overflow-hidden">
                <div className="aspect-[4/3] w-full relative">
                  <iframe
                    title="Revoltric Solutions — Niladri Vihar, Bhubaneswar"
                    src="https://www.google.com/maps?q=Niladri+Vihar,+Bhubaneswar,+Odisha+751021&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full border-0 grayscale contrast-[1.05] opacity-80"
                    allowFullScreen
                  />
                </div>
                <div className="px-5 py-4 bg-white/[0.02] border-t border-white/5 flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-cyan shrink-0" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Niladri+Vihar+Bhubaneswar+751021"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/50 hover:text-cyan transition-colors"
                  >
                    Sector 3, 6B, Niladri Vihar, Bhubaneswar — 751021 — Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
