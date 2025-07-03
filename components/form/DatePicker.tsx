import React, { useState } from "react";
import { View, TouchableOpacity, Platform, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Control, Controller, FieldError, FieldPath, FieldValues } from "react-hook-form";
import { Calendar, AlertCircle } from "~/lib/icons";
import { format } from "date-fns";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import { useColorScheme } from "~/lib/useColorScheme";

// Legacy interface for backward compatibility
interface LegacyDatePickerProps {
  readonly label: string;
  readonly value: Date | null | undefined;
  readonly onChange: (date: Date) => void;
  readonly error?: string;
  readonly required?: boolean;
  readonly minimumDate?: Date;
  readonly maximumDate?: Date;
  readonly accessibilityLabel?: string;
}

// New interface for react-hook-form integration
interface ReactHookFormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  readonly control: Control<TFieldValues>;
  readonly name: TName;
  readonly label?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly minimumDate?: Date;
  readonly maximumDate?: Date;
  readonly accessibilityLabel?: string;
  readonly error?: FieldError;
}

type DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = LegacyDatePickerProps | ReactHookFormDatePickerProps<TFieldValues, TName>;

// Type guard to check if props are for react-hook-form
function isReactHookFormProps<TFieldValues extends FieldValues>(
  props: DatePickerProps<TFieldValues>
): props is ReactHookFormDatePickerProps<TFieldValues> {
  return 'control' in props && 'name' in props;
}

// Helper component for the actual date picker UI
interface DatePickerComponentProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  accessibilityLabel?: string;
  error?: string;
  isDarkColorScheme: boolean;
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
}

function DatePickerComponent({
  value,
  onChange,
  placeholder = "Select date",
  minimumDate,
  maximumDate,
  accessibilityLabel,
  error,
  isDarkColorScheme,
  showPicker,
  setShowPicker,
}: DatePickerComponentProps) {
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

  const formatDisplayDate = (date: Date | null) => {
    if (!date) return placeholder;
    return format(date, "MMM dd, yyyy");
  };

  const formatWebInputDate = (date: Date | null) => {
    if (!date) return "";
    return format(date, "yyyy-MM-dd");
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
          aria-label={accessibilityLabel ?? "Date picker"}
        />
        <Calendar
          size={20}
          className="absolute right-3 top-3 text-muted-foreground pointer-events-none"
        />
      </View>
    );
  }

  // Native mobile date picker
  return (
    <>
      <TouchableOpacity
        className={cn(
          "flex-row items-center justify-between border rounded-md px-3 py-3 min-h-12 bg-background",
          error ? "border-destructive" : "border-input"
        )}
        onPress={showDatePicker}
        accessibilityLabel={accessibilityLabel ?? "Date picker"}
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
    </>
  );
}

export default function DatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: DatePickerProps<TFieldValues, TName>) {
  const { isDarkColorScheme } = useColorScheme();
  const [showPicker, setShowPicker] = useState(false);

  // If using react-hook-form
  if (isReactHookFormProps(props)) {
    const {
      control,
      name,
      label = "Date",
      placeholder = "Select date",
      required = false,
      minimumDate,
      maximumDate,
      accessibilityLabel,
      error,
    } = props;

    return (
      <View className="mb-5">
        <Text className="text-base font-medium text-foreground mb-2">
          {label}
          {required && (
            <Text className="text-base font-medium text-medical-critical"> *</Text>
          )}
        </Text>

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <DatePickerComponent
              value={value ? new Date(value) : null}
              onChange={(date) => onChange(date.toISOString())}
              placeholder={placeholder}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              accessibilityLabel={accessibilityLabel}
              error={error?.message}
              isDarkColorScheme={isDarkColorScheme}
              showPicker={showPicker}
              setShowPicker={setShowPicker}
            />
          )}
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
    onChange,
    error,
    minimumDate,
    maximumDate,
    accessibilityLabel,
    required = false,
  } = props;

  return (
    <View className="mb-5">
      <Text className="text-base font-medium text-foreground mb-2">
        {label}
        {required && (
          <Text className="text-base font-medium text-medical-critical"> *</Text>
        )}
      </Text>

      <DatePickerComponent
        value={value}
        onChange={onChange}
        placeholder="Select date"
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        accessibilityLabel={accessibilityLabel}
        error={error}
        isDarkColorScheme={isDarkColorScheme}
        showPicker={showPicker}
        setShowPicker={setShowPicker}
      />

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
