import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithJwt } from "./baseQueryWithToken";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithJwt("/categories"),
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoryApi;
