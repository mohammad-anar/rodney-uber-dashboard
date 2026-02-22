/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { setAccessToken, setRefreshToken } from "../features/auth";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1️⃣ Try the original request
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    try {
      const state = api.getState() as RootState;
      const refreshToken = state.auth?.refreshToken;

      if (!refreshToken) {
        Cookies.remove("accessToken");
        window.location.href = "/auth/login";
        return result;
      }

      // 2️⃣ Call refresh-token
      const refreshResult = await baseQuery(
        {
          url: "/refresh-token",
          method: "GET",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        },
        api,
        extraOptions,
      );

      // 3️⃣ Get new access token from refresh response
      const newAccessToken = (refreshResult.data as any)?.data?.accessToken;
      const newRefreshToken = (refreshResult.data as any)?.data?.refreshToken;

      if (newAccessToken) {
        api.dispatch(setAccessToken(newAccessToken));
        if (newRefreshToken) {
          api.dispatch(setRefreshToken(newRefreshToken));
        }

        // 4️⃣ Retry the original request with new access token
        result = await baseQuery(args, api, extraOptions);

        // 5️⃣ If retry also fails with 401 → logout
        if (result.error && result.error.status === 401) {
          Cookies.remove("accessToken");
          window.location.href = "/auth/login";
        }
      } else {
        // No new token → logout
        Cookies.remove("accessToken");
        window.location.href = "/auth/login";
      }
    } catch (err) {
      Cookies.remove("accessToken");
      window.location.href = "/auth/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User", "Coupon"],
  endpoints: () => ({}),
});

export default baseApi;
