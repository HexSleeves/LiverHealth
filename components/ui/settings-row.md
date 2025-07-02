# SettingsRow Component

A flexible and reusable settings row component built with React Native and NativeWind, designed to work seamlessly with react-native-reusables component library.

## Overview

The `SettingsRow` component provides a consistent interface for displaying settings options with icons, titles, subtitles, interactive elements, and navigation indicators. It supports both pressable and non-pressable variants, making it perfect for building comprehensive settings screens.

## Features

- ✅ Consistent styling with NativeWind/Tailwind CSS
- ✅ TypeScript support with comprehensive interfaces
- ✅ Accessibility-friendly with proper focus states
- ✅ Flexible right-side element support (switches, text, custom components)
- ✅ Auto-chevron logic based on interaction patterns
- ✅ Disabled state support
- ✅ Customizable borders and spacing
- ✅ Test ID support for automated testing

## Installation

The component is already included in your project. Import it like this:

```tsx
import { SettingsRow } from '~/components/ui/settings-row';
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Main title text displayed prominently |
| `icon` | `React.ReactNode` | `undefined` | Icon element displayed on the left side |
| `subtitle` | `string` | `undefined` | Optional subtitle text below the title |
| `onPress` | `() => void` | `undefined` | Function called when row is pressed |
| `rightElement` | `React.ReactNode` | `undefined` | Custom element on the right (Switch, Text, etc.) |
| `showChevron` | `boolean` | Auto-determined | Whether to show right chevron arrow |
| `disabled` | `boolean` | `false` | Whether the row is disabled |
| `showBorder` | `boolean` | `true` | Whether to show bottom border |
| `className` | `string` | `undefined` | Additional CSS classes |
| `testID` | `string` | `undefined` | Test identifier for automated testing |

### Auto-Chevron Logic

The component automatically determines whether to show a chevron based on:
- If `showChevron` is explicitly set, that value is used
- If `onPress` is provided and no `rightElement` exists, chevron is shown
- Otherwise, no chevron is displayed

## Usage Examples

### Basic Settings Row

```tsx
import { SettingsRow } from '~/components/ui/settings-row';
import { Settings } from '~/lib/icons/Settings';

<SettingsRow
  icon={<Settings size={22} className="text-blue-500" />}
  title="General Settings"
  subtitle="App preferences and configurations"
  onPress={() => navigateToGeneralSettings()}
/>
```

### Settings Row with Switch

```tsx
import { Switch } from '~/components/ui/switch';
import { Bell } from '~/lib/icons/Bell';

const [notificationsEnabled, setNotificationsEnabled] = useState(true);

<SettingsRow
  icon={<Bell size={22} className="text-orange-500" />}
  title="Push Notifications"
  subtitle="Receive important updates"
  rightElement={
    <Switch
      checked={notificationsEnabled}
      onCheckedChange={setNotificationsEnabled}
    />
  }
  showChevron={false}
/>
```

### Settings Row with Custom Right Element

```tsx
import { Text } from '~/components/ui/text';
import { Palette } from '~/lib/icons/Palette';

<SettingsRow
  icon={<Palette size={22} className="text-purple-500" />}
  title="Theme"
  subtitle="Choose your preferred appearance"
  rightElement={
    <Text className="text-muted-foreground font-medium">
      Dark
    </Text>
  }
  onPress={() => showThemeSelector()}
/>
```

### Disabled Settings Row

```tsx
<SettingsRow
  icon={<Shield size={22} className="text-gray-400" />}
  title="Advanced Security"
  subtitle="Coming in next update"
  disabled={true}
  onPress={() => {}} // Will not be called when disabled
/>
```

### Settings Row Without Border

```tsx
<SettingsRow
  icon={<Info size={22} className="text-blue-500" />}
  title="About"
  subtitle="Version and app information"
  showBorder={false}
  onPress={() => showAboutDialog()}
/>
```

## Common Patterns

### Settings Section with Multiple Rows

```tsx
function SettingsSection({ title, children }) {
  return (
    <View className="mb-6">
      <Text className="font-semibold text-lg text-foreground mb-3 px-4">
        {title}
      </Text>
      <View className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
        {children}
      </View>
    </View>
  );
}

