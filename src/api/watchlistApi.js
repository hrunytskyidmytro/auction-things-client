import { api } from "./api";

export const watchlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addToWatchlist: builder.mutation({
      invalidatesTags: ["Watchlist"],
      query: (data) => ({
        url: "/watchlists/add",
        method: "POST",
        body: data,
      }),
    }),
    getWatchlistByUserId: builder.query({
      providesTags: ["Watchlist"],
      query: (userId) => ({
        url: `/watchlists/${userId}`,
        method: "GET",
      }),
    }),
    checkWatchlistExist: builder.query({
      providesTags: ["Watchlist"],
      query: (lotId) => ({
        url: `/watchlists/${lotId}/check-exist`,
        method: "GET",
      }),
    }),
    deleteFromWatchlist: builder.mutation({
      invalidatesTags: ["Watchlist"],
      query: (data) => ({
        url: "/watchlists/delete",
        method: "DELETE",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddToWatchlistMutation,
  useGetWatchlistByUserIdQuery,
  useCheckWatchlistExistQuery,
  useDeleteFromWatchlistMutation
} = watchlistApi;
