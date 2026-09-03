import { useState } from "react";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionReveal, Stagger, AnimatedLineDivider } from "@/components/animations";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    requirement: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend/CMS
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
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
                    className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 focus:ring-cyan/20 h-12 rounded-xl"
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
                    className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 focus:ring-cyan/20 h-12 rounded-xl"
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
                    className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 focus:ring-cyan/20 h-12 rounded-xl"
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
                    className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 focus:ring-cyan/20 h-12 rounded-xl"
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
                  className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 focus:ring-cyan/20 h-12 rounded-xl"
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

              <Button
                type="submit"
                className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-8 py-3.5 rounded-lg text-base transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]"
              >
                {submitted ? (
                  "Sent Successfully!"
                ) : (
                  <>
                    Send Enquiry
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
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
