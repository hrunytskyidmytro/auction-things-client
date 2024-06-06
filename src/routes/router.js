import React from "react";
import { createBrowserRouter } from "react-router-dom";

import UserLayout from "../layouts/UserLayout/UserLayout";
import AdminLayout from "../layouts/AdminLayout/pages/AdminLayout";
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

import Lots from "../admin/lots/pages/Lots";
import NewLot from "../admin/lots/pages/NewLot";
import UpdateLot from "../admin/lots/pages/UpdateLot";

import Users from "../admin/users/pages/Users";

import Categories from "../admin/categories/pages/Categories";

import Bids from "../admin/bids/pages/Bids";

import Home from "../home/pages/Home";
import CategoriesList from "../home/components/CategoriesList";
import LotsPageByCategory from "../lots/pages/LotsPageByCategory";

import LotsForBuyers from "../lots/pages/Lots";
import LotDetail from "../lots/pages/LotDetail";

import SellerWelcomePage from "../user/pages/SellerWelcomePage";

import { AnonymousOutlet } from "./AnonymousOutlet";
import { PrivateOutlet } from "../routes/PrivateOutlet";

import PaymentPage from "../payments/pages/PaymentPage";
import AddFundsPage from "../payments/pages/AddFundsPage";
import WithdrawFundsForm from "../payments/pages/WithdrawFundsPage";
import BalanceActionPage from "../payments/pages/BalanceActionPage";
import SuccessPage from "../payments/pages/SuccessPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <CategoriesList />,
      },
      {
        path: "/categories/:id",
        element: <LotsPageByCategory />,
      },
      {
        path: "welcome-seller",
        element: <SellerWelcomePage />,
      },
      {
        path: "lots",
        children: [
          {
            index: true,
            element: <LotsForBuyers />,
          },
          {
            path: ":id",
            element: <LotDetail />,
          },
        ],
      },
      {
        element: <PrivateOutlet />,
        children: [
          {
            path: "user-profile",
            element: <UserProfile />,
          },
        ],
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
      // }
    ],
  },
  {
    element: <BasicLayout />,
    children: [
      {
        element: <PrivateOutlet />,
        children: [
          {
            path: "payment",
            element: <PaymentPage />,
          },
          {
            path: "add-funds",
            element: <AddFundsPage />,
          },
          {
            path: "withdraw-funds",
            element: <WithdrawFundsForm />,
          },
          {
            path: "change-balance-action",
            element: <BalanceActionPage />,
          },
          {
            path: "success-page",
            element: <SuccessPage />,
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
        ],
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
