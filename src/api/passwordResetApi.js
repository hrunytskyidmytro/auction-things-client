import { api } from "./api";

export const passwordResetApi = api.injectEndpoints({
  endpoints: (builder) => ({
    requestPasswordReset: builder.mutation({
      query: (data) => ({
        url: "/password/request-password-reset",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/password/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRequestPasswordResetMutation, useResetPasswordMutation } =
  passwordResetApi;
