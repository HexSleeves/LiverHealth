import { useMutation, useQuery } from "convex/react";
import { api } from "~/convex/_generated/api";
import type { Id } from "~/convex/_generated/dataModel";

// User hooks
export const useUser = (clerkId: string) => {
  return useQuery(api.users.getUserByClerkId, { clerkId });
};

export const useCreateOrUpdateUser = () => {
  return useMutation(api.users.getOrCreateUser);
};

export const useUpdateHealthProfile = () => {
  return useMutation(api.users.updateHealthProfile);
};

// Nutrition hooks
export const useAddNutritionEntry = () => {
  return useMutation(api.nutrition.addNutritionEntry);
};

export const useNutritionByDate = (
  userId: Id<"users"> | undefined,
  date: string
) => {
  return useQuery(
    api.nutrition.getNutritionByDate,
    userId ? { userId, date } : "skip"
  );
};

export const useDailyNutritionSummary = (
  userId: Id<"users"> | undefined,
  date: string
) => {
  return useQuery(
    api.nutrition.getDailyNutritionSummary,
    userId ? { userId, date } : "skip"
  );
};

export const useAddFluidEntry = () => {
  return useMutation(api.nutrition.addFluidEntry);
};

export const useDailyFluidIntake = (
  userId: Id<"users"> | undefined,
  date: string
) => {
  return useQuery(
    api.nutrition.getDailyFluidIntake,
    userId ? { userId, date } : "skip"
  );
};

// Medication hooks
export const useAddMedication = () => {
  return useMutation(api.medications.addMedication);
};

export const useUserMedications = (userId: Id<"users"> | undefined) => {
  return useQuery(
    api.medications.getUserMedications,
    userId ? { userId } : "skip"
  );
};

export const useUpdateMedication = () => {
  return useMutation(api.medications.updateMedication);
};

export const useLogMedicationTaken = () => {
  return useMutation(api.medications.logMedicationTaken);
};

export const useMedicationLogsByDate = (
  userId: Id<"users"> | undefined,
  date: string
) => {
  return useQuery(
    api.medications.getMedicationLogsByDate,
    userId ? { userId, date } : "skip"
  );
};

export const useMedicationAdherence = (
  userId: Id<"users"> | undefined,
  startDate: string,
  endDate: string
) => {
  return useQuery(
    api.medications.getMedicationAdherence,
    userId ? { userId, startDate, endDate } : "skip"
  );
};

// Dashboard hooks
export const useDashboardData = (
  userId: Id<"users"> | undefined,
  date: string
) => {
  return useQuery(
    api.dashboard.getDashboardData,
    userId ? { userId, date } : "skip"
  );
};
