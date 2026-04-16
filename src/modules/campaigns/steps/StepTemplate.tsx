import { Button } from "@/components/ui/button";
import { CheckCircle2, LayoutTemplate } from "lucide-react";
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { CampaignFormValues } from "@/app/(dashboard)/campaigns/CreateCampaignContent";
import { useGetTemplatesQuery } from "@/services/endpoints/templateApi";

interface Props {
    form: UseFormReturn<CampaignFormValues>;
    onNext: () => void;
    onBack: () => void;
}

export default function StepTemplate({ form, onNext, onBack }: Props) {
    const { data, isLoading } = useGetTemplatesQuery({ page: 0, size: 10, category: undefined });
    const { setValue, formState: { errors } } = form;
    const templates = data?.content ?? [];
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        if (selectedId !== null) {
            setValue("templateId", String(selectedId), {
                shouldDirty: true,
                shouldTouch: true,
            });
        } else {
            setValue("templateId", "", {
                shouldDirty: true,
                shouldTouch: true,
            });
        }
    }, [selectedId, setValue]);

    return (
        <div className="space-y-6 text-foreground bg-background">
            <div>
                <h2 className="text-lg font-semibold">Choose a Template</h2>
                <p className="text-sm mt-1">Select the email template for this campaign</p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-foreground bg-background">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-foreground bg-background">
                    {templates.map((template) => {
                        const isSelected = selectedId === template.id;
                        return (
                            <Button
                                key={template.id}
                                variant="outline"
                                size="default"
                                className={`w-full text-left flex items-center gap-3 p-8 rounded-lg transition-all 
                                ${isSelected ? " border-yellow-400" : "bg-background border-gray-200 hover:bg-gray-200"}`}
                                onClick={() => setSelectedId(template.id)}
                            >
                                <div className=" rounded-md flex items-center justify-center">
                                    <LayoutTemplate size={20} className="text-gray-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {template.name}
                                    </p>
                                    <p className="text-xs capitalize">
                                        {template.category}
                                    </p>
                                </div>

                                {isSelected && (
                                    <CheckCircle2 size={18} className="text-yellow-600" />
                                )}
                            </Button>
                        );
                    })}
                </div>
            )}

            {errors.templateId && (
                <p className="text-xs text-red-500">{errors.templateId.message}</p>
            )}

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>Back</Button>
                <Button variant="yellow" onClick={onNext}>Continue</Button>
            </div>
        </div>
    );
}