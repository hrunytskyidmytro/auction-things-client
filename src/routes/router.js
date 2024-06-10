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
import LotInfo from "../admin/lots/pages/LotInfo";

import Users from "../admin/users/pages/Users";
import UpdateUser from "../admin/users/pages/UpdateUser";
import UserInfo from "../admin/users/pages/UserInfo";

import Categories from "../admin/categories/pages/Categories";
import NewCategory from "../admin/categories/pages/NewCategory";
import UpdateCategory from "../admin/categories/pages/UpdateCategory";
import Categorynfo from "../admin/categories/pages/CategoryInfo";

import Bids from "../admin/bids/pages/Bids";
import AuctionHistories from "../admin/auctionHistories/pages/AuctionHistories";
import Payments from "../admin/payments/pages/Payments";
import Orders from "../admin/orders/pages/Orders";
import Statistics from "../admin/statistics/pages/Statistics";
import MainAdmin from "../admin/main/pages/MainAdmin";

import Home from "../home/pages/Home";
import CategoriesList from "../home/components/CategoriesList";
import LotsPageByCategory from "../lots/pages/LotsPageByCategory";

import LotsForBuyers from "../lots/pages/Lots";
import LotDetail from "../lots/pages/LotDetail";
import UserLots from "../user/pages/UserLots";

import SellerWelcomePage from "../user/pages/SellerWelcomePage";

import { AnonymousOutlet } from "./AnonymousOutlet";
import { PrivateOutlet } from "../routes/PrivateOutlet";

import PaymentPage from "../payments/pages/PaymentPage";
import AddFundsPage from "../payments/pages/AddFundsPage";
import WithdrawFundsForm from "../payments/pages/WithdrawFundsPage";
import BalanceActionPage from "../payments/pages/BalanceActionPage";
import SuccessPage from "../payments/pages/SuccessPage";

import SellOnBidAndWin from "../home/pages/SellOnBid&Win";
import BuyingTips from "../home/pages/BuyingTips";
import AboutUs from "../home/pages/AboutUs";
import Faq from "../home/pages/Faq";
import Privacy from "../home/pages/Privacy";
import Conditions from "../home/pages/Conditions";

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
        path: "categories",
        children: [
          {
            index: true,
            element: <CategoriesList />,
          },
          {
            path: ":id",
            element: <LotsPageByCategory />,
          },
        ],
      },
      {
        path: "/seller/:id",
        element: <UserLots />,
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
        path: "sell-on-bid&win",
        element: <SellOnBidAndWin />,
      },
      {
        path: "buying-tips",
        element: <BuyingTips />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "faq",
        element: <Faq />,
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
      {
        path: "privacy",
        element: <Privacy />,
      },
      {
        path: "conditions",
        element: <Conditions />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <MainAdmin />,
      },
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
          {
            path: "info",
            children: [
              {
                path: ":id",
                element: <LotInfo />,
              },
            ],
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
          {
            path: ":id",
            element: <UpdateUser />,
          },
          {
            path: "info",
            children: [
              {
                path: ":id",
                element: <UserInfo />,
              },
            ],
          },
        ],
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: <Categories />,
          },
          {
            path: "new",
            element: <NewCategory />,
          },
          {
            path: ":id",
            element: <UpdateCategory />,
          },
          {
            path: "info",
            children: [
              {
                path: ":id",
                element: <Categorynfo />,
              },
            ],
          },
        ],
      },
      {
        path: "bids",
        children: [
          {
            index: true,
            element: <Bids />,
          },
        ],
      },
      {
        path: "statistics",
        children: [
          {
            index: true,
            element: <Statistics />,
          },
        ],
      },
      {
        path: "auction-histories",
        children: [
          {
            index: true,
            element: <AuctionHistories />,
          },
        ],
      },
      {
        path: "payments",
        children: [
          {
            index: true,
            element: <Payments />,
          },
        ],
      },
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <Orders />,
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
