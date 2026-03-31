import { createRoute } from "@tanstack/react-router";
import rootRoute from "./root";

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>Home page</div>,
});

export default indexRoute;
