import { baseApi } from "../httpClient/baseApi";
import { tags } from "@/utils/types/auth/tagTypes";

export interface RecipientList {
  id: number;
  name: string;
  recipientCount?: number;
  status?: string;
  createdAt?: string;
}

type TagType = typeof tags.RECIPIENTS;

type RecipientListResponse =
  | RecipientList[]
  | { content: RecipientList[] };

export const recipientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getRecipientLists: builder.query<RecipientList[], void>({
      query: () => "/recipient-lists",
      transformResponse: (response: RecipientListResponse) =>
        Array.isArray(response) ? response : response.content || [],
      providesTags: [{ type: tags.RECIPIENTS as TagType, id: "LIST" }],
    }),

    createRecipientList: builder.mutation<
      { id: number; name: string },
      { name: string; description?: string }
    >({
      query: (body) => ({
        url: "/recipient-lists",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: tags.RECIPIENTS as TagType, id: "LIST" }],
    }),

    uploadRecipients: builder.mutation<
      void,
      { listId: number; file: File }
    >({
      query: ({ listId, file }) => {
        const formData = new FormData();
        formData.append("file", file);

        return {
          url: `/recipient-lists/${listId}/upload`,
          method: "POST",
          body: formData,
        };
      },
    }),

    deleteRecipientList: builder.mutation<void, number>({
      query: (id: number) => ({
        url: `/recipient-lists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: tags.RECIPIENTS as TagType, id: "LIST" }],
    }),

    exportRecipientList: builder.query<void, number>({
      query: (id: number) => `/recipient-lists/${id}/export`,
    }),

  }),
});

export const {
  useGetRecipientListsQuery,
  useCreateRecipientListMutation,
  useUploadRecipientsMutation,
  useDeleteRecipientListMutation,
  useLazyExportRecipientListQuery,
} = recipientApi;