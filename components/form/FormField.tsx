import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Eye, EyeOff, AlertCircle } from "~/lib/icons";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

// Legacy interface for backward compatibility
interface LegacyFormFieldProps {
  readonly label: string;
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly placeholder?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly secureTextEntry?: boolean;
  readonly keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  readonly autoCapitalize?: "none" | "sentences" | "words" | "characters";
  readonly multiline?: boolean;
  readonly numberOfLines?: number;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
}

// New interface for react-hook-form integration
interface ReactHookFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  readonly control: Control<TFieldValues>;
  readonly name: TName;
  readonly label: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly secureTextEntry?: boolean;
  readonly keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  readonly autoCapitalize?: "none" | "sentences" | "words" | "characters";
  readonly multiline?: boolean;
  readonly numberOfLines?: number;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly error?: FieldError;
}

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = LegacyFormFieldProps | ReactHookFormFieldProps<TFieldValues, TName>;

// Type guard to check if props are for react-hook-form
function isReactHookFormProps<TFieldValues extends FieldValues>(
  props: FormFieldProps<TFieldValues>
): props is ReactHookFormFieldProps<TFieldValues> {
  return "control" in props && "name" in props;
}

export default function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>) {
  const [isSecureTextVisible, setIsSecureTextVisible] = useState(false);

  const toggleSecureText = () => {
    setIsSecureTextVisible(!isSecureTextVisible);
  };

  // If using react-hook-form
  if (isReactHookFormProps(props)) {
    const {
      control,
      name,
      label,
      placeholder,
      required = false,
      secureTextEntry = false,
      keyboardType = "default",
      autoCapitalize = "sentences",
      multiline = false,
      numberOfLines = 1,
      accessibilityLabel,
      accessibilityHint,
      error,
    } = props;

    return (
      <View className="mb-5">
        <Text className="text-base font-medium text-foreground mb-2">
          {label}
          {required && (
            <Text className="text-base font-medium text-medical-critical">
              {" "}
              *
            </Text>
          )}
        </Text>

        <View className="relative">
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                className={cn(
                  error ? "border-medical-critical" : "focus:border-health-500",
                  multiline && "min-h-[80px] py-3"
                )}
                value={value || ""}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry && !isSecureTextVisible}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                multiline={multiline}
                numberOfLines={numberOfLines}
                accessibilityLabel={accessibilityLabel ?? label}
                accessibilityHint={accessibilityHint}
              />
            )}
          />

          {secureTextEntry && (
            <TouchableOpacity
              className="absolute right-3 top-3 p-1"
              onPress={toggleSecureText}
              accessibilityLabel={
                isSecureTextVisible ? "Hide password" : "Show password"
              }
            >
              {isSecureTextVisible ? (
                <EyeOff size={20} className="text-muted-foreground" />
              ) : (
                <Eye size={20} className="text-muted-foreground" />
              )}
            </TouchableOpacity>
          )}
        </View>

        {error && (
          <View className="flex-row items-center mt-2 p-2 bg-medical-critical-light rounded-md">
            <AlertCircle size={16} className="text-medical-critical" />
            <Text className="text-sm text-medical-critical ml-1.5 flex-1">
              {error.message}
            </Text>
          </View>
        )}
      </View>
    );
  }

  // Legacy usage with manual state management
  const {
    label,
    value,
    onChangeText,
    placeholder,
    error,
    required = false,
    secureTextEntry = false,
    keyboardType = "default",
    autoCapitalize = "sentences",
    multiline = false,
    numberOfLines = 1,
    accessibilityLabel,
    accessibilityHint,
  } = props;

  return (
    <View className="mb-5">
      <Text className="text-base font-medium text-foreground mb-2">
        {label}
        {required && (
          <Text className="text-base font-medium text-medical-critical">
            {" "}
            *
          </Text>
        )}
      </Text>

      <View className="relative">
        <Input
          className={cn(
            error ? "border-medical-critical" : "focus:border-health-500",
            multiline && "min-h-[80px] py-3"
          )}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isSecureTextVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityHint={accessibilityHint}
        />

        {secureTextEntry && (
          <TouchableOpacity
            className="absolute right-3 top-3 p-1"
            onPress={toggleSecureText}
            accessibilityLabel={
              isSecureTextVisible ? "Hide password" : "Show password"
            }
          >
            {isSecureTextVisible ? (
              <EyeOff size={20} className="text-muted-foreground" />
            ) : (
              <Eye size={20} className="text-muted-foreground" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <View className="flex-row items-center mt-2 p-2 bg-medical-critical-light rounded-md">
          <AlertCircle size={16} className="text-medical-critical" />
          <Text className="text-sm text-medical-critical ml-1.5 flex-1">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
