import { createRoute } from "@tanstack/react-router";
import { AppPaths } from "./paths";
import rootRoute from "./root";

export const forbiddenRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppPaths.FORBIDDEN,
  component: () => <div>403 Forbidden</div>,
});
