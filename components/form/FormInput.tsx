import React from "react";
import { TextInputProps, View } from "react-native";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { AlertCircle } from "~/lib/icons";

interface FormInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  placeholder?: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?: TextInputProps["autoComplete"];
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  error?: FieldError;
  disabled?: boolean;
  required?: boolean;
}

export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
  autoComplete,
  secureTextEntry = false,
  multiline = false,
  numberOfLines,
  error,
  disabled = false,
  required = false,
}: FormInputProps<TFieldValues, TName>) {
  return (
    <View className="space-y-2">
      {label && (
        <Label htmlFor={String(name)}>
          {label}
          {required && <Text className="text-destructive">*</Text>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            id={String(name)}
            placeholder={placeholder}
            value={value || ""}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={numberOfLines}
            editable={!disabled}
            className={error ? "border-destructive" : ""}
          />
        )}
      />
      {error && (
        <View className="flex-row items-start space-x-2">
          <AlertCircle size={14} className="text-destructive mt-0.5" />
          <Text className="text-destructive text-sm flex-1">
            {error.message}
          </Text>
        </View>
      )}
    </View>
  );
}
