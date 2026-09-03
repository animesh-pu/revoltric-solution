import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  ShoppingCart,
  User,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { NAV_LINKS } from "@/data/content";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useAuth } from "@/hooks/use-auth";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location, setLocation] = useState({ pathname: "/", hash: "" });
  const { count: cartCount } = useCart();
  const { isAuthenticated, isLoading: authLoading, signOut } = useAuth();
  const isAdmin = useQuery(api.crm.isAdmin);
  const navigate = useNavigate();

  const showAccount = isAuthenticated && !authLoading;
  const admin = isAuthenticated && isAdmin === true;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateLocation = () => {
      setLocation({ pathname: window.location.pathname, hash: window.location.hash });
    };
    updateLocation();
    window.addEventListener("popstate", updateLocation);
    return () => window.removeEventListener("popstate", updateLocation);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "glass py-3" : "bg-navy/90 backdrop-blur-sm py-5",
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-[38px] h-[38px] rounded-xl bg-white p-[5px] shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img src={logo} alt="Revoltric Solutions" className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-[0.1em] text-white leading-tight">
                Revoltric
              </span>
              <span className="text-[8px] text-cyan/70 tracking-[0.22em] uppercase font-semibold -mt-0.5">
                Healthcare Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? location.pathname === "/" && !location.hash
                  : link.href.startsWith("#")
                    ? false
                    : location.pathname + location.hash === link.href ||
                      (link.href.startsWith("/#") &&
                        location.pathname === "/" &&
                        location.hash === link.href.slice(1));
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium transition-colors duration-300 rounded-lg",
                    isActive ? "text-cyan" : "text-white/50 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/cart"
              className="relative p-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-300"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-cyan text-navy text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {admin && (
              <Link to="/admin">
                <Button
                  variant="outline"
                  className="border-white/10 hover:border-cyan/30 text-white/60 hover:text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-all duration-300 bg-transparent"
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Admin
                </Button>
              </Link>
            )}
            {showAccount ? (
              <Link to="/dashboard">
                <Button className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-5 py-2.5 rounded-lg text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              to="/cart"
              className="relative p-2 text-white/40 hover:text-white transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-cyan text-navy text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy/98 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="absolute inset-0 pt-24 px-8 overflow-y-auto"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                  >
                    <Link
                      to={link.href}
                      className="flex items-center justify-between py-4 text-2xl font-semibold text-white/80 hover:text-cyan transition-colors border-b border-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                      <ChevronRight className="w-5 h-5 text-white/20" />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8 space-y-3"
              >
                {showAccount ? (
                  <>
                    <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-cyan hover:bg-cyan-dim text-navy font-semibold py-3 rounded-lg text-base">
                        <User className="w-4 h-4 mr-2" />
                        My Dashboard
                      </Button>
                    </Link>
                    {admin && (
                      <Link to="/admin" onClick={() => setMobileOpen(false)}>
                        <Button
                          variant="outline"
                          className="w-full border-white/10 text-white/60 font-medium py-3 rounded-lg text-base bg-transparent"
                        >
                          <ShieldCheck className="w-4 h-4 mr-2" />
                          Admin Panel
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="w-full text-white/40 hover:text-white py-3 rounded-lg text-base"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-cyan hover:bg-cyan-dim text-navy font-semibold py-3 rounded-lg text-base">
                      Sign In / Create Account
                    </Button>
                  </Link>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-8 text-center text-white/20 text-xs"
              >
                <p>© {new Date().getFullYear()} Revoltric Solutions</p>
                <p className="mt-1">+91 79780 36219 · revoltricsolutions@gmail.com</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
