import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import Dropdown from "~/components/form/Dropdown";
import FormField from "~/components/form/FormField";
import DatePicker from "~/components/form/DatePicker";
import MultiSelect from "~/components/form/MultiSelect";
import {
  MEDICATION_FREQUENCIES,
  TIMING_REQUIREMENTS,
  COMMON_MEDICATIONS,
} from "~/types/onboarding";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import {
  useOnboardingData,
  useOnboardingActions,
} from "~/components/providers/OnboardingProvider";

export default function MedicationsStep() {
  const { medications, errors } = useOnboardingData();
  const { setMedications, addMedication, removeMedication } =
    useOnboardingActions();

  return (
    <ScrollView
      className="flex-1 px-5 pt-5"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Medication Management
        </Text>
        <Text className="text-base text-muted-foreground">
          Please list all medications you're currently taking for your liver
          condition.
        </Text>
      </View>

      <View className="flex-row justify-between items-center mb-4 mt-6">
        <Text className="text-lg font-semibold text-foreground">
          Current Medications
        </Text>
        <Button onPress={addMedication} size="sm">
          <Text>Add Medication</Text>
        </Button>
      </View>

      {medications.medications?.length === 0 && (
        <View className="bg-card rounded-xl p-8 items-center mb-4 border border-border">
          <Text className="text-base text-muted-foreground text-center">
            No medications added yet. Tap "Add Medication" to get started.
          </Text>
        </View>
      )}

      {medications.medications?.map((medication, index) => (
        <View
          key={medication.name}
          className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border"
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-base font-semibold text-foreground">
              Medication #{index + 1}
            </Text>
            <TouchableOpacity
              onPress={() => removeMedication(index)}
              className="p-2"
              accessibilityLabel={`Remove medication ${index + 1}`}
            >
              <Text className="text-sm font-medium text-destructive">
                Remove
              </Text>
            </TouchableOpacity>
          </View>

          <Dropdown
            label="Medication Name"
            value={medication.name}
            options={COMMON_MEDICATIONS.map((med) => ({
              value: med,
              label: med,
            }))}
            onSelect={(value) => {
              const updatedMedications = [...(medications.medications || [])];
              updatedMedications[index] = { ...medication, name: value };
              setMedications({
                ...medications,
                medications: updatedMedications,
              });
            }}
            required
            error={errors[`medications.${index}.name`]}
          />

          <View className="flex-row gap-3">
            <View className="flex-[2]">
              <FormField
                label="Dosage"
                value={medication.dosage}
                onChangeText={(text) => {
                  const updatedMedications = [
                    ...(medications.medications || []),
                  ];
                  updatedMedications[index] = {
                    ...medication,
                    dosage: text,
                  };
                  setMedications({
                    ...medications,
                    medications: updatedMedications,
                  });
                }}
                placeholder="Enter dosage"
                required
                keyboardType="numeric"
                error={errors[`medications.${index}.dosage`]}
              />
            </View>
            <View className="flex-1">
              <Dropdown
                label="Unit"
                value={medication.unit}
                options={[
                  { value: "mg", label: "mg" },
                  { value: "g", label: "g" },
                  { value: "ml", label: "ml" },
                  { value: "tablets", label: "tablets" },
                  { value: "capsules", label: "capsules" },
                ]}
                onSelect={(value) => {
                  const updatedMedications = [
                    ...(medications.medications || []),
                  ];
                  updatedMedications[index] = {
                    ...medication,
                    unit: value,
                  };
                  setMedications({
                    ...medications,
                    medications: updatedMedications,
                  });
                }}
                required
                error={errors[`medications.${index}.unit`]}
              />
            </View>
          </View>

          <Dropdown
            label="Frequency"
            value={medication.frequency}
            options={MEDICATION_FREQUENCIES.map((freq) => ({
              value: freq,
              label: freq,
            }))}
            onSelect={(value) => {
              const updatedMedications = [...(medications.medications || [])];
              updatedMedications[index] = {
                ...medication,
                frequency: value,
              };
              setMedications({
                ...medications,
                medications: updatedMedications,
              });
            }}
            required
            error={errors[`medications.${index}.frequency`]}
          />

          <MultiSelect
            label="Timing Requirements"
            values={medication.timingRequirements || []}
            options={TIMING_REQUIREMENTS.map((req) => ({
              value: req,
              label: req,
            }))}
            onSelectionChange={(values) => {
              const updatedMedications = [...(medications.medications || [])];
              updatedMedications[index] = {
                ...medication,
                timingRequirements: values,
              };
              setMedications({
                ...medications,
                medications: updatedMedications,
              });
            }}
            placeholder="Select timing requirements"
            error={errors[`medications.${index}.timingRequirements`]}
          />

          <DatePicker
            label="Start Date"
            value={medication.startDate ? new Date(medication.startDate) : null}
            onChange={(date) => {
              const updatedMedications = [...(medications.medications || [])];
              updatedMedications[index] = {
                ...medication,
                startDate: date,
              };
              setMedications({
                ...medications,
                medications: updatedMedications,
              });
            }}
            required
            error={errors[`medications.${index}.startDate`]}
            maximumDate={new Date()}
          />

          <FormField
            label="Special Instructions"
            value={medication.specialInstructions ?? ""}
            onChangeText={(text) => {
              const updatedMedications = [...(medications.medications || [])];
              updatedMedications[index] = {
                ...medication,
                specialInstructions: text,
              };
              setMedications({
                ...medications,
                medications: updatedMedications,
              });
            }}
            placeholder="Any special instructions or notes"
            multiline
            numberOfLines={3}
            error={errors[`medications.${index}.specialInstructions`]}
          />

          <FormField
            label="Prescribing Doctor"
            value={medication.prescribingDoctor}
            onChangeText={(text) => {
              const updatedMedications = [...(medications.medications || [])];
              updatedMedications[index] = {
                ...medication,
                prescribingDoctor: text,
              };
              setMedications({
                ...medications,
                medications: updatedMedications,
              });
            }}
            placeholder="Enter doctor's name"
            required
            error={errors[`medications.${index}.prescribingDoctor`]}
          />
        </View>
      ))}
    </ScrollView>
  );
}
