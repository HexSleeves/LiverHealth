import { useRouter } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";

interface GoBackButtonProps {
	readonly label: string;
	readonly onPress?: () => void;
}

export function GoBackButton({
	label = "Go Back",
	onPress,
}: GoBackButtonProps) {
	const router = useRouter();

	return (
		<Button
			variant="ghost"
			className="p-0 h-auto"
			onPress={onPress ?? router.back}
		>
			<Text className="text-blue-500 text-sm font-semibold">{label}</Text>
		</Button>
	);
}
