/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";
import { IUser } from "@/type/type";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params,
      }),
      providesTags: ["User"],
    }),
    updateUserById: builder.mutation({
      query: ({ id, payload }: { id: string; payload: FormData }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserByIdMutation } = userApi;
