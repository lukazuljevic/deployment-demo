import { prefetchProducts } from "@api/products";
import HomePage from "@pages/Home";
import type { RootContext } from "@routes/router";
import { createRoute } from "@tanstack/react-router";
import {
  homeSearchParamsSchema,
  searchParamsSchema,
  type SearchParamsType,
} from "common/validation/searchParams";
import { appLayoutRoute } from "./appLayout";

const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/",
  validateSearch: homeSearchParamsSchema,
  component: () => <HomePage />,
  loader: async ({ context, location }) => {
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
