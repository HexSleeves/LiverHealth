import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { useClerkAuth } from "~/hooks/auth/useClerkAuth";

export const SignOutButton = () => {
	const { signOut } = useClerkAuth();

	return (
		<Button
			onPress={signOut}
			variant="outline"
			className="border-blue-200 hover:bg-blue-50"
		>
			<Text className="text-blue-600 font-medium">Sign out</Text>
		</Button>
	);
};
