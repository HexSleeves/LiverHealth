import { useClerk } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

export const SignOutButton = () => {
	// Use `useClerk()` to access the `signOut()` function
	const { signOut } = useClerk();
	const router = useRouter();

	const handleSignOut = async () => {
		try {
			await signOut();

			// Redirect to your desired page
			router.replace("/(auth)/sign-in");
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<Button
			onPress={handleSignOut}
			variant="outline"
			className="border-blue-200 hover:bg-blue-50"
		>
			<Text className="text-blue-600 font-medium">Sign out</Text>
		</Button>
	);
};
