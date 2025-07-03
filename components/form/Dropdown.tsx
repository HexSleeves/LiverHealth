import React, { useMemo } from "react";
import { View } from "react-native";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { AlertCircle } from "~/lib/icons";
import { Text } from "~/components/ui/text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";

interface DropdownOption {
  value: string;
  label: string;
}

// Legacy interface for backward compatibility
interface LegacyDropdownProps {
  readonly label: string;
  readonly value: string;
  readonly options: DropdownOption[];
  readonly onSelect: (value: string) => void;
  readonly placeholder?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly accessibilityLabel?: string;
}

// New interface for react-hook-form integration
interface ReactHookFormDropdownProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  readonly control: Control<TFieldValues>;
  readonly name: TName;
  readonly label?: string;
  readonly options: DropdownOption[];
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly accessibilityLabel?: string;
  readonly error?: FieldError;
}

type DropdownProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = LegacyDropdownProps | ReactHookFormDropdownProps<TFieldValues, TName>;

// Type guard to check if props are for react-hook-form
function isReactHookFormProps<TFieldValues extends FieldValues>(
  props: DropdownProps<TFieldValues>
): props is ReactHookFormDropdownProps<TFieldValues> {
  return "control" in props && "name" in props;
}

export default function Dropdown<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: DropdownProps<TFieldValues, TName>) {
  // Always call hooks at the top level
  const isReactHookForm = isReactHookFormProps(props);

  // If using react-hook-form
  if (isReactHookForm) {
    const {
      control,
      name,
      label = "Select",
      options,
      placeholder = "Select an option",
      required = false,
      accessibilityLabel,
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

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => {
            const selectedOption = options.find((o) => o.value === value);
            const selectValue = value
              ? { value, label: selectedOption?.label ?? value }
              : undefined;

            return (
              <Select
                value={selectValue}
                onValueChange={(selected) => onChange(selected?.value || "")}
              >
                <SelectTrigger
                  className={cn(
                    "min-h-12",
                    error ? "border-medical-critical" : "border-input"
                  )}
                  aria-label={accessibilityLabel ?? label}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      label={option.label}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />

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

  // Legacy usage
  const {
    label,
    value,
    options,
    onSelect,
    placeholder = "Select an option",
    error,
    required = false,
    accessibilityLabel,
  } = props;

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );
  const selectValue = useMemo(() => {
    return value ? { value, label: selectedOption?.label ?? value } : undefined;
  }, [selectedOption?.label, value]);

  return (
    <View className="mb-5">
      <Text className="text-base font-medium text-foreground mb-2">
        {label}
        {required && (
          <Text className="text-base font-medium text-destructive"> *</Text>
        )}
      </Text>

      <Select
        value={selectValue}
        onValueChange={(option) => option && onSelect(option.value)}
      >
        <SelectTrigger
          className={cn(error ? "border-destructive" : "", "min-h-12")}
          accessibilityLabel={accessibilityLabel ?? `${label} dropdown`}
        >
          <SelectValue
            className="text-foreground native:text-lg"
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              label={option.label}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <View className="flex-row items-center mt-2">
          <AlertCircle size={16} className="text-destructive" />
          <Text className="text-sm text-destructive ml-1.5 flex-1">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}
