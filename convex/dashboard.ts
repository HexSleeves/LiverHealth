import { query } from "./_generated/server";
import { v } from "convex/values";

// Get comprehensive dashboard data for a specific date
export const getDashboardData = query({
  args: {
    userId: v.id("users"),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    // Get user profile with goals
    const user = await ctx.db.get(args.userId);

    // Get nutrition summary
    const nutritionEntries = await ctx.db
      .query("nutritionEntries")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .collect();

    const nutritionTotals = nutritionEntries.reduce(
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

    // Get fluid intake
    const fluidEntries = await ctx.db
      .query("fluidEntries")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .collect();

    const totalFluidIntake = fluidEntries.reduce(
      (acc, entry) => acc + entry.amount,
      0
    );

    // Get medication status
    const medications = await ctx.db
      .query("medications")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const medicationLogs = await ctx.db
      .query("medicationLogs")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .collect();

    const medicationStatus = medications.map((medication) => {
      const logs = medicationLogs.filter(
        (log) => log.medicationId === medication._id
      );
      const wasTaken = logs.some((log) => log.wasTaken);

      return {
        ...medication,
        wasTaken,
        logCount: logs.length,
      };
    });

    const takenMedicationsCount = medicationStatus.filter(
      (med) => med.wasTaken
    ).length;

    // Calculate goal progress
    const goalProgress = user?.dailyGoals
      ? {
          protein: {
            current: nutritionTotals.protein,
            goal: user.dailyGoals.protein,
            percentage: Math.min(
              (nutritionTotals.protein / user.dailyGoals.protein) * 100,
              100
            ),
          },
          carbohydrates: {
            current: nutritionTotals.carbohydrates,
            goal: user.dailyGoals.carbohydrates,
            percentage: Math.min(
              (nutritionTotals.carbohydrates / user.dailyGoals.carbohydrates) *
                100,
              100
            ),
          },
          fats: {
            current: nutritionTotals.fats,
            goal: user.dailyGoals.fats,
            percentage: Math.min(
              (nutritionTotals.fats / user.dailyGoals.fats) * 100,
              100
            ),
          },
          sodium: {
            current: nutritionTotals.sodium,
            goal: user.dailyGoals.sodium,
            percentage: Math.min(
              (nutritionTotals.sodium / user.dailyGoals.sodium) * 100,
              100
            ),
          },
          potassium: {
            current: nutritionTotals.potassium,
            goal: user.dailyGoals.potassium,
            percentage: Math.min(
              (nutritionTotals.potassium / user.dailyGoals.potassium) * 100,
              100
            ),
          },
          fluids: {
            current: totalFluidIntake,
            goal: user.dailyGoals.fluids,
            percentage: Math.min(
              (totalFluidIntake / user.dailyGoals.fluids) * 100,
              100
            ),
          },
        }
      : null;

    return {
      date: args.date,
      user,
      nutrition: {
        totals: nutritionTotals,
        entryCount: nutritionEntries.length,
      },
      fluids: {
        total: totalFluidIntake,
        entryCount: fluidEntries.length,
      },
      medications: {
        status: medicationStatus,
        takenCount: takenMedicationsCount,
        totalCount: medications.length,
      },
      goalProgress,
    };
  },
});
