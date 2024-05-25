import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../shared/hooks/useAuth";

export const PrivateOutlet = () => {
  const { isLoggedIn, isAdmin, isSeller } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (pathname.startsWith("/admin") && !isAdmin) {
    return <Navigate to="/" />;
  }

  if (pathname.startsWith("/seller") && !isSeller) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
