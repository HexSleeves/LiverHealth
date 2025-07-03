import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Check } from "~/lib/icons";
import { Text } from "~/components/ui/text";
import {
  useOnboardingData,
  useOnboardingActions,
} from "~/lib/context/OnboardingContext";

export default function ReviewStep() {
  const {
    personalInfo,
    diseaseHistory,
    medications,
    finalConfirmation,
    errors,
  } = useOnboardingData();
  const { setFinalConfirmation, setCurrentStep } = useOnboardingActions();

  return (
    <ScrollView
      className="flex-1 px-5 pt-5"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Review & Submit
        </Text>
        <Text className="text-base text-muted-foreground">
          Please review all your information before submitting. You can edit any
          section by tapping on it.
        </Text>
      </View>

      {/* Personal Information Review */}
      <TouchableOpacity
        className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border"
        onPress={() => setCurrentStep(1)}
        accessibilityLabel="Edit personal information"
      >
        <Text className="text-lg font-semibold text-foreground mb-3">
          Personal Information
        </Text>
        <Text className="text-sm text-muted-foreground mb-1">
          {personalInfo.firstName} {personalInfo.middleName}{" "}
          {personalInfo.lastName}
        </Text>
        <Text className="text-sm text-muted-foreground mb-1">
          Born:{" "}
          {personalInfo.dateOfBirth
            ? new Date(personalInfo.dateOfBirth).toLocaleDateString()
            : "Not provided"}
        </Text>
        <Text className="text-sm text-muted-foreground mb-1">
          Email: {personalInfo.email}
        </Text>
        <Text className="text-sm text-muted-foreground mb-1">
          Phone: {personalInfo.phone ?? "Not provided"}
        </Text>
        <Text className="text-sm text-muted-foreground mb-1">
          Emergency Contact: {personalInfo.emergencyContact?.fullName} (
          {personalInfo.emergencyContact?.relationship})
        </Text>
      </TouchableOpacity>

      {/* Disease History Review */}
      <TouchableOpacity
        className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border"
        onPress={() => setCurrentStep(2)}
        accessibilityLabel="Edit disease history"
      >
        <Text className="text-lg font-semibold text-foreground mb-3">
          Disease History
        </Text>
        <Text className="text-sm text-muted-foreground mb-1">
          Primary Diagnosis: {diseaseHistory.primaryDiagnosis}
          {diseaseHistory.primaryDiagnosis === "Other" &&
            diseaseHistory.otherDiagnosis &&
            ` (${diseaseHistory.otherDiagnosis})`}
        </Text>
        <Text className="text-sm text-muted-foreground mb-1">
          Diagnosed:{" "}
          {diseaseHistory.diagnosisDate
            ? new Date(diseaseHistory.diagnosisDate).toLocaleDateString()
            : "Not provided"}
        </Text>
        <Text className="text-sm text-muted-foreground mb-1">
          Stage: {diseaseHistory.diseaseStage}
        </Text>
        {diseaseHistory.secondaryConditions &&
          diseaseHistory.secondaryConditions.length > 0 && (
            <Text className="text-sm text-muted-foreground mb-1">
              Secondary Conditions:{" "}
              {diseaseHistory.secondaryConditions.join(", ")}
            </Text>
          )}
        <Text className="text-sm text-muted-foreground mb-1">
          Test Results: {diseaseHistory.testResults?.length ?? 0} recorded
        </Text>
      </TouchableOpacity>

      {/* Medications Review */}
      <TouchableOpacity
        className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border"
        onPress={() => setCurrentStep(3)}
        accessibilityLabel="Edit medications"
      >
        <Text className="text-lg font-semibold text-foreground mb-3">
          Medications
        </Text>
        {medications.medications && medications.medications.length > 0 ? (
          medications.medications.map((med) => (
            <Text key={med.name} className="text-sm text-muted-foreground mb-1">
              {med.name} - {med.dosage} {med.unit}, {med.frequency}
            </Text>
          ))
        ) : (
          <Text className="text-sm text-muted-foreground mb-1">
            No medications recorded
          </Text>
        )}
      </TouchableOpacity>

      {/* Final Confirmation */}
      <View className="bg-card rounded-xl p-4 mb-4 border border-border">
        <TouchableOpacity
          className="flex-row items-start"
          onPress={() => setFinalConfirmation(!finalConfirmation)}
          accessibilityLabel="Final confirmation checkbox"
          accessibilityRole="checkbox"
          accessibilityState={{ checked: finalConfirmation }}
        >
          <View
            className={`w-6 h-6 rounded border-2 items-center justify-center mr-3 mt-0.5 ${
              finalConfirmation
                ? "border-primary bg-primary"
                : "border-border bg-transparent"
            }`}
          >
            {finalConfirmation && (
              <Check size={16} className="text-primary-foreground" />
            )}
          </View>
          <Text className="text-sm leading-5 flex-1 text-foreground">
            I confirm that all the information provided is accurate and
            complete. I understand that this information will be used to provide
            personalized health recommendations and will be kept confidential
            according to HIPAA guidelines.
          </Text>
        </TouchableOpacity>
        {!!errors["general"] && (
          <Text className="text-sm mt-2 text-destructive">
            {errors["general"]}
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
