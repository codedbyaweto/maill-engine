"use client";

import { UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";
import { CampaignFormValues } from "@/app/(dashboard)/campaigns/CreateCampaignContent";

interface Props {
    form: UseFormReturn<CampaignFormValues>;
    onNext: () => void;
}

export default function StepDetails({ form, onNext }: Props) {
    const { register, formState: { errors } } = form;
    const handleNext = async () => {
        const valid = await form.trigger([
            "name",
            "subjectLine",
            "fromName",
            "fromEmail",
        ]);

        if (valid) onNext();
    };

    return (
        <div className="space-y-6 text-foreground bg-background">
            <div>
                <h2 className="text-lg font-semibold">Campaign Details</h2>
                <p className="text-sm mt-1">Basic information about your campaign</p>
            </div>

            <div className="space-y-4">
                <Field label="Campaign Name" error={errors.name?.message}>
                    <input
                        {...register("name")}
                        placeholder="e.g. April Newsletter"
                        className={inputClass(!!errors.name)}
                    />
                </Field>

                <Field label="Subject Line" error={errors.subjectLine?.message}>
                    <input
                        {...register("subjectLine")}
                        placeholder="e.g. What's new this April 🌸"
                        className={inputClass(!!errors.subjectLine)}
                    />
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="From Name" error={errors.fromName?.message}>
                        <input
                            {...register("fromName")}
                            placeholder="e.g. MailEngine Team"
                            className={inputClass(!!errors.fromName)}
                        />
                    </Field>

                    <Field label="From Email" error={errors.fromEmail?.message}>
                        <input
                            {...register("fromEmail")}
                            placeholder="e.g. hello@company.com"
                            className={inputClass(!!errors.fromEmail)}
                        />
                    </Field>
                </div>
            </div>

            <div className="flex justify-end">
                <button onClick={handleNext} className={primaryBtn}>
                    Continue
                </button>
            </div>
        </div>
    );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            {children}
            {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
    );
}

const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 ${hasError ? "border-red-400" : "border-gray-200"
    }`;

const primaryBtn = "bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium px-5 py-2.5 rounded-lg transition-colors";