import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from "@cart-app/types";
import { preprocessOptionalString } from "@helpers/validationPreproccess";
import { z } from "zod";
import { addressSchemaPartial } from "./address";
import { paymentSchemaPartial } from "./paymentInformation";

export const profileSchema = z.object({
  firstName: z.preprocess(
    preprocessOptionalString,
    z
      .string()
      .min(NAME_MIN_LENGTH, {
        message: `First name must be at least ${NAME_MIN_LENGTH} characters`,
      })
      .max(NAME_MAX_LENGTH, {
        message: `First name must be at most ${NAME_MAX_LENGTH} characters`,
      })
      .optional(),
  ),
  lastName: z.preprocess(
    preprocessOptionalString,
    z
      .string()
      .min(NAME_MIN_LENGTH, {
        message: `Last name must be at least ${NAME_MIN_LENGTH} characters`,
      })
      .max(NAME_MAX_LENGTH, {
        message: `Last name must be at most ${NAME_MAX_LENGTH} characters`,
      })
      .optional(),
  ),

  address: addressSchemaPartial.optional(),
  card: paymentSchemaPartial.optional(),
});

export type ProfileSchemaProps = z.infer<typeof profileSchema>;
