/**
 * Animation configuration constants for consistent animations across the app
 */

// Spring animation configurations
export const SPRING_CONFIGS = {
  // Gentle spring for UI feedback
  gentle: {
    damping: 2,
    stiffness: 100,
  },
  // Bouncy spring for playful interactions
  bouncy: {
    damping: 4,
    stiffness: 150,
  },
  // Smooth spring for polished interactions
  smooth: {
    damping: 8,
    stiffness: 200,
  },
  // Quick spring for responsive feedback
  quick: {
    damping: 12,
    stiffness: 300,
  },
} as const;

// Timing animation configurations
export const TIMING_CONFIGS = {
  // Fast transitions
  fast: {
    duration: 150,
  },
  // Standard transitions
  standard: {
    duration: 300,
  },
  // Slow transitions for emphasis
  slow: {
    duration: 600,
  },
  // Extra slow for dramatic effect
  dramatic: {
    duration: 800,
  },
} as const;

// Button press animation values
export const BUTTON_PRESS = {
  // Scale values for button press feedback
  scaleDown: 0.95,
  scaleNormal: 1,
  // Spring config for button press
  springConfig: SPRING_CONFIGS.gentle,
} as const;

// Pulse animation values
export const PULSE_ANIMATION = {
  // Scale values for pulse effect
  scaleUp: 1.1,
  scaleNormal: 1,
  // Default pulse interval in milliseconds
  defaultInterval: 3000,
  // Spring config for pulse
  springConfig: SPRING_CONFIGS.gentle,
} as const;

// Entrance animation delays and durations
export const ENTRANCE_ANIMATIONS = {
  // Delays for staggered entrance animations
  delays: {
    immediate: 0,
    short: 200,
    medium: 400,
    long: 600,
    extraLong: 800,
  },
  // Durations for entrance animations
  durations: {
    quick: 400,
    standard: 600,
    slow: 800,
  },
} as const;

// Loading animation configurations
export const LOADING_ANIMATIONS = {
  // Skeleton pulse animation
  skeleton: {
    duration: 1000,
    opacityRange: [0.5, 1] as const,
  },
  // Spinner rotation
  spinner: {
    duration: 1000,
    rotationDegrees: 360,
  },
} as const;

// Common animation presets
export const ANIMATION_PRESETS = {
  // Button press feedback
  buttonPress: {
    pressIn: {
      scale: BUTTON_PRESS.scaleDown,
      config: BUTTON_PRESS.springConfig,
    },
    pressOut: {
      scale: BUTTON_PRESS.scaleNormal,
      config: BUTTON_PRESS.springConfig,
    },
  },
  // Icon pulse effect
  iconPulse: {
    scale: PULSE_ANIMATION.scaleUp,
    interval: PULSE_ANIMATION.defaultInterval,
    config: PULSE_ANIMATION.springConfig,
  },
  // Fade entrance animations
  fadeEntrance: {
    fadeInUp: {
      delay: ENTRANCE_ANIMATIONS.delays.short,
      duration: ENTRANCE_ANIMATIONS.durations.slow,
    },
    fadeInDown: {
      delay: ENTRANCE_ANIMATIONS.delays.medium,
      duration: ENTRANCE_ANIMATIONS.durations.standard,
    },
  },
} as const;

// Animation easing functions (for timing animations)
export const EASING = {
  // Standard easing curves
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // Custom easing for specific use cases
  bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  smooth: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
} as const;

// Animation types for TypeScript
export type SpringConfig = (typeof SPRING_CONFIGS)[keyof typeof SPRING_CONFIGS];
export type TimingConfig = (typeof TIMING_CONFIGS)[keyof typeof TIMING_CONFIGS];
export type AnimationPreset =
  (typeof ANIMATION_PRESETS)[keyof typeof ANIMATION_PRESETS];
