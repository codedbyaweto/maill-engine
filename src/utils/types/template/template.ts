export type TemplateMode = "drag" | "html" | "upload";

export interface Template {
    id: string;
    name: string;
    category: string;
    html: string;
    design?: any;
    createdAt: string;
}
