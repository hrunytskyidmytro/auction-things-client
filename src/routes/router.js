import React from "react";
import { createBrowserRouter } from "react-router-dom";

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

import Lots from "../lot/pages/Lots";
import NewLot from "../lot/pages/NewLot";
import UpdateLot from "../lot/pages/UpdateLot";

import Users from "../admin/users/pages/Users";

import Categories from "../admin/categories/pages/Categories";

import Bids from "../admin/bids/pages/Bids";

import MoreInfo from "../shared/components/MoreInfo";

import SellerWelcomePage from "../user/pages/SellerWelcomePage";

import AdminLayout from "../layouts/AdminLayout/pages/AdminLayout";

import { AnonymousOutlet } from "./AnonymousOutlet";
// import { PrivateOutlet } from "../routes/PrivateOutlet";

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
        path: "user-profile",
        element: <UserProfile />,
      },
      {
        path: "welcome-seller",
        element: <SellerWelcomePage />,
      },
      // {
      //   path: "seller",
      //   element: <PrivateOutlet />,
      //   children: [
      //     {
      //       path: "lots",
      //       element: <Lots />,
      //     },
      //   ],
      // },
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
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "lots",
        children: [
          {
            index: true,
            element: <Lots />,
          },
          {
            path: "new",
            element: <NewLot />,
          },
          {
            path: ":id",
            element: <UpdateLot />,
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            index: true,
            element: <Users />,
          },
          // {
          //   path: "new",
          //   element: <NewLot />,
          // },
          // {
          //   path: ":id",
          //   element: <UpdateLot />,
          // },
        ],
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: <Categories />,
          },
          // {
          //   path: "new",
          //   element: <NewLot />,
          // },
          // {
          //   path: ":id",
          //   element: <UpdateLot />,
          // },
        ],
      },
      {
        path: "bids",
        children: [
          {
            index: true,
            element: <Bids />,
          },
          // {
          //   path: "new",
          //   element: <NewLot />,
          // },
          // {
          //   path: ":id",
          //   element: <UpdateLot />,
          // },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
