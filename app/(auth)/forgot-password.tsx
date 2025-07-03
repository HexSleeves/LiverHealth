import React, { useState } from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Shield, ArrowLeft, AlertCircle } from "~/lib/icons";
import { FormInput } from "~/components/form/FormInput";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "~/types/auth";

export default function ForgotPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);

      // Simulate password reset email sending
      // In a real app, you'd integrate with Clerk or your auth service
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmittedEmail(data.email);
      setIsEmailSent(true);
    } catch (error) {
      console.error("Password reset error:", error);
      setError("root", {
        message: "Failed to send reset email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.replace("/(auth)/login");
  };

  const handleTryDifferentEmail = () => {
    setIsEmailSent(false);
    setSubmittedEmail("");
    reset();
  };

  if (isEmailSent) {
    return (
      <View className="flex-1 justify-center items-center p-4 bg-background">
        <View className="w-full max-w-md">
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-20 h-20 bg-green-100 rounded-full items-center justify-center mb-4">
              <Shield size={40} className="text-green-600" />
            </View>
            <Text className="text-3xl font-bold text-foreground mb-2">
              Check Your Email
            </Text>
            <Text className="text-base text-muted-foreground text-center">
              We've sent password reset instructions to {submittedEmail}
            </Text>
          </View>

          <Card>
            <CardContent className="space-y-4 pt-6">
              <Text className="text-center text-muted-foreground">
                If you don't see the email in your inbox, check your spam
                folder.
              </Text>

              <Button onPress={handleBackToLogin} className="w-full">
                <Text>Back to Sign In</Text>
              </Button>

              <Button
                onPress={handleTryDifferentEmail}
                variant="outline"
                className="w-full"
              >
                <Text>Try Different Email</Text>
              </Button>
            </CardContent>
          </Card>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-4 bg-background">
      <View className="w-full max-w-md">
        {/* Header */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-4">
            <Shield size={40} className="text-primary" />
          </View>
          <Text className="text-3xl font-bold text-foreground mb-2">
            Reset Password
          </Text>
          <Text className="text-base text-muted-foreground text-center">
            Enter your email and we'll send you reset instructions
          </Text>
        </View>

        <Card>
          <CardHeader>
            <View className="flex-row items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onPress={handleBackToLogin}
                className="p-2"
              >
                <ArrowLeft size={20} className="text-muted-foreground" />
              </Button>
              <CardTitle className="text-xl">Forgot Password</CardTitle>
            </View>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Display */}
            {errors.root?.message && (
              <View className="flex-row items-start space-x-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle size={16} className="text-destructive mt-0.5" />
                <Text className="text-destructive text-sm flex-1">
                  {errors.root.message}
                </Text>
              </View>
            )}

            <FormInput
              control={control}
              name="email"
              label="Email Address"
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
              <Text>
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </Text>
            </Button>

            <View className="flex-row justify-center items-center space-x-2 mt-6">
              <Text className="text-muted-foreground">
                Remember your password?
              </Text>
              <Link href="/(auth)/login" asChild>
                <Button variant="link" className="p-0">
                  <Text className="text-primary font-medium">Sign In</Text>
                </Button>
              </Link>
            </View>

            <Text className="text-xs text-muted-foreground text-center mt-4">
              This is a demo version. In production, this would send a real
              reset email.
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}
