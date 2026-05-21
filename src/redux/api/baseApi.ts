// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Utility function to handle the base API URL
const baseApiHandler = () => {
  const apiUrl = "http://localhost:5000/api/v1";

  return apiUrl;
};

// Define the base API using RTK Query   v
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiHandler(),
    prepareHeaders: (headers) => {
      // const token = (getState() as RootState).auth.token;
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["auth", "dashboard", "products", "categories"],
});
