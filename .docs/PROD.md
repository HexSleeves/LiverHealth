# Product Requirements Document: HepatoTrack

**Version:** 1.0
**Date:** 2025-07-05
**Status:** In Development

## 1. Overview

### 1.1. Product Vision

To empower individuals to take proactive control of their liver health through seamless data tracking, personalized insights, and actionable recommendations.

### 1.2. Summary

HepatoTrack is a mobile application for iOS and Android designed for individuals managing liver health conditions (such as fatty liver disease, cirrhosis) and those who are health-conscious and wish to maintain optimal liver function. The app aggregates crucial health data from various sources—including nutrition, exercise, medication, and lab results—into a single, easy-to-understand platform. By centralizing this information, HepatoTrack aims to help users and their healthcare providers make more informed decisions.

### 1.3. Target Audience

* **Primary:** Individuals diagnosed with chronic or acute liver conditions who need to meticulously track their lifestyle and medical data.
* **Secondary:** Health-conscious individuals focused on preventative care and optimizing their liver health.

## 2. Goals & Objectives

### 2.1. User Goals

* Effortlessly track daily nutrition without manual entry.
* Monitor medication adherence and schedules.
* Consolidate workout and activity data.
* View and understand medical test results (e.g., liver function panels) over time.
* Receive clear, relevant information about maintaining liver health.

### 2.2. Business Goals

* Build a reliable and trusted platform in the digital health space.
* Achieve high user engagement and retention through a seamless, valuable user experience.
* Establish a foundation for future premium features and clinical partnerships.

## 3. Technical Specifications

| Category          | Technology / Service                               |
| ----------------- | -------------------------------------------------- |
| **Framework**     | React Native with Expo                             |
| **Authentication**| Clerk                                              |
| **Backend/API**   | Convex                                             |
| **State Mgmt**    | Zustand (for persistent client-side state)         |
| **Styling**       | NativeWind / Tailwind CSS                          |
| **Form Handling** | React Hook Form                                    |

## 4. Core Features & Functionality (MVP v1.0)

This section outlines the core features for the initial product launch.

### 4.1. User Authentication (via Clerk)

The authentication flow will be managed entirely by Clerk to ensure security and a streamlined user experience.

* **Sign Up / Sign In:** Users can create an account or sign in using:
  * Email and Password
  * Social Providers (Google, Apple)
* **Forgot Password:** A standard, secure flow for users to reset their password.
* **Sign Out:** Users can securely log out of their account.

### 4.2. Onboarding Flow

A one-time flow for new users to set up their profile and grant necessary permissions.

* **Welcome Screens:** A brief introduction to the app's value proposition.
* **Permission Requests:**
  * Request access to Apple Health data.
  * Request permission for push notifications (for medication reminders).
* **Initial Data Collection:**
  * Primary health goal (e.g., "Manage Cirrhosis", "Reduce Fatty Liver", "General Wellness").
  * Known liver conditions (from a predefined list).
  * Current medications (name, dosage, frequency) to pre-populate the Medication screen.
* **Integration Setup:** Prompt the user to connect their MyFitnessPal account.

### 4.3. Data Integrations

Data aggregation is a core pillar of the app. Manual entry is out of scope for v1.0.

* **Apple Health:**
  * **Data to Sync:** Workouts, daily steps, weight, and other relevant vitals. Data will be read-only.
* **MyFitnessPal:**
  * **Data to Sync:** Daily nutritional summaries, including macronutrients (protein, carbs, fat) and key micronutrients (e.g., sodium). The connection will be read-only.
* **Health Provider Platforms:**
  * **Goal:** Connect to patient portals to automatically pull in lab results, specifically Liver Function Tests (LFTs).
  * **v1.0 Implementation:** This is a complex integration. For v1.0, we will build the UI to display this data but assume the data is manually entered into our Convex backend by an admin or via a placeholder mechanism until direct API connections are feasible. The UI will be designed to show trends for key markers like ALT, AST, Bilirubin, and Albumin.

### 4.4. Screens & Flows

#### 4.4.1. Dashboard

The main landing screen after login, providing a daily "at-a-glance" summary.

* **Widgets:**
  * **Today's Nutrients:** A summary card showing key metrics from MyFitnessPal (e.g., Sodium, Protein, Calories).
  * **Medication Adherence:** A checklist showing today's medications and their taken/pending status.
  * **Recent Activity:** A card displaying the latest workout synced from Apple Health.
  * **Liver Health Tip:** A card displaying a daily educational tip.

#### 4.4.2. Nutrients Screen

A detailed view of nutritional intake.

* **Data Source:** MyFitnessPal.
* **Views:**
  * Daily and Weekly views.
  * Detailed breakdown of macronutrients and relevant micronutrients.
  * Visual charts to show trends and adherence to dietary goals (if set).

#### 4.4.3. Medication Screen

For managing and tracking medication.

* **Functionality:**
  * List all medications with dosage and frequency (pre-populated from onboarding).
  * Ability to add, edit, or delete a medication.
  * A daily log/history to view adherence over time.
  * Push notifications to remind users to take their medication.

## 5. Out of Scope for v1.0

To ensure a focused and timely launch, the following features will **not** be included in the first version:

* **Manual Data Entry:** No manual entry for food, nutrients, or workouts. All data comes from integrations.
* **Android Integrations:** Google Fit integration will be deferred to a future release. The initial launch will focus on the iOS ecosystem with Apple Health.
* **Advanced Recommendation Engine:** Recommendations will be based on a predefined set of rules. A personalized, AI-driven engine is a future goal.
* **Social/Community Features:** No user-to-user interaction, forums, or sharing.
* **In-App Doctor Communication:** No direct messaging or data sharing with healthcare providers from within the app.

## 6. Design & UX Considerations

* **UI/UX:** The interface will be clean, intuitive, and calming. Given the sensitive nature of the app's purpose, the design should inspire confidence and reduce user anxiety.
* **Styling:** We will use **NativeWind** to implement a consistent design system based on Tailwind CSS principles, ensuring rapid and maintainable UI development.
* **Accessibility:** Adherence to accessibility best practices (e.g., sufficient color contrast, dynamic font sizes, screen reader support) is a priority.

## 7. Assumptions & Dependencies

* **API Availability:** The successful implementation of core features depends on the availability and reliability of APIs for MyFitnessPal and various health provider platforms.
* **User Ecosystem:** The app's utility in v1.0 is highly dependent on the user having and actively using an iPhone, Apple Health, and MyFitnessPal.
