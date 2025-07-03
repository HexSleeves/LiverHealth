import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add nutrition entry
export const addNutritionEntry = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    mealName: v.string(),
    protein: v.number(),
    carbohydrates: v.number(),
    fats: v.number(),
    sodium: v.number(),
    potassium: v.number(),
    calories: v.optional(v.number()),
    foodDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("nutritionEntries", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Get nutrition entries for a specific date
export const getNutritionByDate = query({
  args: {
    userId: v.id("users"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("nutritionEntries")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .collect();
  },
});

// Get daily nutrition summary
export const getDailyNutritionSummary = query({
  args: {
    userId: v.id("users"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("nutritionEntries")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .collect();

    // Calculate totals
    const totals = entries.reduce(
      (acc, entry) => ({
        protein: acc.protein + entry.protein,
        carbohydrates: acc.carbohydrates + entry.carbohydrates,
        fats: acc.fats + entry.fats,
        sodium: acc.sodium + entry.sodium,
        potassium: acc.potassium + entry.potassium,
        calories: acc.calories + (entry.calories || 0),
      }),
      {
        protein: 0,
        carbohydrates: 0,
        fats: 0,
        sodium: 0,
        potassium: 0,
        calories: 0,
      }
    );

    return {
      entries,
      totals,
      entryCount: entries.length,
    };
  },
});

// Add fluid entry
export const addFluidEntry = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    amount: v.number(),
    fluidType: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("fluidEntries", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Get daily fluid intake
export const getDailyFluidIntake = query({
  args: {
    userId: v.id("users"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const entries = await ctx.db
      .query("fluidEntries")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .collect();

    const totalAmount = entries.reduce((acc, entry) => acc + entry.amount, 0);

    return {
      entries,
      totalAmount,
      entryCount: entries.length,
    };
  },
});
