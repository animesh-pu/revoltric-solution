import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ShieldCheck,
  Package,
  Truck,
  MessageSquare,
  Users,
  BarChart3,
  Search,
  Loader2,
  Lock,
  ExternalLink,
  LogOut,
  CalendarClock,
} from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/data/content";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

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

type AdminTab = "overview" | "orders" | "bookings" | "enquiries" | "users" | "catalogue";

const ORDER_STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"] as const;
const BOOKING_STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;
const ENQUIRY_STATUSES = ["new", "responded", "closed"] as const;

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400",
  confirmed: "text-cyan",
  processing: "text-blue-400",
  shipped: "text-purple-400",
  delivered: "text-green-400",
  cancelled: "text-red-400",
  completed: "text-green-400",
  responded: "text-blue-400",
  new: "text-cyan",
  closed: "text-white/30",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium capitalize",
        STATUS_COLORS[status] ?? "text-white/40",
      )}
    >
      {status}
    </span>
  );
}

const selectClass =
  "bg-white/[0.03] border border-white/8 rounded-lg text-white text-xs px-2.5 py-1.5 focus:outline-none focus:border-cyan/40 cursor-pointer";

export default function Admin() {
  const { user, isLoading: authLoading, isAuthenticated, signOut } = useAuth();
  const isAdmin = useQuery(api.crm.isAdmin);
  const navigate = useNavigate();

  const overview = useQuery(api.crm.adminOverview);
  const orders = useQuery(api.crm.listOrders);
  const bookings = useQuery(api.crm.listBookings);
  const enquiries = useQuery(api.crm.listEnquiries);
  const users = useQuery(api.crm.listUsers);

  const updateOrderStatus = useMutation(api.crm.updateOrderStatus);
  const updateBookingStatus = useMutation(api.crm.updateBookingStatus);
  const updateEnquiryStatus = useMutation(api.crm.updateEnquiryStatus);
  const deleteOrder = useMutation(api.crm.deleteOrder);
  const deleteBooking = useMutation(api.crm.deleteBooking);
  const deleteEnquiry = useMutation(api.crm.deleteEnquiry);

  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [productSearch, setProductSearch] = useState("");
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "orders", label: "Orders", icon: <Truck className="w-4 h-4" /> },
    { key: "bookings", label: "Bookings", icon: <CalendarClock className="w-4 h-4" /> },
    { key: "enquiries", label: "Enquiries", icon: <MessageSquare className="w-4 h-4" /> },
    { key: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { key: "catalogue", label: "Catalogue", icon: <Package className="w-4 h-4" /> },
  ];

  const run = async (
    key: string,
    action: () => Promise<unknown>,
    message: string,
  ) => {
    setBusyKey(key);
    try {
      await action();
      toast.success(message);
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Action failed");
    } finally {
      setBusyKey(null);
    }
  };

  /* ----- Access gate ----- */
  if (authLoading || (isAuthenticated && isAdmin === undefined)) {
    return (
      <div className="min-h-screen bg-navy">
        <Navigation />
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-cyan animate-spin" />
        </div>
      </div>
    );
  }

  if (isAdmin !== true) {
    return (
      <div className="min-h-screen bg-navy">
        <Navigation />
        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="max-w-md w-full text-center p-10 rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-7 h-7 text-white/30" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">
              Admin Access Required
            </h1>
            <p className="text-sm text-white/40 mb-8 leading-relaxed">
              This area is reserved for the Revoltric Solutions admin team.
              If you believe this is a mistake, contact{" "}
              <a href="mailto:revoltricsolutions@gmail.com" className="text-cyan hover:underline">
                revoltricsolutions@gmail.com
              </a>
              .
            </p>
            <div className="flex flex-col gap-3">
              <Button onClick={() => navigate("/")} className="bg-cyan hover:bg-cyan-dim text-navy font-semibold py-2.5 rounded-lg">
                Back to Home
              </Button>
              {isAuthenticated && (
                <Button
                  variant="outline"
                  onClick={async () => {
                    await signOut();
                    navigate("/");
                  }}
                  className="border-white/10 text-white/50 hover:text-white py-2.5 rounded-lg bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out and try another account
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      !productSearch ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()),
  );

  const openOrders = orders?.filter(
    (o) => o.status === "pending" || o.status === "confirmed",
  );

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />

      <div className="pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-1">
            <ShieldCheck className="w-5 h-5 text-cyan" />
            <p className="text-sm text-white/30">Admin Panel</p>
          </div>
          <h1 className="text-3xl font-bold text-white">Revoltric Solutions Admin</h1>
          <p className="text-sm text-white/30 mt-1">
            Live enquiries, demo bookings, orders and users.
            {user?.email ? ` Signed in as ${user.email}.` : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex gap-6 lg:gap-8">
          {/* Sidebar */}
          <div className="w-44 shrink-0 hidden lg:block">
            <nav className="space-y-1 sticky top-28">
              {tabs.map((tab) => {
                let badge: number | null = null;
                if (tab.key === "orders") badge = openOrders?.length ?? null;
                if (tab.key === "enquiries")
                  badge = enquiries?.filter((e) => e.status === "new").length ?? null;
                return (
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
                    {badge !== null && badge > 0 && (
                      <span className="ml-auto w-5 h-5 rounded-full bg-cyan/20 text-cyan text-[10px] font-bold flex items-center justify-center">
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
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

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Orders", value: overview?.orderCount ?? "—", sub: `${overview?.openOrders ?? 0} open`, icon: <Truck className="w-5 h-5" /> },
                    { label: "Demo Bookings", value: overview?.bookingCount ?? "—", sub: "pending review", icon: <CalendarClock className="w-5 h-5" /> },
                    { label: "Enquiries", value: overview?.enquiryCount ?? "—", sub: `${overview?.newEnquiries ?? 0} new`, icon: <MessageSquare className="w-5 h-5" /> },
                    { label: "Signed-up Users", value: overview?.userCount ?? "—", sub: "accounts", icon: <Users className="w-5 h-5" /> },
                  ].map((stat) => (
                    <div key={stat.label} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="text-cyan/50 mb-3">{stat.icon}</div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/30 mt-1">{stat.label}</p>
                      <p className="text-[10px] text-white/20 mt-1">{stat.sub}</p>
                    </div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Latest Enquiries
                  </h3>
                  {enquiries && enquiries.length > 0 ? (
                    <div className="space-y-3">
                      {enquiries.slice(0, 4).map((inq) => (
                        <div key={inq._id} className="flex items-center justify-between gap-4 py-2.5 border-b border-white/5 last:border-0">
                          <div className="min-w-0">
                            <p className="text-sm text-white/70 font-medium truncate">
                              {inq.name}
                              <span className="text-white/30 font-normal"> · {inq.email}</span>
                            </p>
                            <p className="text-xs text-white/35 truncate">
                              {inq.requirement || inq.message || inq.productName || "—"}
                            </p>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <StatusBadge status={inq.status} />
                            <span className="text-[11px] text-white/20">{formatDate(inq.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-white/30">
                      No enquiries yet. New messages from the contact form will
                      appear here.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Orders</h2>
                {orders === null || orders === undefined ? (
                  <p className="text-sm text-white/30">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p className="text-sm text-white/30">
                    No orders yet. Orders placed through checkout appear here.
                  </p>
                ) : (
                  orders.map((order) => (
                    <div key={order._id} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-sm font-semibold text-white">{order.orderNumber}</p>
                          <StatusBadge status={order.status} />
                        </div>
                        <span className="text-sm font-semibold text-white/70">
                          {formatPrice(order.subtotal)}
                        </span>
                      </div>
                      <p className="text-xs text-white/35 mb-2">
                        {order.customerName}
                        {order.company ? ` · ${order.company}` : ""} · {order.email} ·{" "}
                        {order.phone}
                      </p>
                      <p className="text-xs text-white/25 mb-2">
                        {order.items.map((item) => `${item.name} ×${item.quantity}`).join(" · ")}
                      </p>
                      <p className="text-[11px] text-white/20 mb-4">
                        {order.address}, {order.city}, {order.state} — {order.pincode} ·{" "}
                        {formatDate(order.createdAt)} · Payment: {order.paymentMethod}
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <select
                          value={order.status}
                          disabled={busyKey === `o-status-${order._id}`}
                          onChange={(e) =>
                            run(
                              `o-status-${order._id}`,
                              () =>
                                updateOrderStatus({
                                  orderId: order._id,
                                  status: e.target.value as (typeof ORDER_STATUSES)[number],
                                }),
                              "Order status updated",
                            )
                          }
                          className={selectClass}
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-navy">
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                        {busyKey === `o-status-${order._id}` && (
                          <Loader2 className="w-3.5 h-3.5 text-cyan animate-spin" />
                        )}
                        <button
                          onClick={() =>
                            run(
                              `o-del-${order._id}`,
                              () => deleteOrder({ orderId: order._id }),
                              "Order deleted",
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-white/30 text-xs hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Bookings */}
            {activeTab === "bookings" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Demo Bookings</h2>
                {bookings === null || bookings === undefined ? (
                  <p className="text-sm text-white/30">Loading bookings...</p>
                ) : bookings.length === 0 ? (
                  <p className="text-sm text-white/30">
                    No bookings yet. Demo requests from the Schedule page appear here.
                  </p>
                ) : (
                  bookings.map((booking) => (
                    <div key={booking._id} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <p className="text-sm font-semibold text-white capitalize">{booking.type} demo</p>
                          <StatusBadge status={booking.status} />
                        </div>
                        <span className="text-xs text-cyan">
                          {booking.dateLabel} · {booking.time}
                        </span>
                      </div>
                      <p className="text-xs text-white/35 mb-1">
                        {booking.name}
                        {booking.company ? ` · ${booking.company}` : ""} · {booking.email} ·{" "}
                        {booking.phone}
                      </p>
                      {booking.topic && (
                        <p className="text-xs text-white/45 mb-1">
                          Topic: {booking.topic}
                        </p>
                      )}
                      {booking.message && (
                        <p className="text-xs text-white/25 mb-1">{booking.message}</p>
                      )}
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        <select
                          value={booking.status}
                          disabled={busyKey === `b-status-${booking._id}`}
                          onChange={(e) =>
                            run(
                              `b-status-${booking._id}`,
                              () =>
                                updateBookingStatus({
                                  bookingId: booking._id,
                                  status: e.target.value as (typeof BOOKING_STATUSES)[number],
                                }),
                              "Booking status updated",
                            )
                          }
                          className={selectClass}
                        >
                          {BOOKING_STATUSES.map((s) => (
                            <option key={s} value={s} className="bg-navy">
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() =>
                            run(
                              `b-del-${booking._id}`,
                              () => deleteBooking({ bookingId: booking._id }),
                              "Booking deleted",
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-white/30 text-xs hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Enquiries */}
            {activeTab === "enquiries" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Enquiries</h2>
                {enquiries === null || enquiries === undefined ? (
                  <p className="text-sm text-white/30">Loading enquiries...</p>
                ) : enquiries.length === 0 ? (
                  <p className="text-sm text-white/30">
                    No enquiries yet. Contact form and quote requests appear here.
                  </p>
                ) : (
                  enquiries.map((inq) => (
                    <div
                      key={inq._id}
                      className={cn(
                        "p-5 rounded-2xl border transition-all",
                        inq.status === "new"
                          ? "border-cyan/20 bg-cyan/[0.02]"
                          : "border-white/5 bg-white/[0.02]",
                      )}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            {inq.status === "new" && <span className="w-2 h-2 rounded-full bg-cyan shrink-0" />}
                            <p className="text-sm font-semibold text-white">
                              {inq.requirement || inq.productName || "General enquiry"}
                            </p>
                          </div>
                          <p className="text-xs text-white/30 mt-1">
                            {inq.name}
                            {inq.company ? ` · ${inq.company}` : ""} · {inq.email}
                            {inq.phone ? ` · ${inq.phone}` : ""} · {formatDate(inq.createdAt)} ·{" "}
                            <span className="capitalize">{inq.source}</span>
                          </p>
                          {inq.message && (
                            <p className="text-xs text-white/45 mt-2 leading-relaxed">{inq.message}</p>
                          )}
                        </div>
                        <StatusBadge status={inq.status} />
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {inq.status !== "new" && (
                          <button
                            onClick={() =>
                              run(
                                `e-new-${inq._id}`,
                                () =>
                                  updateEnquiryStatus({
                                    enquiryId: inq._id,
                                    status: "new",
                                  }),
                                "Marked as new",
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-white/5 text-white/35 text-xs hover:text-white transition-all"
                          >
                            Mark Unread
                          </button>
                        )}
                        {inq.status !== "responded" && (
                          <button
                            onClick={() =>
                              run(
                                `e-resp-${inq._id}`,
                                () =>
                                  updateEnquiryStatus({
                                    enquiryId: inq._id,
                                    status: "responded",
                                  }),
                                "Marked as responded",
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-cyan/10 text-cyan text-xs font-medium hover:bg-cyan/15 transition-all"
                          >
                            Mark Responded
                          </button>
                        )}
                        {inq.status !== "closed" && (
                          <button
                            onClick={() =>
                              run(
                                `e-close-${inq._id}`,
                                () =>
                                  updateEnquiryStatus({
                                    enquiryId: inq._id,
                                    status: "closed",
                                  }),
                                "Enquiry closed",
                              )
                            }
                            className="px-3 py-1.5 rounded-lg bg-white/5 text-white/35 text-xs hover:text-white transition-all"
                          >
                            Close
                          </button>
                        )}
                        <a
                          href={`mailto:${inq.email}?subject=${encodeURIComponent(
                            `Re: ${inq.requirement || inq.productName || "your enquiry"} — Revoltric Solutions`,
                          )}`}
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-white/35 text-xs hover:text-cyan transition-all"
                        >
                          Reply by Email
                        </a>
                        <button
                          onClick={() =>
                            run(
                              `e-del-${inq._id}`,
                              () => deleteEnquiry({ enquiryId: inq._id }),
                              "Enquiry deleted",
                            )
                          }
                          className="px-3 py-1.5 rounded-lg bg-white/5 text-white/30 text-xs hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Users */}
            {activeTab === "users" && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-white">Signed-up Users</h2>
                {users === null || users === undefined ? (
                  <p className="text-sm text-white/30">Loading users...</p>
                ) : users.length === 0 ? (
                  <p className="text-sm text-white/30">No users yet.</p>
                ) : (
                  <div className="rounded-2xl border border-white/5 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5 bg-white/[0.02]">
                            <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">User</th>
                            <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Role</th>
                            <th className="text-right px-5 py-3 text-xs text-white/30 font-medium">Orders</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((u) => (
                            <tr key={u._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                              <td className="px-5 py-3">
                                <p className="text-sm text-white/80 font-medium">
                                  {u.name || "Revoltric user"}
                                  {u.email === "revoltricsolutions@gmail.com" && (
                                    <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded-full bg-cyan/15 text-cyan font-medium uppercase">
                                      Owner
                                    </span>
                                  )}
                                </p>
                                <p className="text-xs text-white/30">{u.email}</p>
                              </td>
                              <td className="px-5 py-3 text-xs text-white/35 capitalize">
                                {u.role === "admin" ? "Admin" : u.email === "revoltricsolutions@gmail.com" ? "Admin" : "Customer"}
                              </td>
                              <td className="px-5 py-3 text-right text-sm text-white/60">
                                {orders?.filter((o) => o.email === u.email).length ?? 0}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Catalogue */}
            {activeTab === "catalogue" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <h2 className="text-xl font-semibold text-white">
                    Catalogue ({PRODUCTS.length} products)
                  </h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                    <input
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search products..."
                      className="pl-9 pr-4 py-2 bg-white/[0.03] border border-white/8 rounded-lg text-white placeholder:text-white/20 text-xs focus:outline-none focus:border-cyan/40 w-56"
                    />
                  </div>
                </div>
                <p className="text-xs text-white/25 leading-relaxed -mt-2">
                  Products are published from the curated catalogue in{" "}
                  <code className="text-cyan/60">src/data/content.ts</code>. Add new
                  equipment there and it appears on the site instantly.
                </p>
                <div className="rounded-2xl border border-white/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Product</th>
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Category</th>
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Price</th>
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Status</th>
                          <th className="text-right px-5 py-3 text-xs text-white/30 font-medium">View</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-3">
                                {product.image ? (
                                  <img
                                    src={product.image}
                                    alt=""
                                    loading="lazy"
                                    className="w-10 h-10 rounded-lg object-cover bg-white/[0.02]"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-lg bg-white/[0.03] flex items-center justify-center text-white/20">
                                    <Package className="w-4 h-4" />
                                  </div>
                                )}
                                <p className="text-sm text-white/80 font-medium">{product.name}</p>
                              </div>
                            </td>
                            <td className="px-5 py-3 text-xs text-white/35">{product.category}</td>
                            <td className="px-5 py-3 text-sm text-white/60">{formatPrice(product.price)}</td>
                            <td className="px-5 py-3">
                              <span className={cn("text-xs font-medium", product.inStock ? "text-green-400" : "text-red-400")}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                            </td>
                            <td className="px-5 py-3 text-right">
                              <Link
                                to={`/products/${product.id}`}
                                className="inline-flex items-center gap-1.5 text-xs text-cyan hover:text-white transition-colors"
                              >
                                Details
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
