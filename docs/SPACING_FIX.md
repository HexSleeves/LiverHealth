# Spacing Utilities Fix - React Native & NativeWind

## Issue
`space-y` and `space-x` utilities were not working on iOS in React Native, requiring manual use of `gap-y` and `gap-x` instead.

## Root Cause
React Native has limited CSS support for complex selectors that Tailwind's `space-*` utilities rely on:

### How space-y works (doesn't work in RN):
```css
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
```

### How gap-y works (works in RN):
```css
.gap-y-2 {
  row-gap: 0.5rem;
}
```

## Solution Applied
Replaced all `space-*` utilities with `gap-*` utilities throughout the codebase:

### Files Updated:
- `components/form/FormInput.tsx` - Form field spacing
- `app/(auth)/login.tsx` - Login form spacing  
- `app/(auth)/signup.tsx` - Signup form spacing
- `app/(auth)/forgot-password.tsx` - Password reset form spacing
- `components/ui/card.tsx` - Card header spacing

### Changes Made:
- `space-y-4` → `gap-y-4`
- `space-y-2` → `gap-y-2` 
- `space-x-2` → `gap-x-2`
- `space-y-1.5` → `gap-y-1.5`

## Recommendations

### ✅ Use These (React Native Compatible):
- `gap-y-*` for vertical spacing between flex items
- `gap-x-*` for horizontal spacing between flex items
- `gap-*` for both directions
- Manual `mb-*`, `mt-*`, `mr-*`, `ml-*` on individual components
- Padding utilities `p-*`, `px-*`, `py-*`, etc.

### ❌ Avoid These (Limited React Native Support):
- `space-y-*` utilities
- `space-x-*` utilities
- Complex CSS selectors
- `:not()` pseudo-selectors

## Key Learnings
1. React Native's CSS engine is more limited than web browsers
2. `gap` properties have better React Native support than complex margin selectors
3. NativeWind v4 properly transpiles `gap-*` utilities to React Native's `rowGap`/`columnGap`
4. When in doubt, use flexbox with gap properties for consistent cross-platform spacing

## Testing
- ✅ TypeScript compilation passes
- ✅ Development server starts successfully
- ✅ iOS spacing now works correctly with gap utilities

Last Updated: 2025-01-03