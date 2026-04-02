import { appLayoutRoute } from "@routes/appLayout";
import { useNavigate } from "@tanstack/react-router";

const useGoHome = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate({
      to: appLayoutRoute.id,
    });
  };

  return goHome;
};

export default useGoHome;
