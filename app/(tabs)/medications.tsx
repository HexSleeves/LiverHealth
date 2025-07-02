import React from "react";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Plus, Bell, Check, Clock } from "~/lib/icons";

export default function MedicationsScreen() {
  // Mock medication data
  const medications = [
    {
      name: "Lactulose",
      dosage: "30ml",
      frequency: "Twice daily",
      nextDose: "2:00 PM",
      taken: true,
      instructions: "Take with food",
    },
    {
      name: "Spironolactone",
      dosage: "25mg",
      frequency: "Once daily",
      nextDose: "8:00 AM (Tomorrow)",
      taken: false,
      instructions: "Take in the morning",
    },
    {
      name: "Vitamin D",
      dosage: "1000 IU",
      frequency: "Daily",
      nextDose: "6:00 PM",
      taken: false,
      instructions: "Take with largest meal",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-background p-4">
      <View className="mb-6">
        <Text className="text-2xl font-bold text-foreground mb-2">
          Medications
        </Text>
        <Text className="text-base text-muted-foreground">
          Manage your medications and track daily doses
        </Text>
      </View>

      {/* Add Medication Button */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <Button className="w-full flex-row items-center gap-2">
            <Plus size={20} className="text-primary-foreground" />
            <Text className="text-primary-foreground">Add New Medication</Text>
          </Button>
        </CardContent>
      </Card>

      {/* Today's Medications */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex-row items-center gap-2">
            <Bell size={20} className="text-primary" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {medications.map((med, index) => (
            <View key={index} className="p-4 bg-muted/30 rounded-lg space-y-3">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-semibold text-lg">{med.name}</Text>
                  <Text className="text-muted-foreground">
                    {med.dosage} • {med.frequency}
                  </Text>
                </View>
                <View className="items-end space-y-1">
                  {med.taken ? (
                    <Badge className="bg-green-100">
                      <Check size={12} className="text-green-600" />
                      <Text className="text-green-600 ml-1">Taken</Text>
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Clock size={12} className="text-muted-foreground" />
                      <Text className="text-muted-foreground ml-1">
                        Pending
                      </Text>
                    </Badge>
                  )}
                </View>
              </View>

              <View className="space-y-2">
                <Text className="text-sm text-muted-foreground">
                  Next dose: {med.nextDose}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {med.instructions}
                </Text>
              </View>

              {!med.taken && (
                <Button variant="outline" size="sm" className="self-start">
                  <Text>Mark as Taken</Text>
                </Button>
              )}
            </View>
          ))}
        </CardContent>
      </Card>

      {/* Medication History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-center text-muted-foreground py-8">
            Medication history and adherence tracking coming soon
          </Text>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
