"use client";

import { UseFormReturn } from "react-hook-form";
import { CampaignFormValues } from "@/app/(dashboard)/campaigns/CreateCampaignContent";
import { useGetTemplatesQuery } from "@/services/endpoints/templateApi";
import { useGetRecipientListsQuery } from "@/services/endpoints/recipientListApi";
import { Loader2 } from "lucide-react";

interface Props {
    form: UseFormReturn<CampaignFormValues>;
    onNext: () => void;
    onBack: () => void;
    isLoading: boolean;
}

export default function StepReview({ form, onNext, onBack, isLoading }: Props) {
    const values = form.getValues();
    const { data: templatesData } = useGetTemplatesQuery({
        page: 0,
        size: 10,
    });

    const { data: lists } = useGetRecipientListsQuery();

    const template = templatesData?.content.find(
        (t) => t.id === Number(values.templateId)
    );

    const selectedLists = (lists ?? []).filter((l) =>
        values.recipientListIds.includes(l.id)
    );

    const totalRecipients = selectedLists.reduce(
        (sum, l) => sum + l.recipientCount,
        0
    );
    return (
        <div className="space-y-6 text-foreground bg-background">
            <div>
                <h2 className="text-lg font-semibold">Review Campaign</h2>
                <p className="text-sm  mt-1">
                    Double-check everything before sending
                </p>
            </div>

            <div className="space-y-4 ">
                <ReviewSection title="Campaign Details">
                    <ReviewRow label="Name" value={values.name} />
                    <ReviewRow label="Subject Line" value={values.subjectLine} />
                    <ReviewRow label="From" value={`${values.fromName} <${values.fromEmail}>`} />
                </ReviewSection>

                <ReviewSection title="Template">
                    <ReviewRow label="Selected Template" value={template?.name ?? "—"} />
                    <ReviewRow label="Category" value={template?.category ?? "—"} />
                </ReviewSection>

                <ReviewSection title="Recipients">
                    <ReviewRow
                        label="Lists"
                        value={selectedLists.map((l) => l.name).join(", ")}
                    />
                    <ReviewRow
                        label="Total Recipients"
                        value={`~${totalRecipients.toLocaleString()} (before deduplication)`}
                    />
                </ReviewSection>
            </div>

            <div className="flex justify-between">
                <button onClick={onBack} className={secondaryBtn}>Back</button>
                <button onClick={onNext} disabled={isLoading} className={primaryBtn}>
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            Saving...
                        </span>
                    ) : (
                        "Continue"
                    )}
                </button>
            </div>
        </div>
    );
}

function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden text-foreground bg-background">
            <div className=" px-4 py-2.5 border-b border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wide">{title}</p>
            </div>
            <div className="divide-y divide-gray-100">{children}</div>
        </div>
    );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="px-4 py-3 flex gap-4 text-foreground bg-background">
            <span className="text-sm w-36 shrink-0">{label}</span>
            <span className="text-sm font-medium">{value}</span>
        </div>
    );
}

const primaryBtn = "bg-yellow-400 hover:bg-yellow-500 text-black dark:bg-[#00004f] dark:text-white dark:hover:bg-[#00006f] text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60";
const secondaryBtn = "border border-gray-200 text-gray-600 hover:bg-gray-50 dark:text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors";