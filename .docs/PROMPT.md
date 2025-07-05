# Liver Health App

Generate a prod.md file for the ios/android application I am building.

The application is a liver health tracking app. People with liver health issues (liver diseas, cirrhosis, etc), or jsut want to ensure their liver health is staying healthy, can use the app to track their nutrients from food sources, their workouts, their medications, their health test and screening from doctors, and get provided information and recommendations for their liver health.

Tech specs:

- react-native with expo
- Clerk for auth management
- convex for our api layer
- zustand for our persient in-store solution
- Nativewind / tailwind for our styling guide

Screens:

- Auth flow with sign-in, sign-out, forgot password
- Onboarding flow to gather general knowledge about the user and their health
- Dashboard to display their daily tracking
- Medication Screen
- Nutrients screen

Tech Connections:

- We will connect with apple health to get all the users health data into the system
- We will connect with myFitnessPal for nutrients and food
- We will connect with health providers platforms to get doctor test results and more.

Our first pass will not include manually adding nutritents or food. That will be done at a later time
