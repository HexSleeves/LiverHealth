import React, { useState } from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Shield, ArrowLeft } from "~/lib/icons";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);

      // Simulate password reset email sending
      // In a real app, you'd integrate with Clerk or your auth service
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsEmailSent(true);
    } catch (error) {
      console.error("Password reset error:", error);
      alert("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.replace("/(auth)/login");
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
              We've sent password reset instructions to {email}
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
                onPress={() => setIsEmailSent(false)}
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
            <View className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Button
              onPress={handleResetPassword}
              disabled={isLoading}
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
