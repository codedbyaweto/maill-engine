export interface CreateCampaignRequest {
    name: string;
    subjectLine: string;
    fromName: string;
    fromEmail: string;
    templateId: number;
    recipientListIds: number[];
}

export interface UpdateCampaignRequest extends Partial<CreateCampaignRequest> { }

export interface ScheduleCampaignRequest {
    scheduledAt: string;
    timezone: string;
}

export interface TestSendRequest {
    testEmails: string[];
}

export interface GetCampaignsRequest {
    status?: string;
    page?: number;
    size?: number;
}