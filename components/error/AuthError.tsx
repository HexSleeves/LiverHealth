import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { AlertCircle } from "~/lib/icons";

export default function AuthError({ children }: { children: React.ReactNode }) {
	return (
		<View className="flex-row items-start gap-x-2 p-3 bg-destructive-light border border-destructive/30 rounded-lg">
			<AlertCircle size={16} className="text-destructive mt-0.5" />
			<Text className="text-destructive text-sm flex-1 font-medium">
				{children}
			</Text>
		</View>
	);
}
