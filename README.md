# MyLiverApp 🌿

A comprehensive React Native application designed to empower individuals with liver diseases to manage their health through intuitive nutrition tracking and medication management.

## 🎯 Vision

To create a user-friendly mobile application that helps patients with liver conditions take control of their health by simplifying the tracking of nutritional data and medications.

## ✨ Features

### 🏥 Health Management

- **Comprehensive Onboarding**: Guided setup for personal health profile and medical history
- **Nutrition Tracking**: Monitor daily intake of macronutrients and critical micronutrients (Sodium, Potassium)
- **Medication Management**: Track prescribed medications with dosage, frequency, and reminder system
- **Fluid Intake Monitoring**: Dedicated logging for daily water and fluid consumption
- **Health Dashboard**: At-a-glance view of daily progress against health goals

### 🎨 User Experience

- **Green Health Theme**: Calming, medical-grade design system inspired by shadcn/ui
- **Smooth Animations**: React Native Reanimated v3 for 60fps transitions
- **Dark/Light Mode**: Persistent theme with Android navigation bar integration
- **Universal Platform**: Native iOS, Android, and responsive web support
- **Accessibility**: Full screen reader and keyboard navigation support

### 🔧 Technical Excellence

- **Type Safety**: Full TypeScript with strict mode and Zod validation
- **Performance Optimized**: Debounced saves, split context hooks, and efficient renders
- **File-based Routing**: Expo Router v5 with typed navigation
- **Modern Styling**: NativeWind v4 (Tailwind CSS for React Native)
- **Gesture Support**: React Native Gesture Handler integration

## 🚀 Tech Stack

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript with strict mode
- **Navigation**: Expo Router v5 (file-based routing)
- **Styling**: NativeWind v4 + Tailwind CSS
- **UI Components**: react-native-reusables with @rn-primitives
- **Animations**: React Native Reanimated v3
- **State Management**: React Context with AsyncStorage persistence
- **Form Validation**: Zod schemas with TypeScript inference
- **Icons**: Lucide React Native
- **Date Handling**: Expo DateTimePicker with web fallback

## 📱 Supported Platforms

- ✅ iOS (iPhone & iPad)
- ✅ Android (Phone & Tablet)
- ✅ Web (Progressive Web App)

## 🏗️ Project Structure

```text
MyLiverApp/
├── app/                    # File-based routing
│   ├── (tabs)/            # Tab navigation group
│   ├── (onboarding)/      # Onboarding flow
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   ├── ui/               # Design system components
│   ├── onboarding/       # Onboarding-specific components
│   └── providers/        # Context providers
├── lib/                  # Utilities and shared logic
│   ├── icons/           # Custom icon components
│   └── utils.ts         # Helper functions
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
└── docs/                # Project documentation
```

## 🎨 Design System

### Color Palette

- **Primary**: Forest Green (`#22c55e`) - Actions and CTAs
- **Secondary**: Mint Green (`#86efac`) - Subtle highlights
- **Health Scale**: 11-stop green gradient for health metrics
- **Liver Brand**: Consistent health-focused color scheme

### Typography

- **System Fonts**: iOS System, Android Roboto, Web system-ui
- **Scale**: Tailwind typography scale with health-optimized hierarchy
- **Accessibility**: WCAG AA compliant contrast ratios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and Bun
- Expo CLI: `bun add -g @expo/cli`
- iOS: Xcode 14+ and iOS Simulator
- Android: Android Studio and emulator

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd MyLiverApp

# Install dependencies
bun install

# Start development server
bun dev
```

### Development Commands

```bash
# Core Development
bun dev              # Start Expo dev server with cache clear
bun dev:android      # Start with Android emulator
bun ios              # Start with iOS simulator
bun dev:web          # Start web development server

# Build & Deploy
bun build:web        # Build for web deployment
bun clean            # Remove cache and node_modules
```

## 🏥 Health & Compliance

### Data Privacy

- **Local Storage**: All health data stored locally with AsyncStorage
- **No Cloud Sync**: Privacy-first approach with local-only data
- **HIPAA Considerations**: Designed with medical data security in mind

### Medical Disclaimer

This application is for informational purposes only and should not replace professional medical advice. Always consult with healthcare providers for medical decisions.

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details on:

- Code style and conventions
- Pull request process
- Issue reporting
- Development workflow

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [react-native-reusables](https://github.com/mrzachnugent/react-native-reusables)
- UI components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Animations powered by [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

---

💚 **Built with care for liver health and patient empowerment**
