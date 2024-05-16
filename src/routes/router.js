import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import Login from "../user/pages/Login";
import PinCodeInput from "../user/pages/PinCodeInput";
import NotFoundPage from "../shared/pages/NotFoundPage";

import Lots from "../shared/components/Lots";
import NewLot from "../shared/components/NewLot";
import MoreInfo from "../shared/components/MoreInfo";

import UserLayout from "../layouts/UserLayout/UserLayout";
import { AnonymousOutlet } from "./AnonymousOutlet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <MoreInfo />,
      },
      {
        path: "lots",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Lots />,
          },
          {
            path: "new",
            element: <NewLot />,
          },
        ],
      },
      {
        element: <AnonymousOutlet />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "check-pin-code",
            element: <PinCodeInput />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
