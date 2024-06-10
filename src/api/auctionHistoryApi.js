import { api } from "./api";

export const auctionHistoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteAuctionHistory: builder.mutation({
      query: (id) => ({
        url: `/auction-history/${id}`,
        method: "DELETE",
      }),
    }),
    getAuctionHistoryById: builder.query({
      query: (id) => ({
        url: `/auction-history/${id}`,
        method: "GET",
      }),
    }),
    getAllAuctionHistories: builder.query({
      query: () => ({
        url: "/auction-history/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useDeleteAuctionHistoryMutation,
  useGetAllAuctionHistoriesQuery,
  useGetAuctionHistoryByIdQuery,
} = auctionHistoryApi;
