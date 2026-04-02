import type useAuth from "@hooks/useAuth";
import { adminRoute } from "@routes/admin";
import { loginRoute, registerRoute } from "@routes/auth";
import { forbiddenRoute } from "@routes/forbidden";
import indexRoute from "@routes/indexRoute";
import rootRoute from "@routes/root";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";

export interface RootContext {
  auth: ReturnType<typeof useAuth>;
  queryClient: QueryClient;
}

const routeTree = rootRoute.addChildren([
  indexRoute,
  registerRoute,
  loginRoute,
  adminRoute,
  forbiddenRoute,
]);

const context: RootContext = {
  auth: undefined!,
  queryClient: undefined!,
};

export const router = createRouter({
  routeTree,
  context,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
