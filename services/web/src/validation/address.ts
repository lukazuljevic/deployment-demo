import {
  AddressType,
  MAX_CITY_LENGTH,
  MAX_COUNTRY_LENGTH,
  MAX_STREET_LENGTH,
  MAX_ZIP_LENGTH,
  MIN_CITY_LENGTH,
  MIN_COUNTRY_LENGTH,
  MIN_STREET_LENGTH,
  MIN_ZIP_LENGTH,
} from "@cart-app/types";
import { z } from "zod";

export const addressSchema = z.object({
  street: z
    .string()
    .min(
      MIN_STREET_LENGTH,
      `Street can't be shorter than ${MIN_STREET_LENGTH} characters`,
    )
    .max(
      MAX_STREET_LENGTH,
      `Address can't be longer than ${MAX_STREET_LENGTH} characters`,
    ),
  city: z
    .string()
    .min(
      MIN_CITY_LENGTH,
      `City can't be shorter than ${MIN_CITY_LENGTH} characters`,
    )
    .max(
      MAX_CITY_LENGTH,
      `City can't be longer than ${MAX_CITY_LENGTH} characters`,
    ),
  country: z
    .string()
    .min(
      MIN_COUNTRY_LENGTH,
      `Country can't be shorter than ${MIN_COUNTRY_LENGTH} characters`,
    )
    .max(
      MAX_COUNTRY_LENGTH,
      `Country can't be longer than ${MAX_COUNTRY_LENGTH} characters`,
    ),
  zipCode: z
    .string()
    .min(
      MIN_ZIP_LENGTH,
      `Zipcode can't be shorter than ${MIN_ZIP_LENGTH} characters`,
    )
    .max(
      MAX_ZIP_LENGTH,
      `Zipcode can't be longer than ${MAX_ZIP_LENGTH} characters`,
    )
    .regex(/^\d+$/, "Zipcode must contain only numbers"),

  type: z.enum(AddressType),
});

export type AddressFormSchemaProps = z.infer<typeof addressSchema>;
