import React from "react";
import { Stack } from "expo-router";
import { ErrorBoundary } from "~/components/ErrorBoundary";

export default function AuthLayout() {
  return (
    <ErrorBoundary>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false, // Prevent swipe back on iOS
          animation: "slide_from_right", // Consistent animation
        }}
      >
        <Stack.Screen 
          name="index"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="login"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="signup"
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="forgot-password"
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack>
    </ErrorBoundary>
  );
}
