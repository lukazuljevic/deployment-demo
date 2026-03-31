import {
  MIN_PASSWORD_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  passwordRegex,
} from "@cart-app/types";
import { z } from "zod";

export const personalInformationSchema = z
  .object({
    email: z.email("Email has invalid format"),
    firstName: z
      .string()
      .min(NAME_MIN_LENGTH, "First name is required")
      .max(
        NAME_MAX_LENGTH,
        `Name can't be longer than ${NAME_MIN_LENGTH} characters`,
      ),
    lastName: z
      .string()
      .min(NAME_MIN_LENGTH, "Last name is required")
      .max(
        NAME_MAX_LENGTH,
        `Last name can't be longer than ${NAME_MIN_LENGTH} characters`,
      ),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      )
      .regex(passwordRegex),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PersonalInformationFormSchemaProps = z.infer<
  typeof personalInformationSchema
>;
