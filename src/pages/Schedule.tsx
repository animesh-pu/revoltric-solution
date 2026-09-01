import { useState, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Check, ChevronLeft, ChevronRight, Video, MapPin } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SectionReveal, AnimatedLineDivider } from "@/components/animations";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM",
];

type BookingType = "video" | "phone" | "visit";

export default function Schedule() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingType, setBookingType] = useState<BookingType>("video");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    topic: "",
    message: "",
  });

  // Generate next 14 days
  const dates = useMemo(() => {
    const result: { date: Date; label: string; day: string; dayNum: string; month: string }[] = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      result.push({
        date: d,
        label: d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }),
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        dayNum: d.getDate().toString(),
        month: d.toLocaleDateString("en-US", { month: "short" }),
      });
    }
    return result;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const bookingTypes: { key: BookingType; label: string; icon: React.ReactNode; desc: string }[] = [
    { key: "video", label: "Video Call", icon: <Video className="w-5 h-5" />, desc: "Meet online via Zoom or Google Meet" },
    { key: "phone", label: "Phone Call", icon: <Clock className="w-5 h-5" />, desc: "We'll call you at the scheduled time" },
    { key: "visit", label: "On-Site Visit", icon: <MapPin className="w-5 h-5" />, desc: "Our team visits your facility" },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-navy">
        <Navigation />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-6"
          >
            <div className="w-20 h-20 rounded-full bg-cyan/15 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-cyan" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Demo Booked</h2>
            <p className="text-white/40 mb-2">
              Your {bookingType === "video" ? "video call" : bookingType === "phone" ? "phone call" : "on-site visit"} is scheduled for{" "}
              <span className="text-cyan">{selectedDate}</span> at <span className="text-cyan">{selectedTime}</span>.
            </p>
            <p className="text-white/30 text-sm mb-8">
              You'll receive a confirmation email with all the details shortly. Our team will reach out if anything needs to be adjusted.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/dashboard">
                <Button className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-6 py-2.5 rounded-lg">
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" className="border-white/10 text-white/50 hover:text-white px-6 py-2.5 rounded-lg bg-transparent">
                  Browse Products
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />

      <div className="pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-cyan transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <SectionReveal>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Schedule a <span className="text-gradient">Demo</span>
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="mt-3 text-white/40 max-w-2xl">
              Book a consultation or product demonstration with our specialists. We'll walk you through features, specifications, and configurations tailored to your facility.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <AnimatedLineDivider className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-10">
            {/* Booking Type */}
            <SectionReveal>
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Meeting Type</h3>
                <div className="grid grid-cols-3 gap-3">
                  {bookingTypes.map((bt) => (
                    <button
                      key={bt.key}
                      onClick={() => setBookingType(bt.key)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-5 rounded-xl border text-center transition-all duration-300",
                        bookingType === bt.key
                          ? "border-cyan/40 bg-cyan/[0.06] text-cyan"
                          : "border-white/5 bg-white/[0.02] text-white/35 hover:border-white/15"
                      )}
                    >
                      {bt.icon}
                      <span className="text-sm font-medium">{bt.label}</span>
                      <span className="text-[10px] text-white/25 leading-tight">{bt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Date Picker */}
            <SectionReveal delay={0.1}>
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Select Date</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {dates.map((d) => (
                    <button
                      key={d.label}
                      onClick={() => setSelectedDate(d.label)}
                      className={cn(
                        "flex flex-col items-center min-w-[72px] p-3 rounded-xl border transition-all duration-300 shrink-0",
                        selectedDate === d.label
                          ? "border-cyan/40 bg-cyan/[0.06] text-cyan"
                          : "border-white/5 bg-white/[0.02] text-white/35 hover:border-white/15"
                      )}
                    >
                      <span className="text-[10px] uppercase tracking-wider">{d.day}</span>
                      <span className="text-xl font-bold mt-1">{d.dayNum}</span>
                      <span className="text-[10px]">{d.month}</span>
                    </button>
                  ))}
                </div>
              </div>
            </SectionReveal>

            {/* Time Slots */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Available Times</h3>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((time) => {
                    // Random availability for demo
                    const isAvailable = Math.random() > 0.25;
                    return (
                      <button
                        key={time}
                        onClick={() => isAvailable && setSelectedTime(time)}
                        disabled={!isAvailable}
                        className={cn(
                          "py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-300",
                          !isAvailable
                            ? "text-white/10 bg-white/[0.01] cursor-not-allowed line-through"
                            : selectedTime === time
                            ? "bg-cyan/15 text-cyan border border-cyan/30"
                            : "text-white/40 border border-white/5 hover:border-white/15 hover:text-white/60"
                        )}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Booking Form */}
            {selectedDate && selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Your Details</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="s-name" className="text-sm text-white/50">Name *</Label>
                      <Input id="s-name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="Your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="s-email" className="text-sm text-white/50">Email *</Label>
                      <Input id="s-email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="you@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="s-phone" className="text-sm text-white/50">Phone *</Label>
                      <Input id="s-phone" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="+91 00000 00000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="s-company" className="text-sm text-white/50">Company / Hospital</Label>
                      <Input id="s-company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl" placeholder="Organization name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-topic" className="text-sm text-white/50">What would you like to discuss?</Label>
                    <Input id="s-topic" value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                      placeholder="e.g. Radiology equipment, ICU setup, lab automation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="s-message" className="text-sm text-white/50">Additional Notes</Label>
                    <Textarea id="s-message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 rounded-xl min-h-[80px] resize-none"
                      placeholder="Anything specific you'd like us to prepare for the demo?" />
                  </div>
                  <Button type="submit"
                    className="bg-cyan hover:bg-cyan-dim text-navy font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                    Confirm Booking
                  </Button>
                </form>
              </motion.div>
            )}
          </div>

          {/* Summary Sidebar */}
          <SectionReveal delay={0.2}>
            <div className="lg:sticky lg:top-28 h-fit p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Booking Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30">Date</p>
                    <p className="text-sm text-white/70">{selectedDate || "Select a date"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-white/30">Time</p>
                    <p className="text-sm text-white/70">{selectedTime || "Select a time"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center text-cyan shrink-0">
                    {bookingTypes.find((bt) => bt.key === bookingType)?.icon}
                  </div>
                  <div>
                    <p className="text-xs text-white/30">Type</p>
                    <p className="text-sm text-white/70">{bookingTypes.find((bt) => bt.key === bookingType)?.label}</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5">
                <p className="text-xs text-white/20 leading-relaxed">
                  Sessions typically last 30–45 minutes. Our specialist will prepare a tailored walkthrough based on the products or solutions you're interested in.
                </p>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
