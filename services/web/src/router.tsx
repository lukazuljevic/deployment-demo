import { adminRoute } from "@routes/admin";
import { loginRoute, registerRoute } from "@routes/auth";
import { forbiddenRoute } from "@routes/forbidden";
import indexRoute from "@routes/indexRoute";
import rootRoute from "@routes/root";
import { createRouter } from "@tanstack/react-router";

const routeTree = rootRoute.addChildren([
  indexRoute,
  registerRoute,
  loginRoute,
  adminRoute,
  forbiddenRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
