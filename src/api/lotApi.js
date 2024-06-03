import { api } from "./api";

export const lotApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createLot: builder.mutation({
      query: (data) => ({
        url: "/lots/",
        method: "POST",
        body: data,
      }),
    }),
    updateLot: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/lots/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteLot: builder.mutation({
      query: (id) => ({
        url: `/lots/${id}`,
        method: "DELETE",
      }),
    }),
    getLotById: builder.query({
      query: (id) => ({
        url: `/lots/${id}`,
        method: "GET",
      }),
    }),
    getAllLots: builder.query({
      query: () => ({
        url: "/lots/",
        method: "GET",
      }),
    }),
    getLotBids: builder.query({
      query: (id) => ({
        url: `/lots/${id}/bids`,
        method: "GET",
      }),
    }),
    buyLotNow: builder.mutation({
      query: (data) => ({
        url: `/lots/buy-now`,
        method: "POST",
        body: data,
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
  useBuyLotNowMutation,
} = lotApi;
