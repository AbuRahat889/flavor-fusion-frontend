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
      invalidatesTags: ["users"],
    }),
    //create user api
    createUser: build.mutation({
      query: (data) => ({
        url: `/auth/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    //get me
    getMe: build.query({
      query: () => ({
        url: `/auth/get-me`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),

    //verify otp
    verifyOtp: build.mutation({
      query: (data) => ({
        url: `/auth/verify-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    //resend otp
    resendOtp: build.mutation({
      query: (data) => ({
        url: `/auth/resend-otp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    //forgot password
    forgotPassword: build.mutation({
      query: (data) => ({
        url: `/auth/forget-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    //reset password
    resetPassword: build.mutation({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    //change password
    ChangePassword: build.mutation({
      query: (data) => ({
        url: `/users/update-password`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),

    //socail login
    socialLogin: build.mutation({
      query: (data) => ({
        url: `/auth/social-login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
    //update user profile
    updateUserProfile: build.mutation({
      query: (data) => ({
        url: `/users/update-profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useGetMeQuery,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  //////
  useChangePasswordMutation,
  useSocialLoginMutation,
  useUpdateUserProfileMutation,
} = AuthApi;
export default AuthApi;
