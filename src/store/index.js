import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { authSlice } from "./authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authSlice.name]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
