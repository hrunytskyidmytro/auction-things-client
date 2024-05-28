import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import { passwordResetApi } from "../api/passwordResetApi";
import { lotApi } from "../api/lotApi";
import { categoryApi } from "../api/categoryApi";
import { bidApi } from "../api/bidApi";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [passwordResetApi.reducerPath]: passwordResetApi.reducer,
    [lotApi.reducerPath]: lotApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [bidApi.reducerPath]: bidApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(passwordResetApi.middleware)
      .concat(lotApi.middleware)
      .concat(bidApi.middleware)
      .concat(categoryApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
