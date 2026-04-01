import PrivateRoute from "@components/PrivateRoute";
import { createRoute } from "@tanstack/react-router";
import { AppPaths } from "./paths";
import rootRoute from "./root";

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppPaths.ADMIN,
  component: () => (
    <PrivateRoute adminOnly>
      <div>Admin Page</div>
    </PrivateRoute>
  ),
});
