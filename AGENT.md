# AGENT.md - MyLiverApp React Native Development Guide

## Build/Lint/Test Commands
- `npm run dev` - Start Expo development server with cache clear
- `npm run lint` - Run ESLint with Expo config
- `npm run android` - Start with Android emulator
- `npm run ios` - Start with iOS simulator
- `npm run web` - Start web development server
- `npm run clean` - Remove .expo and node_modules directories

## Architecture & Structure
- **Framework**: React Native with Expo SDK 53, TypeScript strict mode
- **Navigation**: Expo Router v5 with file-based routing (`app/` directory)
- **Styling**: NativeWind v4 (Tailwind CSS), CSS custom properties in `global.css`
- **Backend**: Convex for data/auth (convex/ directory contains generated files)
- **UI**: @rn-primitives components in `components/ui/`, custom SettingsRow pattern
- **Theme**: Dark/light mode system with useColorScheme hook, Android nav bar theming

## Code Style & Conventions
- **Imports**: Use path alias `~/` for project root
- **Styling**: NativeWind classes with `cn()` utility for conditional merging
- **Types**: Strict TypeScript with noUncheckedIndexedAccess, Zod for validation
- **Components**: Follow react-native-reusables patterns, className prop support
- **Icons**: Lucide React Native with custom wrapper components in `lib/icons/`
- **ESLint**: Expo config with react/no-unescaped-entities disabled
- **Platform**: Use Platform.select() for platform-specific logic
