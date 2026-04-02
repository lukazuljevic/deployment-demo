import AuthLayout from "@components/AuthLayout";
import LoginPage from "@pages/Login";
import RegisterPage from "@pages/Register";
import { createRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import indexRoute from "./indexRoute";
import { AppPaths } from "./paths";
import rootRoute from "./root";

export const authLayoutRoute = createRoute({
  path: "auth",
  getParentRoute: () => rootRoute,
  component: () => <AuthLayout />,
});

export const registerRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  validateSearch: z.object({ redirect: z.string().optional().catch("") }),
  path: AppPaths.REGISTER,
  component: () => <RegisterPage />,
  beforeLoad: ({ context, search }) => {
    const fallback = indexRoute.id;
    if (context.auth.isLoggedIn) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
});

export const loginRoute = createRoute({
  getParentRoute: () => authLayoutRoute,
  validateSearch: z.object({ redirect: z.string().optional().catch("") }),
  path: AppPaths.LOGIN,
  beforeLoad: ({ context, search }) => {
    const fallback = indexRoute.id;
    if (context.auth.isLoggedIn) {
      throw redirect({ to: search.redirect || fallback });
    }
  },
  component: () => <LoginPage />,
});
