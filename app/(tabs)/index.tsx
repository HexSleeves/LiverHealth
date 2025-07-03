import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Badge } from "~/components/ui/badge";
import {
  Shield,
  Bell,
  Database,
  FileText,
  Check,
  AlertCircle,
  Plus,
} from "~/lib/icons";
import { useDashboardData } from "~/hooks/useConvex";
import { useUserContext } from "~/lib/context/UserContext";
import { getTodayDateString } from "~/lib/utils/dateHelpers";
import { DemoDataButton } from "~/components/DemoDataButton";

export default function LiverHealthDashboard() {
  const { userId } = useUserContext();
  const today = getTodayDateString();
  const dashboardData = useDashboardData(userId, today);

  // If no user is signed in, show sign-in prompt
  if (!userId) {
    return (
      <ScrollView className="flex-1 bg-background p-4">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-muted-foreground mb-4">
            Please sign in to view your dashboard
          </Text>
        </View>
      </ScrollView>
    );
  }

  // Show loading state while data is being fetched
  if (dashboardData === undefined) {
    return (
      <ScrollView className="flex-1 bg-background p-4">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg">Loading dashboard...</Text>
        </View>
      </ScrollView>
    );
  }

  // Extract real data from Convex
  const { goalProgress, medications: medicationStatus, user } = dashboardData;

  // Use real data if available, otherwise fall back to mock data
  const todayProgress = goalProgress
    ? {
        sodium: {
          current: Math.round(goalProgress.sodium.current),
          target: goalProgress.sodium.goal,
          unit: "mg",
        },
        potassium: {
          current: Math.round(goalProgress.potassium.current),
          target: goalProgress.potassium.goal,
          unit: "mg",
        },
        protein: {
          current: Math.round(goalProgress.protein.current),
          target: goalProgress.protein.goal,
          unit: "g",
        },
        fluids: {
          current: Math.round(goalProgress.fluids.current),
          target: goalProgress.fluids.goal,
          unit: "ml",
        },
      }
    : {
        sodium: { current: 0, target: 2000, unit: "mg" },
        potassium: { current: 0, target: 3500, unit: "mg" },
        protein: { current: 0, target: 60, unit: "g" },
        fluids: { current: 0, target: 2000, unit: "ml" },
      };

  // Convert medication status to the format expected by the UI
  const medications =
    medicationStatus.status.length > 0
      ? medicationStatus.status.map((med) => ({
          name: med.name,
          time: med.frequency,
          taken: med.wasTaken,
        }))
      : [
          {
            name: "No medications added",
            time: "Add medications to track them",
            taken: false,
          },
        ];

  const recentLabs = {
    alt: { value: 45, normal: "< 40", status: "elevated" },
    bilirubin: { value: 1.2, normal: "< 1.2", status: "normal" },
    lastUpdate: "3 days ago",
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      {/* Header Section */}
      <View className="mb-8">
        <Text className="text-3xl font-bold text-foreground mb-2">
          Good morning{user?.name ? `, ${user.name}` : ""}! 👋
        </Text>
        <Text className="text-base text-muted-foreground leading-relaxed">
          Let's take care of your liver health today
        </Text>
      </View>

      {/* Quick Actions */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex-row items-center gap-2">
            <Plus size={20} className="text-health-600" />
            <Text className="text-lg font-semibold">Quick Actions</Text>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-y-3">
          <View className="flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1 py-3"
              onPress={() => {
                /* Navigate to meal logging */
              }}
            >
              <Text className="font-medium">Log Meal</Text>
            </Button>
            <Button
              variant="outline"
              className="flex-1 py-3"
              onPress={() => {
                /* Navigate to fluid logging */
              }}
            >
              <Text className="font-medium">Add Fluids</Text>
            </Button>
            <Button
              variant="outline"
              className="flex-1 py-3"
              onPress={() => {
                /* Navigate to medication */
              }}
            >
              <Text className="font-medium">Take Meds</Text>
            </Button>
          </View>
          <DemoDataButton />
        </CardContent>
      </Card>

      {/* Today's Nutrition Progress */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex-row items-center gap-2">
            <Database size={20} className="text-nutrition-carbs" />
            <Text className="text-lg font-semibold">Today's Nutrition</Text>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-y-4">
          {Object.entries(todayProgress).map(([key, data]) => {
            const percentage = Math.min(
              (data.current / data.target) * 100,
              100
            );
            const isOverTarget = data.current > data.target;

            // Color-coded nutrition tracking
            const getColorForNutrient = (nutrientKey: string) => {
              switch (nutrientKey) {
                case "sodium":
                  return isOverTarget
                    ? "text-medical-warning"
                    : "text-nutrition-sodium";
                case "potassium":
                  return "text-nutrition-potassium";
                case "protein":
                  return "text-nutrition-protein";
                case "fluids":
                  return "text-nutrition-water";
                default:
                  return "text-foreground";
              }
            };

            // Get background color for progress bars
            const getBackgroundColorForNutrient = (nutrientKey: string) => {
              switch (nutrientKey) {
                case "sodium":
                  return isOverTarget
                    ? "bg-medical-warning"
                    : "bg-nutrition-sodium";
                case "potassium":
                  return "bg-nutrition-potassium";
                case "protein":
                  return "bg-nutrition-protein";
                case "fluids":
                  return "bg-nutrition-water";
                default:
                  return "bg-foreground";
              }
            };


            return (
              <View key={key} className="gap-y-2">
                <View className="flex-row justify-between items-center">
                  <Text
                    className={`font-medium capitalize ${getColorForNutrient(key)}`}
                  >
                    {key}
                  </Text>
                  <View className="flex-row items-center gap-2">
                    <Text
                      className={`text-sm ${
                        isOverTarget
                          ? "text-medical-warning"
                          : "text-foreground"
                      }`}
                    >
                      {data.current}/{data.target} {data.unit}
                    </Text>
                    {isOverTarget && key === "sodium" && (
                      <Badge className="bg-medical-warning-light">
                        <Text className="text-medical-warning text-xs">
                          High
                        </Text>
                      </Badge>
                    )}
                  </View>
                </View>
                <Progress 
                  value={percentage} 
                  className="h-3" 
                  indicatorClassName={getBackgroundColorForNutrient(key)}
                />
              </View>
            );
          })}
        </CardContent>
      </Card>

      {/* Medication Tracker */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex-row items-center gap-2">
            <Bell size={20} className="text-medication-scheduled" />
            <Text className="text-lg font-semibold">Today's Medications</Text>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-y-3">
          {medications.map((med) => (
            <View
              key={`${med.name}-${med.time}`}
              className="flex-row items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm"
            >
              <View className="flex-1">
                <Text className="font-medium">{med.name}</Text>
                <Text className="text-sm text-muted-foreground">
                  {med.time}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                {med.taken ? (
                  <Badge className="bg-green-100 flex-row items-center min-h-8 px-3 py-1">
                    <Check size={14} className="text-green-700" />
                    <Text className="text-green-700 ml-2 font-medium">
                      Taken
                    </Text>
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="flex-row items-center min-h-8 px-3 py-1"
                  >
                    <Text className="text-orange-600 font-medium">Pending</Text>
                  </Badge>
                )}
              </View>
            </View>
          ))}
        </CardContent>
      </Card>

      {/* Recent Lab Results */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex-row items-center gap-2">
            <FileText size={20} className="text-lab-normal" />
            <Text className="text-lg font-semibold">Recent Lab Results</Text>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-y-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-muted-foreground">
              Last updated {recentLabs.lastUpdate}
            </Text>
            <Button variant="outline" size="sm">
              <Text className="font-medium">View All</Text>
            </Button>
          </View>

          <View className="gap-y-2">
            <View className="flex-row justify-between items-center p-4 bg-card border border-border rounded-xl shadow-sm">
              <View>
                <Text className="font-semibold text-foreground">ALT</Text>
                <Text className="text-sm text-muted-foreground mt-1">
                  Normal: {recentLabs.alt.normal}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="font-bold text-lab-elevated text-lg">
                  {recentLabs.alt.value}
                </Text>
                <AlertCircle size={18} className="text-lab-elevated" />
              </View>
            </View>

            <View className="flex-row justify-between items-center p-4 bg-green-50 border border-green-200 rounded-xl shadow-sm">
              <View>
                <Text className="font-semibold text-foreground">Bilirubin</Text>
                <Text className="text-sm text-muted-foreground mt-1">
                  Normal: {recentLabs.bilirubin.normal}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="font-bold text-green-700 text-lg">
                  {recentLabs.bilirubin.value}
                </Text>
                <Check size={18} className="text-green-700" />
              </View>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Health Tip */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex-row items-center gap-2">
            <Shield size={20} className="text-health-600" />
            <Text className="text-lg font-semibold">Today's Health Tip</Text>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-base leading-relaxed">
            💡 <Text className="font-semibold">Sodium Watch:</Text> You're doing
            great with sodium intake today! Remember to check food labels and
            opt for fresh ingredients when possible.
          </Text>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
