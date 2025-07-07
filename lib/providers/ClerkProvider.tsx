import {
	ClerkLoaded,
	ClerkProvider as ExpoClerkProvider,
} from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

// Token cache implementation using Expo SecureStore
const tokenCache = {
	async getToken(key: string) {
		try {
			console.log(`Getting token for ${key}`);
			return SecureStore.getItemAsync(key);
		} catch (err) {
			console.error(err);
			return null;
		}
	},
	async saveToken(key: string, value: string) {
		try {
			console.log(`Saving token for ${key}`);
			return SecureStore.setItemAsync(key, value);
		} catch (err: unknown) {
			console.error(err);
			return;
		}
	},
};

interface ClerkProviderProps {
	children: React.ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
	const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

	if (!publishableKey) {
		throw new Error(
			"Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
		);
	}

	return (
		<ExpoClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
			<ClerkLoaded>{children}</ClerkLoaded>
		</ExpoClerkProvider>
	);
}

export default ClerkProvider;
