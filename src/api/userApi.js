import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
    }),
    checkPinCode: builder.mutation({
      query: (data) => ({
        url: "/user/check-pin-code",
        method: "POST",
        body: data,
      }),
    }),
    resendPinCode: builder.mutation({
      query: (data) => ({
        url: "/user/resend-pin-code",
        method: "POST",
        body: data,
      }),
    }),
    getCurrentUserInfo: builder.query({
      query: () => ({
        url: "/user/current-user",
        method: "GET",
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/",
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/user/block/${id}`,
        method: "PATCH",
      }),
    }),
    unblockUser: builder.mutation({
      query: (id) => ({
        url: `/user/unblock/${id}`,
        method: "PATCH",
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
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = userApi;
