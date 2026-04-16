import { baseApi } from "@/services/httpClient/baseApi";
import { tags } from "@/utils/types/auth/tagTypes";


export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface InviteRequest {
  name: string;
  email: string;
  role: string;
}

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: tags.TEAM as typeof tags.TEAM, id })),
              { type: tags.TEAM as typeof tags.TEAM, id: "LIST" },
            ]
          : [{ type: tags.TEAM as typeof tags.TEAM, id: "LIST" }],
    }),

    inviteMember: builder.mutation<void, InviteRequest>({
      query: (body) => ({
        url: "/users/invite",
        method: "POST",
        body:{
      ...body,
      role: body.role,
    },
      }),
      invalidatesTags: [{ type: tags.TEAM as typeof tags.TEAM, id: "LIST" }],
    }),
  }),
});

export const { useGetUsersQuery, useInviteMemberMutation } = teamApi;