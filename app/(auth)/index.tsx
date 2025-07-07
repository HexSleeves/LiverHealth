import { Redirect } from "expo-router";
import { AnimatedLoadingSpinner } from "~/components/animations";
import { useClerkAuth } from "~/hooks/auth/useClerkAuth";

export default function AuthIndex() {
	const { isSignedIn, isLoading } = useClerkAuth();

	if (isSignedIn) {
		return <Redirect href="/(tabs)" />;
	}

	if (isLoading) {
		return <AnimatedLoadingSpinner active={true} size="lg" />;
	}

	return <Redirect href="/(auth)/sign-in" />;
}
