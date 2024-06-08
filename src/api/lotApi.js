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
      query: ({
        page,
        sortBy,
        categoryId,
        status,
        currentPriceFrom,
        currentPriceTo,
        buyNowPriceFrom,
        buyNowPriceTo,
        dateOption,
        search,
      }) => {
        const categoryIds = Array.isArray(categoryId)
          ? categoryId.join(",")
          : categoryId;
        const statuses = Array.isArray(status) ? status.join(",") : status;

        return {
          url: `/lots/?page=${page}&sortBy=${sortBy}&categoryId=${categoryIds}&status=${statuses}&currentPriceFrom=${currentPriceFrom}&currentPriceTo=${currentPriceTo}&buyNowPriceFrom=${buyNowPriceFrom}&buyNowPriceTo=${buyNowPriceTo}&dateOption=${dateOption}&search=${search}`,
          method: "GET",
        };
      },
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
    getUserLots: builder.query({
      query: ({
        userId,
        page,
        sortBy,
        categoryId,
        status,
        currentPriceFrom,
        currentPriceTo,
        buyNowPriceFrom,
        buyNowPriceTo,
        dateOption,
        search,
      }) => {
        const categoryIds = Array.isArray(categoryId)
          ? categoryId.join(",")
          : categoryId;
        const statuses = Array.isArray(status) ? status.join(",") : status;

        return {
          url: `/lots/seller/${userId}/?page=${page}&sortBy=${sortBy}&categoryId=${categoryIds}&status=${statuses}&currentPriceFrom=${currentPriceFrom}&currentPriceTo=${currentPriceTo}&buyNowPriceFrom=${buyNowPriceFrom}&buyNowPriceTo=${buyNowPriceTo}&dateOption=${dateOption}&search=${search}`,
          method: "GET",
        };
      },
    }),
    getLatestOpenLotsBySeller: builder.query({
      query: (userId) => ({
        url: `/lots/seller/${userId}/latest-open-lots`,
        method: "GET",
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
  useGetUserLotsQuery,
  useGetLatestOpenLotsBySellerQuery,
} = lotApi;
