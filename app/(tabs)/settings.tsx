import * as React from "react";
import { View, ScrollView, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";
import { Switch } from "~/components/ui/switch";
import { SettingsRow } from "~/components/settings-row";
import { useColorScheme } from "~/lib/useColorScheme";
import { useOnboardingStatus } from "~/hooks/useOnboardingStatus";
import { router } from "expo-router";

// Icons
import { CircleUserRound } from "~/lib/icons/CircleUserRound";
import { Palette } from "~/lib/icons/Palette";
import { Bell } from "~/lib/icons/Bell";
import { Shield } from "~/lib/icons/Shield";
import { Database } from "~/lib/icons/Database";
import { FileText } from "~/lib/icons/FileText";
import { HelpCircle } from "~/lib/icons/HelpCircle";
import { Star } from "~/lib/icons/Star";
import { Info } from "~/lib/icons/Info";

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function SettingsSection({
  title,
  children,
  className = "",
}: SettingsSectionProps) {
  return (
    <View className={`mb-6 ${className}`}>
      <Text className="font-semibold text-lg text-foreground mb-3 px-4">
        {title}
      </Text>
      <View className="bg-card rounded-xl overflow-hidden shadow-md border border-border">
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  const { resetOnboarding } = useOnboardingStatus();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [reminderNotifications, setReminderNotifications] =
    React.useState(true);
  const [dataBackup, setDataBackup] = React.useState(false);
  const [biometricAuth, setBiometricAuth] = React.useState(false);

  // Handlers
  const handleProfilePress = () => {
    Alert.alert(
      "Profile Settings",
      "Profile management will be available in a future update.",
      [{ text: "OK" }]
    );
  };

  const handleThemePress = () => {
    Alert.alert("Theme Settings", "Choose your preferred app appearance", [
      { text: "Cancel", style: "cancel" },
      { text: "Light", onPress: () => setColorScheme("light") },
      { text: "Dark", onPress: () => setColorScheme("dark") },
      { text: "System", onPress: () => setColorScheme("system") },
    ]);
  };

  const handleExportData = () => {
    Alert.alert(
      "Export Data",
      "Export your health data as a PDF report or CSV file. This feature helps you share information with your healthcare provider.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Export PDF", onPress: () => console.log("Export PDF") },
        { text: "Export CSV", onPress: () => console.log("Export CSV") },
      ]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      "Privacy Policy",
      "Your privacy is our top priority. This app follows HIPAA compliance guidelines:\n\n• Health data is encrypted and stored locally\n• No personal information shared without consent\n• You control your data at all times\n• Regular security audits performed",
      [{ text: "OK" }]
    );
  };

  const handleDataManagement = () => {
    Alert.alert(
      "Data Management",
      "Manage your health data storage and backup preferences.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "View Storage Info",
          onPress: () => console.log("Storage info"),
        },
        { text: "Clear Cache", onPress: () => console.log("Clear cache") },
      ]
    );
  };

  const handleHelp = () => {
    Alert.alert(
      "Help & Support",
      "Get help with using the app or contact our support team.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "FAQ", onPress: () => console.log("Open FAQ") },
        {
          text: "Contact Support",
          onPress: () => Linking.openURL("mailto:support@liverhealth.app"),
        },
      ]
    );
  };

  const handleRateApp = () => {
    Alert.alert(
      "Rate Our App",
      "Help us improve by rating the app in your app store.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Rate App", onPress: () => console.log("Open app store") },
      ]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About MyLiver App",
      "Version 1.0.0\n\nA comprehensive liver health tracking application designed to help you monitor and improve your liver wellness.\n\nDeveloped with care for your health.",
      [{ text: "OK" }]
    );
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      "Reset Onboarding",
      "This will reset the onboarding flow and you'll see the welcome screen next time you open the app. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            await resetOnboarding();
            Alert.alert("Success", "Onboarding has been reset. The app will restart.", [
              { text: "OK", onPress: () => router.replace("/") }
            ]);
          },
        },
      ]
    );
  };

  const handleTestOnboarding = () => {
    router.push("/(onboarding)/welcome");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <View className="px-4 pt-4 pb-8">
          <Text className="font-bold text-3xl text-foreground mb-2">
            Settings
          </Text>
          <Text className="font-normal text-base text-muted-foreground leading-relaxed">
            Customize your app experience
          </Text>
        </View>

        {/* Profile Section */}
        <SettingsSection title="Account">
          <SettingsRow
            icon={<CircleUserRound size={24} className="text-primary" />}
            title="Profile"
            subtitle="Manage your personal information"
            onPress={handleProfilePress}
          />
        </SettingsSection>

        {/* Appearance Section */}
        <SettingsSection title="Appearance">
          <SettingsRow
            icon={<Palette size={24} className="text-blue-500" />}
            title="Theme"
            subtitle={`Currently using ${
              isDarkColorScheme ? "dark" : "light"
            } theme`}
            onPress={handleThemePress}
            showBorder={false}
          />
        </SettingsSection>

        {/* Notifications Section */}
        <SettingsSection title="Notifications">
          <SettingsRow
            icon={<Bell size={24} className="text-orange-500" />}
            title="Push Notifications"
            subtitle="Receive important health reminders"
            rightElement={
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            }
            showChevron={false}
          />
          <SettingsRow
            icon={<Bell size={24} className="text-orange-400" />}
            title="Medication Reminders"
            subtitle="Get notified about medications"
            rightElement={
              <Switch
                checked={reminderNotifications}
                onCheckedChange={setReminderNotifications}
                disabled={!notificationsEnabled}
              />
            }
            showChevron={false}
            showBorder={false}
          />
        </SettingsSection>

        {/* Privacy & Security Section */}
        <SettingsSection title="Privacy & Security">
          <SettingsRow
            icon={<Shield size={24} className="text-green-500" />}
            title="Privacy Policy"
            subtitle="Learn how we protect your data"
            onPress={handlePrivacyPolicy}
          />
          <SettingsRow
            icon={<Shield size={24} className="text-green-600" />}
            title="Biometric Authentication"
            subtitle="Use fingerprint or face ID"
            rightElement={
              <Switch
                checked={biometricAuth}
                onCheckedChange={setBiometricAuth}
              />
            }
            showChevron={false}
            showBorder={false}
          />
        </SettingsSection>

        {/* Data Management Section */}
        <SettingsSection title="Data Management">
          <SettingsRow
            icon={<Database size={24} className="text-purple-500" />}
            title="Data Storage"
            subtitle="Manage your health data"
            onPress={handleDataManagement}
          />
          <SettingsRow
            icon={<FileText size={24} className="text-blue-600" />}
            title="Export Data"
            subtitle="Download your health reports"
            onPress={handleExportData}
          />
          <SettingsRow
            icon={<Database size={24} className="text-purple-400" />}
            title="Automatic Backup"
            subtitle="Backup data to secure cloud storage"
            rightElement={
              <Switch checked={dataBackup} onCheckedChange={setDataBackup} />
            }
            showChevron={false}
            showBorder={false}
          />
        </SettingsSection>

        {/* Support Section */}
        <SettingsSection title="Support">
          <SettingsRow
            icon={<HelpCircle size={24} className="text-blue-500" />}
            title="Help & Support"
            subtitle="Get help with using the app"
            onPress={handleHelp}
          />
          <SettingsRow
            icon={<Star size={24} className="text-yellow-500" />}
            title="Rate Our App"
            subtitle="Help us improve with your feedback"
            onPress={handleRateApp}
            showBorder={false}
          />
        </SettingsSection>

        {/* About Section */}
        <SettingsSection title="About">
          <SettingsRow
            icon={<Info size={24} className="text-gray-500" />}
            title="About MyLiver App"
            subtitle="Version, terms, and app information"
            onPress={handleAbout}
            showBorder={false}
          />
        </SettingsSection>

        {/* Development Tools - Only show in development */}
        {__DEV__ && (
          <SettingsSection title="Development Tools" className="border-dashed border-2 border-muted">
            <SettingsRow
              icon={<Info size={24} className="text-blue-500" />}
              title="Test Onboarding"
              subtitle="Preview the welcome and onboarding flow"
              onPress={handleTestOnboarding}
            />
            <SettingsRow
              icon={<Info size={24} className="text-red-500" />}
              title="Reset Onboarding"
              subtitle="Clear onboarding status for testing"
              onPress={handleResetOnboarding}
              showBorder={false}
            />
          </SettingsSection>
        )}

        {/* Footer */}
        <View className="px-4 pt-6">
          <Text className="text-center text-sm text-muted-foreground">
            Made with ❤️ for your liver health
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
