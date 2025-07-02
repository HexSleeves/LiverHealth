import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  BounceIn,
  FadeInUp,
} from "react-native-reanimated";
import { Check, Shield } from "~/lib/icons";
import { Text } from "~/components/ui/text";

interface AnimatedSubmissionSuccessProps {
  visible: boolean;
  onComplete?: () => void;
}

export default function AnimatedSubmissionSuccess({
  visible,
  onComplete,
}: AnimatedSubmissionSuccessProps) {
  const scale = useSharedValue(0);
  const checkOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Animate success sequence
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });

      checkOpacity.value = withDelay(
        300,
        withTiming(1, { duration: 200 }, () => {
          // Call completion callback after animations
          setTimeout(() => onComplete?.(), 1500);
        })
      );
    } else {
      scale.value = 0;
      checkOpacity.value = 0;
    }
  }, [visible, scale, checkOpacity, onComplete]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
  }));

  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
      <Animated.View
        className="bg-card rounded-2xl p-8 items-center shadow-lg border border-border"
        style={containerStyle}
      >
        <Animated.View
          className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-6"
          entering={BounceIn.delay(200).springify().damping(12).stiffness(200)}
        >
          <Animated.View style={checkStyle}>
            <Check size={32} className="text-green-600" />
          </Animated.View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(500).springify().damping(20).stiffness(100)}
        >
          <Text className="text-xl font-bold text-foreground text-center mb-2">
            Success!
          </Text>
          <Text className="text-base text-muted-foreground text-center">
            Your information has been submitted successfully.
          </Text>
        </Animated.View>

        <Animated.View
          className="mt-6"
          entering={FadeInUp.delay(700).springify().damping(20).stiffness(100)}
        >
          <View className="flex-row items-center space-x-2">
            <Shield size={16} className="text-primary" />
            <Text className="text-sm text-primary font-medium">
              Welcome to your liver health journey!
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
