import { Link } from "expo-router";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnimatedButton } from "~/components/animations";
import { AuthCard } from "~/components/auth/AuthCard";
import FormField from "~/components/form/FormField";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useAuthForm } from "~/hooks/auth/useAuthForm";
import { useClerkAuth } from "~/hooks/auth/useClerkAuth";
import { useWarmUpBrowser } from "~/hooks/auth/useWarmUpBrowser";
import { AlertCircle, Heart, Shield } from "~/lib/icons";
import { type LoginFormData, loginSchema } from "~/types/auth";

export default function SignInScreen() {
	useWarmUpBrowser();

	const { signIn, isLoading, error } = useClerkAuth();

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useAuthForm<LoginFormData>({
		schema: loginSchema,
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async (data) => {
			try {
				await signIn({ email: data.email, password: data.password });
			} catch (err: unknown) {
				console.log(err);
				// Error is handled by useClerkAuth hook
			}
		},
	});

	return (
		<SafeAreaView className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100">
			<View className="flex-1 justify-center px-6 py-8">
				<AuthCard
					logoSize="lg"
					title="Welcome Back"
					subtitle="Sign in to continue tracking your liver health"
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

					{/* Auth Form */}
					<View className="gap-y-3">
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
							autoComplete="current-password"
							error={errors.password}
							icon={<Shield size={20} className="text-gray-400" />}
						/>

						{/* Forgot Password */}
						<View className="items-center mt-2">
							<Link href="/(auth)/forgot-password" asChild>
								<Button variant="ghost" className="p-0 h-auto">
									<Text className="text-gray-500 text-sm">
										Forgot Password?
									</Text>
								</Button>
							</Link>
						</View>

						{/* Login Button */}
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
								{isLoading || isSubmitting ? "Logging in..." : "Login"}
							</Text>
						</AnimatedButton>
					</View>

					{/* Sign Up Link */}
					<View className="flex-row justify-center items-center">
						<Text className="text-gray-500 text-sm">
							{"Don't you have an account? "}
						</Text>
						<Link href="/(auth)/sign-up" asChild>
							<Button variant="ghost" className="p-0 h-auto">
								<Text className="text-blue-500 text-sm font-semibold">
									Sign Up
								</Text>
							</Button>
						</Link>
					</View>
				</AuthCard>
			</View>
		</SafeAreaView>
	);
}
