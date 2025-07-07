import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { Platform } from "react-native";

export const useWarmUpBrowser = () => {
	useEffect(() => {
		// Only warm up browser on native platforms (iOS/Android)
		// WebBrowser.warmUpAsync is not available on web
		if (Platform.OS !== "web") {
			// Preloads the browser for Android devices to reduce authentication load time
			// See: https://docs.expo.dev/guides/authentication/#improving-user-experience
			void WebBrowser.warmUpAsync();
			return () => {
				// Cleanup: closes browser when component unmounts
				void WebBrowser.coolDownAsync();
			};
		}
	}, []);
};
