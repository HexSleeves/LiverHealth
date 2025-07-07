# CLAUDE.md - HepatoTrack React Native App

**Last Updated:** 2025-07-07
**Version:** 1.0
**Project Type:** React Native Health App

## Project Overview

HepatoTrack is a React Native mobile application for liver health tracking and management. The app integrates with Apple Health, MyFitnessPal, and health provider platforms to provide comprehensive health monitoring for individuals with liver conditions.

### Tech Stack

- **Framework:** React Native 0.79.5 + Expo SDK 53
- **Authentication:** Clerk (email/password, social login)
- **Backend:** Convex (real-time database with Clerk integration)
- **State Management:** Zustand (planned)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Forms:** React Hook Form + Zod validation
- **Navigation:** Expo Router (file-based routing)
- **Icons:** Lucide React Native

## Current Implementation Status

### ✅ Complete Features

#### Authentication System

- Full Clerk integration with secure token storage
- Complete auth flow: sign-in, sign-up, forgot password, email verification
- Route protection with automatic redirects
- Custom `useClerkAuth` hook for centralized auth logic

#### UI Foundation

- Complete shadcn/ui-inspired design system
- Health-focused color palette with nutrition/lab result themes
- Comprehensive animation system with reusable components
- Accessibility-first approach with proper contrast and screen reader support

#### Navigation Architecture

- Expo Router with protected route groups
- Auth routes: `(auth)` group with redirect logic
- Main app: `(tabs)` group with Dashboard, Medication, Settings
- Clean navigation flow preventing back navigation to auth

#### Backend Integration

- Convex backend configured with Clerk authentication
- Auto-generated TypeScript API definitions
- Real-time capabilities ready for health data sync

### 🚧 Ready for Development

#### Core Features (Per PRD)

1. **Dashboard Screen** - Basic structure exists, needs health data widgets
2. **Medication Tracking** - Route exists, needs full feature implementation
3. **Settings Screen** - Route exists, needs user preferences
4. **Data Integrations** - Backend ready for Apple Health/MyFitnessPal APIs

#### Database Schema (Needs Implementation)

- User profiles with health conditions
- Medication schedules and adherence tracking
- Nutrition data from MyFitnessPal
- Lab results and liver function tests
- Activity data from Apple Health

## Architecture Patterns

### Component Organization

```
components/
├── animations/     # Reusable animation components
├── auth/          # Authentication UI components
├── error/         # Error handling components
├── form/          # Form components with validation
├── ui/            # Design system components
```

### Custom Hooks Structure

```
hooks/
├── animation/     # Animation-specific hooks
├── auth/          # Authentication hooks
├── useAccessibilityFixes.ts
```

### Routing Strategy

- File-based routing with Expo Router
- Protected route groups for auth vs main app
- Automatic redirects based on authentication state
- Tab-based navigation for main app features

## Development Guidelines

### Code Conventions

- **TypeScript First:** All components and hooks are fully typed
- **Component Composition:** Prefer composition over inheritance
- **Custom Hooks:** Extract business logic into reusable hooks
- **Animation Standards:** Use react-native-reanimated for all animations
- **Accessibility:** All components include proper accessibility props

### Styling Standards

- **NativeWind Classes:** Use Tailwind utility classes exclusively
- **Color Palette:** Stick to health-focused color system
- **Design System:** Use existing UI components, extend when needed
- **Responsive Design:** Components work across all screen sizes

### Form Handling

- **React Hook Form:** All forms use RHF with Zod validation
- **Error Handling:** Consistent error message display
- **Loading States:** Proper loading indicators for async operations

## Key Dependencies

### Core

- `react-native`: 0.79.5
- `react`: 19.0.0
- `expo`: ~53.0.0
- `expo-router`: 5.1.3

### Authentication & Backend

- `@clerk/clerk-expo`: 2.14.2
- `convex`: 1.25.2
- `@convex-dev/react-clerk`: 1.0.0

### UI & Animation

- `nativewind`: 4.1.23
- `react-native-reanimated`: 3.17.4
- `@gorhom/bottom-sheet`: 5.1.5
- `lucide-react-native`: 0.468.0

### Forms & Validation

- `react-hook-form`: 7.60.0
- `@hookform/resolvers`: 3.10.0

## Next Development Priorities

Based on PRD v1.0 requirements:

1. **Dashboard Implementation**
   - Today's nutrients widget (MyFitnessPal integration)
   - Medication adherence checklist
   - Recent activity from Apple Health
   - Daily liver health tips

2. **Medication Management**
   - Medication CRUD operations
   - Daily tracking and adherence logging
   - Push notifications for reminders
   - Adherence history and trends

3. **Data Integration APIs**
   - Apple Health SDK integration
   - MyFitnessPal API connection
   - Lab results data structure (manual entry for v1.0)

4. **Database Schema Design**
   - User profiles and health conditions
   - Medication schedules and logs
   - Nutrition data aggregation
   - Lab results storage and trends

## Testing Strategy

### Current Setup

- Basic Expo testing environment
- TypeScript compilation checks
- Clerk authentication testing

### Recommended Additions

- Jest + React Native Testing Library
- Component testing for UI library
- Integration testing for auth flows
- API integration testing with Convex

## Performance Considerations

### Optimization Strategies

- Use React.memo for expensive components
- Implement virtualization for large lists
- Optimize images and assets
- Use Expo's built-in performance monitoring

### Data Sync Strategy

- Real-time sync with Convex for critical data
- Offline-first approach for health data
- Background sync for nutrition and activity data
- Efficient caching strategy for lab results

## Security & Privacy

### Data Protection

- Secure token storage with Expo SecureStore
- HIPAA compliance considerations for health data
- Encryption for sensitive health information
- Secure API communication with Convex

### User Privacy

- Clear data usage policies
- Minimal data collection approach
- User control over data sharing
- Secure authentication with Clerk

## Future Enhancements (Post v1.0)

### Advanced Features

- AI-powered health insights
- Integration with more health platforms
- Social features and community support
- Healthcare provider data sharing
- Advanced analytics and reporting

### Technical Improvements

- Code splitting and lazy loading
- Advanced caching strategies
- Push notification system
- Background processing for health data
- Advanced error tracking and analytics
