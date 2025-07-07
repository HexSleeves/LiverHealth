import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedButton, animationPresets } from "~/components/animations";
import { AuthCard } from "~/components/auth/AuthCard";
import FormField from "~/components/form/FormField";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuthForm } from "~/hooks/auth/useAuthForm";
import { useClerkAuth } from "~/hooks/auth/useClerkAuth";
import { AlertCircle } from "~/lib/icons";
import {
	type EmailVerificationFormData,
	emailVerificationSchema,
} from "~/types/auth";

export default function VerifyEmailScreen() {
	const router = useRouter();
	const [resendCooldown, setResendCooldown] = useState(0);

	// Note: This should use a specific email verification method
	// For now using the existing auth hook pattern
	const { error, clearError, isLoading } = useClerkAuth();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useAuthForm<EmailVerificationFormData>({
		schema: emailVerificationSchema,
		defaultValues: {
			code: "",
		},
		onSubmit: async (data) => {
			try {
				clearError();
				// TODO: Implement actual email verification with Clerk
				// This should use the signUp.attemptEmailAddressVerification method
				console.log("Verifying email with code:", data.code);

				// Placeholder - replace with actual Clerk email verification
				router.replace("/(tabs)");
			} catch (err) {
				console.log(err);
				// Error is handled by useClerkAuth hook
				reset(); // Clear the form on error
			}
		},
	});

	const handleResendCode = async () => {
		if (resendCooldown > 0) return;

		try {
			clearError();
			// TODO: Implement actual resend verification email
			// This should use signUp.prepareEmailAddressVerification
			console.log("Resending verification email...");

			setResendCooldown(60);

			const interval = setInterval(() => {
				setResendCooldown((prev) => {
					if (prev <= 1) {
						clearInterval(interval);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} catch (err) {
			console.log(err);
			// Error handling
		}
	};

	return (
		<SafeAreaView className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100">
			<View className="flex-1 justify-center px-6 py-8">
				<AuthCard
					logoSize="lg"
					title="Verify Your Email"
					subtitle="Enter the verification code sent to your email address to complete your account setup."
					contentClassName="gap-y-3"
				>
					{/* Error Display */}
					{(errors.root?.message || error) && (
						<Animated.View
							entering={animationPresets.errorMessage}
							className="flex-row items-start gap-x-3 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl"
						>
							<AlertCircle size={20} className="text-red-500 mt-0.5" />
							<Text className="text-red-500 text-sm flex-1 font-medium">
								{errors.root?.message || error?.message}
							</Text>
						</Animated.View>
					)}

					{/* Verification Form */}
					<View className="gap-y-3">
						<FormField
							control={control}
							name="code"
							label="Verification Code"
							placeholder="Enter 6-digit code"
							keyboardType="number-pad"
							autoCapitalize="none"
							autoComplete="one-time-code"
							maxLength={6}
							error={errors.code}
							className="text-center text-2xl tracking-widest font-mono"
						/>

						<AnimatedButton
							onPress={handleSubmit}
							disabled={isLoading || isSubmitting}
							className="h-12 bg-blue-500 hover:bg-blue-600 active:bg-blue-600 rounded-xl web:shadow-lg web:shadow-blue-500/25"
						>
							<Text className="text-lg font-semibold text-white">
								{isLoading || isSubmitting ? "Verifying..." : "Verify Email"}
							</Text>
						</AnimatedButton>
					</View>

					{/* Resend Section */}
					<View className="gap-y-3">
						<View className="items-center gap-y-2">
							<Text className="text-gray-600 dark:text-muted-foreground text-center">
								Didn't receive the code?
							</Text>

							<Button
								onPress={handleResendCode}
								disabled={resendCooldown > 0}
								variant="outline"
								className="h-11 border-gray-200 dark:border-border disabled:opacity-50"
							>
								<Text className="text-blue-600 dark:text-blue-400 font-medium">
									{resendCooldown > 0
										? `Resend in ${resendCooldown}s`
										: "Resend Code"}
								</Text>
							</Button>
						</View>

						{/* Footer Links */}
						<View className="flex-row items-center justify-center">
							<Text className="text-gray-600 dark:text-muted-foreground">
								Wrong email?{" "}
							</Text>
							<Link href="/(auth)/sign-up" asChild>
								<Button variant="ghost" className="p-0 h-auto">
									<Text className="text-blue-600 dark:text-blue-400 font-semibold">
										Go back
									</Text>
								</Button>
							</Link>
						</View>
					</View>
				</AuthCard>
			</View>
		</SafeAreaView>
	);
}
