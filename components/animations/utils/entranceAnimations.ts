import {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  SlideInDown,
  SlideInLeft,
  SlideInRight,
  SlideInUp,
} from "react-native-reanimated";
import { ENTRANCE_ANIMATIONS } from "../constants/animationConfig";

export interface EntranceAnimationConfig {
  /** Delay before animation starts (in milliseconds) */
  delay?: number;
  /** Duration of the animation (in milliseconds) */
  duration?: number;
}

/**
 * Pre-configured fade entrance animations with consistent timing
 */
export const fadeAnimations = {
  /**
   * Fade in from above with standard timing
   */
  fadeInUp: (config: EntranceAnimationConfig = {}) => {
    const { delay = 0, duration = ENTRANCE_ANIMATIONS.durations.slow } = config;
    return FadeInUp.delay(delay).duration(duration).build();
  },

  /**
   * Fade in from below with standard timing
   */
  fadeInDown: (config: EntranceAnimationConfig = {}) => {
    const { delay = 0, duration = ENTRANCE_ANIMATIONS.durations.standard } =
      config;
    return FadeInDown.delay(delay).duration(duration).build();
  },

  /**
   * Fade in from left with standard timing
   */
  fadeInLeft: (config: EntranceAnimationConfig = {}) => {
    const { delay = 0, duration = ENTRANCE_ANIMATIONS.durations.standard } =
      config;
    return FadeInLeft.delay(delay).duration(duration).build();
  },

  /**
   * Fade in from right with standard timing
   */
  fadeInRight: (config: EntranceAnimationConfig = {}) => {
    const { delay = 0, duration = ENTRANCE_ANIMATIONS.durations.standard } =
      config;
    return FadeInRight.delay(delay).duration(duration).build();
  },

  /**
   * Simple fade in with standard timing
   */
  fadeIn: (config: EntranceAnimationConfig = {}) => {
    const { delay = 0, duration = ENTRANCE_ANIMATIONS.durations.standard } =
      config;
    return FadeIn.delay(delay).duration(duration).build();
  },
};

/**
 * Pre-configured slide entrance animations
 */
export const slideAnimations = {
  /**
   * Slide in from above
   */
  slideInUp: (config: EntranceAnimationConfig = {}) => {
    const { delay = 0, duration = ENTRANCE_ANIMATIONS.durations.standard } =
      config;
    return SlideInUp.delay(delay).duration(duration).build();
  },

  /**
   * Slide in from below
   */
  slideInDown: (config: EntranceAnimationConfig = {}) => {
    const { delay = 0, duration = ENTRANCE_ANIMATIONS.durations.standard } =
      config;
    return SlideInDown.delay(delay).duration(duration).build();
  },

  /**
   * Slide in from left
   */
  slideInLeft: (config: EntranceAnimationConfig = {}) => {
    const { delay = 0, duration = ENTRANCE_ANIMATIONS.durations.standard } =
      config;
    return SlideInLeft.delay(delay).duration(duration).build();
  },

  /**
   * Slide in from right
   */
  slideInRight: (config: EntranceAnimationConfig = {}) => {
    const { delay = 0, duration = ENTRANCE_ANIMATIONS.durations.standard } =
      config;
    return SlideInRight.delay(delay).duration(duration).build();
  },
};

/**
 * Staggered animation utilities for multiple elements
 */
export const staggeredAnimations = {
  /**
   * Create staggered fade in up animations for multiple elements
   * @param count Number of elements to animate
   * @param baseDelay Base delay for the first element
   * @param staggerDelay Delay between each element
   * @param duration Duration for each animation
   */
  fadeInUpStaggered: (
    count: number,
    baseDelay: number = ENTRANCE_ANIMATIONS.delays.short,
    staggerDelay: number = 100,
    duration: number = ENTRANCE_ANIMATIONS.durations.standard
  ) => {
    return Array.from({ length: count }, (_, index) =>
      FadeInUp.delay(baseDelay + index * staggerDelay)
        .duration(duration)
        .build()
    );
  },

  /**
   * Create staggered fade in down animations for multiple elements
   */
  fadeInDownStaggered: (
    count: number,
    baseDelay: number = ENTRANCE_ANIMATIONS.delays.medium,
    staggerDelay: number = 100,
    duration: number = ENTRANCE_ANIMATIONS.durations.standard
  ) => {
    return Array.from({ length: count }, (_, index) =>
      FadeInDown.delay(baseDelay + index * staggerDelay)
        .duration(duration)
        .build()
    );
  },
};

/**
 * Common animation presets used throughout the app
 */
export const animationPresets = {
  // Header illustration animation (main focal point)
  headerIllustration: fadeAnimations.fadeIn({
    duration: ENTRANCE_ANIMATIONS.durations.slow,
  }),

  // Form title animation
  formTitle: fadeAnimations.fadeInDown({
    delay: ENTRANCE_ANIMATIONS.delays.medium,
    duration: ENTRANCE_ANIMATIONS.durations.standard,
  }),

  // Form field animations (staggered)
  formField: (index: number = 0) =>
    fadeAnimations.fadeInDown({
      delay: ENTRANCE_ANIMATIONS.delays.long + index * 100,
      duration: ENTRANCE_ANIMATIONS.durations.standard,
    }),

  // Button animation (usually last)
  primaryButton: fadeAnimations.fadeInDown({
    delay: ENTRANCE_ANIMATIONS.delays.extraLong,
    duration: ENTRANCE_ANIMATIONS.durations.standard,
  }),

  // Decorative elements (background dots, etc.)
  decorativeElement: (index: number = 0) =>
    fadeAnimations.fadeInUp({
      delay: ENTRANCE_ANIMATIONS.delays.medium + index * 100,
      duration: ENTRANCE_ANIMATIONS.durations.standard,
    }),

  // Error message animation
  errorMessage: fadeAnimations.fadeInDown({
    delay: 0,
    duration: ENTRANCE_ANIMATIONS.durations.quick,
  }),
};

/**
 * Utility function to create custom entrance animations
 */
export function createEntranceAnimation(
  animationType:
    | "fadeInUp"
    | "fadeInDown"
    | "fadeInLeft"
    | "fadeInRight"
    | "fadeIn",
  config: EntranceAnimationConfig = {}
) {
  return fadeAnimations[animationType](config);
}
