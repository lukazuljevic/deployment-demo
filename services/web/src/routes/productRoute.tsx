import { getProduct, prefetchProducts } from "@api/products";
import ProductDetails from "@pages/ProductDetails";
import ProductsPage from "@pages/ProductsPage";
import type { RootContext } from "@routes/router";
import { createRoute } from "@tanstack/react-router";
import {
  searchParamsSchema,
  type SearchParamsType,
} from "common/validation/searchParams";
import { appLayoutRoute } from "./appLayout";
import { AppPaths } from "./paths";

export const productsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: AppPaths.PRODUCTS,
  validateSearch: searchParamsSchema,
  component: () => <ProductsPage />,
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

export const productRoute = createRoute({
  getParentRoute: () => productsRoute,
  path: "$productId",
  component: () => <ProductDetails />,
  loader: async ({ params }) => {
    const product = await getProduct(params.productId);
    return product;
  },
});
