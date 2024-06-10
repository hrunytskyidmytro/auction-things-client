import { api } from "./api";

export const statisticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStatistics: builder.query({
      query: () => "/statistics/",
    }),
  }),
});

export const { useGetStatisticsQuery } = statisticsApi;
