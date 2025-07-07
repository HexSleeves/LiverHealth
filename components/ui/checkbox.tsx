import * as CheckboxPrimitive from "@rn-primitives/checkbox";
import type * as React from "react";
import { Platform } from "react-native";
import { Check } from "~/lib/icons/Check";
import { cn } from "~/lib/utils";

function Checkbox({
	className,
	...props
}: CheckboxPrimitive.RootProps & {
	ref?: React.RefObject<CheckboxPrimitive.RootRef>;
}) {
	return (
		<CheckboxPrimitive.Root
			className={cn(
				"web:peer h-5 w-5 native:h-[22] native:w-[22] shrink-0 rounded-lg native:rounded-lg border-2 border-gray-300",
				"web:shadow-sm web:shadow-blue-500/10 web:transition-all web:duration-200",
				"web:hover:shadow-md web:hover:shadow-blue-500/20 web:hover:border-blue-400 web:hover:scale-105",
				"web:active:scale-95 web:active:shadow-sm",
				"web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-blue-500 web:focus-visible:ring-offset-2",
				"disabled:cursor-not-allowed disabled:opacity-50",
				props.checked &&
					"bg-blue-500 border-blue-500 web:shadow-md web:shadow-blue-500/30",
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				className={cn("items-center justify-center h-full w-full")}
			>
				<Check
					size={14}
					strokeWidth={Platform.OS === "web" ? 2.5 : 3.5}
					className="text-white"
				/>
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };
