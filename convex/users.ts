import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get or create user profile
export const getOrCreateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return userId;
  },
});

// Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

// Update user health profile
export const updateHealthProfile = mutation({
  args: {
    userId: v.id("users"),
    liverCondition: v.optional(v.string()),
    dietaryRestrictions: v.optional(v.array(v.string())),
    dailyGoals: v.optional(
      v.object({
        protein: v.number(),
        carbohydrates: v.number(),
        fats: v.number(),
        sodium: v.number(),
        potassium: v.number(),
        fluids: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const { userId, ...updateData } = args;

    await ctx.db.patch(userId, {
      ...updateData,
      updatedAt: Date.now(),
    });
  },
});
