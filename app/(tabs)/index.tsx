import React from "react";
import { ScrollView, View } from "react-native";
import { router } from "expo-router";
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

export default function LiverHealthDashboard() {
  // Mock data - in real app this would come from your state/API
  const todayProgress = {
    sodium: { current: 1200, target: 2000, unit: "mg" },
    potassium: { current: 800, target: 3500, unit: "mg" },
    protein: { current: 45, target: 60, unit: "g" },
    fluids: { current: 1200, target: 2000, unit: "ml" },
  };

  const medications = [
    { name: "Lactulose", time: "8:00 AM", taken: true },
    { name: "Spironolactone", time: "12:00 PM", taken: false },
    { name: "Vitamin D", time: "6:00 PM", taken: false },
  ];

  const recentLabs = {
    alt: { value: 45, normal: "< 40", status: "elevated" },
    bilirubin: { value: 1.2, normal: "< 1.2", status: "normal" },
    lastUpdate: "3 days ago",
  };

  return (
    <ScrollView className="flex-1 bg-background p-4">
      {/* Header Section */}
      <View className="mb-6">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Good morning! 👋
        </Text>
        <Text className="text-base text-muted-foreground">
          Let's take care of your liver health today
        </Text>
      </View>

      {/* Quick Actions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex-row items-center gap-2">
            <Plus size={20} className="text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-row gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onPress={() => {
              /* Navigate to meal logging */
            }}
          >
            <Text>Log Meal</Text>
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onPress={() => {
              /* Navigate to fluid logging */
            }}
          >
            <Text>Add Fluids</Text>
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onPress={() => {
              /* Navigate to medication */
            }}
          >
            <Text>Take Meds</Text>
          </Button>
        </CardContent>
      </Card>

      {/* Today's Nutrition Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex-row items-center gap-2">
            <Database size={20} className="text-primary" />
            Today's Nutrition
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(todayProgress).map(([key, data]) => {
            const percentage = Math.min(
              (data.current / data.target) * 100,
              100
            );
            const isOverTarget = data.current > data.target;

            return (
              <View key={key} className="space-y-2">
                <View className="flex-row justify-between items-center">
                  <Text className="font-medium capitalize">{key}</Text>
                  <View className="flex-row items-center gap-2">
                    <Text
                      className={`text-sm ${
                        isOverTarget ? "text-destructive" : "text-foreground"
                      }`}
                    >
                      {data.current}/{data.target} {data.unit}
                    </Text>
                    {isOverTarget && key === "sodium" && (
                      <Badge variant="destructive" className="text-xs">
                        <Text>High</Text>
                      </Badge>
                    )}
                  </View>
                </View>
                <Progress value={percentage} className="h-2" />
              </View>
            );
          })}
        </CardContent>
      </Card>

      {/* Medication Tracker */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex-row items-center gap-2">
            <Bell size={20} className="text-primary" />
            Today's Medications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {medications.map((med, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between p-3 bg-muted/30 rounded-lg"
            >
              <View className="flex-1">
                <Text className="font-medium">{med.name}</Text>
                <Text className="text-sm text-muted-foreground">
                  {med.time}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                {med.taken ? (
                  <Badge className="bg-green-100">
                    <Check size={12} className="text-green-600" />
                    <Text className="text-green-600 ml-1">Taken</Text>
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    <Text>Pending</Text>
                  </Badge>
                )}
              </View>
            </View>
          ))}
        </CardContent>
      </Card>

      {/* Recent Lab Results */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex-row items-center gap-2">
            <FileText size={20} className="text-primary" />
            Recent Lab Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-muted-foreground">
              Last updated {recentLabs.lastUpdate}
            </Text>
            <Button variant="outline" size="sm">
              <Text>View All</Text>
            </Button>
          </View>

          <View className="space-y-2">
            <View className="flex-row justify-between items-center p-3 bg-muted/30 rounded-lg">
              <View>
                <Text className="font-medium">ALT</Text>
                <Text className="text-sm text-muted-foreground">
                  Normal: {recentLabs.alt.normal}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="font-bold">{recentLabs.alt.value}</Text>
                <AlertCircle size={16} className="text-amber-500" />
              </View>
            </View>

            <View className="flex-row justify-between items-center p-3 bg-muted/30 rounded-lg">
              <View>
                <Text className="font-medium">Bilirubin</Text>
                <Text className="text-sm text-muted-foreground">
                  Normal: {recentLabs.bilirubin.normal}
                </Text>
              </View>
              <View className="flex-row items-center gap-2">
                <Text className="font-bold">{recentLabs.bilirubin.value}</Text>
                <Check size={16} className="text-green-500" />
              </View>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* Health Tip */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex-row items-center gap-2">
            <Shield size={20} className="text-primary" />
            Today's Health Tip
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-sm leading-relaxed">
            💡 <Text className="font-medium">Sodium Watch:</Text> You're doing
            great with sodium intake today! Remember to check food labels and
            opt for fresh ingredients when possible.
          </Text>
        </CardContent>
      </Card>


    </ScrollView>
  );
}
