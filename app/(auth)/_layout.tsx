import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import { useAccessibilityFixes } from "~/hooks/useAccessibilityFixes";

export default function AuthRoutesLayout() {
	const { isSignedIn } = useAuth();

	// Apply accessibility fixes for web
	useAccessibilityFixes();

	if (isSignedIn) {
		return <Redirect href={"/"} />;
	}

	return (
		<Stack
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				// animation: "slide_from_right",
				animationDuration: 300,
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					gestureEnabled: false,
					animation: "fade",
					animationDuration: 250,
				}}
			/>
			<Stack.Screen
				name="sign-in"
				options={{
					gestureEnabled: true,
					// animation: "slide_from_right",
					animationDuration: 300,
				}}
			/>
			<Stack.Screen
				name="sign-up"
				options={{
					gestureEnabled: true,
					// animation: "slide_from_right",
					animationDuration: 300,
				}}
			/>
			<Stack.Screen
				name="forgot-password"
				options={{
					gestureEnabled: true,
					// animation: "slide_from_right",
					animationDuration: 300,
				}}
			/>
			<Stack.Screen
				name="verify-email"
				options={{
					gestureEnabled: true,
					// animation: "slide_from_bottom",
					animationDuration: 400,
				}}
			/>
		</Stack>
	);
}
