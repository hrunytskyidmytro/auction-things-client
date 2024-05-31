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
    updateLot: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteLot: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    getLotById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    getAllLots: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
    getLotBids: builder.query({
      query: (id) => ({
        url: `/${id}/bids`,
        method: "GET",
      }),
    }),
    closeLot: builder.mutation({
      query: (id) => ({
        url: `/${id}/close`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useCreateLotMutation,
  useUpdateLotMutation,
  useDeleteLotMutation,
  useGetLotByIdQuery,
  useGetAllLotsQuery,
  useGetLotBidsQuery,
  useCloseLotMutation,
} = lotApi;
