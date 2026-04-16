export interface RecipientListDto {
    id: number;
    name: string;
    description?: string | null;
    recipientCount: number;
    createdAt: string;
}
