export type CampaignStatus =
    | "draft"
    | "scheduled"
    | "sending"
    | "sent"
    | "cancelled"
    | "failed";

export interface CampaignDto {
    id: number;
    name: string;
    subjectLine: string;
    fromName: string;
    fromEmail: string;
    status: CampaignStatus;
    scheduledAt?: string;
    timezone?: string;
    sentAt?: string;
    totalRecipients: number;
    totalSent: number;
    totalDelivered: number;
    totalBounced: number;
    totalOpened: number;
    totalClicked: number;
    totalComplained: number;
    totalUnsubscribed: number;
    createdAt: string;
}

export interface GetCampaignsResponse {
    content: CampaignDto[];
    totalPages: number;
    totalElements: number;
}

export interface CampaignJobStatus {
    status: "queued" | "processing" | "paused" | "completed" | "failed" | "cancelled";
    totalEmails: number;
    sentCount: number;
    failedCount: number;
    progress: number;
    startedAt: string;
    completedAt: string | null;
    estimatedSecondsRemaining: number;
}

export interface BaseResponse {
    message: string;
}