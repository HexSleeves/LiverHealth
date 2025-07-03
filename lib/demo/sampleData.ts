// Sample health profile data for demo
export const sampleHealthProfile = {
  liverCondition: "Fatty Liver Disease",
  dietaryRestrictions: ["low_sodium", "moderate_protein"],
  dailyGoals: {
    protein: 80, // grams
    carbohydrates: 200, // grams
    fats: 65, // grams
    sodium: 2000, // milligrams
    potassium: 3500, // milligrams
    fluids: 2000, // milliliters
  },
};

// Sample nutrition entries
export const sampleNutritionEntries = [
  {
    mealName: "Breakfast",
    protein: 15,
    carbohydrates: 45,
    fats: 12,
    sodium: 300,
    potassium: 400,
    calories: 320,
    foodDescription: "Oatmeal with banana and almonds",
  },
  {
    mealName: "Lunch",
    protein: 25,
    carbohydrates: 60,
    fats: 18,
    sodium: 650,
    potassium: 800,
    calories: 450,
    foodDescription: "Grilled chicken salad with olive oil dressing",
  },
  {
    mealName: "Dinner",
    protein: 30,
    carbohydrates: 80,
    fats: 20,
    sodium: 800,
    potassium: 1200,
    calories: 580,
    foodDescription: "Baked salmon with quinoa and steamed vegetables",
  },
];

// Sample fluid entries
export const sampleFluidEntries = [
  { amount: 250, fluidType: "water" },
  { amount: 200, fluidType: "herbal tea" },
  { amount: 300, fluidType: "water" },
  { amount: 150, fluidType: "coconut water" },
  { amount: 250, fluidType: "water" },
];

// Sample medications
export const sampleMedications = [
  {
    name: "Ursodeoxycholic Acid",
    dosage: "300mg",
    frequency: "twice daily",
    instructions: "Take with meals",
  },
  {
    name: "Vitamin E",
    dosage: "400 IU",
    frequency: "once daily",
    instructions: "Take with breakfast",
  },
  {
    name: "Milk Thistle",
    dosage: "150mg",
    frequency: "three times daily",
    instructions: "Take before meals",
  },
];
