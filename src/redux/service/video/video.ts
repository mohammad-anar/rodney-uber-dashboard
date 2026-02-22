/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: () => ({
        url: "/video",
        method: "GET",
      }),
      providesTags: ["Video"],
    }),
    getVideoCompletionLogs: builder.query({
      query: (params) => ({
        url: "/coupon-usage",
        method: "GET",
        params,
      }),
      providesTags: ["Video"],
    }),
    updateVideo: builder.mutation({
      query: ({ id, payload }: { id: string; payload: FormData }) => ({
        url: `/video/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Video"],
    }),
  }),
});

export const {
  useGetVideoQuery,
  useUpdateVideoMutation,
  useGetVideoCompletionLogsQuery,
} = videoApi;
