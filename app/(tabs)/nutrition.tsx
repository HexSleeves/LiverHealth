import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus, Database } from "~/lib/icons";

export default function NutritionScreen() {
  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-foreground mb-2">
          Nutrition Tracking
        </Text>
        <Text className="text-base text-muted-foreground leading-relaxed">
          Track your daily nutrition intake for better liver health
        </Text>
      </View>

      {/* Quick Add Section */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex-row items-center gap-2">
            <Plus size={20} className="text-primary" />
            <Text className="text-lg font-semibold">Log Today's Meals</Text>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-y-3">
          <Button className="w-full py-4">
            <Text className="font-semibold">Add Breakfast</Text>
          </Button>
          <Button variant="outline" className="w-full py-4">
            <Text className="font-medium">Add Lunch</Text>
          </Button>
          <Button variant="outline" className="w-full py-4">
            <Text className="font-medium">Add Dinner</Text>
          </Button>
          <Button variant="outline" className="w-full py-4">
            <Text className="font-medium">Add Snack</Text>
          </Button>
        </CardContent>
      </Card>

      {/* Coming Soon */}
      <Card className="shadow-sm">
        <CardContent className="py-16 items-center">
          <Database size={56} className="text-muted-foreground mb-6" />
          <Text className="text-xl font-semibold text-foreground mb-3">
            Coming Soon
          </Text>
          <Text className="text-center text-muted-foreground text-base leading-relaxed px-4">
            Detailed nutrition tracking with sodium, potassium, and macro
            monitoring will be available soon.
          </Text>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
