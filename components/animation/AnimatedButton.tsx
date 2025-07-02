import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { cn } from "~/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  variant?: "default" | "outline";
  className?: string;
}

export default function AnimatedButton({
  children,
  onPress,
  disabled = false,
  variant = "default",
  className,
}: AnimatedButtonProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 300,
    });
  };

  const handlePress = () => {
    if (disabled || !onPress) return;

    // Add haptic feedback animation
    scale.value = withSpring(
      0.98,
      {
        damping: 15,
        stiffness: 300,
      },
      () => {
        scale.value = withSpring(1, {
          damping: 15,
          stiffness: 300,
        });
        runOnJS(onPress)();
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.5 : opacity.value,
  }));

  const baseClasses = cn(
    "flex-row items-center justify-center px-4 py-3 rounded-md min-h-12",
    variant === "default" ? "bg-primary" : "bg-transparent border border-input",
    disabled && "opacity-50",
    className
  );

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className={baseClasses}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}
