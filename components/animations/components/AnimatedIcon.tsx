import type { LucideIcon } from "lucide-react-native";
import { View, type ViewStyle } from "react-native";
import Animated, {
	type EntryExitAnimationFunction,
} from "react-native-reanimated";
import { cn } from "~/lib/utils";
import {
	type FloatingAnimationConfig,
	useFloatingAnimation,
} from "../../../hooks/animation/useFloatingAnimation";
import {
	type PulseAnimationConfig,
	useContinuousPulseAnimation,
	usePulseAnimation,
} from "../../../hooks/animation/usePulseAnimation";

export interface AnimatedIconProps {
	/** The Lucide icon component to render */
	Icon: LucideIcon;
	/** Size of the icon */
	size?: number;
	/** Icon color class name */
	className?: string;
	/** Container style */
	style?: ViewStyle;
	/** Container class name */
	containerClassName?: string;
	/** Pulse animation configuration */
	pulseConfig?: PulseAnimationConfig;
	/** Float animation configuration */
	floatConfig?: FloatingAnimationConfig;
	/** Whether to use continuous pulse (withRepeat) instead of interval-based pulse */
	useContinuousPulse?: boolean;
	/** Whether to use continuous float (withRepeat) instead of interval-based float */
	useContinuousFloat?: boolean;
	/** Entrance animation */
	entering?: EntryExitAnimationFunction;
	/** Exit animation */
	exiting?: EntryExitAnimationFunction;
	/** Whether to disable all animations */
	disableAnimations?: boolean;
}

/**
 * Animated icon component with pulse and entrance animations
 *
 * @example
 * ```tsx
 * <AnimatedIcon
 *   Icon={Heart}
 *   size={24}
 *   className="text-red-500"
 *   pulseConfig={{ interval: 2000, scaleUp: 1.2 }}
 * />
 * ```
 */
export function AnimatedIcon({
	Icon,
	size = 24,
	className,
	style,
	containerClassName,
	pulseConfig,
	useContinuousPulse = false,
	entering,
	exiting,
	disableAnimations = false,
}: AnimatedIconProps) {
	// Choose between continuous and interval-based pulse
	const intervalPulse = usePulseAnimation({
		autoStart: !disableAnimations && !useContinuousPulse,
		...pulseConfig,
	});

	const continuousPulse = useContinuousPulseAnimation({
		autoStart: !disableAnimations && useContinuousPulse,
		...pulseConfig,
	});

	const { animatedStyle } = useContinuousPulse
		? continuousPulse
		: intervalPulse;

	if (disableAnimations) {
		return (
			<View className={containerClassName} style={style}>
				<Icon size={size} className={className} />
			</View>
		);
	}

	return (
		<Animated.View
			entering={entering}
			exiting={exiting}
			style={[animatedStyle, style]}
			className={containerClassName}
		>
			<Icon size={size} className={className} />
		</Animated.View>
	);
}

/**
 * Animated icon with background container (like the auth screens)
 */
export function AnimatedIconWithBackground({
	Icon,
	exiting,
	entering,
	size = 24,
	className,
	pulseConfig,
	floatConfig,
	useContinuousFloat = false,
	disableAnimations = false,
	useContinuousPulse = false,
	backgroundClassName = "bg-blue-50 rounded-full p-5",
}: AnimatedIconProps & {
	/** Background container class name */
	backgroundClassName?: string;
}) {
	const intervalPulse = usePulseAnimation({
		autoStart: !disableAnimations && !useContinuousPulse,
		...pulseConfig,
	});

	const continuousPulse = useContinuousPulseAnimation({
		autoStart: !disableAnimations && useContinuousPulse,
		...pulseConfig,
	});

	const { animatedStyle: floatAnimatedStyle } = useFloatingAnimation({
		autoStart: !disableAnimations && !useContinuousFloat,
		...floatConfig,
	});

	const { animatedStyle } = useContinuousPulse
		? continuousPulse
		: intervalPulse;

	if (disableAnimations) {
		return (
			<View className={cn(backgroundClassName)}>
				<Icon size={size} className={className} />
			</View>
		);
	}

	// Only add wrapper view if floatConfig is provided
	const Wrapper = floatConfig ? Animated.View : View;

	return (
		<Wrapper style={floatAnimatedStyle}>
			<Animated.View
				entering={entering}
				exiting={exiting}
				style={animatedStyle}
				className={cn(backgroundClassName)}
			>
				<Icon size={size} className={className} />
			</Animated.View>
		</Wrapper>
	);
}

/**
 * Simple animated icon that only has entrance animation (no pulse)
 */
export function AnimatedEntranceIcon({
	Icon,
	size = 24,
	className,
	style,
	containerClassName,
	entering,
	exiting,
}: Pick<
	AnimatedIconProps,
	| "Icon"
	| "size"
	| "className"
	| "style"
	| "containerClassName"
	| "entering"
	| "exiting"
>) {
	return (
		<Animated.View
			entering={entering}
			exiting={exiting}
			style={style}
			className={containerClassName}
		>
			<Icon size={size} className={className} />
		</Animated.View>
	);
}

/**
 * Animated icon that only pulses (no entrance animation)
 */
export function AnimatedPulseIcon({
	Icon,
	size = 24,
	className,
	style,
	containerClassName,
	pulseConfig,
	useContinuousPulse = false,
	disableAnimations = false,
}: Pick<
	AnimatedIconProps,
	| "Icon"
	| "size"
	| "className"
	| "style"
	| "containerClassName"
	| "pulseConfig"
	| "useContinuousPulse"
	| "disableAnimations"
>) {
	const intervalPulse = usePulseAnimation({
		autoStart: !disableAnimations && !useContinuousPulse,
		...pulseConfig,
	});

	const continuousPulse = useContinuousPulseAnimation({
		autoStart: !disableAnimations && useContinuousPulse,
		...pulseConfig,
	});

	const { animatedStyle } = useContinuousPulse
		? continuousPulse
		: intervalPulse;

	if (disableAnimations) {
		return (
			<View className={containerClassName} style={style}>
				<Icon size={size} className={className} />
			</View>
		);
	}

	return (
		<Animated.View
			style={[animatedStyle, style]}
			className={containerClassName}
		>
			<Icon size={size} className={className} />
		</Animated.View>
	);
}
