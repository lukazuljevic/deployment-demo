import RootRedirect from "@components/RootRedirect";
import { createRoute } from "@tanstack/react-router";
import rootRoute from "./root";

const redirectToAuthRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: () => <RootRedirect />,
});

export default redirectToAuthRoute;
