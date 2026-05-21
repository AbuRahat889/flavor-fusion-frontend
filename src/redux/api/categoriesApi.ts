import { baseApi } from "./baseApi";

const CategoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all categories
    getAllCategories: build.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["categories"],
    }),
  }),
});

export const { useGetAllCategoriesQuery } = CategoriesApi;
export default CategoriesApi;
