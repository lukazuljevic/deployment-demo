import useAuth from "@hooks/useAuth";
import { loginRoute } from "@routes/auth";
import { forbiddenRoute } from "@routes/forbidden";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const PrivateRoute = ({ children, adminOnly }: PrivateRouteProps) => {
  const { isLoading, isLoggedIn, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (!isLoggedIn)
      navigate({
        to: loginRoute.id,
        search: { redirect: location.pathname },
      });

    if (adminOnly && isAdmin === false)
      navigate({
        to: forbiddenRoute.id,
      });
  }, [isLoggedIn, isAdmin]);

  if (isLoading) return <div>Loading...</div>;

  return <>{children}</>;
};

export default PrivateRoute;
