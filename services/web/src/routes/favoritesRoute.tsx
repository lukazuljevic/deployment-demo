import PrivateRoute from "@components/PrivateRoute";
import FavoritesPage from "@pages/Favorites/FavoritesPage";
import { createRoute } from "@tanstack/react-router";
import { appLayoutRoute } from "./appLayout";
import { AppPaths } from "./paths";

const favoritesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: AppPaths.FAVORITES,
  component: () => (
    <PrivateRoute>
      <FavoritesPage />
    </PrivateRoute>
  ),
});

export default favoritesRoute;
