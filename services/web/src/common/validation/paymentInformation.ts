import {
  CVC_LENGTH,
  cvcRegex,
  ibanRegex,
  isNotExpired,
  MAX_EXPIRTY_MONTH,
  MIN_EXPIRY_MONTH,
} from "@cart-app/types";
import {
  preprocessOptionalNumber,
  preprocessOptionalString,
} from "@helpers/validationPreproccess";
import { z } from "zod";

export const paymentInformationSchema = z
  .object({
    expiryMonth: z
      .number()
      .min(MIN_EXPIRY_MONTH, `Month must be at least ${MIN_EXPIRY_MONTH}`)
      .max(
        MAX_EXPIRTY_MONTH,
        `Month cannot be higher than ${MAX_EXPIRTY_MONTH}`,
      ),
    expiryYear: z.number(),
    cvc: z
      .string()
      .length(CVC_LENGTH, `CVV must have length of ${CVC_LENGTH} `)
      .regex(cvcRegex, "CVC can only container numbers"),
    iban: z.string().regex(ibanRegex, "Example of valid iban HR12345678910"),
  })
  .refine(
    (data) => {
      return isNotExpired(data.expiryMonth, data.expiryYear);
    },
    {
      message: "Card has already expired",
      path: ["expiryYear"],
    },
  );

export type PaymentInformationFormSchemaProps = z.infer<
  typeof paymentInformationSchema
>;

export const paymentSchemaPartial = z
  .object({
    expiryMonth: z.preprocess(
      preprocessOptionalNumber,
      z.number().min(MIN_EXPIRY_MONTH).max(MAX_EXPIRTY_MONTH).optional(),
    ),

    expiryYear: z.preprocess(preprocessOptionalNumber, z.number().optional()),
    cvc: z.preprocess(
      preprocessOptionalString,
      z.string().length(CVC_LENGTH).regex(cvcRegex).optional(),
    ),

    iban: z
      .preprocess(preprocessOptionalString, z.string().regex(ibanRegex))
      .optional(),
  })
  .refine(
    (data) => {
      return isNotExpired(data.expiryMonth, data.expiryYear);
    },
    {
      message: "Card has already expired",
      path: ["expiryYear"],
    },
  );
