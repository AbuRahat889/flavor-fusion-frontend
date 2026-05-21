import { baseApi } from "./baseApi";

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all reports
    getDashboardOverview: build.query({
      query: () => ({
        url: `/dashboard/stats`,
        method: "GET",
      }),
      providesTags: ["dashbaord"],
    }),
    // get all reports
    getOverview: build.query({
      query: ({ range }) => ({
        url: `/dashboard/overview`,
        method: "GET",
        params: { range },
      }),
      providesTags: ["dashbaord"],
    }),
  }),
});

export const { useGetDashboardOverviewQuery, useGetOverviewQuery } =
  DashboardApi;
export default DashboardApi;
