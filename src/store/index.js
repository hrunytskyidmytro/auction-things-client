import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import { passwordResetApi } from "../api/passwordResetApi";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [passwordResetApi.reducerPath]: passwordResetApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(passwordResetApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
