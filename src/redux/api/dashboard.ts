import { baseApi } from "./baseApi";

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all reports
    getOverview: build.query({
      query: ({ range }) => ({
        url: `/dashboard/overview`,
        method: "GET",
        params: { range },
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useGetOverviewQuery } = DashboardApi;
export default DashboardApi;
