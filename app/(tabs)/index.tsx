import { SignedIn, useUser } from "@clerk/clerk-expo";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignOutButton } from "~/components/SignOutButton";
import { Text } from "~/components/ui/text";

export default function DashboardScreen() {
	const { user } = useUser();
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		// Trigger data refresh
		setTimeout(() => setRefreshing(false), 1000);
	}, []);

	return (
		<SafeAreaView className="flex-1 bg-background">
			<ScrollView
				className="flex-1"
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<SignedIn>
					<Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
					<SignOutButton />
				</SignedIn>
			</ScrollView>
		</SafeAreaView>
	);
}
