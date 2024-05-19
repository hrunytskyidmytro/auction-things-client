import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const passwordResetApi = createApi({
  reducerPath: "passwordResetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/password",
  }),
  endpoints: (builder) => ({
    requestPasswordReset: builder.mutation({
      query: (data) => ({
        url: "/request-password-reset",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} = passwordResetApi;
