import { useCallback, useState } from "react";

export function useSteps(steps: string[]) {
  if (steps.length === 0) {
    throw new Error("useSteps: steps array cannot be empty");
  }

  const [step, setStep] = useState(steps[0]);

  const nextStep = useCallback(() => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [step, steps]);

  const previousStep = useCallback(() => {
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  }, [step, steps]);

  const currentIndex = steps.indexOf(step);

  return {
    step,
    nextStep,
    previousStep,
    canGoNext: currentIndex < steps.length - 1,
    canGoPrevious: currentIndex > 0,
  };
}
