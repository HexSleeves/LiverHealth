# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development

- `npm run dev` - Start Expo development server with cache clear
- `npm run dev:android` - Start with Android emulator
- `npm run ios` - Start with iOxS simulator
- `npm run dev:web` - Start web development server
- `npm run clean` - Remove .expo and node_modules directories

### Build & Styling

- `npx tailwindcss -i ./global.css -o ./node_modules/.cache/nativewind/global.css` - Compile Tailwind CSS (runs automatically on postinstall)

## Project Architecture

### Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Navigation**: Expo Router v5 with file-based routing and typed routes
- **Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **UI Components**: react-native-reusables with @rn-primitives
- **Theme**: Dark/light mode with persistent storage and Android navigation bar integration
- **Gestures**: React Native Gesture Handler with Reanimated v3
- **Icons**: Lucide React Native with custom icon components

### File Structure

- `app/` - File-based routing (Expo Router)
  - `(tabs)/` - Tab-based navigation group
  - `_layout.tsx` - Root layout with theme provider and navigation
  - `modal.tsx` - Modal screen
- `components/` - Reusable components
  - `ui/` - Design system components based on react-native-reusables
- `lib/` - Utilities and shared logic
  - `icons/` - Custom icon components with className support
  - `useColorScheme.tsx` - Theme management hook
  - `utils.ts` - Utility functions (cn function for className merging)

### Key Features

- **Universal App**: Runs on iOS, Android, and Web
- **Theme System**: Automatic dark/light mode with CSS custom properties
- **Navigation**: Stack + Tabs with custom header components
- **Bottom Sheet**: Modal support with @gorhom/bottom-sheet
- **Type Safety**: Full TypeScript with strict mode and typed routes

### Styling Conventions

- Uses NativeWind v4 with Tailwind CSS classes
- CSS custom properties defined in `global.css` for theme colors
- `cn()` utility function for conditional className merging
- Path alias `~/` points to project root

### Platform-Specific Logic

- Android navigation bar theming in `lib/android-navigation-bar.ts`
- Web-specific background handling in `_layout.tsx`
- Platform.select() used for conditional imports/behavior

### Component Architecture

- UI components follow react-native-reusables patterns
- Icons use custom wrapper with className support
- Theme toggle component integrated in navigation headers
- Settings screens use custom SettingsRow components

### Development Notes

- TypeScript strict mode enabled with additional safety checks
- Expo new architecture enabled
- Supports tablet layouts on iOS
- Web build uses Metro bundler with static output
