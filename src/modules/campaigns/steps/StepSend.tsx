"use client";

import { UseFormReturn } from "react-hook-form";
import { CampaignFormValues } from "@/app/(dashboard)/campaigns/CreateCampaignContent";
import { Loader2, Send, Clock } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
    form: UseFormReturn<CampaignFormValues>;
    onSend: () => void;
    onBack: () => void;
    isLoading: boolean;
}

const TIMEZONES = [
    "Africa/Lagos",
    "Africa/Nairobi",
    "Africa/Accra",
    "Europe/London",
    "America/New_York",
    "America/Los_Angeles",
    "Asia/Dubai",
];

export default function StepSend({ form, onSend, onBack, isLoading }: Props) {
    const { setValue, register } = form;
    const [scheduleType, setScheduleType] = useState<"now" | "schedule">("now");

    useEffect(() => {
        setValue("scheduleType", scheduleType, { shouldDirty: true, shouldTouch: true });
    }, [scheduleType, setValue]);

    return (
        <div className="space-y-6 text-foreground bg-background">
            <div>
                <h2 className="text-lg font-semibold ">Send Campaign</h2>
                <p className="text-sm mt-1">Choose when to send your campaign</p>
            </div>

            <div className="space-y-3">
                <button
                    type="button"
                    onClick={() => setScheduleType("now")}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${scheduleType === "now"
                        ? "border-yellow-400"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                            <Send size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Send Now</p>
                            <p className="text-xs">
                                Start sending immediately after confirmation
                            </p>
                        </div>
                    </div>
                </button>

                <button
                    type="button"
                    onClick={() => setScheduleType("schedule")}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${scheduleType === "schedule"
                        ? "border-yellow-400"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                            <Clock size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Schedule for Later</p>
                            <p className="text-xs">
                                Pick a date and time to send automatically
                            </p>
                        </div>
                    </div>
                </button>
            </div>

            {scheduleType === "schedule" && (
                <div className="space-y-4 p-4 text-foreground bg-background rounded-xl border border-gray-200">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Date & Time</label>
                        <input
                            type="datetime-local"
                            {...register("scheduledAt")}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Timezone</label>
                        <select
                            {...register("timezone")}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            {TIMEZONES.map((tz) => (
                                <option key={tz} value={tz}>{tz}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            <div className="flex justify-between">
                <button onClick={onBack} className={secondaryBtn}>Back</button>
                <button onClick={onSend} disabled={isLoading} className={primaryBtn}>
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            {scheduleType === "schedule" ? "Scheduling..." : "Sending..."}
                        </span>
                    ) : scheduleType === "schedule" ? (
                        "Schedule Campaign"
                    ) : (
                        "Send Campaign"
                    )}
                </button>
            </div>
        </div>
    );
}

const primaryBtn = "bg-yellow-400 hover:bg-yellow-500 text-black dark:bg-[#00004f] dark:text-white dark:hover:bg-[#00006f] text-sm font-medium px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60";
const secondaryBtn = "border border-gray-200 text-gray-600 hover:bg-gray-50 dark:text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors";