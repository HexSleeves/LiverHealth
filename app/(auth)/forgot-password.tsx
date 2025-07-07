import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Animated, {
	FadeInDown,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedButton } from "~/components/animations";
import { AuthCard } from "~/components/auth/AuthCard";
import { GoBackButton } from "~/components/auth/GoBackButton";
import FormField from "~/components/form/FormField";
import { Button } from "~/components/ui/button";
import {
	GradientBackground,
	gradientPresets,
} from "~/components/ui/gradient-background";
import { Text } from "~/components/ui/text";
import { useAuthForm } from "~/hooks/auth/useAuthForm";
import { useClerkAuth } from "~/hooks/auth/useClerkAuth";
import { useSteps } from "~/hooks/useSteps";
import { AlertCircle, Heart, Shield } from "~/lib/icons";
import {
	type ForgotPasswordFormData,
	forgotPasswordSchema,
	type ResetPasswordFormData,
	resetPasswordSchema,
} from "~/types/auth";

export default function ForgotPasswordScreen() {
	const [submittedEmail, setSubmittedEmail] = useState("");
	const [resendCooldown, setResendCooldown] = useState(0);
	const { step, nextStep, previousStep } = useSteps([
		"email",
		"sent",
		"verify",
	]);

	const {
		sendPasswordResetEmail,
		resetPasswordWithCode,
		isLoading,
		error,
		clearError,
	} = useClerkAuth();

	// Animation values
	const buttonScale = useSharedValue(1);
	const shieldScale = useSharedValue(1);
	const heartScale = useSharedValue(1);
	const checkmarkScale = useSharedValue(0);

	// Email form
	const emailForm = useAuthForm<ForgotPasswordFormData>({
		schema: forgotPasswordSchema,
		defaultValues: {
			email: "",
		},
		onSubmit: async (data) => {
			try {
				clearError();
				await sendPasswordResetEmail({ email: data.email });
				setSubmittedEmail(data.email);
				nextStep();
			} catch (err) {
				console.error(err);
				// Error is handled by useClerkAuth hook
			}
		},
	});

	// Reset password form
	const resetForm = useAuthForm<ResetPasswordFormData>({
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
				console.error(err);
				// Error is handled by useClerkAuth hook
				resetForm.reset(); // Clear the form on error
			}
		},
	});

	// Shield pulse animation
	useEffect(() => {
		const pulse = () => {
			shieldScale.value = withSpring(1.1, { damping: 2 }, () => {
				shieldScale.value = withSpring(1, { damping: 2 });
			});
		};

		if (step === "email") {
			const interval = setInterval(pulse, 3500);
			return () => clearInterval(interval);
		}
	}, [shieldScale, step]);

	// Heart pulse animation for success state
	useEffect(() => {
		if (step === "sent") {
			const pulse = () => {
				heartScale.value = withSpring(1.15, { damping: 2 }, () => {
					heartScale.value = withSpring(1, { damping: 2 });
				});
			};

			// Animate checkmark on success
			checkmarkScale.value = withDelay(300, withSpring(1, { damping: 8 }));

			const interval = setInterval(pulse, 2500);
			return () => clearInterval(interval);
		}
	}, [heartScale, checkmarkScale, step]);

	// Animation styles
	const buttonAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: buttonScale.value }],
	}));

	const handleResendEmail = async () => {
		if (resendCooldown > 0) return;

		try {
			clearError();
			await sendPasswordResetEmail({ email: submittedEmail });
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
			console.error(err);
		}
	};

	const handleBackToEmail = () => {
		previousStep();
		clearError();
		checkmarkScale.value = 0; // Reset checkmark animation
	};

	const handleContinueToVerification = () => {
		nextStep();
		clearError();
	};

	// Email sent confirmation step
	if (step === "sent") {
		return (
			<GradientBackground {...gradientPresets.orangeAuth}>
				<SafeAreaView className="flex-1">
					<View className="flex-1 justify-center px-6 py-8">
						<AuthCard
							logoSize="lg"
							title="Check Your Email"
							contentClassName="gap-y-3"
							logoIcon={<Heart size={48} className="text-white" />}
							logoGradientColors={gradientPresets.orangeLogo.colors}
							subtitle={`We've sent a password reset link to ${submittedEmail}`}
							className="bg-white/90 backdrop-blur-sm border-orange-200 web:shadow-xl web:shadow-orange-500/10"
						>
							<View className="gap-y-3">
								{/* Continue to Verification */}
								<AnimatedButton
									style={buttonAnimatedStyle}
									onPress={handleContinueToVerification}
									className="h-12 bg-orange-500 hover:bg-orange-600 active:bg-orange-600 rounded-xl web:shadow-lg web:shadow-orange-500/25"
								>
									<Text className="text-white text-base font-semibold">
										Enter Verification Code
									</Text>
								</AnimatedButton>

								{/* Resend Email */}
								<Button
									onPress={handleResendEmail}
									disabled={resendCooldown > 0}
									variant="outline"
									className="h-11 border-orange-200 disabled:opacity-50"
								>
									<Text className="text-orange-600 font-medium">
										{resendCooldown > 0
											? `Resend in ${resendCooldown}s`
											: "Resend Email"}
									</Text>
								</Button>
							</View>

							{/* Back to Login */}
							<View className="flex-row justify-center items-center">
								<Text className="text-gray-500 text-sm">
									Remember your password?{" "}
								</Text>
								<Button
									onPress={() => router.back()}
									variant="ghost"
									className="p-0 h-auto"
								>
									<Text className="text-blue-500 text-sm font-semibold">
										Back to Login
									</Text>
								</Button>
							</View>
						</AuthCard>
					</View>
				</SafeAreaView>
			</GradientBackground>
		);
	}

	// Verification step
	if (step === "verify") {
		return (
			<GradientBackground {...gradientPresets.orangeAuth}>
				<SafeAreaView className="flex-1">
					<View className="flex-1 justify-center px-6 py-8">
						<AuthCard
							logoSize="lg"
							title="Reset Your Password"
							contentClassName="gap-y-3"
							logoIcon={<Shield size={48} className="text-white" />}
							logoGradientColors={gradientPresets.orangeLogo.colors}
							subtitle={`Enter the verification code sent to ${submittedEmail}`}
							className="bg-white/90 backdrop-blur-sm border-orange-200 web:shadow-xl web:shadow-orange-500/10"
						>
							{/* Error Display */}
							{(resetForm.formState.errors.root?.message || error) && (
								<Animated.View
									entering={FadeInDown.duration(400)}
									className="flex-row items-start gap-x-3 p-4 bg-red-50 border border-red-200 rounded-xl"
								>
									<AlertCircle size={20} className="text-red-500 mt-0.5" />
									<Text className="text-red-500 text-sm flex-1 font-medium">
										{resetForm.formState.errors.root?.message || error?.message}
									</Text>
								</Animated.View>
							)}

							{/* Verification Form */}
							<View className="gap-y-3">
								<FormField
									control={resetForm.control}
									name="code"
									label="Verification Code"
									placeholder="Enter 6-digit code"
									keyboardType="number-pad"
									autoCapitalize="none"
									autoComplete="one-time-code"
									maxLength={6}
									error={resetForm.formState.errors.code}
									className="text-center text-2xl tracking-widest font-mono"
								/>

								<FormField
									secureTextEntry
									control={resetForm.control}
									name="password"
									label="New Password"
									placeholder="Enter new password"
									keyboardType="default"
									autoCapitalize="none"
									autoComplete="new-password"
									maxLength={20}
									error={resetForm.formState.errors.password}
									icon={<Shield size={20} className="text-gray-400" />}
								/>

								<AnimatedButton
									onPress={resetForm.handleSubmit}
									disabled={isLoading || resetForm.formState.isSubmitting}
									className="h-12 bg-orange-500 hover:bg-orange-600 active:bg-orange-600 rounded-xl web:shadow-lg web:shadow-orange-500/25"
								>
									<Text className="text-lg font-semibold text-white">
										{isLoading || resetForm.formState.isSubmitting
											? "Resetting..."
											: "Reset Password"}
									</Text>
								</AnimatedButton>
							</View>

							{/* Resend Section */}
							<View className="gap-y-3">
								<View className="items-center gap-y-2">
									<Text className="text-gray-600 text-center">
										Didn't receive the code?
									</Text>

									<Button
										onPress={handleResendEmail}
										disabled={resendCooldown > 0}
										variant="outline"
										className="h-11 border-orange-200 disabled:opacity-50"
									>
										<Text className="text-orange-600 font-medium">
											{resendCooldown > 0
												? `Resend in ${resendCooldown}s`
												: "Resend Code"}
										</Text>
									</Button>
								</View>

								{/* Footer Links */}
								<View className="flex-row items-center justify-center">
									<Text className="text-gray-600">Wrong email? </Text>
									<Button
										onPress={handleBackToEmail}
										variant="ghost"
										className="p-0 h-auto"
									>
										<Text className="text-orange-600 font-semibold">
											Go back
										</Text>
									</Button>
								</View>
							</View>
						</AuthCard>
					</View>
				</SafeAreaView>
			</GradientBackground>
		);
	}

	// Default email step
	return (
		<GradientBackground {...gradientPresets.orangeAuth}>
			<SafeAreaView className="flex-1">
				<View className="flex-1 justify-center px-6 py-8">
					<AuthCard
						logoSize="lg"
						title="Forgot Password?"
						contentClassName="gap-y-3"
						logoIcon={<Shield size={48} className="text-white" />}
						logoGradientColors={gradientPresets.orangeLogo.colors}
						subtitle="Don't worry! Enter your email address and we'll send you a link to reset your password."
						className="bg-white/90 backdrop-blur-sm border-orange-200 web:shadow-xl web:shadow-orange-500/10"
					>
						{/* Error Display */}
						{(emailForm.formState.errors.root?.message || error) && (
							<Animated.View
								entering={FadeInDown.duration(400)}
								className="flex-row items-start gap-x-3 p-4 bg-red-50 border border-red-200 rounded-xl"
							>
								<AlertCircle size={20} className="text-red-500 mt-0.5" />
								<Text className="text-red-500 text-sm flex-1 font-medium">
									{emailForm.formState.errors.root?.message || error?.message}
								</Text>
							</Animated.View>
						)}

						{/* Password Reset Form */}
						<View className="gap-y-3">
							{/* Email Input */}
							<FormField
								control={emailForm.control}
								name="email"
								placeholder="Enter your email"
								keyboardType="email-address"
								autoCapitalize="none"
								autoComplete="email"
								error={emailForm.formState.errors.email}
								icon={<Heart size={20} className="text-gray-400" />}
							/>

							{/* Reset Password Button */}
							<AnimatedButton
								style={buttonAnimatedStyle}
								onPress={emailForm.handleSubmit}
								disabled={isLoading || emailForm.formState.isSubmitting}
								className="h-12 bg-orange-500 hover:bg-orange-600 active:bg-orange-600 rounded-xl web:shadow-lg web:shadow-orange-500/25"
							>
								<Text className="text-white text-base font-semibold">
									{isLoading || emailForm.formState.isSubmitting
										? "Sending..."
										: "Send Reset Link"}
								</Text>
							</AnimatedButton>
						</View>

						{/* Back to Login Link */}
						<View className="flex-row justify-center items-center">
							<Text className="text-gray-500 text-sm">
								Remember your password?{" "}
							</Text>
							<GoBackButton label="Login" />
						</View>
					</AuthCard>
				</View>
			</SafeAreaView>
		</GradientBackground>
	);
}
