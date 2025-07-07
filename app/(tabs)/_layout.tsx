import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { HeaderTitle } from "~/components/HeaderTitle";
import { NAV_THEME } from "~/lib/constants";
import { Bell, Home, Settings } from "~/lib/icons";
import { useColorScheme } from "~/lib/useColorScheme";

export default function TabsLayout() {
	const { colorScheme } = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: NAV_THEME[colorScheme].primary,
				tabBarInactiveTintColor: "#6B7280",
				tabBarStyle: {
					backgroundColor: "white",
					height: Platform.OS === "ios" ? 90 : 65,
					paddingBottom: 0,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
				},
				tabBarItemStyle: {
					alignItems: "center",
					flexDirection: "row",
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Dashboard",
					tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
					// headerTitle: () => <HeaderTitle>health-dashboard</HeaderTitle>,
				}}
			/>

			<Tabs.Screen
				name="medication"
				options={{
					title: "Medication",
					tabBarIcon: ({ color, size }) => <Bell color={color} size={size} />,
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: "Settings",
					tabBarIcon: ({ color, size }) => (
						<Settings color={color} size={size} />
					),
				}}
			/>
		</Tabs>
	);
}
