import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

import UserLayout from "../layouts/UserLayout/UserLayout";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";

import Login from "../user/pages/Login";
import UserProfile from "../user/pages/UserProfile";
import RoleSelectionPage from "../user/pages/RoleSelectionPage";
import BuyerSignUp from "../user/pages/BuyerSignUp";
import SellerSignUp from "../user/pages/SellerSignUp";
import GoogleAuthCallback from "../user/pages/GoogleAuthCallback";

import PinCodeInput from "../user/pages/PinCodeInput";
import RequestPasswordReset from "../user/pages/RequestPasswordReset";
import ResetPassword from "../user/pages/ResetPassword";

import NotFoundPage from "../shared/pages/NotFoundPage";

import Lots from "../shared/components/Lots";
import NewLot from "../shared/components/NewLot";
import MoreInfo from "../shared/components/MoreInfo";

import SellerWelcomePage from "../user/pages/SellerWelcomePage";

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
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "welcome-seller",
        element: <SellerWelcomePage />,
      },
    ],
  },
  {
    element: <BasicLayout />,
    children: [
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
          {
            path: "select-role",
            element: <RoleSelectionPage />,
          },
          {
            path: "signup",
            element: <Outlet />,
            children: [
              {
                path: "buyer",
                element: <BuyerSignUp />,
              },
              {
                path: "seller",
                element: <SellerSignUp />,
              },
            ],
          },
          {
            path: "/auth/google/callback",
            element: <GoogleAuthCallback />,
          },
          {
            path: "request-password-reset",
            element: <RequestPasswordReset />,
          },
          {
            path: "reset-password",
            element: <Outlet />,
            children: [
              {
                path: ":token",
                element: <ResetPassword />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
