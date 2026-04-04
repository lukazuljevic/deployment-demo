import {
  MIN_PASSWORD_LENGTH,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  nameRegex,
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
      )
      .regex(nameRegex, "Name can only have letters and apostrophes"),
    lastName: z
      .string()
      .min(NAME_MIN_LENGTH, "Last name is required")
      .max(
        NAME_MAX_LENGTH,
        `Last name can't be longer than ${NAME_MIN_LENGTH} characters`,
      )
      .regex(nameRegex, "Last Name can only have letters and apostrophes"),
    password: z
      .string()
      .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      )
      .regex(
        passwordRegex,
        "Password must have at least one letter, one number and one special character",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type PersonalInformationFormSchemaProps = z.infer<
  typeof personalInformationSchema
>;
