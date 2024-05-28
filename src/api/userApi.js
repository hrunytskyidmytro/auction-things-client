import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithJwt } from "./baseQueryWithToken";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithJwt("/user"),
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
      query: () => ({
        url: "/current-user",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
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
  useGetAllUsersQuery,
  useDeleteUserMutation,
} = userApi;
