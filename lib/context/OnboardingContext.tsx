import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
  useMemo,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { router } from "expo-router";
import {
  type PersonalInfo,
  type DiseaseHistory,
  type Medications,
  personalInfoSchema,
  diseaseHistorySchema,
  medicationSchema,
  onboardingSchema,
} from "~/types/onboarding";
import * as z from "zod/v4";

const STORAGE_KEY = "@onboarding_data";
const ONBOARDING_COMPLETED_KEY = "@onboarding_completed";

interface OnboardingState {
  currentStep: number;
  isSubmitting: boolean;
  showSuccess: boolean;
  errors: Record<string, string>;
  personalInfo: Partial<PersonalInfo>;
  diseaseHistory: Partial<DiseaseHistory>;
  medications: Partial<Medications>;
  finalConfirmation: boolean;
}

interface OnboardingActions {
  setPersonalInfo: (data: Partial<PersonalInfo>) => void;
  setDiseaseHistory: (data: Partial<DiseaseHistory>) => void;
  setMedications: (data: Partial<Medications>) => void;
  setFinalConfirmation: (value: boolean) => void;
  nextStep: () => void;
  previousStep: () => void;
  handleSubmit: () => Promise<void>;
  onSuccessComplete: () => void;
  addTestResult: () => void;
  removeTestResult: (index: number) => void;
  addMedication: () => void;
  removeMedication: (index: number) => void;
  setCurrentStep: (step: number) => void;
  clearErrors: () => void;
}

const OnboardingContext = createContext<
  (OnboardingState & OnboardingActions) | null
>(null);

