import PrivateRoute from "@components/PrivateRoute";
import ProfilePage from "@pages/Profile/ProfilePage";
import { createRoute } from "@tanstack/react-router";
import { appLayoutRoute } from "./appLayout";
import { AppPaths } from "./paths";

const profileRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: AppPaths.PROFILE,
  component: () => (
    <PrivateRoute>
      <ProfilePage />
    </PrivateRoute>
  ),
});

export default profileRoute;
