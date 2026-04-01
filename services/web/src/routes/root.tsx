import type { AuthContextType } from "@context/AuthContext";
import {
  createRootRouteWithContext,
  getRouteApi,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { adminRoute } from "./admin";
import { loginRoute, registerRoute } from "./auth";
import indexRoute from "./indexRoute";

interface RouterContext {
  auth: AuthContextType;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const loginApi = getRouteApi(loginRoute.id);
    const registerApi = getRouteApi(registerRoute.id);
    const adminApi = getRouteApi(adminRoute.id);
    const homeApi = getRouteApi(indexRoute.id);

    return (
      <>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to={homeApi.id}>Home</Link>
          <Link to={registerApi.id} search={{}}>
            Register
          </Link>
          <Link to={loginApi.id} search={{}}>
            Login
          </Link>
          <Link to={adminApi.id} search={{}}>
            Admin
          </Link>
        </nav>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});

export default rootRoute;
