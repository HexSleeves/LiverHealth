import React, { useState } from "react";
import { View, TouchableOpacity, Modal, ScrollView } from "react-native";
import { ChevronDown, Check, AlertCircle } from "~/lib/icons";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";

interface MultiSelectOption {
  readonly value: string;
  readonly label: string;
}

interface MultiSelectProps {
  readonly label: string;
  readonly values: string[];
  readonly options: MultiSelectOption[];
  readonly onSelectionChange: (values: string[]) => void;
  readonly placeholder?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly accessibilityLabel?: string;
}

export default function MultiSelect({
  label,
  values,
  options,
  onSelectionChange,
  placeholder = "Select options",
  error,
  required = false,
  accessibilityLabel,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptions = options.filter((option) =>
    values.includes(option.value)
  );

  const handleToggle = (optionValue: string) => {
    const newValues = values.includes(optionValue)
      ? values.filter((v) => v !== optionValue)
      : [...values, optionValue];
    onSelectionChange(newValues);
  };

  const getDisplayText = () => {
    if (selectedOptions.length === 0) return placeholder;
    if (selectedOptions.length === 1) return selectedOptions[0]?.label;
    return `${selectedOptions.length} selected`;
  };

  return (
    <View className="mb-5">
      <Text className="text-base font-medium text-foreground mb-2">
        {label}
        {required && (
          <Text className="text-base font-medium text-destructive"> *</Text>
        )}
      </Text>

      <TouchableOpacity
        className={cn(
          "flex-row items-center justify-between border rounded-md px-3 py-3 min-h-12 bg-background",
          error ? "border-destructive" : "border-input"
        )}
        onPress={() => setIsOpen(true)}
        accessibilityLabel={accessibilityLabel ?? `${label} multi-select`}
        accessibilityHint="Tap to select multiple options"
        accessibilityRole="button"
      >
        <Text
          className={cn(
            "text-base flex-1",
            selectedOptions.length > 0
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {getDisplayText()}
        </Text>
        <ChevronDown size={20} className="text-muted-foreground" />
      </TouchableOpacity>

      {selectedOptions.length > 0 && (
        <View className="flex-row flex-wrap mt-2 gap-2">
          {selectedOptions.map((option) => (
            <View
              key={option.value}
              className="flex-row items-center px-3 py-1.5 bg-primary/10 rounded-full"
            >
              <Text className="text-sm font-medium text-primary">
                {option.label}
              </Text>
              <TouchableOpacity
                onPress={() => handleToggle(option.value)}
                className="ml-1.5 w-5 h-5 items-center justify-center"
                accessibilityLabel={`Remove ${option.label}`}
              >
                <Text className="text-base font-bold text-primary">×</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {error && (
        <View className="flex-row items-center mt-2">
          <AlertCircle size={16} className="text-destructive" />
          <Text className="text-sm text-destructive ml-1.5 flex-1">
            {error}
          </Text>
        </View>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="w-[90%] max-w-[400px] bg-card rounded-xl p-5 max-h-[80%]">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-lg font-semibold text-foreground">
                Select {label}
              </Text>
              <TouchableOpacity
                onPress={() => setIsOpen(false)}
                className="p-2"
              >
                <Text className="text-base font-medium text-primary">Done</Text>
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-[300px]">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className="flex-row items-center justify-between py-4 border-b border-border"
                  onPress={() => handleToggle(option.value)}
                  accessibilityLabel={option.label}
                  accessibilityRole="checkbox"
                  accessibilityState={{
                    checked: values.includes(option.value),
                  }}
                >
                  <Text className="text-base text-foreground flex-1">
                    {option.label}
                  </Text>
                  {values.includes(option.value) && (
                    <Check size={20} className="text-primary" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
