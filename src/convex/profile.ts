import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation } from "./_generated/server";

/** Update the signed-in user's display name (shown on their dashboard). */
export const updateName = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new ConvexError("Please sign in first.");
    }
    const clean = name.trim();
    if (!clean) {
      throw new ConvexError("Please enter your name.");
    }
    await ctx.db.patch(userId, { name: clean.slice(0, 120) });
    return true;
  },
});
