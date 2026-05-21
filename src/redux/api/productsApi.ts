import { baseApi } from "./baseApi";

const ProductsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all products
    getAllProducts: build.query({
      query: ({ categoryId, page, limit }) => ({
        url: `/products`,
        method: "GET",
        params: { categoryId, page, limit },
      }),
      providesTags: ["products"],
    }),
    // create a new product
    createProduct: build.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products", "dashboard"],
    }),
    // update an existing product
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products", "dashboard"],
    }),
    // delete an existing product
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products", "dashboard"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = ProductsApi;
export default ProductsApi;
