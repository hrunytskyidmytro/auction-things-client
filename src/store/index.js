import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
