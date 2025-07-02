import React, { useMemo } from "react";
import { View } from "react-native";
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

interface DropdownProps {
  readonly label: string;
  readonly value: string;
  readonly options: DropdownOption[];
  readonly onSelect: (value: string) => void;
  readonly placeholder?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly accessibilityLabel?: string;
}

export default function Dropdown({
  label,
  value,
  options,
  onSelect,
  placeholder = "Select an option",
  error,
  required = false,
  accessibilityLabel,
}: DropdownProps) {
  const selectedOption = options.find((o) => o.value === value);
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
