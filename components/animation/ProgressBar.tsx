import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { Text } from "~/components/ui/text";
import { Check } from "~/lib/icons";

interface AnimatedProgressBarProps {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly stepTitles: string[];
}

export default function AnimatedProgressBar({
  currentStep,
  totalSteps,
  stepTitles,
}: AnimatedProgressBarProps) {
  const progressWidth = useSharedValue(0);
  const titleOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate progress bar
    progressWidth.value = withSpring((currentStep / totalSteps) * 100, {
      damping: 20,
      stiffness: 100,
    });

    // Animate title change
    titleOpacity.value = withSequence(
      withTiming(0, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
  }, [currentStep, totalSteps, progressWidth, titleOpacity]);

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
  }));

  return (
    <View className="p-5 bg-card border-b border-border">
      <Animated.View style={titleAnimatedStyle}>
        <Text className="text-lg font-semibold text-foreground mb-4 text-center">
          Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
        </Text>
      </Animated.View>

      <View className="mb-5">
        <View className="h-2 bg-muted rounded-sm mb-2 overflow-hidden">
          <Animated.View
            className="h-full bg-primary rounded-sm"
            style={progressAnimatedStyle}
          />
        </View>
        <Text className="text-sm font-medium text-muted-foreground text-center">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </Text>
      </View>

      <View className="flex-row justify-between">
        {Array.from({ length: totalSteps }, (_, index) => (
          <StepIndicator
            key={index}
            index={index}
            currentStep={currentStep}
            title={stepTitles[index]}
          />
        ))}
      </View>
    </View>
  );
}

function StepIndicator({
  index,
  currentStep,
  title,
}: {
  index: number;
  currentStep: number;
  title?: string;
}) {
  const scale = useSharedValue(1);
  const checkOpacity = useSharedValue(0);
  const numberOpacity = useSharedValue(1);

  const isCompleted = index < currentStep - 1;
  const isCurrent = index === currentStep - 1;

  useEffect(() => {
    if (isCompleted) {
      // Animate to completed state
      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withSpring(1, { damping: 15, stiffness: 200 })
      );
      numberOpacity.value = withTiming(0, { duration: 150 });
      checkOpacity.value = withDelay(150, withTiming(1, { duration: 150 }));
    } else if (isCurrent) {
      // Animate to current state
      scale.value = withSpring(1.1, { damping: 15, stiffness: 200 });
      numberOpacity.value = withTiming(1, { duration: 150 });
      checkOpacity.value = withTiming(0, { duration: 150 });
    } else {
      // Reset to default state
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      numberOpacity.value = withTiming(1, { duration: 150 });
      checkOpacity.value = withTiming(0, { duration: 150 });
    }
  }, [isCompleted, isCurrent, scale, checkOpacity, numberOpacity]);

  const circleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const numberAnimatedStyle = useAnimatedStyle(() => ({
    opacity: numberOpacity.value,
  }));

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
    position: "absolute" as const,
  }));

  return (
    <View className="items-center flex-1">
      <Animated.View
        className={`w-8 h-8 rounded-full border-2 items-center justify-center mb-2 ${
          isCompleted
            ? "bg-primary border-primary"
            : isCurrent
            ? "bg-background border-primary"
            : "bg-muted border-border"
        }`}
        style={circleAnimatedStyle}
      >
        <Animated.View style={numberAnimatedStyle}>
          <Text
            className={`text-sm font-semibold ${
              isCompleted ? "text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {index + 1}
          </Text>
        </Animated.View>
        <Animated.View style={checkAnimatedStyle}>
          <Check size={16} className="text-primary-foreground" />
        </Animated.View>
      </Animated.View>
      <Text
        className={`text-xs text-center max-w-[80px] ${
          isCurrent ? "text-primary" : "text-muted-foreground"
        }`}
      >
        {title}
      </Text>
    </View>
  );
}
