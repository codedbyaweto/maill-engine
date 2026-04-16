export type Template = {
    id: number;
    name: string;
    category: string;
    htmlContent: string;
    jsonDesign: Record<string, any>;
    thumbnailUrl: string;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
};

export type Pageable = {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
};

export type GetTemplatesResponse = {
    content: Template[];

    totalElements: number;
    totalPages: number;
    numberOfElements: number;
    size: number;

    number: number;

    pageable: Pageable;

    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };

    first: boolean;
    last: boolean;
    empty: boolean;
};

export type GetTemplateByIdResponse = {
    id: number;
    name: string;
    category: string;
    htmlContent: string;
    jsonDesign: Record<string, any>;
    thumbnailUrl: string;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
};

export type CreateTemplateResponse = {
    id: number;
    name: string;
    category: string;
    htmlContent: string;
    jsonDesign: Record<string, any>;
    thumbnailUrl: string;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
};

export type UpdateTemplateResponse = {
    id: number;
    name: string;
    category: string;
    htmlContent: string;
    jsonDesign: Record<string, any>;
    thumbnailUrl: string;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
};

export type DuplicateTemplateResponse = {
    id: number;
    name: string;
    category: string;
    htmlContent: string;
    jsonDesign: Record<string, any>;
    thumbnailUrl: string;
    createdByName: string;
    createdAt: string;
    updatedAt: string;
};

export type UploadHtmlTemplateResponse = {
    htmlContent?: string;
    preview?: boolean;
    [key: string]: any;
};

export type DeleteTemplateResponse = void;