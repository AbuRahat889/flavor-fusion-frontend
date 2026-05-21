import { baseApi } from "./baseApi";

// /* eslint-disable @typescript-eslint/no-explicit-any */

const AuthApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //login user
    loginUser: build.mutation({
      query: (data) => ({
        url: `/auth/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    //get me
    getMe: build.query({
      query: () => ({
        url: `/auth/get-me`,
        method: "GET",
      }),
      providesTags: ["auth"],
    }),
  }),
});

export const { useLoginUserMutation } = AuthApi;
export default AuthApi;
