import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Plus, Database } from "~/lib/icons";

export default function NutritionScreen() {
  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Nutrition Tracking
        </Text>
        <Text className="text-base text-muted-foreground">
          Track your daily nutrition intake for better liver health
        </Text>
      </View>

      {/* Quick Add Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex-row items-center gap-2">
            <Plus size={20} className="text-primary" />
            Log Today's Meals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full">
            <Text>Add Breakfast</Text>
          </Button>
          <Button variant="outline" className="w-full">
            <Text>Add Lunch</Text>
          </Button>
          <Button variant="outline" className="w-full">
            <Text>Add Dinner</Text>
          </Button>
          <Button variant="outline" className="w-full">
            <Text>Add Snack</Text>
          </Button>
        </CardContent>
      </Card>

      {/* Coming Soon */}
      <Card>
        <CardContent className="py-12 items-center">
          <Database size={48} className="text-muted-foreground mb-4" />
          <Text className="text-lg font-medium text-foreground mb-2">
            Coming Soon
          </Text>
          <Text className="text-center text-muted-foreground">
            Detailed nutrition tracking with sodium, potassium, and macro
            monitoring will be available soon.
          </Text>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
