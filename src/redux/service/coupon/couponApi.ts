/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const couponApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: () => ({
        url: "/coupon",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, payload }: { id: string; payload: FormData }) => ({
        url: `/coupon/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetCouponsQuery, useUpdateCouponMutation } = couponApi;
