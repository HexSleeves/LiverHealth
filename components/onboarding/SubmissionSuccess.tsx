import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  withSequence,
  BounceIn,
  FadeInUp,
  FadeInDown,
} from "react-native-reanimated";
import { Check, Shield, Heart, Sparkles } from "~/lib/icons";
import { Text } from "~/components/ui/text";
import AnimatedButton from "../animation/AnimatedButton";

interface AnimatedSubmissionSuccessProps {
  visible: boolean;
  onComplete?: () => void;
}

export default function SubmissionSuccess({
  visible,
  onComplete,
}: AnimatedSubmissionSuccessProps) {
  const scale = useSharedValue(0);
  const checkOpacity = useSharedValue(0);
  const sparkleScale = useSharedValue(0);
  const sparkleRotation = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    if (visible) {
      // Background overlay fade in
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });

      // Check mark animation with delay
      checkOpacity.value = withDelay(300, withTiming(1, { duration: 300 }));

      // Sparkle effects
      sparkleScale.value = withDelay(
        600,
        withSequence(
          withSpring(1.2, { damping: 12, stiffness: 400 }),
          withSpring(1, { damping: 10, stiffness: 300 })
        )
      );

      sparkleRotation.value = withDelay(
        600,
        withTiming(360, { duration: 1000 })
      );

      // Pulse effect for the success circle
      pulseScale.value = withDelay(
        400,
        withSequence(
          withTiming(1.1, { duration: 200 }),
          withTiming(1, { duration: 200 }),
          withTiming(1.05, { duration: 200 }),
          withTiming(1, { duration: 200 })
        )
      );
    } else {
      scale.value = 0;
      checkOpacity.value = 0;
      sparkleScale.value = 0;
      sparkleRotation.value = 0;
      pulseScale.value = 1;
    }
  }, [
    visible,
    scale,
    checkOpacity,
    sparkleScale,
    sparkleRotation,
    pulseScale,
    onComplete,
  ]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const sparkleStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: sparkleScale.value },
      { rotate: `${sparkleRotation.value}deg` },
    ],
  }));

  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black/60 items-center justify-center z-50">
      {/* Sparkle decorations */}
      <Animated.View className="absolute top-1/4 left-1/4" style={sparkleStyle}>
        <Sparkles size={24} className="text-green-400" />
      </Animated.View>
      <Animated.View
        className="absolute top-1/3 right-1/4"
        style={[sparkleStyle, { transform: [{ rotate: "45deg" }] }]}
      >
        <Sparkles size={16} className="text-green-300" />
      </Animated.View>
      <Animated.View
        className="absolute bottom-1/3 left-1/3"
        style={[sparkleStyle, { transform: [{ rotate: "-30deg" }] }]}
      >
        <Sparkles size={20} className="text-green-500" />
      </Animated.View>

      <Animated.View
        className="bg-card rounded-3xl p-8 items-center shadow-2xl border border-border mx-6 max-w-sm w-full"
        style={containerStyle}
      >
        {/* Success Icon with pulse effect */}
        <Animated.View
          className="relative w-20 h-20 bg-health-100 dark:bg-health-900/30 rounded-full items-center justify-center mb-8"
          style={pulseStyle}
          entering={BounceIn.delay(200).springify().damping(12).stiffness(200)}
        >
          {/* Outer glow ring */}
          <View className="absolute inset-0 bg-health-500/20 rounded-full animate-pulse" />

          <Animated.View style={checkStyle}>
            <Check size={36} className="text-health-600" />
          </Animated.View>
        </Animated.View>

        {/* Success Message */}
        <Animated.View
          className="items-center mb-6"
          entering={FadeInUp.delay(500).springify().damping(20).stiffness(100)}
        >
          <Text className="text-2xl font-bold text-foreground text-center mb-3">
            Welcome Aboard! 🎉
          </Text>
          <Text className="text-base text-muted-foreground text-center leading-relaxed">
            Your health profile has been created successfully. Let's start your
            liver health journey together!
          </Text>
        </Animated.View>

        {/* Health Features */}
        <Animated.View
          className="w-full gap-y-3"
          entering={FadeInDown.delay(700)
            .springify()
            .damping(20)
            .stiffness(100)}
        >
          <View className="flex-row items-center justify-center gap-x-2 bg-health-50 dark:bg-health-950/30 p-3 rounded-xl">
            <Shield size={18} className="text-health-600" />
            <Text className="text-sm text-health-700 dark:text-health-300 font-medium">
              HIPAA Compliant & Secure
            </Text>
          </View>

          <View className="flex-row items-center justify-center gap-x-2 bg-health-50 dark:bg-health-950/30 p-3 rounded-xl">
            <Heart size={18} className="text-health-600" />
            <Text className="text-sm text-health-700 dark:text-health-300 font-medium">
              Personalized Health Tracking
            </Text>
          </View>
        </Animated.View>

        {/* Continuing message */}
        <Animated.View
          className="mt-6 items-center"
          entering={FadeInUp.delay(900).springify().damping(20).stiffness(100)}
        >
          <AnimatedButton onPress={onComplete}>
            <Text>Proceed</Text>
          </AnimatedButton>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
