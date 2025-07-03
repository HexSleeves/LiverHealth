import React, { useState } from "react";
import { Alert } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useUserContext } from "~/lib/context/UserContext";
import {
  useUpdateHealthProfile,
  useAddNutritionEntry,
  useAddFluidEntry,
  useAddMedication,
  useLogMedicationTaken,
} from "~/hooks/useConvex";
import {
  sampleHealthProfile,
  sampleNutritionEntries,
  sampleFluidEntries,
  sampleMedications,
} from "~/lib/demo/sampleData";
import { getCurrentTimeString, getTodayDateString } from "~/lib/utils";

export const DemoDataButton: React.FC = () => {
  const { userId } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateHealthProfile = useUpdateHealthProfile();
  const addNutritionEntry = useAddNutritionEntry();
  const addFluidEntry = useAddFluidEntry();
  const addMedication = useAddMedication();
  const logMedicationTaken = useLogMedicationTaken();

  const addSampleData = async () => {
    if (!userId) {
      Alert.alert("Error", "Please sign in first");
      return;
    }

    try {
      setIsLoading(true);
      const today = getTodayDateString();
      const currentTime = getCurrentTimeString();

      // Update health profile
      await updateHealthProfile({
        userId,
        ...sampleHealthProfile,
      });

      // Add nutrition entries
      for (const entry of sampleNutritionEntries) {
        await addNutritionEntry({
          userId,
          date: today,
          ...entry,
        });
      }

      // Add fluid entries
      for (const entry of sampleFluidEntries) {
        await addFluidEntry({
          userId,
          date: today,
          ...entry,
        });
      }

      // Add medications
      const medicationIds = [];
      for (const medication of sampleMedications) {
        const medicationId = await addMedication({
          userId,
          ...medication,
        });
        medicationIds.push(medicationId);
      }

      // Log some medications as taken
      for (let i = 0; i < medicationIds.length; i++) {
        const medicationId = medicationIds[i];
        if (medicationId) {
          await logMedicationTaken({
            userId,
            medicationId,
            date: today,
            timeTaken: currentTime,
            wasTaken: i < 2, // Mark first 2 medications as taken
          });
        }
      }

      Alert.alert(
        "Success!",
        "Sample data has been added to your profile. You can now see your dashboard with real data."
      );
    } catch (error) {
      console.error("Error adding sample data:", error);
      Alert.alert("Error", "Failed to add sample data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <Button
      onPress={addSampleData}
      disabled={isLoading}
      variant="outline"
      className="mt-4"
    >
      <Text>{isLoading ? "Adding Sample Data..." : "Add Demo Data"}</Text>
    </Button>
  );
};
