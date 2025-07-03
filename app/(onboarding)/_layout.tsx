import { Stack } from "expo-router";
import { OnboardingProvider } from "~/lib/context/OnboardingContext";

export default function OnboardingLayout() {
  return (
    <OnboardingProvider>
      <Stack
        initialRouteName="welcome"
        screenOptions={{
          headerShown: false,
          gestureEnabled: false, // Prevent swipe back during onboarding
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="welcome"
          options={{
            title: "Welcome",
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            title: "Onboarding",
          }}
        />
      </Stack>
    </OnboardingProvider>
  );
}
