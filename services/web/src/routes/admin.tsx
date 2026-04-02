import PrivateRoute from "@components/PrivateRoute";
import { createRoute } from "@tanstack/react-router";
import { appLayoutRoute } from "./appLayout";
import { AppPaths } from "./paths";

export const adminRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: AppPaths.ADMIN,
  component: () => (
    <PrivateRoute adminOnly>
      <div>Admin Page</div>
    </PrivateRoute>
  ),
});
