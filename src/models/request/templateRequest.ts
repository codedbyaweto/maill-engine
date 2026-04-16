export type GetTemplatesRequest = {
    page?: number;
    size?: number;
    category?: string;
    sort?: string[];
};

export type GetTemplateByIdRequest = {
    id: number;
};

export type CreateTemplateRequest = {
    name: string;
    category: string;
    htmlContent: string;
    jsonDesign: Record<string, any>;
};

export type UpdateTemplateRequest = {
    id: number;
    name: string;
    category: string;
    htmlContent: string;
    jsonDesign: Record<string, any>;
};

export type DuplicateTemplateRequest = {
    id: number;
};

export type UploadHtmlTemplateRequest = FormData;

export type DeleteTemplateRequest = {
    id: number;
};