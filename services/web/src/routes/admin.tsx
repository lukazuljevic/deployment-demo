import AdminLayout from "@components/AdminLayout";
import PrivateRoute from "@components/PrivateRoute";
import AdminDashboard from "@pages/AdminDashboard";
import OrdersPage from "@pages/OrdersPage";
import { createRoute } from "@tanstack/react-router";
import { ordersParamsSchema } from "@validation/searchParams";
import { AppPaths } from "./paths";
import rootRoute from "./root";

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: AppPaths.ADMIN,
  component: () => (
    <PrivateRoute adminOnly>
      <AdminLayout />
    </PrivateRoute>
  ),
});

export const adminDashboardRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/",
  component: () => <AdminDashboard />,
});

export const adminOrdersRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: AppPaths.ADMIN_ORDERS,
  validateSearch: ordersParamsSchema,
  component: () => <OrdersPage />,
});
