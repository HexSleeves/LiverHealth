import * as z from "zod/v4";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .toLowerCase(),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .trim(),
    email: z
      .email("Please enter a valid email address")
      .min(1, "Email is required")
      .toLowerCase(),
    confirmEmail: z
      .string()
      .min(1, "Please confirm your email address")
      .email("Please enter a valid email address")
      .toLowerCase(),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email addresses do not match",
    path: ["confirmEmail"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required")
    .toLowerCase(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
