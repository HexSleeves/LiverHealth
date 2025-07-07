import { useCallback, useEffect, useRef } from "react";
import type { ViewStyle } from "react-native";
import {
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import {
  PULSE_ANIMATION,
  type SpringConfig,
} from "../../components/animations/constants/animationConfig";

export interface PulseAnimationConfig {
  /** Scale value for the pulse effect (default: 1.1) */
  scaleUp?: number;
  /** Normal scale value (default: 1) */
  scaleNormal?: number;
  /** Interval between pulses in milliseconds (default: 3000) */
  interval?: number;
  /** Spring configuration for the animation */
  springConfig?: SpringConfig;
  /** Whether the animation should start automatically (default: true) */
  autoStart?: boolean;
  /** Whether the animation is paused */
  paused?: boolean;
}

export interface PulseAnimationReturn {
  /** Animated style object to apply to the element */
  animatedStyle: ViewStyle;
  /** Start the pulse animation */
  start: () => void;
  /** Stop the pulse animation */
  stop: () => void;
  /** Pause the pulse animation */
  pause: () => void;
  /** Resume the pulse animation */
  resume: () => void;
  /** Shared value for the scale (for advanced usage) */
  scale: SharedValue<number>;
}

/**
 * Hook for creating pulsing animations (like heartbeat effects)
 *
 * @param config Configuration options for the pulse animation
 * @returns Animation style and control functions
 *
 * @example
 * ```tsx
 * const { animatedStyle, start, stop } = usePulseAnimation({
 *   interval: 2000,
 *   scaleUp: 1.2,
 * });
 *
 * return (
 *   <Animated.View style={animatedStyle}>
 *     <Heart size={24} />
 *   </Animated.View>
 * );
 * ```
 */
export function usePulseAnimation(
  config: PulseAnimationConfig = {}
): PulseAnimationReturn {
  const {
    scaleUp = PULSE_ANIMATION.scaleUp,
    scaleNormal = PULSE_ANIMATION.scaleNormal,
    interval = PULSE_ANIMATION.defaultInterval,
    springConfig = PULSE_ANIMATION.springConfig,
    autoStart = true,
    paused = false,
  } = config;

  const scale = useSharedValue(scaleNormal);
  const intervalRef = useRef<number | null>(null);
  const isPausedRef = useRef(paused);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const pulse = useCallback(() => {
    if (isPausedRef.current) return;

    scale.value = withSpring(scaleUp, springConfig, () => {
      if (!isPausedRef.current) {
        scale.value = withSpring(scaleNormal, springConfig);
      }
    });
  }, [scale, scaleUp, scaleNormal, springConfig]);

  const start = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    isPausedRef.current = false;
    pulse(); // Initial pulse
    intervalRef.current = setInterval(pulse, interval);
  }, [pulse, interval]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    isPausedRef.current = false;
    scale.value = withSpring(scaleNormal, springConfig);
  }, [scale, scaleNormal, springConfig]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  // Auto-start effect
  useEffect(() => {
    if (autoStart && !paused) {
      start();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoStart, paused, start]);

  // Handle paused state changes
  useEffect(() => {
    isPausedRef.current = paused;
  }, [paused]);

  return {
    animatedStyle,
    start,
    stop,
    pause,
    resume,
    scale,
  };
}

/**
 * Hook for creating continuous pulse animation (using withRepeat)
 * This version uses react-native-reanimated's built-in repeat functionality
 *
 * @param config Configuration options for the continuous pulse
 * @returns Animation style and control functions
 */
export function useContinuousPulseAnimation(
  config: Omit<PulseAnimationConfig, "interval"> = {}
): Omit<PulseAnimationReturn, "start" | "stop" | "pause" | "resume"> {
  const {
    scaleUp = PULSE_ANIMATION.scaleUp,
    scaleNormal = PULSE_ANIMATION.scaleNormal,
    springConfig = PULSE_ANIMATION.springConfig,
    autoStart = true,
  } = config;

  const scale = useSharedValue(scaleNormal);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (autoStart) {
      scale.value = withRepeat(
        withSequence(
          withSpring(scaleUp, springConfig),
          withSpring(scaleNormal, springConfig)
        ),
        -1, // Infinite repeat
        false // Don't reverse
      );
    }

    return () => {
      scale.value = scaleNormal;
    };
  }, [autoStart, scale, scaleUp, scaleNormal, springConfig]);

  return {
    animatedStyle,
    scale,
  };
}
