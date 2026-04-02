import useAuth from "@hooks/useAuth";
import { appLayoutRoute } from "@routes/appLayout";
import { loginRoute } from "@routes/auth";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

const RootRedirect = () => {
  const { isLoading, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (isLoggedIn) navigate({ to: appLayoutRoute.id });

    if (!isLoggedIn)
      navigate({
        to: loginRoute.id,
        search: { redirect: location.pathname },
      });
  }, [isLoggedIn]);

  return <div>Loading...</div>;
};

export default RootRedirect;
