import type { ViewStyle } from "react-native";
import Animated, {
	type EntryExitAnimationFunction,
} from "react-native-reanimated";
import { Button, type ButtonProps } from "~/components/ui/button";
import {
	type ButtonPressAnimationConfig,
	useButtonPressAnimation,
} from "../../../hooks/animation/useButtonPressAnimation";
import { animationPresets } from "../utils/entranceAnimations";

export interface AnimatedButtonProps extends Omit<ButtonProps, "style"> {
	/** Configuration for button press animation */
	pressAnimationConfig?: ButtonPressAnimationConfig;
	/** Entrance animation for the button */
	entering?: EntryExitAnimationFunction;
	/** Exit animation for the button */
	exiting?: EntryExitAnimationFunction;
	/** Whether to use the default primary button entrance animation */
	useDefaultEntrance?: boolean;
	/** Style for the animated container */
	style?: ViewStyle;
}

/**
 * Enhanced Button component with built-in press and entrance animations
 *
 * @example
 * ```tsx
 * <AnimatedButton
 *   onPress={handleSubmit}
 *   disabled={isLoading}
 *   useDefaultEntrance
 * >
 *   <Text>Submit</Text>
 * </AnimatedButton>
 * ```
 */
export function AnimatedButton({
	pressAnimationConfig,
	entering,
	exiting,
	useDefaultEntrance = false,
	onPressIn,
	onPressOut,
	style,
	...buttonProps
}: AnimatedButtonProps) {
	const { animatedStyle, handlePressIn, handlePressOut } =
		useButtonPressAnimation({
			disabled: buttonProps.disabled ?? false,
			...pressAnimationConfig,
		});

	// Combine custom press handlers with animation handlers
	const combinedPressIn = (
		event: Parameters<NonNullable<ButtonProps["onPressIn"]>>[0],
	) => {
		handlePressIn();
		onPressIn?.(event);
	};

	const combinedPressOut = (
		event: Parameters<NonNullable<ButtonProps["onPressOut"]>>[0],
	) => {
		handlePressOut();
		onPressOut?.(event);
	};

	// Determine entrance animation
	const entranceAnimation = useDefaultEntrance
		? animationPresets.primaryButton
		: entering;

	return (
		<Animated.View
			exiting={exiting}
			style={animatedStyle}
			entering={entranceAnimation}
		>
			<Button
				{...buttonProps}
				style={style}
				onPressIn={combinedPressIn}
				onPressOut={combinedPressOut}
			/>
		</Animated.View>
	);
}

/**
 * Simplified AnimatedButton that only includes press animation
 * Useful when you want to handle entrance animations separately
 */
export function AnimatedPressButton({
	pressAnimationConfig,
	onPressIn,
	onPressOut,
	style,
	...buttonProps
}: Omit<AnimatedButtonProps, "entering" | "exiting" | "useDefaultEntrance">) {
	const { animatedStyle, handlePressIn, handlePressOut } =
		useButtonPressAnimation({
			disabled: buttonProps.disabled ?? false,
			...pressAnimationConfig,
		});

	const combinedPressIn = (
		event: Parameters<NonNullable<ButtonProps["onPressIn"]>>[0],
	) => {
		handlePressIn();
		onPressIn?.(event);
	};

	const combinedPressOut = (
		event: Parameters<NonNullable<ButtonProps["onPressOut"]>>[0],
	) => {
		handlePressOut();
		onPressOut?.(event);
	};

	return (
		<Animated.View style={animatedStyle}>
			<Button
				{...buttonProps}
				style={style}
				onPressIn={combinedPressIn}
				onPressOut={combinedPressOut}
			/>
		</Animated.View>
	);
}
