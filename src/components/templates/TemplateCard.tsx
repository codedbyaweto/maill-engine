"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import NiceModal from "@ebay/nice-modal-react";
import { PreviewTemplateModal} from "@/modals/PreviewTemplateModal";

export function TemplateCard({ template, onDelete, onDuplicate, onEdit }: any) {
    const handlePreview = () => {
        void NiceModal.show(PreviewTemplateModal, {
            html: template.htmlContent,
            data: {
                first_name: "John",
                last_name: "Doe",
                email: "john@example.com",
            },
        });
    };

    return (
        <Card className="group p-3 space-y-3 rounded-xl border border-gray-200 dark:border-blue-500/10 shadow-sm hover:shadow-lg transition-all">

            <div className="relative overflow-hidden rounded-md border bg-background">
                <iframe
                    srcDoc={template.htmlContent}
                    className="h-40 w-full pointer-events-none"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                <button
                    onClick={handlePreview}
                    className="absolute top-2 right-2 bg-white/90 dark:bg-black/70 p-1.5 rounded-md shadow hover:scale-105 transition"
                >
                    <Eye className="w-4 h-4" />
                </button>
            </div>

            <div className="space-y-1">
                <h3 className="font-semibold text-sm truncate">
                    {template.name}
                </h3>

                <p className="text-xs text-gray-500">
                    {template.category || "No category"}
                </p>
            </div>

            <div className="flex justify-between gap-2 pt-2">
                <Button size="sm" variant="yellow" onClick={onEdit}>
                    Edit
                </Button>

                <Button size="sm" variant="secondary" onClick={onDuplicate}>
                    Duplicate
                </Button>

                <Button size="sm" variant="destructive" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </Card>
    );
}