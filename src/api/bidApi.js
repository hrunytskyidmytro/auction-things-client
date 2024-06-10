import { api } from "./api";

export const bidApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createBid: builder.mutation({
      query: (data) => ({
        url: "/bids/",
        method: "POST",
        body: data,
      }),
    }),
    deleteBid: builder.mutation({
      query: (id) => ({
        url: `/bids/${id}`,
        method: "DELETE",
      }),
    }),
    getBidById: builder.query({
      query: (id) => ({
        url: `/bids/${id}`,
        method: "GET",
      }),
    }),
    getAllBids: builder.query({
      query: () => ({
        url: "/bids/",
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
