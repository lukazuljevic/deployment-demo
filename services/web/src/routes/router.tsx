import type useAuth from "@hooks/useAuth";
import rootRoute from "@routes/root";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { adminRoute } from "./admin";
import { appLayoutRoute } from "./appLayout";
import { authLayoutRoute, loginRoute, registerRoute } from "./auth";
import { forbiddenRoute } from "./forbidden";
import indexRoute from "./indexRoute";
import redirectToAuthRoute from "./redirect";
export interface RootContext {
  auth: ReturnType<typeof useAuth>;
  queryClient: QueryClient;
}

const routeTree = rootRoute.addChildren([
  redirectToAuthRoute,
  authLayoutRoute.addChildren([loginRoute, registerRoute]),
  appLayoutRoute.addChildren([indexRoute, adminRoute, forbiddenRoute]),
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
