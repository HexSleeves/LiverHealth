import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import Dropdown from "~/components/form/Dropdown";
import FormField from "~/components/form/FormField";
import DatePicker from "~/components/form/DatePicker";
import MultiSelect from "~/components/form/MultiSelect";
import {
  DIAGNOSIS_OPTIONS,
  DISEASE_STAGES,
  SECONDARY_CONDITIONS,
  TEST_TYPES,
} from "~/types/onboarding";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import {
  useOnboardingData,
  useOnboardingActions,
} from "~/components/providers/OnboardingProvider";

export default function DiseaseHistoryStep() {
  const { diseaseHistory, errors } = useOnboardingData();
  const { setDiseaseHistory, addTestResult, removeTestResult } =
    useOnboardingActions();

  return (
    <ScrollView
      className="flex-1 px-5 pt-5"
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-6">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Liver Disease History
        </Text>
        <Text className="text-base text-muted-foreground">
          Please provide information about your liver condition and recent test
          results.
        </Text>
      </View>

      <Dropdown
        label="Primary Diagnosis"
        value={diseaseHistory.primaryDiagnosis ?? ""}
        options={DIAGNOSIS_OPTIONS.map((diagnosis) => ({
          value: diagnosis,
          label: diagnosis,
        }))}
        onSelect={(value) =>
          setDiseaseHistory({ ...diseaseHistory, primaryDiagnosis: value })
        }
        required
        error={errors["primaryDiagnosis"]}
        accessibilityLabel="Primary diagnosis dropdown"
      />

      {diseaseHistory.primaryDiagnosis === "Other" && (
        <FormField
          label="Other Diagnosis"
          value={diseaseHistory.otherDiagnosis ?? ""}
          onChangeText={(text) =>
            setDiseaseHistory({ ...diseaseHistory, otherDiagnosis: text })
          }
          placeholder="Please specify your diagnosis"
          required
          error={errors["otherDiagnosis"]}
          accessibilityLabel="Other diagnosis input"
        />
      )}

      <DatePicker
        label="Initial Diagnosis Date"
        value={
          diseaseHistory.diagnosisDate
            ? new Date(diseaseHistory.diagnosisDate)
            : null
        }
        onChange={(date) =>
          setDiseaseHistory({ ...diseaseHistory, diagnosisDate: date })
        }
        required
        error={errors["diagnosisDate"]}
        maximumDate={new Date()}
        accessibilityLabel="Diagnosis date picker"
      />

      <Dropdown
        label="Current Disease Stage"
        value={diseaseHistory.diseaseStage ?? ""}
        options={DISEASE_STAGES}
        onSelect={(value) =>
          setDiseaseHistory({
            ...diseaseHistory,
            diseaseStage: value as any,
          })
        }
        required
        error={errors["diseaseStage"]}
        accessibilityLabel="Disease stage dropdown"
      />

      <MultiSelect
        label="Secondary Conditions"
        values={diseaseHistory.secondaryConditions || []}
        options={SECONDARY_CONDITIONS.map((condition) => ({
          value: condition,
          label: condition,
        }))}
        onSelectionChange={(values) =>
          setDiseaseHistory({
            ...diseaseHistory,
            secondaryConditions: values,
          })
        }
        placeholder="Select any additional conditions"
        error={errors["secondaryConditions"]}
        accessibilityLabel="Secondary conditions multi-select"
      />

      <View className="flex-row justify-between items-center mb-4 mt-6">
        <Text className="text-lg font-semibold text-foreground">
          Latest Test Results
        </Text>
        <Button onPress={addTestResult} size="sm">
          <Text>Add Test</Text>
        </Button>
      </View>

      {diseaseHistory.testResults?.map((test, index) => (
        <View
          key={`${test.testType}-${test.dateConducted}`}
          className="bg-card rounded-xl p-4 mb-4 shadow-sm border border-border"
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-base font-semibold text-foreground">
              Test Result #{index + 1}
            </Text>
            <TouchableOpacity
              onPress={() => removeTestResult(index)}
              className="p-2"
              accessibilityLabel={`Remove test result ${index + 1}`}
            >
              <Text className="text-sm font-medium text-destructive">
                Remove
              </Text>
            </TouchableOpacity>
          </View>

          <Dropdown
            label="Test Type"
            value={test.testType}
            options={TEST_TYPES.map((type) => ({
              value: type,
              label: type,
            }))}
            onSelect={(value) => {
              const updatedResults = [...(diseaseHistory.testResults || [])];
              updatedResults[index] = { ...test, testType: value };
              setDiseaseHistory({
                ...diseaseHistory,
                testResults: updatedResults,
              });
            }}
            required
            error={errors[`testResults.${index}.testType`]}
          />

          <DatePicker
            label="Date Conducted"
            value={test.dateConducted ? new Date(test.dateConducted) : null}
            onChange={(date) => {
              const updatedResults = [...(diseaseHistory.testResults || [])];
              updatedResults[index] = { ...test, dateConducted: date };
              setDiseaseHistory({
                ...diseaseHistory,
                testResults: updatedResults,
              });
            }}
            required
            error={errors[`testResults.${index}.dateConducted`]}
            maximumDate={new Date()}
          />

          <View className="flex-row gap-3">
            <View className="flex-1">
              <FormField
                label="Result"
                value={test.result}
                onChangeText={(text) => {
                  const updatedResults = [
                    ...(diseaseHistory.testResults || []),
                  ];
                  updatedResults[index] = { ...test, result: text };
                  setDiseaseHistory({
                    ...diseaseHistory,
                    testResults: updatedResults,
                  });
                }}
                placeholder="Enter result"
                required
                error={errors[`testResults.${index}.result`]}
              />
            </View>
            <View className="flex-1">
              <FormField
                label="Unit"
                value={test.unit}
                onChangeText={(text) => {
                  const updatedResults = [
                    ...(diseaseHistory.testResults || []),
                  ];
                  updatedResults[index] = { ...test, unit: text };
                  setDiseaseHistory({
                    ...diseaseHistory,
                    testResults: updatedResults,
                  });
                }}
                placeholder="mg/dL, U/L, etc."
                required
                error={errors[`testResults.${index}.unit`]}
              />
            </View>
          </View>

          <FormField
            label="Lab/Facility Name"
            value={test.labName}
            onChangeText={(text) => {
              const updatedResults = [...(diseaseHistory.testResults || [])];
              updatedResults[index] = { ...test, labName: text };
              setDiseaseHistory({
                ...diseaseHistory,
                testResults: updatedResults,
              });
            }}
            placeholder="Enter lab or facility name"
            required
            error={errors[`testResults.${index}.labName`]}
          />
        </View>
      ))}
    </ScrollView>
  );
}
