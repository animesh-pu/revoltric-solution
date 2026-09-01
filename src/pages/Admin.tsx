import { useState } from "react";
import { Link } from "react-router";
import {
  Shield, Package, Users, MessageSquare, BarChart3, Settings,
  Plus, Search, Edit, Trash2, Eye, ChevronRight, Clock, CheckCircle,
  Truck, AlertCircle, TrendingUp,
} from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PRODUCTS, SAMPLE_ORDERS } from "@/data/content";
import { cn } from "@/lib/utils";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

type AdminTab = "dashboard" | "products" | "orders" | "users" | "inquiries";

const STATUS_CONFIG = {
  pending: { label: "Pending", icon: <Clock className="w-3.5 h-3.5" />, color: "text-yellow-400" },
  processing: { label: "Processing", icon: <AlertCircle className="w-3.5 h-3.5" />, color: "text-blue-400" },
  shipped: { label: "Shipped", icon: <Truck className="w-3.5 h-3.5" />, color: "text-purple-400" },
  delivered: { label: "Delivered", icon: <CheckCircle className="w-3.5 h-3.5" />, color: "text-green-400" },
};

const DEMO_USERS = [
  { id: "u1", name: "Dr. Priya Sharma", email: "priya@cityhospital.com", company: "City Hospital", joined: "2024-08-12", orders: 5 },
  { id: "u2", name: "Rajesh Medicals", email: "rajesh@rajmed.com", company: "Rajesh Medicals", joined: "2024-10-03", orders: 3 },
  { id: "u3", name: "Dr. Amit Patel", email: "amit@diagnosticplus.com", company: "Diagnostic Plus", joined: "2025-01-15", orders: 1 },
  { id: "u4", name: "Sunrise Laboratories", email: "info@sunriselab.com", company: "Sunrise Laboratories", joined: "2025-02-20", orders: 2 },
];

