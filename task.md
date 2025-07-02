# MyLiverApp - Task Breakdown

This document breaks down the MVP features into a prioritized list of development tasks.

## Priority 1: Core Foundation & Onboarding

* **Task: Setup Basic App Structure**
  * Subtask: Initialize navigation (e.g., Tab navigator with placeholders for Home, Log, Meds, Settings).
  * Subtask: Configure basic theme, fonts, and global styles.
  * Subtask: Implement local storage solution (e.g., AsyncStorage) for data persistence.

* **Task: User Onboarding & Profile**
  * Subtask: Create a multi-step onboarding flow for first-time users.
  * Subtask: Build the UI for the Health Profile screen (liver condition, restrictions).
  * Subtask: Develop the UI for setting daily nutritional goals (macros, sodium, potassium, fluids).
  * Subtask: Save profile and goal data to local storage.

## Priority 2: Daily Tracking Features

* **Task: Nutrient Tracking (Manual Entry)**
  * Subtask: Design and build the form for manually logging a meal.
  * Subtask: Implement input fields for protein, carbohydrates, and fats.
  * Subtask: Add input fields for sodium and potassium.
  * Subtask: Create a separate, simple interface for logging fluid intake.
  * Subtask: Write the logic to save tracking data with timestamps.

* **Task: Medication Management**
  * Subtask: Create the UI to view, add, and remove medications from a list (name, dosage, frequency).
  * Subtask: Build the daily checklist mechanism to mark medications as "taken".
  * Subtask: Persist the medication list and daily taken status.

## Priority 3: Dashboard & User Engagement

* **Task: Dashboard / Home Screen**
  * Subtask: Design the main dashboard layout.
  * Subtask: Develop components to display the daily summary of tracked nutrients against goals.
  * Subtask: Create a component to show the status of daily medications.
  * Subtask: Implement "Quick Add" buttons that navigate to the logging screens.
  * Subtask: Fetch and display data from local storage.

* **Task: Medication Reminders**
  * Subtask: Configure local push notifications.
  * Subtask: Implement logic to schedule daily reminders based on the user's medication list.

## Priority 4: Polish & Refinement

* **Task: UI/UX Refinements**
  * Subtask: Review and improve the user flow for all features.
  * Subtask: Ensure consistent styling and component usage.
  * Subtask: Add helpful empty states and instructional text.

* **Task: Testing**
  * Subtask: Manually test all features on both iOS and Android.
  * Subtask: Write unit tests for critical logic (e.g., nutrient calculation, data storage).
