import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithJwt } from "./baseQueryWithToken";

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithJwt(),
  tagTypes: ["Watchlist"],
  endpoints: () => ({}),
});
