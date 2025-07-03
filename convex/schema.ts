import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // User profiles with health information
  users: defineTable({
    clerkId: v.string(), // Clerk user ID for authentication
    email: v.string(),
    name: v.string(),

    // Health profile information
    liverCondition: v.optional(v.string()), // e.g., "Fatty Liver Disease", "Cirrhosis", "Hepatitis"
    dietaryRestrictions: v.optional(v.array(v.string())), // e.g., ["low_sodium", "fluid_restriction"]

    // Daily nutritional goals
    dailyGoals: v.optional(
      v.object({
        protein: v.number(), // grams
        carbohydrates: v.number(), // grams
        fats: v.number(), // grams
        sodium: v.number(), // milligrams
        potassium: v.number(), // milligrams
        fluids: v.number(), // milliliters
      })
    ),

    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  // Medications for medication management
  medications: defineTable({
    userId: v.id("users"),
    name: v.string(),
    dosage: v.string(), // e.g., "5mg", "1 tablet"
    frequency: v.string(), // e.g., "twice daily", "every 8 hours"
    instructions: v.optional(v.string()), // e.g., "take with food"
    isActive: v.boolean(),

    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // Daily nutrition entries
  nutritionEntries: defineTable({
    userId: v.id("users"),
    date: v.string(), // YYYY-MM-DD format
    mealName: v.string(), // e.g., "Breakfast", "Lunch", "Dinner", "Snack"

    // Macronutrients
    protein: v.number(), // grams
    carbohydrates: v.number(), // grams
    fats: v.number(), // grams

    // Critical micronutrients for liver health
    sodium: v.number(), // milligrams
    potassium: v.number(), // milligrams

    // Additional info
    calories: v.optional(v.number()),
    foodDescription: v.optional(v.string()),

    createdAt: v.number(),
  }).index("by_user_date", ["userId", "date"]),

  // Fluid intake tracking
  fluidEntries: defineTable({
    userId: v.id("users"),
    date: v.string(), // YYYY-MM-DD format
    amount: v.number(), // milliliters
    fluidType: v.string(), // e.g., "water", "juice", "coffee"

    createdAt: v.number(),
  }).index("by_user_date", ["userId", "date"]),

  // Medication tracking (daily logs)
  medicationLogs: defineTable({
    userId: v.id("users"),
    medicationId: v.id("medications"),
    date: v.string(), // YYYY-MM-DD format
    timeTaken: v.string(), // HH:MM format
    wasTaken: v.boolean(),
    notes: v.optional(v.string()),

    createdAt: v.number(),
  })
    .index("by_user_date", ["userId", "date"])
    .index("by_medication", ["medicationId"]),
});
