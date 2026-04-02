import type { AuthContextType } from "@context/AuthContext";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouterContext {
  auth: AuthContextType;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
export default rootRoute;
