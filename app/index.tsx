import { useAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { LoadingSpinner } from "~/components/auth/LoadingSpinner";
import { Text } from "~/components/ui/text";
import { Shield } from "~/lib/icons";

export default function RootIndex() {
	const { isSignedIn, isLoaded } = useAuth();

	console.log({ isSignedIn, isLoaded });

	useEffect(() => {
		if (!isLoaded) return;

		// If the user is not authenticated, redirect to the login screen
		if (!isSignedIn) {
			router.replace("/(auth)");
			return;
		}

		router.replace("/(tabs)");
	}, [isLoaded, isSignedIn]);

	// Show loading screen while checking onboarding status
	if (!isLoaded) {
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
	return <LoadingSpinner />;
}
