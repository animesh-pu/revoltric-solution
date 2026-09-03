import { useState } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard, Package, Heart, MessageSquare, Upload, Settings, LogOut,
  ChevronRight, Eye, Download, Star, Clock, CheckCircle, Truck, AlertCircle,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SAMPLE_ORDERS, SAMPLE_MESSAGES, PRODUCTS } from "@/data/content";
import { cn } from "@/lib/utils";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

type Tab = "overview" | "orders" | "saved" | "messages" | "content" | "settings";

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: <Clock className="w-3.5 h-3.5" />, color: "text-yellow-400" },
  processing: { label: "Processing", icon: <AlertCircle className="w-3.5 h-3.5" />, color: "text-blue-400" },
  shipped: { label: "Shipped", icon: <Truck className="w-3.5 h-3.5" />, color: "text-purple-400" },
  delivered: { label: "Delivered", icon: <CheckCircle className="w-3.5 h-3.5" />, color: "text-green-400" },
};

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Overview", icon: <LayoutDashboard className="w-4 h-4" /> },
    { key: "orders", label: "Orders", icon: <Package className="w-4 h-4" /> },
    { key: "saved", label: "Saved", icon: <Heart className="w-4 h-4" /> },
    { key: "messages", label: "Messages", icon: <MessageSquare className="w-4 h-4" /> },
    { key: "content", label: "My Content", icon: <Upload className="w-4 h-4" /> },
    { key: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  const savedProducts = PRODUCTS.slice(0, 4);
  const unreadCount = SAMPLE_MESSAGES.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />

      <div className="pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-white/30 mb-1">Dashboard</p>
              <h1 className="text-3xl font-bold text-white">
                Welcome back{user?.name ? `, ${user.name}` : ""}
              </h1>
              <p className="text-sm text-white/30 mt-1">Manage your orders, saved products, and account settings.</p>
            </div>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 text-white/40 hover:text-white hover:border-white/15 text-sm transition-all"
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
          <div className="w-48 shrink-0 hidden lg:block">
            <nav className="space-y-1 sticky top-28">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
                    activeTab === tab.key
                      ? "bg-cyan/10 text-cyan"
                      : "text-white/35 hover:text-white/60 hover:bg-white/[0.03]"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.key === "messages" && unreadCount > 0 && (
                    <span className="ml-auto w-5 h-5 rounded-full bg-cyan/20 text-cyan text-[10px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
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
                      : "text-white/35 border border-white/5"
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
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Orders", value: "3", icon: <Package className="w-5 h-5" /> },
                    { label: "Saved Products", value: "4", icon: <Heart className="w-5 h-5" /> },
                    { label: "Messages", value: `${unreadCount} new`, icon: <MessageSquare className="w-5 h-5" /> },
                    { label: "Demos Booked", value: "1", icon: <Clock className="w-5 h-5" /> },
                  ].map((stat) => (
                    <div key={stat.label} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="text-cyan/60 mb-3">{stat.icon}</div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/30 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Recent Orders</h3>
                    <button onClick={() => setActiveTab("orders")} className="text-xs text-cyan hover:underline">
                      View All
                    </button>
                  </div>
                  <div className="space-y-3">
                    {SAMPLE_ORDERS.slice(0, 3).map((order) => {
                      const status = STATUS_CONFIG[order.status];
                      return (
                        <div key={order.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-white">{order.id}</p>
                            <p className="text-xs text-white/30">{order.date}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className={cn("flex items-center gap-1.5 text-xs font-medium", status.color)}>
                              {status.icon} {status.label}
                            </span>
                            <span className="text-sm font-semibold text-white/70">{formatPrice(order.total)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Link to="/products" className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 transition-all group">
                    <Package className="w-5 h-5 text-cyan/50 group-hover:text-cyan mb-3" />
                    <p className="text-sm font-semibold text-white">Browse Products</p>
                    <p className="text-xs text-white/30 mt-1">View our full catalogue</p>
                  </Link>
                  <Link to="/schedule" className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 transition-all group">
                    <Clock className="w-5 h-5 text-cyan/50 group-hover:text-cyan mb-3" />
                    <p className="text-sm font-semibold text-white">Book a Demo</p>
                    <p className="text-xs text-white/30 mt-1">Schedule a consultation</p>
                  </Link>
                  <Link to="/#contact" className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 transition-all group">
                    <MessageSquare className="w-5 h-5 text-cyan/50 group-hover:text-cyan mb-3" />
                    <p className="text-sm font-semibold text-white">Contact Support</p>
                    <p className="text-xs text-white/30 mt-1">Get help with your order</p>
                  </Link>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Your Orders</h2>
                {SAMPLE_ORDERS.map((order) => {
                  const status = STATUS_CONFIG[order.status];
                  return (
                    <div key={order.id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-lg font-semibold text-white">{order.id}</p>
                          <p className="text-xs text-white/30">Placed on {order.date}</p>
                        </div>
                        <span className={cn("flex items-center gap-1.5 text-xs font-medium", status.color)}>
                          {status.icon} {status.label}
                        </span>
                      </div>
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span className="text-white/40">{item.name} × {item.quantity}</span>
                            <span className="text-white/60">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">Total: {formatPrice(order.total)}</span>
                        <button className="text-xs text-cyan hover:underline flex items-center gap-1">
                          View Details <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "saved" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Saved Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedProducts.map((product) => (
                    <Link key={product.id} to={`/products/${product.id}`}
                      className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan/20 transition-all group">
                      <div className="w-16 h-16 rounded-xl bg-cyan/[0.06] flex items-center justify-center text-cyan/30 shrink-0">
                        <Eye className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-cyan/50 uppercase tracking-wider">{product.category}</span>
                        <h3 className="text-sm font-semibold text-white mt-0.5 group-hover:text-cyan transition-colors">{product.name}</h3>
                        <p className="text-xs text-white/30 mt-1">{formatPrice(product.price)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "messages" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Messages</h2>
                {SAMPLE_MESSAGES.map((msg) => (
                  <div key={msg.id}
                    className={cn(
                      "p-5 rounded-2xl border transition-all cursor-pointer",
                      msg.read
                        ? "border-white/5 bg-white/[0.02] hover:border-white/10"
                        : "border-cyan/20 bg-cyan/[0.02] hover:border-cyan/30"
                    )}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {!msg.read && <span className="w-2 h-2 rounded-full bg-cyan" />}
                        <p className={cn("text-sm font-semibold", msg.read ? "text-white/60" : "text-white")}>{msg.subject}</p>
                      </div>
                      <span className="text-xs text-white/20 whitespace-nowrap ml-4">{msg.date}</span>
                    </div>
                    <p className="text-xs text-white/30">{msg.from}</p>
                    <p className="text-sm text-white/40 mt-2 leading-relaxed">{msg.preview}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "content" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">My Content</h2>
                </div>
                <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center">
                  <Upload className="w-10 h-10 text-white/15 mx-auto mb-4" />
                  <p className="text-sm text-white/40 mb-2">Upload product reviews, facility photos, or feedback</p>
                  <p className="text-xs text-white/20 mb-6">Supports images, PDFs, and text. Max 10MB per file.</p>
                  <button className="px-6 py-2.5 rounded-lg bg-cyan/10 text-cyan text-sm font-medium hover:bg-cyan/15 transition-all">
                    Choose Files to Upload
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Facility photos — Radiology dept", type: "3 images", date: "2025-03-15" },
                    { name: "Product feedback — Patient Monitor", type: "Text", date: "2025-03-10" },
                    { name: "Lab setup documentation", type: "PDF", date: "2025-02-28" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-white/30">
                          <Download className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm text-white/70">{item.name}</p>
                          <p className="text-xs text-white/25">{item.type} · {item.date}</p>
                        </div>
                      </div>
                      <button className="text-xs text-white/20 hover:text-red-400 transition-colors">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Account Settings</h2>
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-semibold text-white mb-4">Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Name", value: user?.name || "[Your Name]" },
                      { label: "Email", value: user?.email || "user@email.com" },
                      { label: "Company", value: "[Company Name]" },
                      { label: "Phone", value: "+91 79780 36219" },
                    ].map((field) => (
                      <div key={field.label}>
                        <p className="text-xs text-white/30 mb-1">{field.label}</p>
                        <p className="text-sm text-white/60 p-3 rounded-lg bg-white/[0.03] border border-white/5">{field.value}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-6 px-5 py-2.5 rounded-lg bg-white/5 text-white/50 text-sm hover:bg-white/10 transition-all">
                    Edit Profile
                  </button>
                </div>
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <h3 className="text-sm font-semibold text-white mb-4">Notifications</h3>
                  <div className="space-y-3">
                    {["Order updates", "New products & offers", "Installation reminders", "Invoice notifications"].map((pref) => (
                      <div key={pref} className="flex items-center justify-between py-2">
                        <span className="text-sm text-white/50">{pref}</span>
                        <div className="w-10 h-5 rounded-full bg-cyan/20 relative cursor-pointer">
                          <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-cyan transition-all" />
                        </div>
                      </div>
                    ))}
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
