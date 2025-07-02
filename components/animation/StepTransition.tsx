import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  FadeInUp,
  LinearTransition,
} from "react-native-reanimated";

interface AnimatedStepTransitionProps {
  children: React.ReactNode;
  currentStep: number;
  direction?: "forward" | "backward";
}

export default function StepTransition({
  children,
  currentStep,
  direction = "forward",
}: AnimatedStepTransitionProps) {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(direction === "forward" ? 50 : -50);

  useEffect(() => {
    // Reset and animate in
    opacity.value = 0;
    translateX.value = direction === "forward" ? 50 : -50;

    opacity.value = withTiming(1, { duration: 300 });
    translateX.value = withSpring(0, {
      damping: 20,
      stiffness: 100,
    });
  }, [currentStep, direction, opacity, translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[{ flex: 1 }, animatedStyle]}
      layout={LinearTransition.springify().damping(20).stiffness(100)}
    >
      {children}
    </Animated.View>
  );
}

// Staggered entrance animation for form fields
export function StaggeredFormField({
  children,
  delay = 0,
  index = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  index?: number;
}) {
  return (
    <Animated.View
      entering={FadeInUp.delay(delay + index * 100)
        .springify()
        .damping(20)
        .stiffness(100)}
      layout={LinearTransition.springify().damping(20).stiffness(100)}
    >
      {children}
    </Animated.View>
  );
}
