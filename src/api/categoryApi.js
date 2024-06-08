import { api } from "./api";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/",
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories/",
        method: "GET",
      }),
    }),
    getLotsByCategory: builder.query({
      query: ({
        categoryId,
        page,
        sortBy,
        currentPriceFrom,
        currentPriceTo,
        buyNowPriceFrom,
        buyNowPriceTo,
        dateOption,
        status,
        search,
      }) => {
        const statuses = Array.isArray(status) ? status.join(",") : status;
        return {
          url: `/categories/${categoryId}/lots/?page=${page}&sortBy=${sortBy}&status=${statuses}&currentPriceFrom=${currentPriceFrom}&currentPriceTo=${currentPriceTo}&buyNowPriceFrom=${buyNowPriceFrom}&buyNowPriceTo=${buyNowPriceTo}&dateOption=${dateOption}&search=${search}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetLotsByCategoryQuery,
} = categoryApi;
