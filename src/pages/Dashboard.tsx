import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Package,
  CalendarClock,
  MessageSquare,
  Settings,
  LogOut,
  Loader2,
  ArrowRight,
  User,
  Mail,
  Save,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

type Tab = "overview" | "orders" | "bookings" | "enquiries" | "settings";

const ORDER_STATUS_META: Record<string, { label: string; color: string }> = {
  pending: { label: "Pending review", color: "text-yellow-400" },
  confirmed: { label: "Confirmed", color: "text-cyan" },
  shipped: { label: "Shipped", color: "text-purple-400" },
  delivered: { label: "Delivered", color: "text-green-400" },
  cancelled: { label: "Cancelled", color: "text-red-400" },
};

const BOOKING_STATUS_META: Record<string, { label: string; color: string }> = {
  pending: { label: "Awaiting confirmation", color: "text-yellow-400" },
  confirmed: { label: "Confirmed", color: "text-green-400" },
  completed: { label: "Completed", color: "text-white/40" },
  cancelled: { label: "Cancelled", color: "text-red-400" },
};

const ENQUIRY_STATUS_META: Record<string, { label: string; color: string }> = {
  new: { label: "New", color: "text-cyan" },
  responded: { label: "Responded", color: "text-blue-400" },
  closed: { label: "Closed", color: "text-white/30" },
};

