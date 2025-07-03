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
      <View className="mb-8">
        <Text className="text-3xl font-bold text-foreground mb-2">
          Medications
        </Text>
        <Text className="text-base text-muted-foreground leading-relaxed">
          Manage your medications and track daily doses
        </Text>
      </View>

      {/* Add Medication Button */}
      <Card className="mb-6 shadow-sm">
        <CardContent className="py-4">
          <Button className="w-full flex-row items-center justify-center gap-3 py-4">
            <Plus size={20} className="text-primary-foreground" />
            <Text className="text-primary-foreground font-semibold">Add New Medication</Text>
          </Button>
        </CardContent>
      </Card>

      {/* Today's Medications */}
      <Card className="mb-6 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex-row items-center gap-2">
            <Bell size={20} className="text-primary" />
            <Text className="text-lg font-semibold">Today's Schedule</Text>
          </CardTitle>
        </CardHeader>
        <CardContent className="gap-y-4">
          {medications.map((med) => (
            <View
              key={med.name}
              className="p-4 bg-card border border-border rounded-xl shadow-sm gap-y-3"
            >
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="font-semibold text-lg text-foreground">{med.name}</Text>
                  <Text className="text-muted-foreground text-sm mt-1">
                    {med.dosage} • {med.frequency}
                  </Text>
                </View>
                <View className="items-end gap-y-1">
                  {med.taken ? (
                    <Badge className="bg-green-100 flex-row items-center min-h-8 px-3 py-1">
                      <Check size={14} className="text-green-700" />
                      <Text className="text-green-700 ml-2 font-medium">Taken</Text>
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="flex-row items-center min-h-8 px-3 py-1">
                      <Clock size={14} className="text-orange-500" />
                      <Text className="text-orange-600 ml-2 font-medium">
                        Pending
                      </Text>
                    </Badge>
                  )}
                </View>
              </View>

              <View className="gap-y-2">
                <Text className="text-sm text-muted-foreground">
                  <Text className="font-medium">Next dose:</Text> {med.nextDose}
                </Text>
                <Text className="text-sm text-muted-foreground italic">
                  {med.instructions}
                </Text>
              </View>

              {!med.taken && (
                <Button variant="outline" size="sm" className="self-start mt-2">
                  <Text className="font-medium">Mark as Taken</Text>
                </Button>
              )}
            </View>
          ))}
        </CardContent>
      </Card>

      {/* Medication History */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Text className="text-center text-muted-foreground py-8 text-base">
            Medication history and adherence tracking coming soon
          </Text>
        </CardContent>
      </Card>
    </ScrollView>
  );
}
