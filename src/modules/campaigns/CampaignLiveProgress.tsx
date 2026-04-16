"use client";

import { useGetCampaignJobStatusQuery, usePauseCampaignMutation, useResumeCampaignMutation } from "@/services/endpoints/campaignApi";
import { Loader2, Pause, Play, Clock } from "lucide-react";

interface Props {
    campaignId: number;
}

export default function CampaignLiveProgress({ campaignId }: Props) {
    const { data: job, isLoading } = useGetCampaignJobStatusQuery(campaignId, {
        pollingInterval: 3000,
    });

    const [pause, { isLoading: isPausing }] = usePauseCampaignMutation();
    const [resume, { isLoading: isResuming }] = useResumeCampaignMutation();

    if (isLoading || !job) {
        return (
            <div className="text-foreground bg-background border border-gray-200 rounded-xl p-8 flex items-center justify-center">
                <Loader2 size={24} className="animate-spin text-blue-500" />
            </div>
        );
    }

    const isPaused = job.status === "paused";
    const isCompleted = job.status === "completed";
    const remaining = job.totalEmails - job.sentCount - job.failedCount;
    const eta = formatEta(job.estimatedSecondsRemaining);

    return (
        <div className="text-foreground bg-background border border-gray-200 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Sending in Progress</h2>
                    <p className="text-sm mt-0.5">
                        {isCompleted ? "All emails have been sent!" : "Sending your campaign to recipients..."}
                    </p>
                </div>

                {!isCompleted && (
                    <button
                        onClick={() => isPaused ? resume(Number(campaignId)) : pause(Number(campaignId))}
                        disabled={isPausing || isResuming}
                        className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${isPaused
                            ? "border-yellow-500  hover:bg-yellow-20"
                            : "border-gray-200  hover:bg-gray-20"
                            }`}
                    >
                        {isPausing || isResuming ? <Loader2 size={15} className="animate-spin" /> : isPaused ? <Play size={15} /> : <Pause size={15} />}
                        {isPaused ? "Resume" : "Pause"}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-foreground bg-background">
                <div>
                    <p className="text-lg font-semibold">{job.sentCount.toLocaleString()}</p>
                    <p className="text-xs ">Sent</p>
                </div>
                <div>
                    <p className="text-lg font-semibold">{job.failedCount.toLocaleString()}</p>
                    <p className="text-xs">Failed</p>
                </div>
                <div>
                    <p className="text-lg font-semibold">{remaining.toLocaleString()}</p>
                    <p className="text-xs ">Remaining</p>
                </div>
            </div>

            {!isCompleted && job.estimatedSecondsRemaining > 0 && (
                <div className="flex items-center gap-1.5 text-xs">
                    <Clock size={12} />
                    <span>Estimated time remaining: {eta}</span>
                </div>
            )}

            {isPaused && (
                <div className="text-foreground bg-background border border-yellow-200 rounded-lg px-4 py-3 text-sm ">
                    Sending is paused. Click Resume to continue.
                </div>
            )}
        </div>
    );
}

function formatEta(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) return `${mins}m ${secs}s`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
}