import { baseApi } from "./baseApi";

const OrdersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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

export const { useGetAllOrdersQuery, useUpdateOrderStatusMutation } = OrdersApi;
export default OrdersApi;
