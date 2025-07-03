import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add medication
export const addMedication = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    dosage: v.string(),
    frequency: v.string(),
    instructions: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("medications", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Get user medications
export const getUserMedications = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("medications")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});

// Update medication
export const updateMedication = mutation({
  args: {
    medicationId: v.id("medications"),
    name: v.optional(v.string()),
    dosage: v.optional(v.string()),
    frequency: v.optional(v.string()),
    instructions: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { medicationId, ...updateData } = args;
    
    await ctx.db.patch(medicationId, {
      ...updateData,
      updatedAt: Date.now(),
    });
  },
});

// Log medication taken
export const logMedicationTaken = mutation({
  args: {
    userId: v.id("users"),
    medicationId: v.id("medications"),
    date: v.string(),
    timeTaken: v.string(),
    wasTaken: v.boolean(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("medicationLogs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

// Get medication logs for a date
export const getMedicationLogsByDate = query({
  args: {
    userId: v.id("users"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("medicationLogs")
      .withIndex("by_user_date", (q) => 
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .collect();

    // Get medication details for each log
    const logsWithMedications = await Promise.all(
      logs.map(async (log) => {
        const medication = await ctx.db.get(log.medicationId);
        return {
          ...log,
          medication,
        };
      })
    );

    return logsWithMedications;
  },
});

// Get medication adherence summary
export const getMedicationAdherence = query({
  args: {
    userId: v.id("users"),
    startDate: v.string(),
    endDate: v.string(),
  },
  handler: async (ctx, args) => {
    const medications = await ctx.db
      .query("medications")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const adherenceData = await Promise.all(
      medications.map(async (medication) => {
        const logs = await ctx.db
          .query("medicationLogs")
          .withIndex("by_medication", (q) => q.eq("medicationId", medication._id))
          .filter((q) => 
            q.and(
              q.gte(q.field("date"), args.startDate),
              q.lte(q.field("date"), args.endDate)
            )
          )
          .collect();

        const takenCount = logs.filter(log => log.wasTaken).length;
        const totalLogs = logs.length;
        const adherenceRate = totalLogs > 0 ? (takenCount / totalLogs) * 100 : 0;

        return {
          medication,
          adherenceRate,
          takenCount,
          totalLogs,
        };
      })
    );

    return adherenceData;
  },
});
