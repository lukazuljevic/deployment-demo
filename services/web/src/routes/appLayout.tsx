import AppLayout from "@components/AppLayout";
import { createRoute } from "@tanstack/react-router";
import rootRoute from "./root";

export const appLayoutRoute = createRoute({
  path: "app",
  getParentRoute: () => rootRoute,
  component: () => <AppLayout />,
});
