import { prefetchProducts } from "@api/products";
import HomePage from "@pages/Home";
import { createRoute } from "@tanstack/react-router";
import {
  searchParamsSchema,
  type SearchParamsType,
} from "@validation/searchParams";
import type { RootContext } from "router";
import rootRoute from "./root";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  validateSearch: searchParamsSchema,
  component: () => <HomePage />,
  loader: async ({ context }) => {
    const { queryClient } = context as RootContext;

    const urlSearchParams = new URLSearchParams(location.search);
    const raw = Object.fromEntries(urlSearchParams.entries());
    const validated = searchParamsSchema.parse(raw);

    const filters: SearchParamsType = {
      ...validated,
    };
    await prefetchProducts(queryClient, filters);
  },
});

export default indexRoute;
