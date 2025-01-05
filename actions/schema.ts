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
  pageCount: z.number().optional(),
  authors: z.array(z.string()).optional(),
});

export type AddBookSchemaFormValues = z.infer<typeof addBookSchema>;

export const editBookSchema = z.object({
  bookId: z.string(),
  isReading: z.boolean().optional(),
  isFinished: z.boolean().optional(),
  progress: z.number().optional(),
  progressType: z.enum(["page", "percentage"]).optional(),
});

export type EditBookSchemaFormValues = z.infer<typeof editBookSchema>;

export const deleteBookSchema = z.object({
  bookId: z.string(),
});

export type DeleteBookSchemaFormValues = z.infer<typeof deleteBookSchema>;
