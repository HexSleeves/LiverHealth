import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedButton } from "~/components/animations";
import { AuthCard } from "~/components/auth/AuthCard";
import { GoBackButton } from "~/components/auth/GoBackButton";
import AuthError from "~/components/error/AuthError";
import FormCheckbox from "~/components/form/FormCheckbox";
import FormField from "~/components/form/FormField";
import {
	GradientBackground,
	gradientPresets,
} from "~/components/ui/gradient-background";
import { Text } from "~/components/ui/text";
import { useAuthForm } from "~/hooks/auth/useAuthForm";
import { useClerkAuth } from "~/hooks/auth/useClerkAuth";
import { CircleUserRound, Heart, Shield } from "~/lib/icons";
import { type SignupFormData, signupSchema } from "~/types/auth";

export default function SignUpScreen() {
	const { signUp, isLoading, error } = useClerkAuth();

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
			termsAccepted: false,
		},
		onSubmit: async (data) => {
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
				console.error(err);
				// Error is handled by useClerkAuth hook
			}
		},
	});

	return (
		<GradientBackground {...gradientPresets.blueAuth}>
			<SafeAreaView className="flex-1">
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
							<AuthError>{errors.root?.message || error?.message}</AuthError>
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
							<FormCheckbox
								required
								control={control}
								name="termsAccepted"
								error={errors.termsAccepted}
								label={
									<Text className="text-sm text-gray-700 leading-5 font-medium">
										I agree to the{" "}
										<Text className="text-blue-600 font-medium">
											Terms of Service
										</Text>{" "}
										and{" "}
										<Text className="text-blue-600 font-medium">
											Privacy Policy
										</Text>
										<Text className="text-red-500 font-medium"> *</Text>
									</Text>
								}
							/>

							{/* Sign Up Button */}
							<AnimatedButton
								onPress={handleSubmit}
								disabled={isLoading || isSubmitting}
								className={`rounded-xl h-12 items-center web:shadow-lg web:shadow-blue-500/25 ${
									isLoading || isSubmitting
										? "bg-gray-400"
										: "bg-blue-500 hover:bg-blue-600 active:bg-blue-600"
								}`}
							>
								<Text className="text-white text-base font-semibold">
									{isLoading || isSubmitting
										? "Creating Account..."
										: "Sign Up"}
								</Text>
							</AnimatedButton>
						</View>

						{/* Login Link */}
						<View className="flex-row justify-center items-center">
							<Text className="text-gray-500 text-sm">
								Already have an account?{" "}
							</Text>

							<GoBackButton label="Login" />
						</View>
					</AuthCard>
				</View>
			</SafeAreaView>
		</GradientBackground>
	);
}
