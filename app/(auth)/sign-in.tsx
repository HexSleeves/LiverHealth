import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import {
	AnimatedButton,
	AnimatedIconWithBackground,
} from "~/components/animations";
import FormField from "~/components/form/FormField";
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
		<SafeAreaView className="flex-1 bg-gray-50">
			<View className="flex-1 px-6 justify-center">
				{/* Header Illustration */}
				<View className="items-center mb-10">
					<View className="w-50 h-38 justify-center items-center relative">
						{/* Liver Health Illustration */}
						<AnimatedIconWithBackground
							size={60}
							Icon={Heart}
							disableAnimations={false}
							className="text-blue-500"
							backgroundClassName="bg-blue-50 rounded-full p-5"
							pulseConfig={{ interval: 3000, scaleUp: 1.1 }}
						/>

						{/* <View className="absolute w-full h-full">
							<Animated.View
								entering={FadeInUp.delay(200).duration(600)}
								className="absolute w-5 h-5 bg-indigo-100 rounded-full top-5 left-8"
							/>
							<Animated.View
								entering={FadeInUp.delay(400).duration(600)}
								className="absolute w-4 h-4 bg-red-100 rounded-full bottom-8 right-10"
							/>
							<Animated.View
								entering={FadeInUp.delay(300).duration(600)}
								className="absolute w-4 h-4 justify-center items-center top-10 right-5"
							>
								<Text className="text-blue-500 text-sm font-bold">+</Text>
							</Animated.View>
							<Animated.View
								entering={FadeInUp.delay(500).duration(600)}
								className="absolute w-4 h-4 justify-center items-center bottom-5 left-5"
							>
								<Text className="text-blue-500 text-sm font-bold">+</Text>
							</Animated.View>
						</View> */}
					</View>
				</View>

				<Text className="text-3xl font-bold text-foreground mb-2 text-center">
					Welcome Back
				</Text>
				<Text className="text-base text-muted-foreground text-center mb-8">
					Sign in to continue tracking your liver health
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
				<Link href="/(auth)/forgot-password" asChild>
					<TouchableOpacity className="items-center mt-2 mb-8">
						<Text className="text-gray-500 text-sm">Forgot Password?</Text>
					</TouchableOpacity>
				</Link>

				{/* Login Button */}
				<AnimatedButton
					onPress={handleSubmit}
					disabled={isLoading || isSubmitting}
					className={`rounded-xl h-14 items-center mb-6 web:shadow-lg native:elevation-4 ${
						isLoading || isSubmitting
							? "bg-gray-400"
							: "bg-blue-500 hover:bg-blue-600 active:bg-blue-600"
					}`}
				>
					<Text className="text-white text-base font-semibold">
						{isLoading || isSubmitting ? "Logging in..." : "Login"}
					</Text>
				</AnimatedButton>

				{/* Sign Up Link */}
				<View className="flex-row justify-center items-center">
					<Text className="text-gray-500 text-sm">
						{"Don't you have an account? "}
					</Text>
					<Link href="/(auth)/sign-up" asChild>
						<TouchableOpacity>
							<Text className="text-blue-500 text-sm font-semibold">
								Sign Up
							</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
}
