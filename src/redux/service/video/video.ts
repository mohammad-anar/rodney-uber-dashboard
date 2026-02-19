/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVideo: builder.query({
      query: () => ({
        url: "/video",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateVideo: builder.mutation({
      query: ({ id, payload }: { id: string; payload: FormData }) => ({
        url: `/video/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetVideoQuery, useUpdateVideoMutation } = videoApi;
