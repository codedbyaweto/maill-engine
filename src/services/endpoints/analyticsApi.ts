import { baseApi } from "@/services/httpClient/baseApi";
import { tags } from "@/utils/types/auth/tagTypes";

import {
    CampaignAnalyticsDto,
    TimelinePoint,
    LinkStat,
    DeviceStats,
    GeographyStat,
    RecipientStat,
    DeliverabilityTrend,
    EngagementScore,
    ListHealth,
} from "@/models/response/analyticsResponse";

export const analyticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCampaignAnalytics: builder.query<CampaignAnalyticsDto, number>({
            query: (campaignId) => ({
                url: `/analytics/campaigns/${campaignId}/overview`,
                method: "GET",
            }),
            providesTags: (_r, _e, id) => [{ type: tags.ANALYTICS, id }],
        }),

        getCampaignTimeline: builder.query<TimelinePoint[], number>({
            query: (campaignId) => ({
                url: `/analytics/campaigns/${campaignId}/timeline`,
                method: "GET",
            }),
        }),

        getCampaignLinks: builder.query<LinkStat[], number>({
            query: (campaignId) => ({
                url: `/analytics/campaigns/${campaignId}/links`,
                method: "GET",
            }),
        }),

        getCampaignDevices: builder.query<DeviceStats, number>({
            query: (campaignId) => ({
                url: `/analytics/campaigns/${campaignId}/devices`,
                method: "GET",
            }),
        }),

        getCampaignGeography: builder.query<GeographyStat[], number>({
            query: (campaignId) => ({
                url: `/analytics/campaigns/${campaignId}/geography`,
                method: "GET",
            }),
        }),

        getCampaignRecipients: builder.query<{ content: RecipientStat[] }, number>({
            query: (campaignId) => ({
                url: `/analytics/campaigns/${campaignId}/recipients`,
                method: "GET",
            }),
        }),

        getDeliverabilityTrends: builder.query<DeliverabilityTrend[], void>({
            query: () => ({
                url: "/analytics/deliverability-trends",
                method: "GET",
            }),
        }),

        getEngagementScores: builder.query<EngagementScore[], void>({
            query: () => ({
                url: "/analytics/engagement-scores",
                method: "GET",
            }),
            providesTags: [{ type: tags.ANALYTICS, id: "ENGAGEMENT" }],
        }),

        refreshEngagementScores: builder.mutation<any, void>({
            query: () => ({
                url: "/analytics/engagement-scores/refresh",
                method: "POST",
            }),
            invalidatesTags: [{ type: tags.ANALYTICS, id: "ENGAGEMENT" }],
        }),

        getListHealth: builder.query<ListHealth, void>({
            query: (listId) => ({
                url: `/analytics/lists/${listId}/health`,
                method: "GET",
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetCampaignAnalyticsQuery,
    useGetCampaignTimelineQuery,
    useGetCampaignLinksQuery,
    useGetCampaignDevicesQuery,
    useGetCampaignGeographyQuery,
    useGetCampaignRecipientsQuery,
    useGetDeliverabilityTrendsQuery,
    useGetEngagementScoresQuery,
    useRefreshEngagementScoresMutation,
    useGetListHealthQuery,
} = analyticsApi;