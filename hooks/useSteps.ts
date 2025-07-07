import { useCallback, useState } from "react";

export function useSteps(steps: string[]) {
  const [step, setStep] = useState(steps[0]);

  const nextStep = useCallback(() => {
    setStep(steps[steps.indexOf(step) + 1]);
  }, [step, steps]);

  const previousStep = useCallback(() => {
    setStep(steps[steps.indexOf(step) - 1]);
  }, [step, steps]);

  return { step, nextStep, previousStep };
}
