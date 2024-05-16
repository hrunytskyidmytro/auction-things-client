import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../shared/hooks/useAuth";

export const PrivateOutlet = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