// Usage
<SettingsSection title="Privacy & Security">
  <SettingsRow
    icon={<Shield size={22} className="text-green-500" />}
    title="Privacy Policy"
    subtitle="Learn how we protect your data"
    onPress={handlePrivacyPolicy}
  />
  <SettingsRow
    icon={<Lock size={22} className="text-green-600" />}
    title="Biometric Authentication"
    subtitle="Use fingerprint or face ID"
    rightElement={<Switch checked={biometricAuth} onCheckedChange={setBiometricAuth} />}
    showChevron={false}
    showBorder={false} // Last item in section
  />
</SettingsSection>
```

### Navigation Settings Row

```tsx
import { router } from 'expo-router';

<SettingsRow
  icon={<User size={22} className="text-primary" />}
  title="Profile"
  subtitle="Manage your account information"
  onPress={() => router.push('/profile')}
/>
```

### Settings Row with Alert Dialog

```tsx
const handleDeleteData = () => {
  Alert.alert(
    "Delete All Data",
    "This action cannot be undone. Are you sure you want to delete all your health data?",
    [
      { text: "Cancel", style: "cancel" },
      { 
        text: "Delete", 
        style: "destructive",
        onPress: () => performDataDeletion()
      }
    ]
  );
};

<SettingsRow
  icon={<Trash2 size={22} className="text-red-500" />}
  title="Delete All Data"
  subtitle="Permanently remove all stored data"
  onPress={handleDeleteData}
/>
```

## Styling Guidelines

### Icon Colors
Use consistent color schemes for related settings:

```tsx
// Theme-related settings
<Palette size={22} className="text-blue-500" />
<Sun size={22} className="text-yellow-500" />
<Moon size={22} className="text-indigo-500" />

// Security-related settings  
<Shield size={22} className="text-green-500" />
<Lock size={22} className="text-green-600" />
<Key size={22} className="text-green-400" />

// Notification-related settings
<Bell size={22} className="text-orange-500" />
<BellOff size={22} className="text-orange-400" />

// Data-related settings
<Database size={22} className="text-purple-500" />
<Download size={22} className="text-blue-600" />
<Upload size={22} className="text-blue-400" />
```

### Custom Styling

```tsx
<SettingsRow
  title="Custom Styled Row"
  className="bg-accent/50 border-l-4 border-l-primary"
  // Additional custom styling
/>
```

## Accessibility

The component includes built-in accessibility features:

- Proper focus states for keyboard navigation
- Screen reader support through semantic markup
- Disabled state handling
- Touch target optimization (minimum 44px height)

### Testing

Use the `testID` prop for automated testing:

```tsx
<SettingsRow
  title="Notifications"
  testID="settings-notifications-row"
  onPress={handleNotifications}
/>

// In your test file
const notificationRow = getByTestId('settings-notifications-row');
fireEvent.press(notificationRow);
```

## Best Practices

1. **Consistent Icons**: Use the same icon size (22px recommended) and appropriate colors
2. **Clear Titles**: Keep titles concise and descriptive
3. **Helpful Subtitles**: Use subtitles to provide additional context
4. **Logical Grouping**: Group related settings in sections
5. **State Management**: Handle loading and error states appropriately
6. **Responsive Design**: Test on different screen sizes
7. **Performance**: Avoid complex calculations in render methods

## Integration with React Native Reusables

The SettingsRow component is designed to work seamlessly with other react-native-reusables components:

```tsx
import { Switch } from '~/components/ui/switch';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Alert, AlertDescription } from '~/components/ui/alert';

// All components follow the same design system and theming
```

## Migration from Basic Implementation

If you're migrating from a basic settings row implementation:

**Before:**
```tsx
const BasicRow = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);
```

**After:**
```tsx
<SettingsRow
  title={title}
  onPress={onPress}
  icon={<YourIcon size={22} />}
  subtitle="Additional context"
/>
```

## Contributing

When extending or modifying this component:

1. Maintain TypeScript interfaces
2. Follow existing naming conventions
3. Add appropriate tests
4. Update documentation
5. Consider accessibility implications
6. Test on both iOS and Android