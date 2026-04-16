"use client";

import { UseFormReturn } from "react-hook-form";
import { CampaignFormValues } from "@/app/(dashboard)/campaigns/CreateCampaignContent";
import { useGetRecipientListsQuery } from "@/services/endpoints/recipientListApi";
import { RecipientListDto } from "@/models/response/recipientListResponse";
import { CheckCircle2, Users } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
    form: UseFormReturn<CampaignFormValues>;
    onNext: () => void;
    onBack: () => void;
}

export default function StepRecipients({ form, onNext, onBack }: Props) {
    const { data, isLoading } = useGetRecipientListsQuery();
    const lists: RecipientListDto[] = (data as unknown as RecipientListDto[]) ?? [];

    const { setValue, formState: { errors } } = form;

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    useEffect(() => {
        setValue("recipientListIds", selectedIds, {
            shouldDirty: true,
            shouldTouch: true
        });
    }, [selectedIds, setValue]);

    const toggleList = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const totalRecipients = lists
        .filter((l) => selectedIds.includes(l.id))
        .reduce((sum, l) => sum + l.recipientCount, 0);

    return (
        <div className="space-y-6 text-foreground bg-background">
            <div>
                <h2 className="text-lg font-semibold">Choose Recipients</h2>
                <p className="text-sm mt-1">
                    Select one or more lists to send this campaign to
                </p>
            </div>

            {isLoading ? (
                <div className="space-y-3 text-foreground bg-background">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-16 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="space-y-3 text-foreground bg-background">
                    {lists.map((list) => {
                        const isSelected = selectedIds.includes(list.id);

                        return (
                            <button
                                key={list.id}
                                type="button"
                                onClick={() => toggleList(list.id)}
                                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${isSelected
                                    ? "border-yellow-400"
                                    : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center">
                                        <Users size={18} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{list.name}</p>
                                        <p className="text-xs">
                                            {list.recipientCount.toLocaleString()} recipients
                                        </p>
                                    </div>
                                </div>

                                {isSelected && (
                                    <CheckCircle2 size={18} className="text-yellow-400 shrink-0" />
                                )}
                            </button>
                        );
                    })}
                </div>
            )}

            {selectedIds.length > 0 && (
                <div className="border border-yellow-200 rounded-lg px-4 py-3 text-sm text-foreground bg-background">
                    <span className="font-medium">
                        {totalRecipients.toLocaleString()}
                    </span>{" "}
                    total recipients selected (duplicates will be removed before sending)
                </div>
            )}

            {errors.recipientListIds && (
                <p className="text-xs text-red-500">
                    {errors.recipientListIds.message as string}
                </p>
            )}

            <div className="flex justify-between">
                <button onClick={onBack} className={secondaryBtn}>
                    Back
                </button>
                <button onClick={onNext} className={primaryBtn}>
                    Continue
                </button>
            </div>
        </div>
    );
}

const primaryBtn =
    "bg-yellow-400 hover:bg-yellow-500 text-black dark:bg-[#00004f] dark:text-white dark:hover:bg-[#00006f] text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60";

const secondaryBtn =
    "border border-gray-200 text-gray-600 hover:bg-gray-50 dark:text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors";