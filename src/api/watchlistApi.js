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
  }),
});

export const {
  useAddToWatchlistMutation,
  useGetWatchlistByUserIdQuery,
  useCheckWatchlistExistQuery,
} = watchlistApi;
