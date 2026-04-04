import {
  AddressType,
  MAX_CITY_LENGTH,
  MAX_COUNTRY_LENGTH,
  MAX_COUNTY_LENGTH,
  MAX_STREET_LENGTH,
  MAX_ZIP_LENGTH,
  MIN_CITY_LENGTH,
  MIN_COUNTRY_LENGTH,
  MIN_COUNTY_LENGTH,
  MIN_STREET_LENGTH,
  MIN_ZIP_LENGTH,
  zipcodeRegex,
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
  county: z
    .string()
    .min(
      MIN_COUNTY_LENGTH ?? 2,
      `County can't be shorter than ${MIN_COUNTY_LENGTH ?? 2} characters`,
    )
    .max(
      MAX_COUNTY_LENGTH ?? 100,
      `County can't be longer than ${MAX_COUNTY_LENGTH ?? 100} characters`,
    ),
  zipcode: z
    .string()
    .min(
      MIN_ZIP_LENGTH,
      `Zipcode can't be shorter than ${MIN_ZIP_LENGTH} characters`,
    )
    .max(
      MAX_ZIP_LENGTH,
      `Zipcode can't be longer than ${MAX_ZIP_LENGTH} characters`,
    )
    .regex(zipcodeRegex, "Zipcode must contain only numbers"),

  type: z.enum(AddressType),
});

export type AddressFormSchemaProps = z.infer<typeof addressSchema>;

import { preprocessOptionalString } from "@helpers/validationPreproccess";

export const addressSchemaPartial = z.object({
  id: z.string().optional(),
  street: z.preprocess(
    preprocessOptionalString,
    z
      .string()
      .min(
        MIN_STREET_LENGTH,
        `Street can't be shorter than ${MIN_STREET_LENGTH} characters`,
      )
      .max(
        MAX_STREET_LENGTH,
        `Address can't be longer than ${MAX_STREET_LENGTH} characters`,
      )
      .optional(),
  ),

  city: z.preprocess(
    preprocessOptionalString,
    z
      .string()
      .min(
        MIN_CITY_LENGTH,
        `City can't be shorter than ${MIN_CITY_LENGTH} characters`,
      )
      .max(
        MAX_CITY_LENGTH,
        `City can't be longer than ${MAX_CITY_LENGTH} characters`,
      )
      .optional(),
  ),

  country: z.preprocess(
    preprocessOptionalString,
    z
      .string()
      .min(
        MIN_COUNTRY_LENGTH,
        `Country can't be shorter than ${MIN_COUNTRY_LENGTH} characters`,
      )
      .max(
        MAX_COUNTRY_LENGTH,
        `Country can't be longer than ${MAX_COUNTRY_LENGTH} characters`,
      )
      .optional(),
  ),

  county: z.preprocess(
    preprocessOptionalString,
    z
      .string()
      .min(
        MIN_COUNTY_LENGTH ?? 2,
        `County can't be shorter than ${MIN_COUNTY_LENGTH ?? 2} characters`,
      )
      .max(
        MAX_COUNTY_LENGTH ?? 100,
        `County can't be longer than ${MAX_COUNTY_LENGTH ?? 100} characters`,
      )
      .optional(),
  ),
  zipcode: z.preprocess(
    preprocessOptionalString,
    z
      .string()
      .min(
        MIN_ZIP_LENGTH,
        `Zipcode can't be shorter than ${MIN_ZIP_LENGTH} characters`,
      )
      .max(
        MAX_ZIP_LENGTH,
        `Zipcode can't be longer than ${MAX_ZIP_LENGTH} characters`,
      )
      .regex(zipcodeRegex, "Zipcode must contain only numbers")
      .optional(),
  ),

  type: z.enum(AddressType),
});
