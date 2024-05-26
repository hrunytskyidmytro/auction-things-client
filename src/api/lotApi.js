import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithJwt } from "./baseQueryWithToken";

export const lotApi = createApi({
  reducerPath: "lotApi",
  baseQuery: baseQueryWithJwt("/lots"),
  endpoints: (builder) => ({
    createLot: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateLotMutation } = lotApi;
