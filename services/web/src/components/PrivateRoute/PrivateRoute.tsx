import useAuth from "@hooks/useAuth";
import { loginRoute } from "@routes/auth";
import { forbiddenRoute } from "@routes/forbidden";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute = ({ children, adminOnly }: PrivateRouteProps) => {
  const { isLoading, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();
  const loginApi = getRouteApi(loginRoute.id);
  const forbiddenApi = getRouteApi(forbiddenRoute.id);

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn)
      navigate({
        to: loginApi.id,
        search: { redirect: location.pathname },
      });

    if (adminOnly && isAdmin === false)
      navigate({
        to: forbiddenApi.id,
      });
  }, [isLoggedIn, isAdmin]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default PrivateRoute;
