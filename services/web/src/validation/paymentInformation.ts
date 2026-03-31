import {
  CVC_LENGTH,
  cvcRegex,
  ibanRegex,
  isNotExpired,
  MAX_EXPIRTY_MONTH,
  MIN_EXPIRY_MONTH,
} from "@cart-app/types";
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
    cardholderName: z
      .string()
      .min(1, "Cardholder name is required")
      .max(50, "Cardholder name is too long"),
    cvc: z
      .string()
      .length(CVC_LENGTH, `CVV must have length of ${CVC_LENGTH} `)
      .regex(cvcRegex),
    iban: z.string().regex(ibanRegex),
  })
  .refine(
    (data) => {
      return isNotExpired(data.expiryMonth, data.expiryYear);
    },
    {
      message: "Card has already expired",
      path: ["expirtyMonth"],
    },
  );

export type PaymentInformationFormSchemaProps = z.infer<
  typeof paymentInformationSchema
>;
