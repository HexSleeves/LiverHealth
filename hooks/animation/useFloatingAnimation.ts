import { useCallback, useEffect, useRef } from "react";
import type { ViewStyle } from "react-native";
import {
  Easing,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

/**
 * Configuration for floating animation
 */
export interface FloatingAnimationConfig {
  /** Distance to move up/down in pixels (default: 10) */
  distance?: number;
  /** Duration of each movement phase in milliseconds (default: 2000) */
  duration?: number;
  /** Easing function to use (default: Easing.inOut(Easing.ease)) */
  easing?: (value: number) => number;
  /** Whether to start animation immediately (default: true) */
  autoStart?: boolean;
}

/**
 * Return type for useFloatingAnimation hook
 */
export interface FloatingAnimationReturn {
  /** Animated style object to apply to components */
  animatedStyle: ViewStyle;
  /** Start the floating animation */
  start: () => void;
  /** Stop the floating animation */
  stop: () => void;
  /** The shared value for translateY (for advanced usage) */
  translateY: SharedValue<number>;
}

/**
 * Default configuration for floating animation
 */
const DEFAULT_CONFIG: Required<FloatingAnimationConfig> = {
  distance: 10,
  duration: 2000,
  easing: Easing.inOut(Easing.ease),
  autoStart: true,
};

/**
 * Hook for creating floating animations with up-and-down motion
 *
 * @param config - Configuration options for the floating animation
 * @returns Object containing animated style and control methods
 *
 * @example
 * ```tsx
 * const { animatedStyle, start, stop } = useFloatingAnimation({
 *   distance: 15,
 *   duration: 1500,
 *   autoStart: true
 * });
 *
 * return (
 *   <Animated.View style={animatedStyle}>
 *     <YourComponent />
 *   </Animated.View>
 * );
 * ```
 */
export function useFloatingAnimation(
  config: FloatingAnimationConfig = {}
): FloatingAnimationReturn {
  const { distance, duration, easing, autoStart } = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const translateY = useSharedValue(0);
  const isRunningRef = useRef(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const start = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    translateY.value = withRepeat(
      withSequence(
        // Move up by specified distance
        withTiming(-distance, {
          duration,
          easing,
        }),
        // Move back to center
        withTiming(0, {
          duration,
          easing,
        })
      ),
      -1, // Infinite repetition
      false // Don't auto-reverse (we handle it in sequence)
    );
  }, [distance, duration, easing, translateY]);

  const stop = useCallback(() => {
    if (!isRunningRef.current) return;

    isRunningRef.current = false;
    // Smoothly return to center position
    translateY.value = withTiming(0, {
      duration: duration / 2,
      easing,
    });
  }, [duration, easing, translateY]);

  // Auto-start animation if enabled
  useEffect(() => {
    if (autoStart) {
      start();
    }

    // Cleanup on unmount
    return () => {
      stop();
    };
  }, [autoStart, start, stop]);

  return {
    animatedStyle,
    start,
    stop,
    translateY,
  };
}

/**
 * Simplified version of useFloatingAnimation that only returns the animated style
 * Useful when you don't need programmatic control over the animation
 *
 * @param config - Configuration options (excluding autoStart, which is always true)
 * @returns Animated style object
 *
 * @example
 * ```tsx
 * const floatingStyle = useSimpleFloatingAnimation({ distance: 8 });
 *
 * return (
 *   <Animated.View style={floatingStyle}>
 *     <Icon />
 *   </Animated.View>
 * );
 * ```
 */
export function useSimpleFloatingAnimation(
  config: Omit<FloatingAnimationConfig, "autoStart"> = {}
): ViewStyle {
  const { animatedStyle } = useFloatingAnimation({
    ...config,
    autoStart: true,
  });

  return animatedStyle;
}
