import PrivateRoute from "@components/PrivateRoute";
import Cart from "@pages/Cart";
import { createRoute } from "@tanstack/react-router";
import { appLayoutRoute } from "./appLayout";
import { AppPaths } from "./paths";

const cartRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: AppPaths.CART,
  component: () => (
    <PrivateRoute>
      <Cart />
    </PrivateRoute>
  ),
});

export default cartRoute;
