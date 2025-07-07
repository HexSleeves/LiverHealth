import { Redirect } from "expo-router";
import { useClerkAuth } from "~/hooks/auth/useClerkAuth";

export default function AuthIndex() {
	const { isSignedIn } = useClerkAuth();

	if (isSignedIn) {
		return <Redirect href="/(tabs)" />;
	}

	return <Redirect href="/(auth)/sign-in" />;
}
