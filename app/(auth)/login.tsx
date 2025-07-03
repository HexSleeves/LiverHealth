import React from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { useUserContext } from "~/lib/context/UserContext";
import { Shield, AlertCircle } from "~/lib/icons";
import { FormInput } from "~/components/form/FormInput";
import { loginSchema, type LoginFormData } from "~/types/auth";

// Generate a unique demo ID for each session
const generateDemoId = () => {
  return `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export default function LoginScreen() {
  const { signIn, isLoading, error } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // For demo purposes, we'll use a generated ID as clerkId
      // In a real app, you'd integrate with Clerk for proper auth
      await signIn({
        clerkId: generateDemoId(), // This would come from Clerk in production
        email: data.email,
      });

      // Navigate to main app after successful sign in
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Sign in error:", error);
      setError("root", {
        message: "Failed to sign in. Please try again.",
      });
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-background">
      <View className="w-full max-w-md">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
            <Shield size={40} className="text-primary" />
          </View>
          <Text className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </Text>
          <Text className="text-base text-muted-foreground text-center">
            Sign in to continue tracking your liver health
          </Text>
        </View>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Sign In</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <View className="gap-y-2">
              {/* Error Display */}
              {(errors.root?.message || error) && (
                <View className="flex-row items-start space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <AlertCircle size={16} className="text-destructive mt-0.5" />
                  <Text className="text-destructive text-sm flex-1">
                    {errors.root?.message || error}
                  </Text>
                </View>
              )}

              <FormInput
                control={control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={errors.email}
              />

              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={isLoading || !isValid}
                className="w-full"
              >
                <Text>{isLoading ? "Signing in..." : "Sign In"}</Text>
              </Button>
            </View>

            <View className="flex-row justify-center space-x-1 mt-4">
              <Link href="/(auth)/forgot-password" asChild>
                <Button variant="link" className="p-0">
                  <Text className="text-primary">Forgot Password?</Text>
                </Button>
              </Link>
            </View>

            <View className="flex-row justify-center items-center space-x-2 mt-6">
              <Text className="text-muted-foreground">
                Don't have an account?
              </Text>
              <Link href="/(auth)/signup" asChild>
                <Button variant="link" className="p-0">
                  <Text className="text-primary font-medium">Sign Up</Text>
                </Button>
              </Link>
            </View>

            <Text className="text-xs text-muted-foreground text-center mt-4">
              This is a demo version. In production, this would use proper
              authentication.
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}
