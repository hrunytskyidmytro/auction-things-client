import React from "react";
import { Route, Routes } from "react-router-dom";

import Auth from "../user/pages/Auth";
import NotFoundPage from "../shared/pages/NotFoundPage";

import UserLayout from "../layouts/UserLayout/UserLayout";
import UserRoutes from "./UserRoutes";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="*" element={<UserRoutes />} />
          <Route path="/auth" element={<Auth />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
