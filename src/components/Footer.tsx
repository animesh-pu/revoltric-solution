import { Link } from "react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.svg";
import { NAV_LINKS, SOLUTIONS } from "@/data/content";
import { SectionReveal } from "@/components/animations";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-navy border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <SectionReveal>
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5 mb-6 group">
                <img
                  src={logo}
                  alt="Revoltric Solutions"
                  width={42}
                  height={42}
                  className="rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-[0.1em] text-white leading-tight">
                    Revoltric
                  </span>
                  <span className="text-[8px] text-cyan/70 tracking-[0.22em] uppercase font-semibold -mt-0.5">
                    Healthcare Solutions
                  </span>
                </div>
              </Link>
              <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                Trusted diagnostic experts — precision diagnostic equipment and
                dependable service for hospitals, labs, and clinics. One
                professional partner for complete healthcare solutions.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-6">
                <a
                  href="https://wa.me/917978036219"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/35 hover:text-cyan hover:bg-white/10 transition-all duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a
                  href="tel:+917978036219"
                  aria-label="Call Revoltric Solutions"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/35 hover:text-cyan hover:bg-white/10 transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="mailto:revoltricsolutions@gmail.com"
                  aria-label="Email Revoltric Solutions"
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/35 hover:text-cyan hover:bg-white/10 transition-all duration-300"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </SectionReveal>

          {/* Quick Links */}
          <SectionReveal delay={0.1}>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/35 hover:text-cyan transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Solutions */}
          <SectionReveal delay={0.2}>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                Solutions
              </h4>
              <ul className="space-y-3">
                {SOLUTIONS.filter((s) => s.id !== "other")
                  .slice(0, 5)
                  .map((solution) => (
                    <li key={solution.id}>
                      <Link
                        to={`/products?category=${solution.id}`}
                        className="text-sm text-white/35 hover:text-cyan transition-colors duration-300"
                      >
                        {solution.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Contact */}
          <SectionReveal delay={0.3}>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">
                Contact
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-cyan/60 mt-0.5 shrink-0" />
                  <a href="tel:+917978036219" className="text-sm text-white/35 hover:text-cyan transition-colors">
                    +91 79780 36219
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-cyan/60 mt-0.5 shrink-0" />
                  <a href="mailto:revoltricsolutions@gmail.com" className="text-sm text-white/35 hover:text-cyan transition-colors break-all">
                    revoltricsolutions@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-cyan/60 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/35">
                    Sector 3, 6B, Niladri Vihar,
                    <br />
                    Bhubaneswar — 751021, Odisha
                  </span>
                </li>
              </ul>
            </div>
          </SectionReveal>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            © {currentYear} Revoltric Solutions. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Complete Hospital &amp; Diagnostic Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
