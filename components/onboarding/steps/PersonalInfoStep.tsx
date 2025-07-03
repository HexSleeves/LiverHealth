import React from "react";
import { ScrollView } from "react-native";
import Animated, { FadeInUp, LinearTransition } from "react-native-reanimated";
import FormField from "~/components/form/FormField";
import DatePicker from "~/components/form/DatePicker";
import Dropdown from "~/components/form/Dropdown";
import { RELATIONSHIPS } from "~/types/onboarding";
import { Text } from "~/components/ui/text";
import { StaggeredFormField } from "../../animation/StepTransition";
import {
  useOnboardingData,
  useOnboardingActions,
} from "~/components/providers/OnboardingProvider";

export default function PersonalInfoStep() {
  const { personalInfo, errors } = useOnboardingData();
  const { setPersonalInfo } = useOnboardingActions();

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const match = RegExp(/^(\d{3})(\d{3})(\d{4})$/).exec(cleaned);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  return (
    <ScrollView
      className="flex-1 px-5 pt-5"
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        className="mb-6"
        entering={FadeInUp.delay(100).springify().damping(20).stiffness(100)}
        layout={LinearTransition.springify().damping(20).stiffness(100)}
      >
        <Text className="text-2xl font-bold text-foreground mb-2">
          Personal Information
        </Text>
        <Text className="text-base text-muted-foreground">
          Please provide your basic information and emergency contact details.
        </Text>
      </Animated.View>

      <StaggeredFormField delay={200} index={0}>
        <FormField
          required
          label="First Name"
          value={personalInfo.firstName ?? ""}
          onChangeText={(text) =>
            setPersonalInfo({ ...personalInfo, firstName: text })
          }
          placeholder="Enter your first name"
          error={errors["firstName"]}
          accessibilityLabel="First name input"
        />
      </StaggeredFormField>

      <StaggeredFormField delay={200} index={1}>
        <FormField
          label="Middle Name"
          value={personalInfo.middleName ?? ""}
          onChangeText={(text) =>
            setPersonalInfo({ ...personalInfo, middleName: text })
          }
          placeholder="Enter your middle name (optional)"
          error={errors["middleName"]}
          accessibilityLabel="Middle name input"
        />
      </StaggeredFormField>

      <StaggeredFormField delay={200} index={2}>
        <FormField
          required
          label="Last Name"
          value={personalInfo.lastName ?? ""}
          onChangeText={(text) =>
            setPersonalInfo({ ...personalInfo, lastName: text })
          }
          placeholder="Enter your last name"
          error={errors["lastName"]}
          accessibilityLabel="Last name input"
        />
      </StaggeredFormField>

      <StaggeredFormField delay={200} index={3}>
        <DatePicker
          required
          label="Date of Birth"
          value={
            personalInfo.dateOfBirth ? new Date(personalInfo.dateOfBirth) : null
          }
          onChange={(date) =>
            setPersonalInfo({ ...personalInfo, dateOfBirth: date })
          }
          error={errors["dateOfBirth"]}
          maximumDate={new Date()}
          accessibilityLabel="Date of birth picker"
        />
      </StaggeredFormField>

      <StaggeredFormField delay={200} index={4}>
        <FormField
          required
          label="Email Address"
          value={personalInfo.email ?? ""}
          onChangeText={(text) =>
            setPersonalInfo({ ...personalInfo, email: text })
          }
          placeholder="Enter your email address"
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors["email"]}
          accessibilityLabel="Email address input"
        />
      </StaggeredFormField>

      <StaggeredFormField delay={200} index={5}>
        <FormField
          required
          label="Phone Number"
          value={personalInfo.phone ?? ""}
          onChangeText={(text) => {
            const formatted = formatPhoneNumber(text);
            setPersonalInfo({ ...personalInfo, phone: formatted });
          }}
          placeholder="(XXX) XXX-XXXX"
          keyboardType="phone-pad"
          error={errors["phone"]}
          accessibilityLabel="Phone number input"
        />
      </StaggeredFormField>

      <Animated.View
        entering={FadeInUp.delay(800).springify().damping(20).stiffness(100)}
        layout={LinearTransition.springify().damping(20).stiffness(100)}
      >
        <Text className="text-lg font-semibold text-foreground mb-4 mt-6">
          Emergency Contact
        </Text>
      </Animated.View>

      <StaggeredFormField delay={200} index={7}>
        <FormField
          required
          label="Full Name"
          value={personalInfo.emergencyContact?.fullName ?? ""}
          onChangeText={(text) =>
            setPersonalInfo({
              ...personalInfo,
              emergencyContact: {
                ...personalInfo.emergencyContact!,
                fullName: text,
              },
            })
          }
          placeholder="Enter emergency contact name"
          error={errors["emergencyContact.fullName"]}
          accessibilityLabel="Emergency contact name input"
        />
      </StaggeredFormField>

      <StaggeredFormField delay={200} index={8}>
        <Dropdown
          required
          label="Relationship"
          value={personalInfo.emergencyContact?.relationship ?? ""}
          options={RELATIONSHIPS.map((rel) => ({ value: rel, label: rel }))}
          onSelect={(value) =>
            setPersonalInfo({
              ...personalInfo,
              emergencyContact: {
                ...personalInfo.emergencyContact!,
                relationship: value,
              },
            })
          }
          error={errors["emergencyContact.relationship"]}
          accessibilityLabel="Emergency contact relationship dropdown"
        />
      </StaggeredFormField>

      <StaggeredFormField delay={200} index={9}>
        <FormField
          required
          label="Primary Phone"
          value={personalInfo.emergencyContact?.primaryPhone ?? ""}
          onChangeText={(text) => {
            const formatted = formatPhoneNumber(text);
            setPersonalInfo({
              ...personalInfo,
              emergencyContact: {
                ...personalInfo.emergencyContact!,
                primaryPhone: formatted,
              },
            });
          }}
          placeholder="(XXX) XXX-XXXX"
          keyboardType="phone-pad"
          error={errors["emergencyContact.primaryPhone"]}
          accessibilityLabel="Emergency contact primary phone input"
        />
      </StaggeredFormField>

      <StaggeredFormField delay={200} index={10}>
        <FormField
          label="Secondary Phone"
          value={personalInfo.emergencyContact?.secondaryPhone ?? ""}
          onChangeText={(text) => {
            const formatted = formatPhoneNumber(text);
            setPersonalInfo({
              ...personalInfo,
              emergencyContact: {
                ...personalInfo.emergencyContact!,
                secondaryPhone: formatted,
              },
            });
          }}
          placeholder="(XXX) XXX-XXXX (optional)"
          keyboardType="phone-pad"
          error={errors["emergencyContact.secondaryPhone"]}
          accessibilityLabel="Emergency contact secondary phone input"
        />
      </StaggeredFormField>
    </ScrollView>
  );
}
