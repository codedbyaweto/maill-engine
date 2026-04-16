export interface CampaignAnalyticsDto {
    sent: number;
    delivered: number;
    bounced: number;
    opened: number;
    uniqueOpens: number;
    estimatedRealOpens: number;
    clicked: number;
    uniqueClicks: number;
    complained: number;
    unsubscribed: number;
    deliveryRate: number;
    openRate: number;
    adjustedOpenRate: number;
    clickRate: number;
    clickToOpenRate: number;
    bounceRate: number;
    complaintRate: number;
    avgReadTimeSeconds: number;
    scrollDepth: {
        top: number;
        middle: number;
        bottom: number;
    };
}

export interface TimelinePoint {
    timestamp: string;
    opens: number;
    clicks: number;
}

export interface LinkStat {
    url: string;
    uniqueClicks: number;
    totalClicks: number;
    ctr: number;
}

export interface DeviceStats {
    devices: { name: string; count: number }[];
    emailClients: { name: string; count: number }[];
    os: { name: string; count: number }[];
}

export interface GeographyStat {
    country: string;
    city: string;
    opens: number;
    clicks: number;
}

export interface RecipientStat {
    email: string;
    status: string;
    openedAt?: string;
    clickedLinks: number;
    readDepth: string;
}

export interface DeliverabilityTrend {
    date: string;
    deliveryRate: number;
    bounceRate: number;
    complaintRate: number;
}

export interface EngagementScore {
    email: string;
    score: number;
    category: string;
    lastOpenAt: string;
}

export interface ListHealth {
    score: number;
    recommendations: string[];
}