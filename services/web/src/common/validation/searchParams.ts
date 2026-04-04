import { MIN_PAGE_LIMIT, SortOrder } from "@cart-app/types";
import z from "zod";

export const searchParamsSchema = z.object({
  categoryId: z.uuid().optional(),
  search: z.string().optional(),
  sortOrder: z.enum(SortOrder).optional(),
  inStock: z
    .union([z.string(), z.boolean()])
    .transform((val) => val === true || val === "true")
    .optional(),
  limit: z
    .union([z.string(), z.number()])
    .transform(Number)
    .refine(
      (val) => val >= MIN_PAGE_LIMIT,
      `Page limit must be at least ${MIN_PAGE_LIMIT}`,
    )
    .default(MIN_PAGE_LIMIT),
});

export type SearchParamsType = z.infer<typeof searchParamsSchema>;
