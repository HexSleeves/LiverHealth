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
import { type ResetPasswordFormData, resetPasswordSchema } from "~/types/auth";

export default function VerifyEmailScreen() {
	const router = useRouter();
	const [resendCooldown, setResendCooldown] = useState(0);

	const { resetPasswordWithCode, isLoading, error, clearError } =
		useClerkAuth();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useAuthForm<ResetPasswordFormData>({
		schema: resetPasswordSchema,
		defaultValues: {
			code: "",
			password: "",
		},
		onSubmit: async (data) => {
			try {
				clearError();
				await resetPasswordWithCode({
					code: data.code,
					password: data.password,
				});
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
			// In a real implementation, you would call a resend verification email function
			// For now, we'll just show a success message and start cooldown
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
		<SafeAreaView className="flex-1 bg-gray-50 dark:bg-background">
			<View className="flex-1 justify-center px-6 py-8">
				<View>
					<AuthCard
						logoSize="md"
						title="Verify Your Email"
						contentClassName="gap-y-4"
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
						<View className="gap-y-4">
							<View className="items-center gap-y-3">
								<Text className="text-gray-600 dark:text-gray-400 text-center leading-6">
									Enter the verification code sent to your email address and
									create a new password.
								</Text>
							</View>

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

							<FormField
								secureTextEntry
								control={control}
								name="password"
								label="New Password"
								placeholder="Enter new password"
								keyboardType="default"
								autoCapitalize="none"
								autoComplete="password"
								maxLength={20}
								error={errors.password}
								className="text-center text-2xl tracking-widest font-mono"
							/>

							<AnimatedButton
								onPress={handleSubmit}
								disabled={isLoading || isSubmitting}
								className="h-14 bg-blue-500 hover:bg-blue-600 active:bg-blue-600 rounded-xl web:shadow-lg web:shadow-blue-500/25"
							>
								<Text className="text-lg font-semibold text-white">
									{isLoading || isSubmitting
										? "Verifying..."
										: "Reset Password"}
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
									className="h-12 border-gray-200 dark:border-border disabled:opacity-50"
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
			</View>
		</SafeAreaView>
	);
}
