import "~/global.css";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
	DarkTheme,
	DefaultTheme,
	type Theme,
	ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Appearance, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { NAV_THEME } from "~/lib/constants";
import { ClerkProvider } from "~/lib/providers/ClerkProvider";
import { ConvexProvider } from "~/lib/providers/ConvexProvider";
import { useColorScheme } from "~/lib/useColorScheme";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// Set the animation options. This is optional.
SplashScreen.setOptions({
	duration: 1000,
	fade: true,
});

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

function noop() {}

const usePlatformSpecificSetup = Platform.select({
	default: noop,
	web: useSetWebBackgroundClassName,
	android: useSetAndroidNavigationBar,
});

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "index",
};

export default function RootLayout() {
	usePlatformSpecificSetup();
	const { isDarkColorScheme } = useColorScheme();
	const [appIsReady, setAppIsReady] = useState(true);

	useEffect(() => {
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

	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	const screenOptions = {
		headerBackTitle: "Back",
		// headerTitle: HeaderTitle,
	};

	return (
		<ClerkProvider>
			<ConvexProvider>
				<ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
					<StatusBar style={isDarkColorScheme ? "light" : "dark"} />
					<GestureHandlerRootView
						style={{ flex: 1 }}
						onLayout={onLayoutRootView}
					>
						<BottomSheetModalProvider>
							<Stack screenOptions={screenOptions}>
								<Stack.Screen
									name="index"
									options={{
										headerShown: false,
									}}
								/>
								<Stack.Screen
									name="(auth)"
									options={{
										headerShown: false,
										gestureEnabled: false, // Prevent back navigation in auth flow
									}}
								/>
								<Stack.Screen
									name="(tabs)"
									options={{
										headerShown: false,
										gestureEnabled: false, // Prevent back navigation to auth
									}}
								/>
								{/* <Stack.Screen name="onboarding" /> */}
							</Stack>
							<PortalHost />
						</BottomSheetModalProvider>
					</GestureHandlerRootView>
				</ThemeProvider>
			</ConvexProvider>
		</ClerkProvider>
	);
}

const useIsomorphicLayoutEffect =
	Platform.OS === "web" && typeof window === "undefined"
		? useEffect
		: useLayoutEffect;

function useSetWebBackgroundClassName() {
	useIsomorphicLayoutEffect(() => {
		if (Platform.OS !== "web") {
			return;
		}

		// Adds the background color to the html element to prevent white background on overscroll.
		document.documentElement.classList.add("bg-background");
	}, []);
}

function useSetAndroidNavigationBar() {
	useLayoutEffect(() => {
		setAndroidNavigationBar(Appearance.getColorScheme() ?? "light");
	}, []);
}

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
		}, 100);
	});
}

async function preloadImages() {
	// Simulate preloading critical images
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("Images preloaded");
			resolve(true);
		}, 100);
	});
}

async function initializeLocalStorage() {
	// Simulate initializing local storage/database
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("Local storage initialized");
			resolve(true);
		}, 100);
	});
}

async function loadUserPreferences() {
	// Simulate loading user preferences and settings
	return new Promise((resolve) => {
		setTimeout(() => {
			console.log("User preferences loaded");
			resolve(true);
		}, 100);
	});
}