const DEMO_INQUIRIES = [
  { id: "inq-1", name: "Dr. Sunita Rao", email: "sunita@apollo.in", subject: "CT Scanner pricing for new facility", date: "2025-03-28", status: "new" as const },
  { id: "inq-2", name: "Metro Healthcare", email: "procurement@metro.com", subject: "Bulk order for patient monitors", date: "2025-03-27", status: "responded" as const },
  { id: "inq-3", name: "Dr. Kiran Mehta", email: "kiran@careplus.in", subject: "Lab setup consultation", date: "2025-03-25", status: "new" as const },
  { id: "inq-4", name: "Greenfield Hospital", email: "admin@greenfield.in", subject: "ICU equipment quote request", date: "2025-03-22", status: "closed" as const },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [productSearch, setProductSearch] = useState("");

  const filteredProducts = PRODUCTS.filter(
    (p) => !productSearch || p.name.toLowerCase().includes(productSearch.toLowerCase())
  );

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: "dashboard", label: "Overview", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "products", label: "Products", icon: <Package className="w-4 h-4" /> },
    { key: "orders", label: "Orders", icon: <Truck className="w-4 h-4" /> },
    { key: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
    { key: "inquiries", label: "Inquiries", icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-navy">
      <Navigation />

      <div className="pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-1">
            <Shield className="w-5 h-5 text-cyan" />
            <p className="text-sm text-white/30">Admin Panel</p>
          </div>
          <h1 className="text-3xl font-bold text-white">Revoltric Solutions Admin</h1>
          <p className="text-sm text-white/30 mt-1">Manage products, orders, users, and inquiries.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex gap-6 lg:gap-8">
          {/* Sidebar */}
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
                  {tab.key === "inquiries" && (
                    <span className="ml-auto w-5 h-5 rounded-full bg-cyan/20 text-cyan text-[10px] font-bold flex items-center justify-center">
                      2
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

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Dashboard Overview */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Products", value: PRODUCTS.length.toString(), change: "+2 this month", icon: <Package className="w-5 h-5" /> },
                    { label: "Total Orders", value: SAMPLE_ORDERS.length.toString(), change: "+1 this week", icon: <Truck className="w-5 h-5" /> },
                    { label: "Users", value: DEMO_USERS.length.toString(), change: "+2 this month", icon: <Users className="w-5 h-5" /> },
                    { label: "New Inquiries", value: "2", change: "Requires response", icon: <MessageSquare className="w-5 h-5" /> },
                  ].map((stat) => (
                    <div key={stat.label} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="text-cyan/50 mb-3">{stat.icon}</div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-white/30 mt-1">{stat.label}</p>
                      <p className="text-[10px] text-white/20 mt-1">{stat.change}</p>
                    </div>
                  ))}
                </div>

                {/* Revenue Placeholder */}
                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Revenue Overview</h3>
                    <TrendingUp className="w-4 h-4 text-cyan/40" />
                  </div>
                  <div className="h-48 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-gradient-to-t from-cyan/30 to-cyan/10 rounded-t-md transition-all hover:from-cyan/50 hover:to-cyan/20"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[9px] text-white/15">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/15 mt-3 text-center">Revenue data is illustrative. Connect your data source for live metrics.</p>
                </div>
              </div>
            )}

            {/* Products Management */}
            {activeTab === "products" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-white">Products</h2>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                      <input
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Search products..."
                        className="pl-9 pr-4 py-2 bg-white/[0.03] border border-white/8 rounded-lg text-white placeholder:text-white/20 text-xs focus:outline-none focus:border-cyan/40 w-48"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan/10 text-cyan text-xs font-medium hover:bg-cyan/15 transition-all">
                      <Plus className="w-3.5 h-3.5" />
                      Add Product
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Product</th>
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Category</th>
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Price</th>
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Status</th>
                          <th className="text-right px-5 py-3 text-xs text-white/30 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-3">
                              <p className="text-sm text-white/80 font-medium">{product.name}</p>
                            </td>
                            <td className="px-5 py-3 text-xs text-white/35">{product.category}</td>
                            <td className="px-5 py-3 text-sm text-white/60">{formatPrice(product.price)}</td>
                            <td className="px-5 py-3">
                              <span className={cn("text-xs font-medium", product.inStock ? "text-green-400" : "text-red-400")}>
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button className="p-1.5 rounded-lg text-white/20 hover:text-cyan hover:bg-white/5 transition-all">
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 rounded-lg text-white/20 hover:text-cyan hover:bg-white/5 transition-all">
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-white/5 transition-all">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Management */}
            {activeTab === "orders" && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-white">Orders</h2>
                <div className="space-y-3">
                  {SAMPLE_ORDERS.map((order) => {
                    const status = STATUS_CONFIG[order.status];
                    return (
                      <div key={order.id} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <p className="text-sm font-semibold text-white">{order.id}</p>
                            <span className={cn("flex items-center gap-1.5 text-xs font-medium", status.color)}>
                              {status.icon} {status.label}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-white/60">{formatPrice(order.total)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-white/25">
                            {order.items.map((item) => `${item.name} ×${item.quantity}`).join(" · ")}
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg bg-white/5 text-white/35 text-xs hover:text-white hover:bg-white/10 transition-all">
                              Update Status
                            </button>
                            <button className="px-3 py-1.5 rounded-lg bg-white/5 text-white/35 text-xs hover:text-white hover:bg-white/10 transition-all">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Users Management */}
            {activeTab === "users" && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-white">Users</h2>
                <div className="rounded-2xl border border-white/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5 bg-white/[0.02]">
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">User</th>
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Company</th>
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Joined</th>
                          <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Orders</th>
                          <th className="text-right px-5 py-3 text-xs text-white/30 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DEMO_USERS.map((user) => (
                          <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-3">
                              <p className="text-sm text-white/80 font-medium">{user.name}</p>
                              <p className="text-xs text-white/30">{user.email}</p>
                            </td>
                            <td className="px-5 py-3 text-xs text-white/35">{user.company}</td>
                            <td className="px-5 py-3 text-xs text-white/35">{user.joined}</td>
                            <td className="px-5 py-3 text-sm text-white/60">{user.orders}</td>
                            <td className="px-5 py-3">
                              <div className="flex items-center justify-end gap-1">
                                <button className="p-1.5 rounded-lg text-white/20 hover:text-cyan hover:bg-white/5 transition-all">
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1.5 rounded-lg text-white/20 hover:text-cyan hover:bg-white/5 transition-all">
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Inquiries Management */}
            {activeTab === "inquiries" && (
              <div className="space-y-5">
                <h2 className="text-xl font-semibold text-white">Inquiries</h2>
                <div className="space-y-3">
                  {DEMO_INQUIRIES.map((inq) => (
                    <div key={inq.id} className={cn(
                      "p-5 rounded-2xl border transition-all",
                      inq.status === "new" ? "border-cyan/20 bg-cyan/[0.02]" : "border-white/5 bg-white/[0.02]"
                    )}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {inq.status === "new" && <span className="w-2 h-2 rounded-full bg-cyan" />}
                          <p className="text-sm font-semibold text-white">{inq.subject}</p>
                        </div>
                        <span className={cn(
                          "text-[10px] px-2 py-1 rounded-full font-medium",
                          inq.status === "new" ? "bg-cyan/15 text-cyan" :
                          inq.status === "responded" ? "bg-blue-500/15 text-blue-400" :
                          "bg-white/5 text-white/30"
                        )}>
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-xs text-white/30 mb-2">{inq.name} · {inq.email} · {inq.date}</p>
                      <div className="flex gap-2 mt-3">
                        <button className="px-3 py-1.5 rounded-lg bg-cyan/10 text-cyan text-xs font-medium hover:bg-cyan/15 transition-all">
                          Reply
                        </button>
                        <button className="px-3 py-1.5 rounded-lg bg-white/5 text-white/35 text-xs hover:text-white hover:bg-white/10 transition-all">
                          Mark as Read
                        </button>
                      </div>
                    </div>
                  ))}
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
