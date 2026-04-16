import { Template } from "@/utils/types/template/template";

const KEY = "templates";

export function getTemplates(): Template[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveTemplate(template: Template) {
    const templates = getTemplates();
    localStorage.setItem(KEY, JSON.stringify([...templates, template]));
}

export function updateTemplate(updated: Template) {
    const templates = getTemplates().map(t =>
        t.id === updated.id ? updated : t
    );
    localStorage.setItem(KEY, JSON.stringify(templates));
}

export function deleteTemplate(id: string) {
    const templates = getTemplates().filter(t => t.id !== id);
    localStorage.setItem(KEY, JSON.stringify(templates));
}

export function duplicateTemplate(template: Template) {
    const copy = {
        ...template,
        id: crypto.randomUUID(),
        name: template.name + " Copy",
    };
    saveTemplate(copy);
}