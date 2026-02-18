/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<any, LoginRequest>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    forgatPassword: builder.mutation<any, { email: string }>({
      query: (user) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation({
      query: ({ token, user }) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: user,
        headers: {
          Authorization: `${token}`,
        },
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: builder.mutation({
      query: (user) => ({
        url: "/auth/change-pass",
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useChangePasswordMutation,
  useForgatPasswordMutation,
  useResetPasswordMutation,
} = authApi;
export const { endpoints: authEndpoints } = authApi;
