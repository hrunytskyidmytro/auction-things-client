import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + "/user",
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    checkPinCode: builder.mutation({
      query: (data) => ({
        url: "/check-pin-code",
        method: "POST",
        body: data,
      }),
    }),
    resendPinCode: builder.mutation({
      query: (data) => ({
        url: "/resend-pin-code",
        method: "POST",
        body: data,
      }),
    }),
    getCurrentUserInfo: builder.query({
      query: ({ token }) => ({
        url: "/current-user",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useCheckPinCodeMutation,
  useResendPinCodeMutation,
  useLazyGetCurrentUserInfoQuery,
} = userApi;
