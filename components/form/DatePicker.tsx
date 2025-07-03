import React, { useState } from "react";
import { View, TouchableOpacity, Platform, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, AlertCircle } from "~/lib/icons";
import { format } from "date-fns";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { useColorScheme } from "~/lib/useColorScheme";

interface DatePickerProps {
  readonly label: string;
  readonly value: Date | null | undefined;
  readonly onChange: (date: Date) => void;
  readonly error?: string;
  readonly required?: boolean;
  readonly minimumDate?: Date;
  readonly maximumDate?: Date;
  readonly accessibilityLabel?: string;
}

export default function DatePicker({
  label,
  value,
  onChange,
  error,
  minimumDate,
  maximumDate,
  accessibilityLabel,
  required = false,
}: DatePickerProps) {
  const { isDarkColorScheme } = useColorScheme();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleWebDateChange = (dateString: string) => {
    if (dateString) {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        onChange(date);
      }
    }
  };

  const formatDisplayDate = (date: Date | null | undefined) => {
    if (!date) return "Select date";
    return format(new Date(date), "MMM dd, yyyy");
  };

  const formatWebInputDate = (date: Date | null | undefined) => {
    if (!date) return "";
    return format(new Date(date), "yyyy-MM-dd");
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  // Web-specific date picker
  if (Platform.OS === "web") {
    return (
      <View className="mb-5">
        <Text className="text-base font-medium text-foreground mb-2">
          {label}
          {required && (
            <Text className="text-base font-medium text-destructive"> *</Text>
          )}
        </Text>

        <View className="relative">
          <input
            type="date"
            value={formatWebInputDate(value)}
            onChange={(e) => handleWebDateChange(e.target.value)}
            min={minimumDate ? format(minimumDate, "yyyy-MM-dd") : undefined}
            max={maximumDate ? format(maximumDate, "yyyy-MM-dd") : undefined}
            className={cn(
              "w-full px-3 py-3 text-base rounded-md border bg-background min-h-12",
              "text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              error ? "border-destructive" : "border-input"
            )}
            style={{
              colorScheme: isDarkColorScheme ? "dark" : "light",
            }}
            aria-label={accessibilityLabel ?? `${label} date picker`}
          />
          <Calendar
            size={20}
            className="absolute right-3 top-3 text-muted-foreground pointer-events-none"
          />
        </View>

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

  // Native mobile date picker
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
        onPress={showDatePicker}
        accessibilityLabel={accessibilityLabel ?? `${label} date picker`}
        accessibilityHint="Tap to select a date"
        accessibilityRole="button"
      >
        <Text
          className={cn(
            "text-base",
            value ? "text-foreground" : "text-muted-foreground"
          )}
        >
          {formatDisplayDate(value)}
        </Text>
        <Calendar size={20} className="text-muted-foreground" />
      </TouchableOpacity>

      {error && (
        <View className="flex-row items-center mt-2">
          <AlertCircle size={16} className="text-destructive" />
          <Text className="text-sm text-destructive ml-1.5 flex-1">
            {error}
          </Text>
        </View>
      )}

      {Platform.OS === "ios" && (
        <Modal
          visible={showPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={hideDatePicker}
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-background">
              <View className="px-4 py-3 border-b border-border flex-row justify-between items-center">
                <TouchableOpacity onPress={hideDatePicker}>
                  <Text className="text-base font-medium text-muted-foreground">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <Text className="text-base font-semibold text-foreground">
                  Select Date
                </Text>
                <TouchableOpacity onPress={hideDatePicker}>
                  <Text className="text-base font-medium text-primary">
                    Done
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="rounded-t-lg justify-center items-center">
                <DateTimePicker
                  value={value || new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                  textColor="hsl(var(--foreground))"
                  themeVariant={isDarkColorScheme ? "dark" : "light"}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {showPicker && Platform.OS === "android" && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
}
