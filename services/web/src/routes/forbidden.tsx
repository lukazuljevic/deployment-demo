import { createRoute } from "@tanstack/react-router";
import { appLayoutRoute } from "./appLayout";
import { AppPaths } from "./paths";

export const forbiddenRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: AppPaths.FORBIDDEN,
  component: () => <div>403 Forbidden</div>,
});
