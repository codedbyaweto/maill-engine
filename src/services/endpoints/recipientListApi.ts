import { baseApi } from "@/services/httpClient/baseApi";
import { tags } from "@/utils/types/auth/tagTypes";
import { RecipientListDto } from "@/models/response/recipientListResponse";


export const recipientListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecipientLists: builder.query<RecipientListDto[], void>({
            query: () => ({
                url: "/recipient-lists",
                method: "GET",
            }),
            providesTags: [{ type: tags.RECIPIENT_LIST, id: "LIST" }],
        }),
    }),
});

export const { useGetRecipientListsQuery } = recipientListApi;