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
				}}
			/>
			<Stack.Screen
				name="sign-up"
				options={{
					gestureEnabled: true,
				}}
			/>
			<Stack.Screen
				name="forgot-password"
				options={{
					gestureEnabled: true,
					animationDuration: 300,
				}}
			/>
			<Stack.Screen
				name="reset-password"
				options={{
					gestureEnabled: true,
					animationDuration: 400,
				}}
			/>
		</Stack>
	);
}
