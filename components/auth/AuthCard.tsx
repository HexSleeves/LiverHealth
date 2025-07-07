import { View } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { GradientBackground } from "~/components/ui/gradient-background";
import { Text } from "~/components/ui/text";
import { Heart } from "~/lib/icons";
import { cn } from "~/lib/utils";

interface AuthCardProps {
	title: string;
	subtitle?: string;
	children: React.ReactNode;
	showLogo?: boolean;
	logoIcon?: React.ReactNode;
	logoSize?: "sm" | "md" | "lg";
	className?: string;
	headerClassName?: string;
	contentClassName?: string;
	logoBackgroundClassName?: string;
	logoGradientColors?: readonly [string, string, ...string[]];
}

export function AuthCard({
	title,
	subtitle,
	children,
	showLogo = true,
	logoIcon,
	logoSize = "md",
	className,
	headerClassName,
	contentClassName,
	logoBackgroundClassName,
	logoGradientColors,
}: AuthCardProps) {
	const logoSizes = {
		sm: { container: "w-16 h-16", icon: 32 },
		md: { container: "w-20 h-20", icon: 40 },
		lg: { container: "w-24 h-24", icon: 48 },
	};

	const currentLogoSize = logoSizes[logoSize];

	return (
		<View className="w-full max-w-md mx-auto">
			{/* App Branding Header */}
			{showLogo && (
				<View className="items-center mb-6">
					{logoGradientColors ? (
						<GradientBackground
							colors={logoGradientColors}
							className={cn(
								currentLogoSize.container,
								"rounded-3xl items-center justify-center mb-3 web:shadow-lg web:shadow-blue-500/25",
							)}
						>
							{logoIcon || (
								<Heart size={currentLogoSize.icon} className="text-white" />
							)}
						</GradientBackground>
					) : (
						<View
							className={cn(
								currentLogoSize.container,
								logoBackgroundClassName ||
									"bg-blue-500 rounded-3xl items-center justify-center mb-3 web:shadow-lg web:shadow-blue-500/25",
							)}
						>
							{logoIcon || (
								<Heart size={currentLogoSize.icon} className="text-white" />
							)}
						</View>
					)}
					<Text className="text-3xl font-bold text-gray-800 mb-1">
						HepatoTrack
					</Text>
					<Text className="text-base text-gray-600 text-center">
						Your Liver Health Companion
					</Text>
				</View>
			)}

			<Card
				className={cn(
					"bg-white/80 backdrop-blur-sm border-gray-200 web:shadow-xl web:shadow-blue-500/10",
					className,
				)}
			>
				<CardHeader className={cn("pb-3", headerClassName)}>
					<CardTitle className="text-center text-2xl font-bold text-gray-800">
						{title}
					</CardTitle>
					{subtitle && (
						<Text className="text-center text-gray-600 mt-2">{subtitle}</Text>
					)}
				</CardHeader>

				<CardContent className={cn("gap-y-4", contentClassName)}>
					{children}
				</CardContent>
			</Card>
		</View>
	);
}
