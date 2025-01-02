import { z } from "zod";

export const otpSignInSchema = z.object({
  email: z.string().email(),
});

export type OtpSignInSchemaFormValues = z.infer<typeof otpSignInSchema>;

export const verifyOtpSchema = z.object({
  token: z.string(),
  email: z.string(),
});

export type VerifyOtpSchemaFormValues = z.infer<typeof verifyOtpSchema>;

export const onboardingSchema = z.object({
  username: z.string(),
});

export type OnboardingSchemaFormValues = z.infer<typeof onboardingSchema>;

export const addBookSchema = z.object({
  title: z.string(),
  isReading: z.boolean().optional(),
});

export type AddBookSchemaFormValues = z.infer<typeof addBookSchema>;
