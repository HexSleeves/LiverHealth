import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

interface ErrorMessageProps {
	message: string;
	className?: string;
	variant?: "inline" | "card";
}

export function ErrorMessage({
	message,
	className,
	variant = "card",
}: ErrorMessageProps) {
	if (variant === "inline") {
		return (
			<Text className={cn("text-sm text-red-500", className)}>{message}</Text>
		);
	}

	return (
		<View
			className={cn(
				"p-4 bg-red-50 border border-red-200 rounded-md",
				className,
			)}
		>
			<Text className="text-sm text-red-500 text-center">{message}</Text>
		</View>
	);
}
