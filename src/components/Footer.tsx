import { Link } from "react-router";
import { NAV_LINKS } from "@/data/content";
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
            <div className="lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan to-cyan-dim flex items-center justify-center">
                  <span className="text-navy font-black text-sm">R</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-[0.12em] text-white leading-tight">Revoltric</span>
                  <span className="text-[9px] text-white/30 tracking-[0.2em] uppercase font-medium -mt-0.5">Solutions</span>
                </div>
              </Link>
              <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                Complete hospital and diagnostic solutions. Professional-grade medical equipment, laboratory systems, and healthcare infrastructure — all from one trusted partner.
              </p>
              <div className="flex gap-3 mt-6">
                {["LinkedIn", "Twitter", "Facebook"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    aria-label={social}
                    className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/35 hover:text-cyan hover:bg-white/10 transition-all duration-300"
                  >
                    <span className="text-xs font-medium">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Quick Links */}
          <SectionReveal delay={0.1}>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Quick Links</h4>
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
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Solutions</h4>
              <ul className="space-y-3">
                {["Radiology", "Pathology & Laboratory", "Hospital Equipment", "Consumables", "Infrastructure"].map(
                  (solution) => (
                    <li key={solution}>
                      <Link
                        to="/#solutions"
                        className="text-sm text-white/35 hover:text-cyan transition-colors duration-300"
                      >
                        {solution}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </SectionReveal>

          {/* Contact */}
          <SectionReveal delay={0.3}>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="text-sm text-white/35">
                  <span className="text-white/50 font-medium block mb-1">Phone</span>
                  <a href="tel:+910000000000" className="hover:text-cyan transition-colors">+91 00000 00000</a>
                </li>
                <li className="text-sm text-white/35">
                  <span className="text-white/50 font-medium block mb-1">Email</span>
                  <a href="mailto:info@revoltric.com" className="hover:text-cyan transition-colors">info@revoltric.com</a>
                </li>
                <li className="text-sm text-white/35">
                  <span className="text-white/50 font-medium block mb-1">Office</span>
                  <span>Revoltric Solutions,<br />[Address Placeholder], India</span>
                </li>
              </ul>
            </div>
          </SectionReveal>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {currentYear} Revoltric Solutions. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