const INITIAL_STATE: OnboardingState = {
  currentStep: 1,
  isSubmitting: false,
  showSuccess: false,
  errors: {},
  personalInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: undefined,
    email: "",
    phone: "",
    emergencyContact: {
      fullName: "",
      relationship: "",
      primaryPhone: "",
      secondaryPhone: "",
    },
  },
  diseaseHistory: {
    primaryDiagnosis: "",
    otherDiagnosis: "",
    diagnosisDate: undefined,
    diseaseStage: undefined,
    secondaryConditions: [],
    testResults: [],
  },
  medications: {
    medications: [],
  },
  finalConfirmation: false,
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(INITIAL_STATE);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced save to AsyncStorage
  const debouncedSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const dataToSave = {
          personalInfo: state.personalInfo,
          diseaseHistory: state.diseaseHistory,
          medications: state.medications,
          finalConfirmation: state.finalConfirmation,
          lastSaved: new Date().toISOString(),
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      } catch (error) {
        console.warn("Failed to save onboarding data:", error);
      }
    }, 1000); // 1 second debounce
  }, [
    state.personalInfo,
    state.diseaseHistory,
    state.medications,
    state.finalConfirmation,
  ]);

  // Load saved data on mount
  useEffect(() => {
    let isMounted = true;

    const loadSavedData = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData && isMounted) {
          const parsed = JSON.parse(savedData);
          setState((prev) => ({
            ...prev,
            personalInfo: parsed.personalInfo ?? prev.personalInfo,
            diseaseHistory: parsed.diseaseHistory ?? prev.diseaseHistory,
            medications: parsed.medications ?? prev.medications,
            finalConfirmation:
              parsed.finalConfirmation ?? prev.finalConfirmation,
          }));
        }
      } catch (error) {
        console.warn("Failed to load saved onboarding data:", error);
      }
    };

    loadSavedData();

    return () => {
      isMounted = false;
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Save data when it changes
  useEffect(() => {
    debouncedSave();
  }, [debouncedSave]);

  // Validation helper
  const validateCurrentStep = useCallback(() => {
    try {
      switch (state.currentStep) {
        case 1:
          personalInfoSchema.parse(state.personalInfo);
          break;
        case 2:
          diseaseHistorySchema.parse(state.diseaseHistory);
          break;
        case 3:
          medicationSchema.parse(state.medications);
          break;
        case 4:
          if (!state.finalConfirmation) {
            throw new Error("You must confirm to proceed");
          }
          break;
      }
      return true;
    } catch (error: any) {
      const newErrors: Record<string, string> = {};

      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const path = issue.path.join(".");
          newErrors[path] = issue.message;
        });
      } else {
        newErrors.general = error.message;
      }

      setState((prev) => ({ ...prev, errors: newErrors }));
      return false;
    }
  }, [
    state.currentStep,
    state.personalInfo,
    state.diseaseHistory,
    state.medications,
    state.finalConfirmation,
  ]);

  // Actions
  const setPersonalInfo = useCallback((data: Partial<PersonalInfo>) => {
    setState((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
      // errors: {}, // Clear errors when user makes changes
    }));
  }, []);

  const setDiseaseHistory = useCallback((data: Partial<DiseaseHistory>) => {
    setState((prev) => ({
      ...prev,
      diseaseHistory: { ...prev.diseaseHistory, ...data },
      errors: {},
    }));
  }, []);

  const setMedications = useCallback((data: Partial<Medications>) => {
    setState((prev) => ({
      ...prev,
      medications: { ...prev.medications, ...data },
      errors: {},
    }));
  }, []);

  const setFinalConfirmation = useCallback((value: boolean) => {
    setState((prev) => ({
      ...prev,
      finalConfirmation: value,
      errors: {},
    }));
  }, []);

  const setCurrentStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  }, []);

  const clearErrors = useCallback(() => {
    setState((prev) => ({ ...prev, errors: {} }));
  }, []);

  const nextStep = useCallback(() => {
    if (validateCurrentStep()) {
      if (state.currentStep < 4) {
        setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
      } else {
        handleSubmit();
      }
    }
  }, [state.currentStep, validateCurrentStep]);

  const previousStep = useCallback(() => {
    if (state.currentStep > 1) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
        errors: {},
      }));
    }
  }, [state.currentStep]);

  const handleSubmit = useCallback(async () => {
    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const completeData = {
        personalInfo: state.personalInfo as PersonalInfo,
        diseaseHistory: state.diseaseHistory as DiseaseHistory,
        medications: state.medications as Medications,
        finalConfirmation: state.finalConfirmation,
      };

      // Final validation
      onboardingSchema.parse(completeData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear saved data and mark onboarding as completed
      await AsyncStorage.removeItem(STORAGE_KEY);
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_KEY, "true");

      // Show success screen instead of alert
      setState((prev) => ({
        ...prev,
        isSubmitting: false,
        showSuccess: true,
      }));
    } catch (error: any) {
      Alert.alert(
        "Submission Error",
        "There was an error submitting your information. Please check your data and try again.",
        [{ text: "OK" }]
      );
      console.error("Submission error:", error);
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  }, [
    state.personalInfo,
    state.diseaseHistory,
    state.medications,
    state.finalConfirmation,
  ]);

  const onSuccessComplete = useCallback(() => {
    setState((prev) => ({ ...prev, showSuccess: false }));
    router.replace("/(tabs)");
  }, []);

  const addTestResult = useCallback(() => {
    const newTestResult = {
      testType: "",
      dateConducted: new Date(),
      result: "",
      unit: "",
      labName: "",
    };

    setState((prev) => ({
      ...prev,
      diseaseHistory: {
        ...prev.diseaseHistory,
        testResults: [
          ...(prev.diseaseHistory.testResults || []),
          newTestResult,
        ],
      },
    }));
  }, []);

  const removeTestResult = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      diseaseHistory: {
        ...prev.diseaseHistory,
        testResults:
          prev.diseaseHistory.testResults?.filter((_, i) => i !== index) || [],
      },
    }));
  }, []);

  const addMedication = useCallback(() => {
    const newMedication = {
      name: "",
      dosage: "",
      unit: "mg",
      frequency: "",
      timingRequirements: [],
      startDate: new Date(),
      specialInstructions: "",
      prescribingDoctor: "",
    };

    setState((prev) => ({
      ...prev,
      medications: {
        ...prev.medications,
        medications: [...(prev.medications.medications || []), newMedication],
      },
    }));
  }, []);

  const removeMedication = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      medications: {
        ...prev.medications,
        medications:
          prev.medications.medications?.filter((_, i) => i !== index) || [],
      },
    }));
  }, []);

  const contextValue = useMemo(() => {
    return {
      ...state,
      setPersonalInfo,
      setDiseaseHistory,
      setMedications,
      setFinalConfirmation,
      nextStep,
      previousStep,
      handleSubmit,
      onSuccessComplete,
      addTestResult,
      removeTestResult,
      addMedication,
      removeMedication,
      setCurrentStep,
      clearErrors,
    };
  }, [
    state,
    setPersonalInfo,
    setDiseaseHistory,
    setMedications,
    setFinalConfirmation,
    nextStep,
    previousStep,
    handleSubmit,
    onSuccessComplete,
    addTestResult,
    removeTestResult,
    addMedication,
    removeMedication,
    setCurrentStep,
    clearErrors,
  ]);

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
}

// Split hooks for better performance - consumers only re-render when needed
export function useOnboardingData() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingData must be used within an OnboardingProvider"
    );
  }

  const {
    currentStep,
    isSubmitting,
    showSuccess,
    errors,
    personalInfo,
    diseaseHistory,
    medications,
    finalConfirmation,
  } = context;

  return {
    currentStep,
    isSubmitting,
    showSuccess,
    errors,
    personalInfo,
    diseaseHistory,
    medications,
    finalConfirmation,
  };
}

export function useOnboardingActions() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error(
      "useOnboardingActions must be used within an OnboardingProvider"
    );
  }

  const {
    setPersonalInfo,
    setDiseaseHistory,
    setMedications,
    setFinalConfirmation,
    nextStep,
    previousStep,
    handleSubmit,
    onSuccessComplete,
    addTestResult,
    removeTestResult,
    addMedication,
    removeMedication,
    setCurrentStep,
    clearErrors,
  } = context;

  return {
    setPersonalInfo,
    setDiseaseHistory,
    setMedications,
    setFinalConfirmation,
    nextStep,
    previousStep,
    handleSubmit,
    onSuccessComplete,
    addTestResult,
    removeTestResult,
    addMedication,
    removeMedication,
    setCurrentStep,
    clearErrors,
  };
}
