import { baseApi } from "@/services/httpClient/baseApi";
import { tags } from "@/utils/types/auth/tagTypes";

import type {
    GetTemplatesRequest,
    CreateTemplateRequest,
    UpdateTemplateRequest,
    DuplicateTemplateRequest,
    UploadHtmlTemplateRequest,
    DeleteTemplateRequest,
} from "@/models/request/templateRequest";

import type {
    GetTemplatesResponse,
    GetTemplateByIdResponse,
    CreateTemplateResponse,
    UpdateTemplateResponse,
    DuplicateTemplateResponse,
    UploadHtmlTemplateResponse,
    DeleteTemplateResponse,
} from "@/models/response/templateResponse";

export const templatesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getTemplates: builder.query<GetTemplatesResponse, GetTemplatesRequest>({
            query: ({ page = 0, size = 10, category, sort }) => ({
                url: "/templates",
                method: "GET",
                params: {
                    page,
                    size,
                    ...(category && { category }),
                    ...(sort && { sort }),
                },
            }),

            providesTags: (result) =>
                result
                    ? [
                        ...result.content.map((template) => ({
                            type: tags.TEMPLATE,
                            id: template.id,
                        })),
                        { type: tags.TEMPLATE, id: "LIST" },
                    ]
                    : [{ type: tags.TEMPLATE, id: "LIST" }],
        }),

        getTemplateById: builder.query<GetTemplateByIdResponse, number>({
            query: (id) => ({
                url: `/templates/${id}`,
                method: "GET",
            }),

            providesTags: (_result, _error, id) => [
                { type: tags.TEMPLATE, id },
            ],
        }),

        createTemplate: builder.mutation<CreateTemplateResponse, CreateTemplateRequest>({
            query: (body) => ({
                url: "/templates",
                method: "POST",
                body,
            }),

            invalidatesTags: [{ type: tags.TEMPLATE, id: "LIST" }],
        }),

        updateTemplate: builder.mutation<UpdateTemplateResponse, UpdateTemplateRequest>({
            query: ({ id, ...body }) => ({
                url: `/templates/${id}`,
                method: "PUT",
                body,
            }),

            invalidatesTags: (_result, _error, arg) => [
                { type: tags.TEMPLATE, id: arg.id },
                { type: tags.TEMPLATE, id: "LIST" },
            ],
        }),

        deleteTemplate: builder.mutation<DeleteTemplateResponse, DeleteTemplateRequest>({
            query: ({ id }) => ({
                url: `/templates/${id}`,
                method: "DELETE",
            }),

            invalidatesTags: (_result, _error, arg) => [
                { type: tags.TEMPLATE, id: arg.id },
                { type: tags.TEMPLATE, id: "LIST" },
            ],
        }),

        duplicateTemplate: builder.mutation<DuplicateTemplateResponse, DuplicateTemplateRequest>({
            query: ({ id }) => ({
                url: `/templates/${id}/duplicate`,
                method: "POST",
            }),

            invalidatesTags: [{ type: tags.TEMPLATE, id: "LIST" }],
        }),

        uploadHtmlTemplate: builder.mutation<UploadHtmlTemplateResponse, UploadHtmlTemplateRequest>({
            query: (body) => ({
                url: "/templates/upload-html",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const {
    useGetTemplatesQuery,
    useGetTemplateByIdQuery,
    useCreateTemplateMutation,
    useUpdateTemplateMutation,
    useDeleteTemplateMutation,
    useDuplicateTemplateMutation,
    useUploadHtmlTemplateMutation,
} = templatesApi;