import { baseApi } from "./baseApi";

const OrdersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // create a new order
    createOrder: build.mutation({
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["orders", "dashboard"],
    }),
    // get all reports
    getAllOrders: build.query({
      query: ({ status }) => ({
        url: `/orders`,
        method: "GET",
        params: { status },
      }),
      providesTags: ["orders"],
    }),
    // get all reports
    updateOrderStatus: build.mutation({
      query: ({ id, datas }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body: datas,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = OrdersApi;
export default OrdersApi;