export default function Dashboard() {
  const { user, isLoading, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const myOrders = useQuery(api.crm.myOrders);
  const myBookings = useQuery(api.crm.myBookings);
  const myEnquiries = useQuery(api.crm.myEnquiries);
  const updateName = useMutation(api.profile.updateName);

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [nameDraft, setNameDraft] = useState(user?.name ?? "");
  const [savingName, setSavingName] = useState(false);

  const dataLoading =
    myOrders === undefined || myBookings === undefined || myEnquiries === undefined;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSaveName = async () => {
    setSavingName(true);
    try {
      await updateName({ name: nameDraft });
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update profile");
    } finally {
      setSavingName(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-navy">
        <Navigation />
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-cyan animate-spin" />
        </div>
      </div>
    );
  }

  const initial = (user?.name || user?.email || "R").charAt(0).toUpperCase();

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: "orders", label: "Orders", icon: <Package className="w-4 h-4" /> },
    { key: "bookings", label: "Bookings", icon: <CalendarClock className="w-4 h-4" /> },
    { key: "enquiries", label: "Enquiries", icon: <MessageSquare className="w-4 h-4" /> },
    { key: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />

      <div className="pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan to-cyan-dim flex items-center justify-center text-navy font-black text-lg shrink-0">
                {initial}
              </div>
              <div>
                <p className="text-sm text-white/30 mb-1">Customer Dashboard</p>
                <h1 className="text-3xl font-bold text-white">
                  Welcome back{user?.name ? `, ${user.name}` : ""}
                </h1>
                <p className="text-sm text-white/30 mt-1">
                  Track orders, demo requests and enquiries — all in one place.
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 text-white/40 hover:text-white hover:border-white/15 text-sm transition-all w-fit"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex gap-6 lg:gap-8">
          {/* Sidebar Tabs */}
          <div className="w-44 shrink-0 hidden lg:block">
            <nav className="space-y-1 sticky top-28">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                    activeTab === tab.key
                      ? "bg-cyan/10 text-cyan"
                      : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]",
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Tabs */}
          <div className="lg:hidden overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide mb-4">
            <div className="flex gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                    activeTab === tab.key
                      ? "bg-cyan/10 text-cyan border border-cyan/20"
                      : "text-white/35 border border-white/5",
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {dataLoading ? (
              <div className="py-24 text-center">
                <Loader2 className="w-6 h-6 text-cyan animate-spin mx-auto" />
              </div>
            ) : (
              <>
                {/* Overview */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: "Orders", value: (myOrders?.length ?? 0).toString(), sub: "placed with us", icon: <Package className="w-5 h-5" /> },
                        { label: "Demo Bookings", value: (myBookings?.length ?? 0).toString(), sub: "consultations", icon: <CalendarClock className="w-5 h-5" /> },
                        { label: "Enquiries", value: (myEnquiries?.length ?? 0).toString(), sub: "sent to the team", icon: <MessageSquare className="w-5 h-5" /> },
                        { label: "Account", value: user?.email ? user.email.split("@")[0].slice(0, 10) : "—", sub: user?.email ?? "", icon: <User className="w-5 h-5" /> },
                      ].map((stat) => (
                        <div key={stat.label} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] min-w-0">
                          <div className="text-cyan/60 mb-3">{stat.icon}</div>
                          <p className="text-2xl font-bold text-white truncate">{stat.value}</p>
                          <p className="text-xs text-white/30 mt-1">{stat.label}</p>
                          <p className="text-[10px] text-white/20 mt-1 truncate">{stat.sub}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                          Recent Orders
                        </h3>
                        <button
                          onClick={() => setActiveTab("orders")}
                          className="text-xs text-cyan hover:underline"
                        >
                          View All
                        </button>
                      </div>
                      {myOrders && myOrders.length > 0 ? (
                        <div className="space-y-3">
                          {myOrders.slice(0, 3).map((order) => {
                            const meta = ORDER_STATUS_META[order.status];
                            return (
                              <div key={order._id} className="flex items-center justify-between gap-4 py-3 border-b border-white/5 last:border-0">
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-white">{order.orderNumber}</p>
                                  <p className="text-xs text-white/30 truncate">
                                    {order.items.map((i) => i.name).join(", ")}
                                  </p>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                  <span className={cn("text-xs font-medium", meta.color)}>
                                    {meta.label}
                                  </span>
                                  <span className="text-sm font-semibold text-white/70">
                                    {formatPrice(order.subtotal)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-white/30">
                          You haven't placed any orders yet.{" "}
                          <Link to="/products" className="text-cyan hover:underline">
                            Browse the catalogue
                          </Link>
                          .
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Link to="/products" className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 transition-all group">
                        <Package className="w-5 h-5 text-cyan/50 group-hover:text-cyan mb-3" />
                        <p className="text-sm font-semibold text-white">Browse Products</p>
                        <p className="text-xs text-white/30 mt-1">Explore the full catalogue</p>
                      </Link>
                      <Link to="/schedule" className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 transition-all group">
                        <CalendarClock className="w-5 h-5 text-cyan/50 group-hover:text-cyan mb-3" />
                        <p className="text-sm font-semibold text-white">Book a Demo</p>
                        <p className="text-xs text-white/30 mt-1">Consult with our specialists</p>
                      </Link>
                      <Link to="/#contact" className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 transition-all group">
                        <MessageSquare className="w-5 h-5 text-cyan/50 group-hover:text-cyan mb-3" />
                        <p className="text-sm font-semibold text-white">Send an Enquiry</p>
                        <p className="text-xs text-white/30 mt-1">Questions or quote requests</p>
                      </Link>
                    </div>
                  </div>
                )}

                {/* Orders */}
                {activeTab === "orders" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Your Orders</h2>
                    {myOrders && myOrders.length === 0 ? (
                      <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl">
                        <Package className="w-10 h-10 text-white/15 mx-auto mb-4" />
                        <p className="text-sm text-white/40 mb-6">No orders yet.</p>
                        <Link to="/products">
                          <Button className="bg-cyan text-navy font-semibold px-6 py-2.5 rounded-lg">
                            Browse Products
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      (myOrders ?? []).map((order) => {
                        const meta = ORDER_STATUS_META[order.status];
                        return (
                          <div key={order._id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
                              <div>
                                <p className="text-lg font-semibold text-white">{order.orderNumber}</p>
                                <p className="text-xs text-white/30">
                                  Requested on {formatDate(order.createdAt)}
                                </p>
                              </div>
                              <span className={cn("flex items-center gap-1.5 text-xs font-medium", meta.color)}>
                                {meta.label}
                              </span>
                            </div>
                            <div className="space-y-2 mb-4">
                              {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between gap-4 text-sm">
                                  <span className="text-white/40">
                                    {item.name} × {item.quantity}
                                  </span>
                                  <span className="text-white/60 font-medium">
                                    {formatPrice(item.price * item.quantity)}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="border-t border-white/5 pt-3 flex items-center justify-between flex-wrap gap-3">
                              <div>
                                <p className="text-sm font-semibold text-white">
                                  Estimated total: {formatPrice(order.subtotal)}
                                </p>
                                <p className="text-[11px] text-white/25 mt-1">
                                  Payment: {order.paymentMethod} ·{" "}
                                  {order.address}, {order.city}, {order.state} — {order.pincode}
                                </p>
                              </div>
                              <p className="text-[11px] text-white/25">
                                Our team will confirm the final quotation within
                                one business day.
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Bookings */}
                {activeTab === "bookings" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Demo & Consultations</h2>
                    {myBookings && myBookings.length === 0 ? (
                      <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl">
                        <CalendarClock className="w-10 h-10 text-white/15 mx-auto mb-4" />
                        <p className="text-sm text-white/40 mb-6">
                          No demo requests yet — book a consultation with our specialists.
                        </p>
                        <Link to="/schedule">
                          <Button className="bg-cyan text-navy font-semibold px-6 py-2.5 rounded-lg">
                            Schedule a Demo
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      (myBookings ?? []).map((booking) => {
                        const meta = BOOKING_STATUS_META[booking.status];
                        return (
                          <div key={booking._id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                            <div className="flex items-center justify-between gap-4 flex-wrap">
                              <div>
                                <p className="text-lg font-semibold text-white capitalize">
                                  {booking.type} demo
                                </p>
                                <p className="text-xs text-white/30 mt-1">
                                  Requested {formatDate(booking.createdAt)}
                                </p>
                              </div>
                              <span className={cn("flex items-center gap-1.5 text-xs font-medium", meta.color)}>
                                {meta.label}
                              </span>
                            </div>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                              <div>
                                <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Date</p>
                                <p className="text-white/70">{booking.dateLabel}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Time</p>
                                <p className="text-white/70">{booking.time}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-white/25 uppercase tracking-wider mb-1">Type</p>
                                <p className="text-white/70 capitalize">{booking.type}</p>
                              </div>
                            </div>
                            {booking.topic && (
                              <p className="text-xs text-white/45 mt-3">Topic: {booking.topic}</p>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Enquiries */}
                {activeTab === "enquiries" && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Your Enquiries</h2>
                    {myEnquiries && myEnquiries.length === 0 ? (
                      <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl">
                        <MessageSquare className="w-10 h-10 text-white/15 mx-auto mb-4" />
                        <p className="text-sm text-white/40 mb-6">
                          No enquiries yet — send us your requirements and our team
                          will get back to you within one business day.
                        </p>
                        <Link to="/#contact">
                          <Button className="bg-cyan text-navy font-semibold px-6 py-2.5 rounded-lg">
                            Send an Enquiry
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      (myEnquiries ?? []).map((enquiry) => {
                        const meta = ENQUIRY_STATUS_META[enquiry.status];
                        return (
                          <div
                            key={enquiry._id}
                            className={cn(
                              "p-6 rounded-2xl border transition-all",
                              enquiry.status === "new"
                                ? "border-cyan/20 bg-cyan/[0.02]"
                                : "border-white/5 bg-white/[0.02]",
                            )}
                          >
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-white">
                                  {enquiry.requirement || enquiry.productName || "General enquiry"}
                                </p>
                                <p className="text-xs text-white/30 mt-1">
                                  Sent {formatDate(enquiry.createdAt)}
                                </p>
                              </div>
                              <span className={cn("text-xs font-medium shrink-0", meta.color)}>
                                {meta.label}
                              </span>
                            </div>
                            {enquiry.message && (
                              <p className="text-sm text-white/40 mt-3 leading-relaxed">
                                {enquiry.message}
                              </p>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Settings */}
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white">Account Settings</h2>
                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <h3 className="text-sm font-semibold text-white mb-4">Profile</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="d-name" className="text-xs text-white/30">
                            Display Name
                          </Label>
                          <Input
                            id="d-name"
                            value={nameDraft}
                            onChange={(e) => setNameDraft(e.target.value)}
                            className="bg-white/[0.03] border-white/8 text-white placeholder:text-white/20 focus:border-cyan/40 h-11 rounded-xl"
                            placeholder="Your name"
                          />
                          <Button
                            onClick={handleSaveName}
                            disabled={savingName || !nameDraft.trim()}
                            className="mt-2 bg-cyan/10 text-cyan text-sm font-medium hover:bg-cyan/15 px-5 py-2.5 rounded-lg disabled:opacity-50 h-auto"
                          >
                            {savingName ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Save Name
                              </>
                            )}
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs text-white/30">Email (login)</p>
                          <p className="text-sm text-white/60 p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-cyan/50 shrink-0" />
                            <span className="truncate">{user?.email ?? "—"}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <h3 className="text-sm font-semibold text-white mb-3">Help & Support</h3>
                      <p className="text-sm text-white/40 leading-relaxed mb-4">
                        Need help with an order, product specification or
                        installation? Our team responds within one business day.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href="tel:+917978036219">
                          <Button variant="outline" className="border-white/10 text-white/60 hover:text-white px-5 py-2.5 rounded-lg bg-transparent">
                            Call +91 79780 36219
                          </Button>
                        </a>
                        <a href="mailto:revoltricsolutions@gmail.com">
                          <Button variant="outline" className="border-white/10 text-white/60 hover:text-white px-5 py-2.5 rounded-lg bg-transparent">
                            Email Support
                          </Button>
                        </a>
                        <Link to="/schedule">
                          <Button variant="outline" className="border-white/10 text-white/60 hover:text-white px-5 py-2.5 rounded-lg bg-transparent">
                            Book a Demo
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-6 rounded-2xl border border-red-500/10 bg-red-500/[0.02]">
                      <div>
                        <p className="text-sm font-semibold text-white">Sign Out</p>
                        <p className="text-xs text-white/30 mt-1">
                          End this session on this device.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={handleSignOut}
                        className="border-red-500/20 text-red-400 hover:text-red-300 px-5 py-2.5 rounded-lg bg-transparent"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
