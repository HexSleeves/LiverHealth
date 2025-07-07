import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg";
	className?: string;
	text?: string;
}

export function LoadingSpinner({
	size = "md",
	className,
	text,
}: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-6 h-6",
		lg: "w-8 h-8",
	};

	return (
		<View className={cn("items-center justify-center", className)}>
			<View
				className={cn(
					"border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin",
					sizeClasses[size],
				)}
			/>

			{text && (
				<Text className="text-sm text-muted-foreground mt-2">{text}</Text>
			)}
		</View>
	);
}
