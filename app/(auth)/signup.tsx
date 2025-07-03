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
import { signupSchema, type SignupFormData } from "~/types/auth";

// Generate a unique demo ID for each session
const generateDemoId = () => {
  return `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export default function SignupScreen() {
  const { signIn, isLoading, error } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      confirmEmail: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      // For demo purposes, we'll create the user account
      // In a real app, you'd integrate with Clerk for proper auth
      await signIn({
        clerkId: generateDemoId(), // This would come from Clerk in production
        email: data.email,
      });

      // Navigate to main app after successful sign up
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Sign up error:", error);
      setError("root", {
        message: "Failed to create account. Please try again.",
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
            Create Account
          </Text>
          <Text className="text-base text-muted-foreground text-center">
            Join MyLiverApp to start tracking your health
          </Text>
        </View>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-xl">Sign Up</CardTitle>
          </CardHeader>
          <CardContent className="gap-y-4">
            {/* Error Display */}
            {(errors.root?.message || error) && (
              <View className="flex-row items-start gap-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle size={16} className="text-destructive mt-0.5" />
                <Text className="text-destructive text-sm flex-1">
                  {errors.root?.message || error}
                </Text>
              </View>
            )}

            <FormInput
              control={control}
              name="name"
              label="Full Name"
              placeholder="Enter your full name"
              autoComplete="name"
              error={errors.name}
            />

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

            <FormInput
              control={control}
              name="confirmEmail"
              label="Confirm Email"
              placeholder="Confirm your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={errors.confirmEmail}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading || !isValid}
              className="w-full"
            >
              <Text>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Text>
            </Button>

            <View className="flex-row justify-center items-center gap-x-2 mt-6">
              <Text className="text-muted-foreground">
                Already have an account?
              </Text>
              <Link href="/(auth)/login" asChild>
                <Button variant="link" className="p-0">
                  <Text className="text-primary font-medium">Sign In</Text>
                </Button>
              </Link>
            </View>

            <Text className="text-xs text-muted-foreground text-center mt-4">
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}
