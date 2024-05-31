import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithJwt } from "./baseQueryWithToken";

export const watchlistApi = createApi({
  reducerPath: "watchlistApi",
  baseQuery: baseQueryWithJwt("/watchlists"),
  endpoints: (builder) => ({
    addToWatchlist: builder.mutation({
      query: (data) => ({
        url: "/add",
        method: "POST",
        body: data,
      }),
    }),
    getWatchlistByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddToWatchlistMutation, useGetWatchlistByUserIdQuery } =
  watchlistApi;
