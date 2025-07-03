import React, { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useOnboardingStatus } from "~/hooks/useOnboardingStatus";
import { useUserContext } from "~/lib/context/UserContext";
import { Text } from "~/components/ui/text";
import { Shield } from "~/lib/icons";

export default function RootIndex() {
  const { isLoading, hasCompletedOnboarding } = useOnboardingStatus();
  const { userId } = useUserContext();

  useEffect(() => {
    if (isLoading) return;

    // If the user is not authenticated, redirect to the login screen
    if (!userId) {
      router.replace("/(auth)/login");
      return;
    }

    // If the user is authenticated, check if they have completed onboarding
    if (hasCompletedOnboarding) {
      router.replace("/(tabs)");
    } else {
      router.replace("/(onboarding)/welcome");
    }
  }, [isLoading, hasCompletedOnboarding, userId]);

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
