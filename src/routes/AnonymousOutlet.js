import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../shared/hooks/useAuth";

export const AnonymousOutlet = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
