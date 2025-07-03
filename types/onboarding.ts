import * as z from "zod/v4";

// Validation schemas
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name too long"),
  middleName: z.string().max(50, "Middle name too long").optional(),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name too long"),
  dateOfBirth: z
    .date({
      message: "Date of birth is required",
    })
    .refine(
      (date) => {
        const age = new Date().getFullYear() - date.getFullYear();
        return age >= 13 && age <= 120;
      },
      { message: "Age must be between 13 and 120 years" }
    ),
  email: z.email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone format: (XXX) XXX-XXXX"),
  emergencyContact: z.object({
    fullName: z.string().min(1, "Emergency contact name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    primaryPhone: z
      .string()
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone format: (XXX) XXX-XXXX"),
    secondaryPhone: z
      .string()
      .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone format: (XXX) XXX-XXXX")
      .optional()
      .or(z.literal("")),
  }),
});

export const diseaseHistorySchema = z.object({
  primaryDiagnosis: z.string().min(1, "Primary diagnosis is required"),
  otherDiagnosis: z.string().optional(),
  diagnosisDate: z.date({
    message: "Diagnosis date is required",
  }),
  diseaseStage: z.enum(["mild", "moderate", "severe", "end-stage"], {
    message: "Disease stage is required",
  }),
  secondaryConditions: z.array(z.string()).optional(),
  testResults: z
    .array(
      z.object({
        testType: z.string().min(1, "Test type is required"),
        dateConducted: z.date({
          message: "Test date is required",
        }),
        result: z.string().min(1, "Test result is required"),
        unit: z.string().min(1, "Unit is required"),
        labName: z.string().min(1, "Lab/facility name is required"),
      })
    )
    .optional(),
});

export const medicationSchema = z.object({
  medications: z
    .array(
      z.object({
        name: z.string().min(1, "Medication name is required"),
        dosage: z.string().min(1, "Dosage is required"),
        unit: z.string().min(1, "Unit is required"),
        frequency: z.string().min(1, "Frequency is required"),
        timingRequirements: z.array(z.string()).optional(),
        startDate: z.date({
          message: "Start date is required",
        }),
        specialInstructions: z.string().optional(),
        prescribingDoctor: z.string().min(1, "Prescribing doctor is required"),
      })
    )
    .optional(),
});

export const onboardingSchema = z.object({
  personalInfo: personalInfoSchema,
  diseaseHistory: diseaseHistorySchema,
  medications: medicationSchema,
  finalConfirmation: z
    .boolean()
    .refine((val) => val === true, "You must confirm to proceed"),
});

// TypeScript types
export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type DiseaseHistory = z.infer<typeof diseaseHistorySchema>;
export type Medications = z.infer<typeof medicationSchema>;
export type OnboardingData = z.infer<typeof onboardingSchema>;

// Constants
export const DIAGNOSIS_OPTIONS = [
  "Hepatitis B",
  "Hepatitis C",
  "Non-alcoholic fatty liver disease (NAFLD)",
  "Alcoholic liver disease",
  "Cirrhosis",
  "Primary biliary cholangitis",
  "Primary sclerosing cholangitis",
  "Autoimmune hepatitis",
  "Wilson disease",
  "Hemochromatosis",
  "Alpha-1 antitrypsin deficiency",
  "Other",
];

export const DISEASE_STAGES = [
  { value: "mild", label: "Mild" },
  { value: "moderate", label: "Moderate" },
  { value: "severe", label: "Severe" },
  { value: "end-stage", label: "End-Stage" },
];

export const SECONDARY_CONDITIONS = [
  "Diabetes",
  "Hypertension",
  "Heart disease",
  "Kidney disease",
  "Obesity",
  "Depression",
  "Anxiety",
  "Osteoporosis",
];

export const MEDICATION_FREQUENCIES = [
  "Once daily",
  "Twice daily",
  "Three times daily",
  "Four times daily",
  "Every other day",
  "Weekly",
  "As needed",
];

export const TIMING_REQUIREMENTS = [
  "With food",
  "Empty stomach",
  "Before bed",
  "Morning only",
  "Evening only",
];

export const COMMON_MEDICATIONS = [
  "Lactulose",
  "Rifaximin",
  "Spironolactone",
  "Furosemide",
  "Propranolol",
  "Ursodiol",
  "Vitamin D",
  "Vitamin B12",
  "Folic acid",
  "Iron supplements",
];

export const TEST_TYPES = [
  "ALT (Alanine aminotransferase)",
  "AST (Aspartate aminotransferase)",
  "Bilirubin",
  "Albumin",
  "INR (International normalized ratio)",
  "Platelet count",
  "AFP (Alpha-fetoprotein)",
  "Hepatitis B surface antigen",
  "Hepatitis C antibody",
  "Liver biopsy",
];

export const RELATIONSHIPS = [
  "Spouse",
  "Parent",
  "Child",
  "Sibling",
  "Friend",
  "Other family member",
  "Caregiver",
];
