import * as React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '~/components/ui/text';
import { Switch } from '~/components/ui/switch';
import { SettingsRow } from '~/components/ui/settings-row';
import { H1, H2, Muted } from '~/components/ui/typography';

// Icons
import { Bell } from '~/lib/icons/Bell';
import { Palette } from '~/lib/icons/Palette';
import { Shield } from '~/lib/icons/Shield';
import { Database } from '~/lib/icons/Database';
import { HelpCircle } from '~/lib/icons/HelpCircle';
import { Star } from '~/lib/icons/Star';
import { CircleUserRound } from '~/lib/icons/CircleUserRound';
import { Settings } from '~/lib/icons/Settings';
import { Info } from '~/lib/icons/Info';
import { FileText } from '~/lib/icons/FileText';

interface ShowcaseSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function ShowcaseSection({ title, description, children }: ShowcaseSectionProps) {
  return (
    <View className="mb-8">
      <H2 className="text-foreground mb-2">{title}</H2>
      {description && (
        <Muted className="mb-4 px-4">{description}</Muted>
      )}
      <View className="bg-card rounded-xl overflow-hidden shadow-sm border border-border">
        {children}
      </View>
    </View>
  );
}

export function SettingsRowShowcase() {
  // State for interactive examples
  const [pushNotifications, setPushNotifications] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [biometricAuth, setBiometricAuth] = React.useState(true);
  const [autoBackup, setAutoBackup] = React.useState(false);

  // Handlers for navigation examples
  const handleNavigation = (screen: string) => {
    Alert.alert('Navigation', `Would navigate to: ${screen}`, [{ text: 'OK' }]);
  };

  const handleAction = (action: string) => {
    Alert.alert('Action', `Performed action: ${action}`, [{ text: 'OK' }]);
  };

  const handleThemeSelection = () => {
    Alert.alert('Theme Selection', 'Choose your preferred theme', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Light', onPress: () => setDarkMode(false) },
      { text: 'Dark', onPress: () => setDarkMode(true) },
      { text: 'System', onPress: () => console.log('System theme') },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
      >
        {/* Header */}
        <View className="mb-8">
          <H1 className="text-foreground mb-2">SettingsRow Showcase</H1>
          <Muted className="text-base">
            Comprehensive examples of the SettingsRow component with various configurations and use cases.
          </Muted>
        </View>

        {/* Basic Navigation Rows */}
        <ShowcaseSection
          title="Navigation Rows"
          description="Basic settings rows that navigate to other screens when pressed"
        >
          <SettingsRow
            icon={<CircleUserRound size={22} className="text-primary" />}
            title="Profile Settings"
            subtitle="Manage your personal information"
            onPress={() => handleNavigation('Profile')}
          />
          <SettingsRow
            icon={<Settings size={22} className="text-gray-500" />}
            title="General Preferences"
            subtitle="App behavior and default settings"
            onPress={() => handleNavigation('General')}
          />
          <SettingsRow
            icon={<Shield size={22} className="text-green-500" />}
            title="Privacy & Security"
            subtitle="Control your data and security settings"
            onPress={() => handleNavigation('Privacy')}
            showBorder={false}
          />
        </ShowcaseSection>

        {/* Toggle/Switch Examples */}
        <ShowcaseSection
          title="Interactive Toggles"
          description="Settings rows with switches and other interactive elements"
        >
          <SettingsRow
            icon={<Bell size={22} className="text-orange-500" />}
            title="Push Notifications"
            subtitle="Receive important app notifications"
            rightElement={
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            }
            showChevron={false}
          />
          <SettingsRow
            icon={<Bell size={22} className="text-orange-400" />}
            title="Email Notifications"
            subtitle="Get updates via email"
            rightElement={
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            }
            showChevron={false}
          />
          <SettingsRow
            icon={<Database size={22} className="text-purple-500" />}
            title="Automatic Backup"
            subtitle="Backup data to cloud storage"
            rightElement={
              <Switch
                checked={autoBackup}
                onCheckedChange={setAutoBackup}
              />
            }
            showChevron={false}
            showBorder={false}
          />
        </ShowcaseSection>

        {/* Custom Right Elements */}
        <ShowcaseSection
          title="Custom Right Elements"
          description="Settings rows with custom elements like text, badges, or complex components"
        >
          <SettingsRow
            icon={<Palette size={22} className="text-blue-500" />}
            title="App Theme"
            subtitle="Choose your preferred appearance"
            rightElement={
              <Text className="text-muted-foreground font-medium">
                {darkMode ? 'Dark' : 'Light'}
              </Text>
            }
            onPress={handleThemeSelection}
          />
          <SettingsRow
            icon={<Database size={22} className="text-purple-400" />}
            title="Storage Used"
            subtitle="Current app data usage"
            rightElement={
              <Text className="text-muted-foreground font-medium">
                24.8 MB
              </Text>
            }
            onPress={() => handleAction('View Storage Details')}
          />
          <SettingsRow
            icon={<Star size={22} className="text-yellow-500" />}
            title="App Version"
            subtitle="Current version information"
            rightElement={
              <View className="bg-primary/10 px-2 py-1 rounded-full">
                <Text className="text-primary text-xs font-medium">
                  v1.0.0
                </Text>
              </View>
            }
            onPress={() => handleAction('Check for Updates')}
            showBorder={false}
          />
        </ShowcaseSection>

        {/* Different States */}
        <ShowcaseSection
          title="Different States"
          description="Examples showing disabled, loading, and special states"
        >
          <SettingsRow
            icon={<Shield size={22} className="text-green-600" />}
            title="Biometric Authentication"
            subtitle="Use fingerprint or face recognition"
            rightElement={
              <Switch
                checked={biometricAuth}
                onCheckedChange={setBiometricAuth}
              />
            }
            showChevron={false}
          />
          <SettingsRow
            icon={<FileText size={22} className="text-gray-400" />}
            title="Advanced Analytics"
            subtitle="Coming in the next update"
            disabled={true}
            onPress={() => {}} // Won't be called when disabled
          />
          <SettingsRow
            icon={<Settings size={22} className="text-blue-500" />}
            title="Beta Features"
            subtitle="Experimental features for testing"
            rightElement={
              <View className="bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                <Text className="text-orange-600 dark:text-orange-400 text-xs font-medium">
                  BETA
                </Text>
              </View>
            }
            onPress={() => handleNavigation('Beta Features')}
            showBorder={false}
          />
        </ShowcaseSection>

        {/* Action Rows */}
        <ShowcaseSection
          title="Action Rows"
          description="Settings rows that perform immediate actions"
        >
          <SettingsRow
            icon={<FileText size={22} className="text-blue-600" />}
            title="Export Data"
            subtitle="Download your data as PDF or CSV"
            onPress={() => handleAction('Export Data')}
          />
          <SettingsRow
            icon={<Database size={22} className="text-purple-600" />}
            title="Clear Cache"
            subtitle="Free up storage space"
            onPress={() => handleAction('Clear Cache')}
          />
          <SettingsRow
            icon={<HelpCircle size={22} className="text-blue-500" />}
            title="Contact Support"
            subtitle="Get help from our support team"
            onPress={() => handleAction('Contact Support')}
            showBorder={false}
          />
        </ShowcaseSection>

        {/* Without Icons */}
        <ShowcaseSection
          title="Text-Only Rows"
          description="Settings rows without icons for minimalist designs"
        >
          <SettingsRow
            title="Terms of Service"
            subtitle="Read our terms and conditions"
            onPress={() => handleNavigation('Terms')}
          />
          <SettingsRow
            title="Privacy Policy"
            subtitle="Learn about our privacy practices"
            onPress={() => handleNavigation('Privacy Policy')}
          />
          <SettingsRow
            title="Licenses"
            subtitle="Open source licenses and attributions"
            onPress={() => handleNavigation('Licenses')}
            showBorder={false}
          />
        </ShowcaseSection>

        {/* No Chevron Examples */}
        <ShowcaseSection
          title="Information Rows"
          description="Non-interactive rows for displaying information"
        >
          <SettingsRow
            icon={<Info size={22} className="text-blue-500" />}
            title="App Information"
            subtitle="Version 1.0.0 • Build 100"
            showChevron={false}
          />
          <SettingsRow
            icon={<Database size={22} className="text-purple-500" />}
            title="Last Backup"
            subtitle="2 hours ago"
            rightElement={
              <Text className="text-green-600 font-medium text-sm">
                ✓ Success
              </Text>
            }
            showChevron={false}
          />
          <SettingsRow
            icon={<Star size={22} className="text-yellow-500" />}
            title="App Rating"
            subtitle="Help others discover this app"
            rightElement={
              <View className="flex-row">
                {[...Array(5)].map((_, i) => (
                  <Text key={i} className="text-yellow-400 text-lg">
                    ★
                  </Text>
                ))}
              </View>
            }
            showChevron={false}
            showBorder={false}
          />
        </ShowcaseSection>

        {/* Footer */}
        <View className="mt-8 px-4">
          <Muted className="text-center">
            This showcase demonstrates various configurations of the SettingsRow component.
            Each example shows different props, states, and styling approaches.
          </Muted>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SettingsRowShowcase;
