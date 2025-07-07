import { useCallback } from "react";
import type { ViewStyle } from "react-native";
import {
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  BUTTON_PRESS,
  type SpringConfig,
} from "../../components/animations/constants/animationConfig";

export interface ButtonPressAnimationConfig {
  /** Scale value when button is pressed (default: 0.95) */
  scaleDown?: number;
  /** Scale value when button is released (default: 1) */
  scaleNormal?: number;
  /** Spring configuration for the animation */
  springConfig?: SpringConfig;
  /** Whether the animation is disabled */
  disabled?: boolean;
}

export interface ButtonPressAnimationReturn {
  /** Animated style object to apply to the button */
  animatedStyle: ViewStyle;
  /** Handler for button press in event */
  handlePressIn: () => void;
  /** Handler for button press out event */
  handlePressOut: () => void;
  /** Shared value for the scale (for advanced usage) */
  scale: SharedValue<number>;
}

/**
 * Hook for creating consistent button press animations
 *
 * @param config Configuration options for the animation
 * @returns Animation style and event handlers
 *
 * @example
 * ```tsx
 * const { animatedStyle, handlePressIn, handlePressOut } = useButtonPressAnimation();
 *
 * return (
 *   <Animated.View style={animatedStyle}>
 *     <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
 *       <Text>Press me</Text>
 *     </Pressable>
 *   </Animated.View>
 * );
 * ```
 */
export function useButtonPressAnimation(
  config: ButtonPressAnimationConfig = {}
): ButtonPressAnimationReturn {
  const {
    scaleDown = BUTTON_PRESS.scaleDown,
    scaleNormal = BUTTON_PRESS.scaleNormal,
    springConfig = BUTTON_PRESS.springConfig,
    disabled = false,
  } = config;

  const scale = useSharedValue(scaleNormal);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    if (disabled) return;
    scale.value = withSpring(scaleDown, springConfig);
  }, [disabled, scale, scaleDown, springConfig]);

  const handlePressOut = useCallback(() => {
    if (disabled) return;
    scale.value = withSpring(scaleNormal, springConfig);
  }, [disabled, scale, scaleNormal, springConfig]);

  return {
    animatedStyle,
    handlePressIn,
    handlePressOut,
    scale,
  };
}

/**
 * Hook for creating button press animation with custom transform
 * Useful when you need to combine scale with other transforms
 *
 * @param config Configuration options for the animation
 * @returns Scale value and event handlers (no pre-built style)
 */
export function useButtonPressScale(
  config: ButtonPressAnimationConfig = {}
): Omit<ButtonPressAnimationReturn, "animatedStyle"> {
  const {
    scaleDown = BUTTON_PRESS.scaleDown,
    scaleNormal = BUTTON_PRESS.scaleNormal,
    springConfig = BUTTON_PRESS.springConfig,
    disabled = false,
  } = config;

  const scale = useSharedValue(scaleNormal);

  const handlePressIn = useCallback(() => {
    if (disabled) return;
    scale.value = withSpring(scaleDown, springConfig);
  }, [disabled, scale, scaleDown, springConfig]);

  const handlePressOut = useCallback(() => {
    if (disabled) return;
    scale.value = withSpring(scaleNormal, springConfig);
  }, [disabled, scale, scaleNormal, springConfig]);

  return {
    handlePressIn,
    handlePressOut,
    scale,
  };
}
