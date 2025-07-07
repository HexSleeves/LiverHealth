import Animated from "react-native-reanimated";
import { Text } from "~/components/ui/text";
import { AlertCircle } from "~/lib/icons";
import { animationPresets } from "../animations";

export default function AuthError({ children }: { children: React.ReactNode }) {
	return (
		<Animated.View
			entering={animationPresets.errorMessage}
			className="flex-row items-start gap-x-3 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl"
		>
			<AlertCircle size={20} className="text-red-500 mt-0.5" />
			<Text className="text-red-500 text-sm flex-1 font-medium">
				{children}
			</Text>
		</Animated.View>
	);
}
