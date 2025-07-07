import { useEffect } from "react";
import Animated, {
	type EntryExitAnimationFunction,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { LOADING_ANIMATIONS } from "../constants/animationConfig";

export interface AnimatedLoadingSpinnerProps {
	/** Size of the spinner */
	size?: "sm" | "md" | "lg" | number;
	/** Container class name */
	className?: string;
	/** Spinner color classes */
	spinnerClassName?: string;
	/** Loading text to display below spinner */
	text?: string;
	/** Text class name */
	textClassName?: string;
	/** Animation duration in milliseconds */
	duration?: number;
	/** Entrance animation */
	entering?: EntryExitAnimationFunction;
	/** Exit animation */
	exiting?: EntryExitAnimationFunction;
	/** Whether the spinner is active */
	active?: boolean;
}

/**
 * Animated loading spinner using react-native-reanimated
 * Replaces CSS-based spinner for better performance and consistency
 *
 * @example
 * ```tsx
 * <AnimatedLoadingSpinner
 *   size="lg"
 *   text="Loading..."
 *   spinnerClassName="border-blue-500"
 * />
 * ```
 */
export function AnimatedLoadingSpinner({
	size = "md",
	className,
	spinnerClassName,
	text,
	textClassName,
	duration = LOADING_ANIMATIONS.spinner.duration,
	entering,
	exiting,
	active = true,
}: AnimatedLoadingSpinnerProps) {
	const rotation = useSharedValue(0);

	// Size configurations
	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-6 h-6",
		lg: "w-8 h-8",
	};

	const sizeClass = typeof size === "number" ? undefined : sizeClasses[size];
	const sizeStyle =
		typeof size === "number" ? { width: size, height: size } : undefined;

	// Animated rotation style
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${rotation.value}deg` }],
	}));

	// Start/stop rotation based on active state
	useEffect(() => {
		if (active) {
			rotation.value = withRepeat(
				withTiming(360, { duration }),
				-1, // Infinite repeat
				false, // Don't reverse
			);
		} else {
			rotation.value = 0;
		}
	}, [active, duration, rotation]);

	return (
		<Animated.View
			entering={entering}
			exiting={exiting}
			className={cn("items-center justify-center", className)}
		>
			<Animated.View
				style={[animatedStyle, sizeStyle]}
				className={cn(
					"border-2 border-gray-200 border-t-blue-500 rounded-full",
					sizeClass,
					spinnerClassName,
				)}
			/>

			{text && (
				<Text
					className={cn("text-sm text-muted-foreground mt-2", textClassName)}
				>
					{text}
				</Text>
			)}
		</Animated.View>
	);
}

/**
 * Pulsing dot loader animation
 */
export function AnimatedDotLoader({
	className,
	dotClassName,
	entering,
	exiting,
	active = true,
}: {
	className?: string;
	dotClassName?: string;
	entering?: EntryExitAnimationFunction;
	exiting?: EntryExitAnimationFunction;
	active?: boolean;
}) {
	const dot1Scale = useSharedValue(1);
	const dot2Scale = useSharedValue(1);
	const dot3Scale = useSharedValue(1);

	const dot1Style = useAnimatedStyle(() => ({
		transform: [{ scale: dot1Scale.value }],
	}));

	const dot2Style = useAnimatedStyle(() => ({
		transform: [{ scale: dot2Scale.value }],
	}));

	const dot3Style = useAnimatedStyle(() => ({
		transform: [{ scale: dot3Scale.value }],
	}));

	useEffect(() => {
		if (active) {
			const animateDot = (sharedValue: typeof dot1Scale, delay: number) => {
				sharedValue.value = withRepeat(
					withTiming(1.5, { duration: 600 }),
					-1,
					true,
				);
			};

			// Stagger the dot animations
			setTimeout(() => animateDot(dot1Scale, 0), 0);
			setTimeout(() => animateDot(dot2Scale, 200), 200);
			setTimeout(() => animateDot(dot3Scale, 400), 400);
		} else {
			dot1Scale.value = 1;
			dot2Scale.value = 1;
			dot3Scale.value = 1;
		}
	}, [active, dot1Scale, dot2Scale, dot3Scale]);

	return (
		<Animated.View
			entering={entering}
			exiting={exiting}
			className={cn("flex-row items-center justify-center gap-x-1", className)}
		>
			<Animated.View
				style={dot1Style}
				className={cn("w-2 h-2 bg-blue-500 rounded-full", dotClassName)}
			/>
			<Animated.View
				style={dot2Style}
				className={cn("w-2 h-2 bg-blue-500 rounded-full", dotClassName)}
			/>
			<Animated.View
				style={dot3Style}
				className={cn("w-2 h-2 bg-blue-500 rounded-full", dotClassName)}
			/>
		</Animated.View>
	);
}

/**
 * Simple pulse loader (single element)
 */
export function AnimatedPulseLoader({
	className,
	pulseClassName,
	entering,
	exiting,
	active = true,
	duration = LOADING_ANIMATIONS.skeleton.duration,
}: {
	className?: string;
	pulseClassName?: string;
	entering?: EntryExitAnimationFunction;
	exiting?: EntryExitAnimationFunction;
	active?: boolean;
	duration?: number;
}) {
	const opacity = useSharedValue(1);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	useEffect(() => {
		if (active) {
			opacity.value = withRepeat(
				withTiming(0.3, { duration: duration / 2 }),
				-1,
				true,
			);
		} else {
			opacity.value = 1;
		}
	}, [active, duration, opacity]);

	return (
		<Animated.View
			entering={entering}
			exiting={exiting}
			className={cn("items-center justify-center", className)}
		>
			<Animated.View
				style={animatedStyle}
				className={cn("w-8 h-8 bg-blue-500 rounded-full", pulseClassName)}
			/>
		</Animated.View>
	);
}
