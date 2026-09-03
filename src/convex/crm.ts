// CRM endpoints for Revoltric Solutions.
//
// Everything the public site creates — enquiries (contact / request-a-quote),
// demo bookings (/schedule) and purchase-order requests (/checkout) — is
// persisted here, and the admin area manages the resulting records.
import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";

/** Owner(s) who are allowed into the private admin area. */
const ADMIN_EMAILS = ["revoltricsolutions@gmail.com"];

function isAdminUser(user: {
  email?: string | null;
  role?: string | null;
} | null): boolean {
  if (!user) return false;
  if (user.role === "admin") return true;
  return ADMIN_EMAILS.includes((user.email ?? "").trim().toLowerCase());
}

function assertValidEmail(email: string) {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new ConvexError("A valid email address is required.");
  }
}

function assertNotEmpty(value: string, field: string) {
  if (!value || !value.trim()) {
    throw new ConvexError(`${field} is required.`);
  }
}

function orderNumber(): string {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
}

/* ------------------------------------------------------------------ */
/* Public creation                                                     */
/* ------------------------------------------------------------------ */

export const createEnquiry = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    company: v.optional(v.string()),
    requirement: v.optional(v.string()),
    message: v.optional(v.string()),
    productName: v.optional(v.string()),
    source: v.optional(v.string()),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    assertNotEmpty(args.name, "Name");
    assertValidEmail(args.email);
    return await ctx.db.insert("enquiries", {
      userId: args.userId,
      source: args.source ?? "contact",
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      phone: args.phone?.trim(),
      company: args.company?.trim(),
      requirement: args.requirement?.trim(),
      message: args.message?.trim(),
      productName: args.productName?.trim(),
      status: "new",
      createdAt: Date.now(),
    });
  },
});

export const createBooking = mutation({
  args: {
    type: v.union(v.literal("video"), v.literal("phone"), v.literal("visit")),
    dateLabel: v.string(),
    time: v.string(),
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    company: v.optional(v.string()),
    topic: v.optional(v.string()),
    message: v.optional(v.string()),
    userId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    assertNotEmpty(args.name, "Name");
    assertValidEmail(args.email);
    assertNotEmpty(args.phone, "Phone");
    assertNotEmpty(args.dateLabel, "Date");
    assertNotEmpty(args.time, "Time");
    return await ctx.db.insert("bookings", {
      userId: args.userId,
      type: args.type,
      dateLabel: args.dateLabel.trim(),
      time: args.time.trim(),
      name: args.name.trim(),
      email: args.email.trim().toLowerCase(),
      phone: args.phone.trim(),
      company: args.company?.trim(),
      topic: args.topic?.trim(),
      message: args.message?.trim(),
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const createOrder = mutation({
  args: {
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    company: v.optional(v.string()),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    pincode: v.string(),
    notes: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    items: v.array(
      v.object({
        productId: v.string(),
        name: v.string(),
        category: v.optional(v.string()),
        image: v.optional(v.string()),
        price: v.number(),
        quantity: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new ConvexError("Please sign in before placing an order.");
    }
    assertNotEmpty(args.customerName, "Name");
    assertValidEmail(args.email);
    assertNotEmpty(args.phone, "Phone");
    assertNotEmpty(args.address, "Delivery address");
    assertNotEmpty(args.city, "City");
    assertNotEmpty(args.state, "State");
    assertNotEmpty(args.pincode, "PIN code");
    if (args.items.length === 0) {
      throw new ConvexError("Your cart is empty.");
    }
    const subtotal = args.items.reduce(
      (sum, item) => sum + item.price * Math.max(1, Math.floor(item.quantity)),
      0,
    );
    if (!(subtotal > 0)) {
      throw new ConvexError("Your cart total could not be calculated.");
    }
    const orderId = await ctx.db.insert("orders", {
      userId,
      orderNumber: orderNumber(),
      customerName: args.customerName.trim(),
      email: args.email.trim().toLowerCase(),
      phone: args.phone.trim(),
      company: args.company?.trim(),
      address: args.address.trim(),
      city: args.city.trim(),
      state: args.state.trim(),
      pincode: args.pincode.trim(),
      notes: args.notes?.trim(),
      paymentMethod: args.paymentMethod?.trim() || "To be confirmed",
      items: args.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        category: item.category,
        image: item.image,
        price: item.price,
        quantity: Math.max(1, Math.floor(item.quantity)),
      })),
      subtotal,
      status: "pending",
      createdAt: Date.now(),
    });
    const created = await ctx.db.get(orderId);
    return {
      id: orderId,
      orderNumber: created?.orderNumber ?? `ORD-${orderId}`,
    };
  },
});

/* ------------------------------------------------------------------ */
/* Customer ("mine") queries — for the signed-in dashboard            */
/* ------------------------------------------------------------------ */

export const myOrders = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);
  },
});

