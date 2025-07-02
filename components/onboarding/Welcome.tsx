import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Animated, {
  FadeInUp,
  FadeInDown,
  BounceIn,
  SlideInLeft,
  LinearTransition,
} from "react-native-reanimated";
import { Text } from "~/components/ui/text";
import { Shield } from "~/lib/icons";
import AnimatedButton from "../animation/AnimatedButton";

export default function AnimatedWelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1 px-6 py-8"
        contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
      >
        {/* Hero Section */}
        <Animated.View
          className="items-center mb-12"
          entering={FadeInUp.delay(200).springify().damping(20).stiffness(100)}
        >
          <Animated.View
            className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-6"
            entering={BounceIn.delay(400)
              .springify()
              .damping(15)
              .stiffness(200)}
          >
            <Shield size={48} className="text-primary" />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(600)
              .springify()
              .damping(20)
              .stiffness(100)}
          >
            <Text className="text-3xl font-bold text-foreground text-center mb-4">
              Welcome to Your Liver Health Journey
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(800)
              .springify()
              .damping(20)
              .stiffness(100)}
          >
            <Text className="text-lg text-muted-foreground text-center leading-relaxed">
              We'll help you track your liver health with personalized insights,
              medication reminders, and expert guidance tailored to your
              condition.
            </Text>
          </Animated.View>
        </Animated.View>

        {/* Features Section */}
        <Animated.View
          className="space-y-4 mb-8"
          layout={LinearTransition.springify().damping(20).stiffness(100)}
        >
          <AnimatedFeatureItem
            title="Personalized Dashboard"
            description="Track your symptoms, medications, and test results in one place"
            delay={1000}
          />

          <AnimatedFeatureItem
            title="Medication Management"
            description="Never miss a dose with smart reminders and tracking"
            delay={1200}
          />

          <AnimatedFeatureItem
            title="Expert Insights"
            description="Get personalized recommendations based on your health data"
            delay={1400}
          />
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          className="space-y-3"
          entering={FadeInDown.delay(1600)
            .springify()
            .damping(20)
            .stiffness(100)}
        >
          <AnimatedButton
            onPress={() => router.push("/(onboarding)/")}
            className="w-full"
          >
            <Text className="text-primary-foreground font-semibold">
              Get Started
            </Text>
          </AnimatedButton>

          <AnimatedButton
            variant="outline"
            onPress={() => router.replace("/(tabs)")}
            className="w-full"
          >
            <Text className="text-foreground">Skip for Now</Text>
          </AnimatedButton>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AnimatedFeatureItem({
  title,
  description,
  delay = 0,
}: {
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <Animated.View
      className="flex-row items-start space-x-3 p-4 bg-card rounded-lg border border-border"
      entering={SlideInLeft.delay(delay).springify().damping(20).stiffness(100)}
      layout={LinearTransition.springify().damping(20).stiffness(100)}
    >
      <Animated.View
        className="w-2 h-2 bg-primary rounded-full mt-2"
        entering={BounceIn.delay(delay + 200)
          .springify()
          .damping(15)
          .stiffness(300)}
      />
      <View className="flex-1">
        <Text className="font-semibold text-foreground mb-1">{title}</Text>
        <Text className="text-sm text-muted-foreground">{description}</Text>
      </View>
    </Animated.View>
  );
}
