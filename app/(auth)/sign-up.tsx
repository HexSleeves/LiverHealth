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
import { AnimatedButton } from "~/components/animations";
import { AuthCard } from "~/components/auth/AuthCard";
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

	return (
		<SafeAreaView className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100">
			<View className="flex-1 justify-center px-6 py-8">
				<AuthCard
					logoSize="lg"
					logoIcon={<CircleUserRound size={48} className="text-white" />}
					title="Create Account"
					subtitle="Join HepatoTrack to start tracking your health"
					contentClassName="gap-y-3"
				>
					{/* Error Display */}
					{(errors.root?.message || error) && (
						<Animated.View
							entering={FadeInDown.duration(400)}
							className="flex-row items-start gap-x-3 p-4 bg-red-50 border border-red-200 rounded-xl"
						>
							<AlertCircle size={20} className="text-red-500 mt-0.5" />
							<Text className="text-red-500 text-sm flex-1 font-medium">
								{errors.root?.message || error?.message}
							</Text>
						</Animated.View>
					)}

					{/* Registration Form */}
					<View className="gap-y-3">
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
						<View className="flex-row items-start gap-x-3 py-1">
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
							className={`rounded-xl h-12 items-center web:shadow-lg web:shadow-blue-500/25 ${
								isLoading || isSubmitting || !acceptedTerms
									? "bg-gray-400"
									: "bg-blue-500 hover:bg-blue-600 active:bg-blue-600"
							}`}
						>
							<Text className="text-white text-base font-semibold">
								{isLoading || isSubmitting ? "Creating Account..." : "Sign Up"}
							</Text>
						</AnimatedButton>
					</View>

					{/* Login Link */}
					<View className="flex-row justify-center items-center">
						<Text className="text-gray-500 text-sm">
							Already have an account?{" "}
						</Text>
						<Button
							variant="ghost"
							onPress={() => router.back()}
							className="p-0 h-auto"
						>
							<Text className="text-blue-500 text-sm font-semibold">Login</Text>
						</Button>
					</View>
				</AuthCard>
			</View>
		</SafeAreaView>
	);
}
