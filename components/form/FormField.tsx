import { useState } from "react";
import {
	type Control,
	Controller,
	type FieldError,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";
import {
	type KeyboardTypeOptions,
	type TextInputProps,
	TouchableOpacity,
	View,
} from "react-native";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { AlertCircle, Eye, EyeOff } from "~/lib/icons";
import { cn } from "~/lib/utils";

/**
 * FormField Component - Updated with blue theming and inline icons
 *
 * Features:
 * - White background with rounded corners and shadow
 * - Optional inline icons (leading icon)
 * - Built-in password visibility toggle
 * - Simplified error display
 * - Optional labels (showLabel prop)
 * - Blue theming throughout
 *
 * Example usage:
 * ```tsx
 * <FormField
 *   control={control}
 *   name="email"
 *   placeholder="Email"
 *   icon={<Heart size={20} className="text-gray-400" />}
 *   error={errors.email}
 * />
 * ```
 */

interface FormFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<TextInputProps, "value" | "onChangeText"> {
	readonly accessibilityHint?: string;
	readonly accessibilityLabel?: string;
	readonly autoCapitalize?: "none" | "sentences" | "words" | "characters";
	readonly control: Control<TFieldValues>;
	readonly defaultValue?: string;
	readonly error?: FieldError;
	readonly icon?: React.ReactNode;
	readonly keyboardType?: KeyboardTypeOptions;
	readonly label?: string;
	readonly multiline?: boolean;
	readonly name: TName;
	readonly numberOfLines?: number;
	readonly placeholder?: string;
	readonly required?: boolean;
	readonly secureTextEntry?: boolean;
	readonly showLabel?: boolean;
	readonly textContentType?: TextInputProps["textContentType"];
}

export default function FormField<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>) {
	const [isSecureTextVisible, setIsSecureTextVisible] = useState(false);

	const toggleSecureText = () => {
		setIsSecureTextVisible(!isSecureTextVisible);
	};

	const {
		name,
		label,
		error,
		control,
		placeholder,
		defaultValue,
		icon,
		required = false,
		multiline = false,
		numberOfLines = 1,
		accessibilityHint,
		accessibilityLabel,
		secureTextEntry = false,
		keyboardType = "default",
		autoCapitalize = "sentences",
		showLabel = false,
		className,
		textContentType,
		...restProps
	} = props;

	return (
		<View className="mb-3">
			{/* Optional Label */}
			{showLabel && label && (
				<Text className="text-base font-medium text-gray-800 mb-2">
					{label}
					{required && (
						<Text className="text-base font-medium text-red-500"> *</Text>
					)}
				</Text>
			)}

			{/* Input Container */}
			<View
				className={cn(
					"flex-row items-center bg-white rounded-xl px-4 h-12 border-2 border-gray-200 web:shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100",
					error &&
						"border-red-300 focus-within:border-red-400 focus-within:ring-red-100",
					multiline && "items-start h-auto py-3",
					className,
				)}
			>
				{/* Leading Icon */}
				{icon && <View className="mr-3">{icon}</View>}

				{/* Input Field */}
				<Controller
					control={control}
					name={name}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							className={cn(
								"flex-1 text-base text-gray-800 border-0 bg-transparent p-0",
								multiline && "min-h-[60px]",
							)}
							placeholder={placeholder}
							placeholderTextColor="#9CA3AF"
							value={value || ""}
							onChangeText={onChange}
							onBlur={onBlur}
							secureTextEntry={secureTextEntry && !isSecureTextVisible}
							keyboardType={keyboardType}
							autoCapitalize={autoCapitalize}
							multiline={multiline}
							numberOfLines={numberOfLines}
							accessibilityLabel={accessibilityLabel ?? label}
							accessibilityHint={accessibilityHint}
							defaultValue={defaultValue}
							textContentType={textContentType}
							{...restProps}
						/>
					)}
				/>

				{/* Password Toggle */}
				{secureTextEntry && (
					<TouchableOpacity
						className="p-1 ml-2"
						onPress={toggleSecureText}
						accessibilityLabel={
							isSecureTextVisible ? "Hide password" : "Show password"
						}
					>
						{isSecureTextVisible ? (
							<Eye size={20} className="text-gray-400" />
						) : (
							<EyeOff size={20} className="text-gray-400" />
						)}
					</TouchableOpacity>
				)}
			</View>

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