export const myBookings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("bookings")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);
  },
});

export const myEnquiries = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return [];
    return await ctx.db
      .query("enquiries")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .take(50);
  },
});

/* ------------------------------------------------------------------ */
/* Admin — protected helpers + data                                   */
/* ------------------------------------------------------------------ */

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return false;
    const user = await ctx.db.get(userId);
    return isAdminUser(user);
  },
});

export const adminOverview = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) return null;

    const [orders, bookings, enquiries, users] = await Promise.all([
      ctx.db.query("orders").collect(),
      ctx.db.query("bookings").collect(),
      ctx.db.query("enquiries").collect(),
      ctx.db.query("users").take(200),
    ]);
    const newEnquiries = enquiries.filter((e) => e.status === "new").length;
    const openOrders = orders.filter(
      (o) => o.status === "pending" || o.status === "confirmed",
    ).length;
    return {
      orderCount: orders.length,
      openOrders,
      bookingCount: bookings.length,
      enquiryCount: enquiries.length,
      newEnquiries,
      userCount: users.length,
    };
  },
});

export const listOrders = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) return null;
    return await ctx.db.query("orders").order("desc").take(100);
  },
});

export const listBookings = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) return null;
    return await ctx.db.query("bookings").order("desc").take(100);
  },
});

export const listEnquiries = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) return null;
    return await ctx.db.query("enquiries").order("desc").take(100);
  },
});

export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) return null;
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) return null;
    const users = await ctx.db.query("users").take(200);
    return users
      .filter((u) => u.email)
      .map((u) => ({
        _id: u._id,
        name: u.name ?? "",
        email: u.email ?? "",
        image: u.image,
        role: u.role ?? "user",
      }));
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("shipped"),
      v.literal("delivered"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new ConvexError("Not authenticated.");
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) throw new ConvexError("Admin access required.");
    await ctx.db.patch(args.orderId, { status: args.status });
  },
});

export const updateBookingStatus = mutation({
  args: {
    bookingId: v.id("bookings"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new ConvexError("Not authenticated.");
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) throw new ConvexError("Admin access required.");
    await ctx.db.patch(args.bookingId, { status: args.status });
  },
});

export const updateEnquiryStatus = mutation({
  args: {
    enquiryId: v.id("enquiries"),
    status: v.union(
      v.literal("new"),
      v.literal("responded"),
      v.literal("closed"),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new ConvexError("Not authenticated.");
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) throw new ConvexError("Admin access required.");
    await ctx.db.patch(args.enquiryId, { status: args.status });
  },
});

export const deleteOrder = mutation({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new ConvexError("Not authenticated.");
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) throw new ConvexError("Admin access required.");
    await ctx.db.delete(args.orderId);
  },
});

export const deleteBooking = mutation({
  args: { bookingId: v.id("bookings") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new ConvexError("Not authenticated.");
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) throw new ConvexError("Admin access required.");
    await ctx.db.delete(args.bookingId);
  },
});

export const deleteEnquiry = mutation({
  args: { enquiryId: v.id("enquiries") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) throw new ConvexError("Not authenticated.");
    const user = await ctx.db.get(userId);
    if (!isAdminUser(user)) throw new ConvexError("Admin access required.");
    await ctx.db.delete(args.enquiryId);
  },
});

