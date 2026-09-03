import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { Infer, v } from "convex/values";

// default user roles. can add / remove based on the project as needed
export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  MEMBER: "member",
} as const;

export const roleValidator = v.union(
  v.literal(ROLES.ADMIN),
  v.literal(ROLES.USER),
  v.literal(ROLES.MEMBER),
);
export type Role = Infer<typeof roleValidator>;

const schema = defineSchema(
  {
    // default auth tables using convex auth.
    ...authTables, // do not remove or modify

    // the users table is the default users table that is brought in by the authTables
    users: defineTable({
      name: v.optional(v.string()), // name of the user. do not remove
      image: v.optional(v.string()), // image of the user. do not remove
      email: v.optional(v.string()), // email of the user. do not remove
      emailVerificationTime: v.optional(v.number()), // email verification time. do not remove
      isAnonymous: v.optional(v.boolean()), // is the user anonymous. do not remove

      role: v.optional(roleValidator), // role of the user. do not remove
    }).index("email", ["email"]), // index for the email. do not remove or modify

    // --- Revoltric Solutions business tables ---

    // Product purchase-order requests placed at checkout.
    orders: defineTable({
      userId: v.id("users"), // required — checkout happens behind auth
      orderNumber: v.string(), // human-readable reference, e.g. ORD-482913
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
      subtotal: v.number(), // computed server-side from item prices
      status: v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("shipped"),
        v.literal("delivered"),
        v.literal("cancelled"),
      ),
      createdAt: v.number(),
    })
      .index("by_userId", ["userId"])
      .index("by_email", ["email"]),

    // Product-demo / consultation bookings made from /schedule.
    bookings: defineTable({
      userId: v.optional(v.id("users")),
      type: v.union(
        v.literal("video"),
        v.literal("phone"),
        v.literal("visit"),
      ),
      dateLabel: v.string(),
      time: v.string(),
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      company: v.optional(v.string()),
      topic: v.optional(v.string()),
      message: v.optional(v.string()),
      status: v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("completed"),
        v.literal("cancelled"),
      ),
      createdAt: v.number(),
    })
      .index("by_userId", ["userId"])
      .index("by_email", ["email"]),

    // Enquiries from the contact form / request-a-quote buttons.
    enquiries: defineTable({
      userId: v.optional(v.id("users")),
      source: v.string(), // "contact" | "quote" | "schedule" | "order"
      name: v.string(),
      email: v.string(),
      phone: v.optional(v.string()),
      company: v.optional(v.string()),
      requirement: v.optional(v.string()),
      message: v.optional(v.string()),
      productName: v.optional(v.string()),
      status: v.union(
        v.literal("new"),
        v.literal("responded"),
        v.literal("closed"),
      ),
      createdAt: v.number(),
    })
      .index("by_userId", ["userId"])
      .index("by_email", ["email"]),
  },
  {
    schemaValidation: false,
  },
);

export default schema;
