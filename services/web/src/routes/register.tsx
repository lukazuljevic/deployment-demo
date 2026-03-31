import RegisterPage from "@pages/Register";
import { createRoute } from "@tanstack/react-router";
import rootRoute from "./root";

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: () => <RegisterPage />,
});

export default registerRoute;
