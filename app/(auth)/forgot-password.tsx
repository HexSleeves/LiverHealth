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
import {
	AnimatedButton,
	AnimatedIconWithBackground,
} from "~/components/animations";
import FormField from "~/components/form/FormField";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuthForm } from "~/hooks/auth/useAuthForm";
import { useClerkAuth } from "~/hooks/auth/useClerkAuth";
import { AlertCircle, Heart, Shield } from "~/lib/icons";
import {
	type ForgotPasswordFormData,
	forgotPasswordSchema,
} from "~/types/auth";

export default function ForgotPasswordScreen() {
	const [emailSent, setEmailSent] = useState(false);
	const [submittedEmail, setSubmittedEmail] = useState("");

	const { sendPasswordResetEmail, isLoading, error, clearError } =
		useClerkAuth();

	// Animation values
	const buttonScale = useSharedValue(1);
	const shieldScale = useSharedValue(1);
	const heartScale = useSharedValue(1);
	const checkmarkScale = useSharedValue(0);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useAuthForm<ForgotPasswordFormData>({
		schema: forgotPasswordSchema,
		defaultValues: {
			email: "",
		},
		onSubmit: async (data) => {
			try {
				clearError();
				await sendPasswordResetEmail({ email: data.email });

				setSubmittedEmail(data.email);
				setEmailSent(true);
			} catch (err) {
				console.log(err);
				// Error is handled by useClerkAuth hook
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

		if (!emailSent) {
			const interval = setInterval(pulse, 3500);
			return () => clearInterval(interval);
		}
	}, [shieldScale, emailSent]);

	// Heart pulse animation for success state
	useEffect(() => {
		if (emailSent) {
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
	}, [heartScale, checkmarkScale, emailSent]);

	// Animation styles
	const buttonAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: buttonScale.value }],
	}));

	const shieldAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: shieldScale.value }],
	}));

	const handleBackToLogin = () => {
		router.back();
	};

	const handleResendEmail = () => {
		setEmailSent(false);
		clearError();
		checkmarkScale.value = 0; // Reset checkmark animation
	};

	if (emailSent) {
		return (
			<SafeAreaView className="flex-1 bg-gray-50">
				<View className="flex-1 px-6 justify-center">
					{/* Success Illustration */}
					<View className="items-center mb-10">
						<View className="w-50 h-38 justify-center items-center relative">
							<AnimatedIconWithBackground
								size={60}
								Icon={Heart}
								disableAnimations={true}
								className="text-green-500"
								backgroundClassName="bg-green-50 rounded-full p-5"
							/>

							{/* <View className="absolute w-full h-full">
								<Animated.View
									entering={FadeInUp.delay(400).duration(600)}
									className="absolute w-5 h-5 bg-green-100 rounded-full top-5 left-8"
								/>
								<Animated.View
									entering={FadeInUp.delay(600).duration(600)}
									className="absolute w-4 h-4 bg-blue-100 rounded-full bottom-8 right-10"
								/>
								<Animated.View
									entering={FadeInUp.delay(500).duration(600)}
									style={checkmarkAnimatedStyle}
									className="absolute w-4 h-4 justify-center items-center top-10 right-5"
								>
									<Text className="text-green-500 text-sm font-bold">✓</Text>
								</Animated.View>
							</View> */}
						</View>
					</View>

					{/* Success Message */}
					<Text className="text-3xl font-bold text-gray-800 text-center mb-4">
						Check Your Email
					</Text>
					<Text className="text-gray-600 text-center mb-8 leading-6">
						We've sent a password reset link to{"\n"}
						<Text className="font-semibold text-gray-800">
							{submittedEmail}
						</Text>
					</Text>

					{/* Resend Button */}
					<AnimatedButton
						style={buttonAnimatedStyle}
						onPress={handleResendEmail}
						className="h-14 bg-blue-500 hover:bg-blue-600 active:bg-blue-600 rounded-xl web:shadow-lg mb-4"
					>
						<Text className="text-white text-base font-semibold">
							Resend Email
						</Text>
					</AnimatedButton>

					{/* Back to Login */}
					<Button
						onPress={handleBackToLogin}
						variant="ghost"
						className="items-center"
					>
						<Text className="text-blue-500 text-sm font-semibold">
							Back to Login
						</Text>
					</Button>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 bg-gray-50">
			<View className="flex-1 px-6 justify-center">
				{/* Header Illustration */}
				<View className="items-center mb-10">
					<View className="w-50 h-38 justify-center items-center relative">
						<Animated.View
							style={shieldAnimatedStyle}
							className="bg-orange-50 rounded-full p-5 z-10"
						>
							<Shield size={60} className="text-orange-500" />
						</Animated.View>

						{/* <View className="absolute w-full h-full">
							<Animated.View
								entering={FadeInUp.delay(200).duration(600)}
								className="absolute w-5 h-5 bg-orange-100 rounded-full top-5 left-8"
							/>
							<Animated.View
								entering={FadeInUp.delay(400).duration(600)}
								className="absolute w-4 h-4 bg-yellow-100 rounded-full bottom-8 right-10"
							/>
							<Animated.View
								entering={FadeInUp.delay(300).duration(600)}
								className="absolute w-4 h-4 justify-center items-center top-10 right-5"
							>
								<Text className="text-orange-500 text-sm font-bold">?</Text>
							</Animated.View>
							<Animated.View
								entering={FadeInUp.delay(500).duration(600)}
								className="absolute w-4 h-4 justify-center items-center bottom-5 left-5"
							>
								<Text className="text-orange-500 text-sm font-bold">!</Text>
							</Animated.View>
						</View> */}
					</View>
				</View>

				{/* Title and Description */}
				<Text className="text-3xl font-bold text-gray-800 text-center">
					Forgot Password?
				</Text>
				<Text className="text-gray-600 text-center mb-8 leading-6">
					Don't worry! Enter your email address and we'll send you a link to
					reset your password.
				</Text>

				{/* Error Display */}
				{(errors.root?.message || error) && (
					<Animated.View
						entering={FadeInDown.duration(400)}
						className="flex-row items-start gap-x-3 p-4 bg-red-50 border border-red-200 rounded-xl mb-6"
					>
						<AlertCircle size={20} className="text-red-500 mt-0.5" />
						<Text className="text-red-500 text-sm flex-1 font-medium">
							{errors.root?.message || error?.message}
						</Text>
					</Animated.View>
				)}

				{/* Email Input */}
				<FormField
					control={control}
					name="email"
					placeholder="Enter your email"
					keyboardType="email-address"
					autoCapitalize="none"
					autoComplete="email"
					error={errors.email}
					icon={<Heart size={20} className="text-gray-400" />}
				/>

				{/* Reset Password Button */}
				<AnimatedButton
					style={buttonAnimatedStyle}
					onPress={handleSubmit}
					disabled={isLoading || isSubmitting}
					className="h-14 bg-orange-500 hover:bg-orange-600 active:bg-orange-600 rounded-xl web:shadow-lg mb-6"
				>
					<Text className="text-white text-base font-semibold">
						{isLoading || isSubmitting ? "Sending..." : "Send Reset Link"}
					</Text>
				</AnimatedButton>

				{/* Back to Login Link */}
				<View className="flex-row justify-center items-center">
					<Text className="text-gray-500 text-sm">
						Remember your password?{" "}
					</Text>
					<Button
						onPress={handleBackToLogin}
						variant="ghost"
						className="p-0 h-auto"
					>
						<Text className="text-blue-500 text-sm font-semibold">Login</Text>
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
}
