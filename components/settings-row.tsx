import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "~/components/ui/text";
import { ChevronRight } from "~/lib/icons";
import { cn } from "~/lib/utils";

export interface SettingsRowProps {
  /**
   * Icon to display on the left side of the row
   */
  icon?: React.ReactNode;
  /**
   * Main title text
   */
  title: string;
  /**
   * Optional subtitle text displayed below the title
   */
  subtitle?: string;
  /**
   * Function called when the row is pressed
   */
  onPress?: () => void;
  /**
   * Element to display on the right side (e.g., Switch, Text, etc.)
   */
  rightElement?: React.ReactNode;
  /**
   * Whether to show the chevron arrow on the right
   * @default true when onPress is provided, false otherwise
   */
  showChevron?: boolean;
  /**
   * Whether the row is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Additional className for styling
   */
  className?: string;
  /**
   * Whether to show a border at the bottom
   * @default true
   */
  showBorder?: boolean;
  /**
   * Custom test ID for testing
   */
  testID?: string;
}

export function SettingsRow({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showChevron,
  disabled = false,
  className,
  showBorder = true,
  testID,
}: SettingsRowProps) {
  // Auto-determine chevron visibility based on onPress if not explicitly set
  const shouldShowChevron = showChevron ?? (!!onPress && !rightElement);

  const rowContent = (
    <View
      className={cn(
        "flex-row items-center justify-between px-4 py-4",
        showBorder && "border-b border-border",
        disabled && "opacity-50",
        className
      )}
    >
      <View className="flex-row items-center flex-1">
        {icon && (
          <View className="mr-3 items-center justify-center w-6 h-6">
            {icon}
          </View>
        )}
        <View className="flex-1">
          <Text className="font-medium text-base text-foreground mb-0.5">
            {title}
          </Text>
          {subtitle && (
            <Text className="font-normal text-sm text-muted-foreground">
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      <View className="flex-row items-center ml-3">
        {rightElement && <View className="mr-2">{rightElement}</View>}
        {shouldShowChevron && (
          <ChevronRight size={20} className="text-muted-foreground" />
        )}
      </View>
    </View>
  );

  if (onPress && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        testID={testID}
        activeOpacity={0.7}
        className="web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
      >
        {rowContent}
      </TouchableOpacity>
    );
  }

  return <View testID={testID}>{rowContent}</View>;
}

export default SettingsRow;
