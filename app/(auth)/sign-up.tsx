import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Animated, {
	FadeInDown,
	useAnimatedStyle,
	useSharedValue,
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
import { AlertCircle, CircleUserRound, Heart, Shield } from "~/lib/icons";
import { type SignupFormData, signupSchema } from "~/types/auth";

export default function SignUpScreen() {
	const router = useRouter();
	const [acceptedTerms, setAcceptedTerms] = useState(false);

	const { signUp, isLoading, error } = useClerkAuth();

	// Animation values
	const checkboxScale = useSharedValue(1);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useAuthForm<SignupFormData>({
		schema: signupSchema,
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		onSubmit: async (data) => {
			if (!acceptedTerms) {
				// Handle terms acceptance error
				return;
			}

			try {
				// Extract name parts for Clerk
				const nameParts = data.name.trim().split(" ");
				const firstName = nameParts[0] || "";
				const lastName = nameParts.slice(1).join(" ") || "";

				await signUp({
					firstName,
					lastName,
					email: data.email,
					password: data.password,
				});
				router.push("/(auth)/verify-email");
			} catch (err) {
				console.log(err);
				// Error is handled by useClerkAuth hook
			}
		},
	});

	const checkboxAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ scale: checkboxScale.value }],
	}));

	const handleCheckboxPress = () => {
		checkboxScale.value = withSpring(0.9, {}, () => {
			checkboxScale.value = withSpring(1);
		});
		setAcceptedTerms(!acceptedTerms);
	};

	const handleLogin = () => {
		router.push("/(auth)/sign-in");
	};

	return (
		<SafeAreaView className="flex-1 bg-gray-50">
			<View className="flex-1 px-6 justify-center py-8">
				{/* Header Illustration */}
				<View className="items-center">
					<View className="w-50 h-32 justify-center items-center relative">
						{/* Health Illustration */}
						<AnimatedIconWithBackground
							size={60}
							Icon={CircleUserRound}
							disableAnimations={true}
							className="text-blue-600"
							backgroundClassName="bg-blue-50 rounded-full p-5"
						/>

						{/* <View className="absolute w-full h-full">
							<Animated.View
								entering={FadeInUp.delay(400).duration(600)}
								className="absolute w-4 h-4 bg-blue-100 rounded-full top-3 left-6"
							/>
							<Animated.View
								entering={FadeInUp.delay(600).duration(600)}
								className="absolute w-3 h-3 bg-purple-100 rounded-full bottom-6 right-8"
							/>
							<Animated.View
								entering={FadeInUp.delay(500).duration(600)}
								className="absolute w-4 h-4 justify-center items-center top-8 right-4"
							>
								<Text className="text-blue-500 text-sm font-bold">+</Text>
							</Animated.View>
							<Animated.View
								entering={FadeInUp.delay(700).duration(600)}
								className="absolute w-4 h-4 justify-center items-center bottom-3 left-4"
							>
								<Text className="text-blue-500 text-sm font-bold">+</Text>
							</Animated.View>
						</View> */}
					</View>
				</View>

				<Text className="text-3xl font-bold text-foreground mb-2 text-center">
					Create Account
				</Text>
				<Text className="text-base text-muted-foreground text-center mb-8">
					Join MyLiverApp to start tracking your health
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

				{/* Name Input */}

				<FormField
					control={control}
					name="name"
					placeholder="Full Name"
					autoCapitalize="words"
					autoComplete="name"
					error={errors.name}
					icon={<CircleUserRound size={20} className="text-gray-400" />}
				/>

				{/* Email Input */}

				<FormField
					control={control}
					name="email"
					placeholder="Email"
					keyboardType="email-address"
					autoCapitalize="none"
					autoComplete="email"
					error={errors.email}
					icon={<Heart size={20} className="text-gray-400" />}
				/>

				{/* Password Input */}

				<FormField
					control={control}
					name="password"
					placeholder="Password"
					secureTextEntry={true}
					autoCapitalize="none"
					autoComplete="new-password"
					error={errors.password}
					icon={<Shield size={20} className="text-gray-400" />}
				/>

				{/* Confirm Password Input */}

				<FormField
					control={control}
					name="confirmPassword"
					placeholder="Confirm Password"
					secureTextEntry={true}
					autoCapitalize="none"
					autoComplete="new-password"
					error={errors.confirmPassword}
					icon={<Shield size={20} className="text-gray-400" />}
				/>

				{/* Terms and Conditions */}
				<View className="flex-row items-start gap-x-3 py-1 mb-6">
					<Button
						variant="ghost"
						size="icon"
						onPress={handleCheckboxPress}
						className="w-6 h-6 p-0 mt-0.5"
					>
						<Animated.View
							style={checkboxAnimatedStyle}
							className={`w-5 h-5 border-2 rounded ${
								acceptedTerms
									? "bg-blue-500 border-blue-500"
									: "border-gray-300"
							} items-center justify-center`}
						>
							{acceptedTerms && (
								<Animated.Text
									entering={FadeInDown.duration(200)}
									className="text-white text-xs font-bold"
								>
									✓
								</Animated.Text>
							)}
						</Animated.View>
					</Button>

					<View className="flex-1">
						<Text className="text-sm text-gray-600 leading-5">
							I agree to the{" "}
							<Text className="text-blue-600 font-medium">
								Terms of Service
							</Text>{" "}
							and{" "}
							<Text className="text-blue-600 font-medium">Privacy Policy</Text>
						</Text>
					</View>
				</View>

				{/* Sign Up Button */}
				<AnimatedButton
					onPress={handleSubmit}
					disabled={isLoading || isSubmitting || !acceptedTerms}
					className={`rounded-xl h-14 items-center mb-6 web:shadow-lg ${
						isLoading || isSubmitting || !acceptedTerms
							? "bg-gray-400"
							: "bg-blue-500 hover:bg-blue-600 active:bg-blue-600"
					}`}
				>
					<Text className="text-white text-base font-semibold">
						{isLoading || isSubmitting ? "Creating Account..." : "Sign Up"}
					</Text>
				</AnimatedButton>

				{/* Login Link */}
				<View className="flex-row justify-center items-center">
					<Text className="text-gray-500 text-sm">
						Already have an account?{" "}
					</Text>
					<Button variant="ghost" onPress={handleLogin} className="p-0 h-auto">
						<Text className="text-blue-500 text-sm font-semibold">Login</Text>
					</Button>
				</View>
			</View>
		</SafeAreaView>
	);
}
