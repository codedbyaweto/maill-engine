export const tags = {
    AUTH: "Auth",
    CAMPAIGN: "Campaign",
    ANALYTICS: "Analytics",
    RECIPIENTS: "Recipients",
    RECIPIENT_LIST: "RecipientList",
    TEMPLATE: "Template",
    TEAM: "Team",
} as const;


export type TagType = (typeof tags)[keyof typeof tags];