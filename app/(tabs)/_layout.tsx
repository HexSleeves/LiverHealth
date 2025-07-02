import { Tabs } from "expo-router";
import { ModalToggle } from "~/components/ModalToggle";
import { ThemeToggle } from "~/components/ThemeToggle";
import { LayoutPanelLeft } from "~/lib/icons/LayoutPanelLeft";
import { Settings } from "~/lib/icons/Settings";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <LayoutPanelLeft color={color} size={size} />
          ),
          headerLeft: () => <ModalToggle />,
          headerRight: () => <ThemeToggle />,
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
      {/* <Tabs.Screen
        name="components"
        options={{
          title: "Components",
          tabBarIcon({ color, size }) {
            return <MenuSquare color={color} size={size} />;
          },
          headerRight: () => <ThemeToggle />,
        }}
      /> */}
    </Tabs>
  );
}
