"use client";

import { TemplateCard } from "@/components/templates/TemplateCard";
import { useRouter } from "next/navigation";
import type { Template } from "@/models/response/templateResponse";
import {
    useDeleteTemplateMutation,
    useDuplicateTemplateMutation
} from "@/services/endpoints/templateApi";

interface TemplateGridProps {
    templates: Template[];
}

export function TemplateGrid({ templates }: TemplateGridProps) {
    const router = useRouter();

    const [deleteTemplate] = useDeleteTemplateMutation();
    const [duplicateTemplate] = useDuplicateTemplateMutation();

    if (templates.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center px-4 py-20 text-center">
                <p className="text-lg sm:text-2xl font-medium text-muted-foreground">
                    No templates available
                </p>

                <p className="text-sm sm:text-base mt-2 text-muted-foreground/70 max-w-xs sm:max-w-md">
                    Your created templates will appear here
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-start">
            {templates.map((template) => (
                <TemplateCard
                    key={template.id}
                    template={template}
                    onDelete={() => deleteTemplate({ id: template.id })}
                    onDuplicate={() => duplicateTemplate({ id: template.id })}
                    onEdit={() =>
                        router.push(`/templates/editor?id=${template.id}&mode=drag`)
                    }
                />
            ))}
        </div>
    );
}