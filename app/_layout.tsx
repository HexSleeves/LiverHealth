import "~/global.css";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Appearance, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeToggle } from "~/components/ThemeToggle";
import { Text } from "~/components/ui/text";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { UserProvider } from "~/lib/context/UserContext";

// Prevent the splash screen from auto-hiding before resource loading is complete
SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const usePlatformSpecificSetup = Platform.select({
  web: useSetWebBackgroundClassName,
  android: useSetAndroidNavigationBar,
  default: noop,
});

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

const HeaderTitle = ({ children }: { children: string }) => (
  <Text className="text-xl font-semibold">{toOptions(children)}</Text>
);

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  usePlatformSpecificSetup();
  const { isDarkColorScheme } = useColorScheme();

  React.useEffect(() => {
    async function prepare() {
      try {
        // Pre-load resources here
        // For example: fonts, images, API calls, etc.
        await loadResources();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const screenOptions = {
    headerBackTitle: "Back",
    headerRight: ThemeToggle,
    headerTitle: HeaderTitle,
  };

  return (
    <ConvexProvider client={convex}>
      <UserProvider>
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
          <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
          <GestureHandlerRootView
            style={{ flex: 1 }}
            onLayout={onLayoutRootView}
          >
            <BottomSheetModalProvider>
              <Stack initialRouteName="index" screenOptions={screenOptions}>
                <Stack.Screen
                  name="index"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="(onboarding)"
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="(auth)"
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="modal"
                  options={{
                    presentation: "modal",
                    title: "Modal",
                  }}
                />
              </Stack>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
          <PortalHost />
        </ThemeProvider>
      </UserProvider>
    </ConvexProvider>
  );
}

function toOptions(name: string) {
  const title = name
    .split("-")
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(" ");
  return title;
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

function useSetWebBackgroundClassName() {
  useIsomorphicLayoutEffect(() => {
    // Adds the background color to the html element to prevent white background on overscroll.
    document.documentElement.classList.add("bg-background");
  }, []);
}

function useSetAndroidNavigationBar() {
  React.useLayoutEffect(() => {
    setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
  }, []);
}

function noop() {}

// Function to load resources during splash screen
async function loadResources() {
  console.log("Loading app resources...");

  const promises = [
    // Simulate essential resource loading
    loadEssentialData(),
    preloadImages(),
    initializeLocalStorage(),
    loadUserPreferences(),
  ];

  await Promise.all(promises);
  console.log("All resources loaded successfully!");
}

// Individual resource loading functions
async function loadEssentialData() {
  // Simulate loading essential app data
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Essential data loaded");
      resolve(true);
    }, 800);
  });
}

async function preloadImages() {
  // Simulate preloading critical images
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Images preloaded");
      resolve(true);
    }, 600);
  });
}

async function initializeLocalStorage() {
  // Simulate initializing local storage/database
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Local storage initialized");
      resolve(true);
    }, 400);
  });
}

async function loadUserPreferences() {
  // Simulate loading user preferences and settings
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("User preferences loaded");
      resolve(true);
    }, 300);
  });
}
