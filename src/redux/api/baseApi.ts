// src/api/baseApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Utility function to handle the base API URL
const baseApiHandler = () => {
  //need to change the socket api url based on deployment
  // const apiUrl = "http://10.0.30.18:5006/api/v1";
  const apiUrl = "https://api.cityadventuredating.com/api/v1";

  return apiUrl;
};

// Define the base API using RTK Query   v
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseApiHandler(),
    prepareHeaders: (headers) => {
      // const token = (getState() as RootState).auth.token;
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "users",
    "subscriptions",
    "contacts",
    "products",
    "message",
    "friendship",
    "reports",
    "dashbaord",
  ],
});
