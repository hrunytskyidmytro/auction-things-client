import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import { passwordResetApi } from "../api/passwordResetApi";
import { lotApi } from "../api/lotApi";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [passwordResetApi.reducerPath]: passwordResetApi.reducer,
    [lotApi.reducerPath]: lotApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(passwordResetApi.middleware)
      .concat(lotApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
