import { baseApi } from "@/services/httpClient/baseApi";
import { tags } from "@/utils/types/auth/tagTypes";
import {
    CreateCampaignRequest,
    UpdateCampaignRequest,
    ScheduleCampaignRequest,
    TestSendRequest,
    GetCampaignsRequest,
} from "@/models/request/campaignRequest";
import {
    GetCampaignsResponse,
    CampaignDto,
    CampaignJobStatus,
    BaseResponse,
} from "@/models/response/campaignResponse";

export const campaignApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCampaigns: builder.query<GetCampaignsResponse, GetCampaignsRequest | void>({
            query: (params) => ({
                url: "/campaigns",
                method: "GET",
                params: params ?? {},
            }),
            providesTags: [{ type: tags.CAMPAIGN, id: "LIST" }],
        }),

        getCampaign: builder.query<CampaignDto, number>({
            query: (id) => ({
                url: `/campaigns/${id}`,
                method: "GET",
            }),
            providesTags: (_r, _e, id) => [{ type: tags.CAMPAIGN, id }],
        }),

        createCampaign: builder.mutation<CampaignDto, CreateCampaignRequest>({
            query: (body) => ({
                url: "/campaigns",
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: tags.CAMPAIGN, id: "LIST" }],
        }),

        updateCampaign: builder.mutation<CampaignDto, { id: number } & UpdateCampaignRequest>({
            query: ({ id, ...body }) => ({
                url: `/campaigns/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (_r, _e, { id }) => [
                { type: tags.CAMPAIGN, id: "LIST" },
                { type: tags.CAMPAIGN, id },
            ],
        }),

        deleteCampaign: builder.mutation<void, number>({
            query: (id) => ({
                url: `/campaigns/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: tags.CAMPAIGN, id: "LIST" }],
        }),

        sendCampaign: builder.mutation<BaseResponse, number>({
            query: (id) => ({
                url: `/campaigns/${id}/send`,
                method: "POST",
            }),
            invalidatesTags: [{ type: tags.CAMPAIGN, id: "LIST" }],
        }),

        scheduleCampaign: builder.mutation<CampaignDto, { id: number } & ScheduleCampaignRequest>({
            query: ({ id, ...body }) => ({
                url: `/campaigns/${id}/schedule`,
                method: "POST",
                body,
            }),
            invalidatesTags: [{ type: tags.CAMPAIGN, id: "LIST" }],
        }),

        testSendCampaign: builder.mutation<BaseResponse, { id: number } & TestSendRequest>({
            query: ({ id, ...body }) => ({
                url: `/campaigns/${id}/test`,
                method: "POST",
                body,
            }),
        }),

        getCampaignJobStatus: builder.query<CampaignJobStatus, number>({
            query: (id) => ({
                url: `/campaigns/${id}/job-status`,
                method: "GET",
            }),
        }),

        pauseCampaign: builder.mutation<BaseResponse, number>({
            query: (id) => ({
                url: `/campaigns/${id}/pause`,
                method: "POST",
            }),
        }),

        resumeCampaign: builder.mutation<BaseResponse, number>({
            query: (id) => ({
                url: `/campaigns/${id}/resume`,
                method: "POST",
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetCampaignsQuery,
    useGetCampaignQuery,
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
    useDeleteCampaignMutation,
    useSendCampaignMutation,
    useScheduleCampaignMutation,
    useTestSendCampaignMutation,
    useGetCampaignJobStatusQuery,
    usePauseCampaignMutation,
    useResumeCampaignMutation,
} = campaignApi;