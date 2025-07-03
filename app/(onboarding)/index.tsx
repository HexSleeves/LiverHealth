import React, { useMemo, useState, useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  LinearTransition,
  FadeIn,
} from "react-native-reanimated";
import { ArrowLeft, ArrowRight, Check } from "~/lib/icons";
import { Text } from "~/components/ui/text";
import {
  useOnboardingData,
  useOnboardingActions,
} from "~/lib/context/OnboardingContext";

import AnimatedProgressBar from "~/components/animation/ProgressBar";
import AnimatedStepTransition from "~/components/animation/StepTransition";
import AnimatedButton from "~/components/animation/AnimatedButton";
import AnimatedPersonalInfoStep from "~/components/onboarding/steps/PersonalInfoStep";
import DiseaseHistoryStep from "~/components/onboarding/steps/DiseaseHistoryStep";
import MedicationsStep from "~/components/onboarding/steps/MedicationsStep";
import ReviewStep from "~/components/onboarding/steps/ReviewStep";
import SubmissionSuccess from "~/components/onboarding/SubmissionSuccess";

const STEP_TITLES = [
  "Personal Info",
  "Disease History",
  "Medications",
  "Review",
];

export default function OnboardingFlow() {
  const { currentStep, showSuccess } = useOnboardingData();
  const { previousStep, onSuccessComplete } = useOnboardingActions();
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [prevStep, setPrevStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep > prevStep) {
      setDirection("forward");
    } else if (currentStep < prevStep) {
      setDirection("backward");
    }
    setPrevStep(currentStep);
  }, [currentStep, prevStep]);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <AnimatedPersonalInfoStep />;
      case 2:
        return <DiseaseHistoryStep />;
      case 3:
        return <MedicationsStep />;
      case 4:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  const handlePreviousStep = () => {
    setDirection("backward");
    previousStep();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Animated.View
          entering={FadeIn.duration(300)}
          layout={LinearTransition.springify().damping(20).stiffness(100)}
        >
          <AnimatedProgressBar
            currentStep={currentStep}
            totalSteps={4}
            stepTitles={STEP_TITLES}
          />
        </Animated.View>

        <AnimatedStepTransition currentStep={currentStep} direction={direction}>
          {renderCurrentStep()}
        </AnimatedStepTransition>

        <Animated.View
          className="flex-row justify-between px-5 py-4 bg-card border-t border-border"
          layout={LinearTransition.springify().damping(20).stiffness(100)}
        >
          <AnimatedButton
            variant="outline"
            onPress={handlePreviousStep}
            disabled={currentStep === 1}
            className="flex-row items-center gap-2"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
            <Text className="text-muted-foreground">Previous</Text>
          </AnimatedButton>

          <AnimatedSubmitButton />
        </Animated.View>
      </KeyboardAvoidingView>

      <SubmissionSuccess visible={showSuccess} onComplete={onSuccessComplete} />
    </SafeAreaView>
  );
}

function AnimatedSubmitButton() {
  const { currentStep, isSubmitting } = useOnboardingData();
  const { nextStep } = useOnboardingActions();
  const spinValue = useSharedValue(0);

  useEffect(() => {
    if (isSubmitting) {
      spinValue.value = withTiming(360, { duration: 1000 }, () => {
        if (isSubmitting) {
          spinValue.value = 0;
          spinValue.value = withTiming(360, { duration: 1000 });
        }
      });
    }
  }, [isSubmitting, spinValue]);

  const spinStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${spinValue.value}deg` }],
  }));

  const ButtonIcon = useMemo(
    () =>
      currentStep === 4 ? (
        <Check size={20} className="text-primary-foreground" />
      ) : (
        <ArrowRight size={20} className="text-primary-foreground" />
      ),
    [currentStep]
  );

  const ButtonText = useMemo(
    () => (currentStep === 4 ? "Submit" : "Next"),
    [currentStep]
  );

  return (
    <AnimatedButton
      onPress={nextStep}
      disabled={isSubmitting}
      className="flex-row items-center gap-2"
    >
      {isSubmitting ? (
        <>
          <Animated.View
            className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
            style={spinStyle}
          />
          <Text className="text-primary-foreground">Submitting...</Text>
        </>
      ) : (
        <>
          {ButtonIcon}
          <Text className="text-primary-foreground">{ButtonText}</Text>
        </>
      )}
    </AnimatedButton>
  );
}
