import { LinearGradient } from "expo-linear-gradient";
import type React from "react";
import type { ViewProps } from "react-native";
import { cn } from "~/lib/utils";

interface GradientBackgroundProps extends ViewProps {
	colors: readonly [string, string, ...string[]];
	start?: { x: number; y: number };
	end?: { x: number; y: number };
	className?: string;
	children?: React.ReactNode;
}

export function GradientBackground({
	colors,
	start = { x: 0, y: 0 },
	end = { x: 1, y: 1 },
	className,
	children,
	...props
}: GradientBackgroundProps) {
	return (
		<LinearGradient
			colors={colors}
			start={start}
			end={end}
			className={cn("flex-1", className)}
			{...props}
		>
			{children}
		</LinearGradient>
	);
}

// Predefined gradient presets
export const gradientPresets = {
	// Blue gradients for auth screens
	blueAuth: {
		colors: ["#EBF8FF", "#DBEAFE"] as const, // from-blue-50 to-blue-100
		start: { x: 0, y: 0 },
		end: { x: 1, y: 1 },
	},
	blueLogo: {
		colors: ["#60A5FA", "#3B82F6"] as const, // from-blue-400 to-blue-600
		start: { x: 0, y: 0 },
		end: { x: 1, y: 1 },
	},
	// Orange gradients for forgot password
	orangeAuth: {
		colors: ["#FFF7ED", "#FED7AA"] as const, // from-orange-50 to-orange-100
		start: { x: 0, y: 0 },
		end: { x: 1, y: 1 },
	},
	orangeLogo: {
		colors: ["#FB923C", "#EA580C"] as const, // from-orange-400 to-orange-600
		start: { x: 0, y: 0 },
		end: { x: 1, y: 1 },
	},
} as const;
