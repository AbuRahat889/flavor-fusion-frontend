import { baseApi } from "./baseApi";

const CategoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create category
    createCategories: build.mutation({
      query: (data) => ({
        url: `/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories", "dashboard"],
    }),
    // get all categories
    getAllCategories: build.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
    // delete category
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories", "dashboard"],
    }),
    // update category
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoriesMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = CategoriesApi;
export default CategoriesApi;
