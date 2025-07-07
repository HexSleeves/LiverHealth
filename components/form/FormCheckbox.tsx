import {
	type Control,
	Controller,
	type FieldError,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import { View } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";
import { Text } from "~/components/ui/text";
import { AlertCircle } from "~/lib/icons";
import { cn } from "~/lib/utils";

/**
 * FormCheckbox Component - Controlled checkbox with bubbly styling
 *
 * Features:
 * - White background with rounded corners and shadow
 * - Built-in react-hook-form Controller integration
 * - Consistent styling with other form components
 * - Blue theming and bubbly feel
 * - Error display with icon
 * - Accessible touchable area
 *
 * Example usage:
 * ```tsx
 * <FormCheckbox
 *   control={control}
 *   name="acceptedTerms"
 *   label="I agree to the Terms of Service and Privacy Policy"
 *   error={errors.acceptedTerms}
 *   required
 * />
 * ```
 *
 * For rich text labels, you can also pass a custom label component:
 * ```tsx
 * <FormCheckbox
 *   control={control}
 *   name="acceptedTerms"
 *   label={
 *     <Text>
 *       I agree to the{" "}
 *       <Text className="text-blue-600 font-medium">Terms of Service</Text>
 *       {" "}and{" "}
 *       <Text className="text-blue-600 font-medium">Privacy Policy</Text>
 *     </Text>
 *   }
 *   error={errors.acceptedTerms}
 * />
 * ```
 */

interface FormCheckboxProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
	readonly control: Control<TFieldValues>;
	readonly name: TName;
	readonly label: string | React.ReactNode;
	readonly error?: FieldError;
	readonly required?: boolean;
	readonly disabled?: boolean;
	readonly className?: string;
	readonly labelClassName?: string;
	readonly accessibilityLabel?: string;
	readonly accessibilityHint?: string;
}

export default function FormCheckbox<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormCheckboxProps<TFieldValues, TName>) {
	const {
		control,
		name,
		label,
		error,
		required = false,
		disabled = false,
		className,
		labelClassName,
		accessibilityLabel,
		accessibilityHint,
	} = props;

	return (
		<View className={cn("mb-3", className)}>
			{/* Checkbox Container */}
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<View
						className={cn(
							"flex-row items-start gap-x-3 py-1",
							error &&
								"px-2 py-2 bg-red-50/30 rounded-lg border border-red-200",
							disabled && "opacity-50",
						)}
					>
						{/* Checkbox */}
						<Checkbox
							checked={!!value}
							onCheckedChange={onChange}
							className="mt-0.5"
							disabled={disabled}
							accessibilityLabel={
								accessibilityLabel ??
								(typeof label === "string" ? label : "Checkbox")
							}
							accessibilityHint={accessibilityHint}
						/>

						{/* Label */}
						<View className="flex-1">
							{typeof label === "string" ? (
								<Text
									className={cn(
										"text-sm text-gray-700 leading-5 font-medium",
										disabled && "text-gray-400",
										labelClassName,
									)}
								>
									{label}
									{required && (
										<Text className="text-red-500 font-medium"> *</Text>
									)}
								</Text>
							) : (
								<View className="flex-1">{label}</View>
							)}
						</View>
					</View>
				)}
			/>

			{/* Error Display */}
			{error && (
				<View className="flex-row items-center mt-2 px-2">
					<AlertCircle size={16} className="text-red-500" />
					<Text className="text-sm text-red-500 ml-1.5 flex-1">
						{error.message}
					</Text>
				</View>
			)}
		</View>
	);
}
