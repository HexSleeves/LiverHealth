import { useAuth } from "@clerk/clerk-expo";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import type * as React from "react";

interface ConvexProviderProps {
	children: React.ReactNode;
}

export function ConvexProvider({ children }: ConvexProviderProps) {
	const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;

	if (!convexUrl) {
		throw new Error(
			"Missing Convex URL. Please set EXPO_PUBLIC_CONVEX_URL in your .env",
		);
	}

	const convex = new ConvexReactClient(convexUrl);

	return (
		<ConvexProviderWithClerk client={convex} useAuth={useAuth}>
			{children}
		</ConvexProviderWithClerk>
	);
}

export default ConvexProvider;
