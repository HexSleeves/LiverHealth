import React, { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useOnboardingStatus } from "~/hooks/useOnboardingStatus";
import { Text } from "~/components/ui/text";
import { Shield } from "~/lib/icons";

export default function RootIndex() {
  const { isLoading, hasCompletedOnboarding } = useOnboardingStatus();

  useEffect(() => {
    if (!isLoading) {
      if (hasCompletedOnboarding) {
        // User has completed onboarding, go to main app
        router.replace("/(tabs)");
      } else {
        // User hasn't completed onboarding, show welcome screen
        router.replace("/(onboarding)/welcome");
      }
    }
  }, [isLoading, hasCompletedOnboarding]);

  // Show loading screen while checking onboarding status
  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <View className="items-center">
          <View className="w-16 h-16 bg-primary/10 rounded-full items-center justify-center mb-4">
            <Shield size={32} className="text-primary" />
          </View>
          <Text className="text-lg font-semibold text-foreground">
            Liver Health
          </Text>
          <Text className="text-sm text-muted-foreground mt-2">Loading...</Text>
        </View>
      </View>
    );
  }

  // This should not be reached due to the redirect in useEffect
  return null;
}
