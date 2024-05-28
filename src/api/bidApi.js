import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithJwt } from "./baseQueryWithToken";

export const bidApi = createApi({
  reducerPath: "bidApi",
  baseQuery: baseQueryWithJwt("/bids"),
  endpoints: (builder) => ({
    createBid: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    updateBid: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBid: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    getBidById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    getAllBids: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateBidMutation,
  useUpdateBidMutation,
  useDeleteBidMutation,
  useGetAllBidsQuery,
  useGetBidByIdQuery,
} = bidApi;
