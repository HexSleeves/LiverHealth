import React, { useState } from "react";
import { View } from "react-native";
import { Link, router } from "expo-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useUserContext } from "~/lib/context/UserContext";
import { Shield } from "~/lib/icons";

export default function SignupScreen() {
  const { signIn, isLoading } = useUserContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
  });

  const handleSignUp = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.confirmEmail.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (formData.email !== formData.confirmEmail) {
      alert("Emails do not match");
      return;
    }

    try {
      // For demo purposes, we'll create the user account
      // In a real app, you'd integrate with Clerk for proper auth
      await signIn({
        clerkId: formData.email, // This would come from Clerk in production
        email: formData.email,
        name: formData.name,
      });
      
      // Navigate to main app after successful sign up
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Sign up error:", error);
      alert("Failed to create account. Please try again.");
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
          <CardContent className="space-y-4">
            <View className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
              />
            </View>
            
            <View className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="space-y-2">
              <Label htmlFor="confirmEmail">Confirm Email</Label>
              <Input
                id="confirmEmail"
                placeholder="Confirm your email"
                value={formData.confirmEmail}
                onChangeText={(text) => setFormData(prev => ({ ...prev, confirmEmail: text }))}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Button
              onPress={handleSignUp}
              disabled={isLoading}
              className="w-full"
            >
              <Text>{isLoading ? "Creating Account..." : "Create Account"}</Text>
            </Button>

            <View className="flex-row justify-center items-center space-x-2 mt-6">
              <Text className="text-muted-foreground">Already have an account?</Text>
              <Link href="/(auth)/login" asChild>
                <Button variant="link" className="p-0">
                  <Text className="text-primary font-medium">Sign In</Text>
                </Button>
              </Link>
            </View>

            <Text className="text-xs text-muted-foreground text-center mt-4">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}
