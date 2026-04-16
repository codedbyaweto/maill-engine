"use client";

import { useGetCampaignQuery } from "@/services/endpoints/campaignApi";
import CampaignLiveProgress from "@/modules/campaigns/CampaignLiveProgress";
import CampaignAnalytics from "@/modules/campaigns/CampaignAnalytics";
import CampaignStatusBadge from "@/components/campaign/CampaignStatusBadge";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
    campaignId: number;
}

export default function CampaignDetailContent({ campaignId }: Props) {
    const router = useRouter();
    const { data: campaign, isLoading } = useGetCampaignQuery(campaignId);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-32">
                <Loader2 size={28} className="animate-spin text-blue-500" />
            </div>
        );
    }

    if (!campaign) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center text-foreground bg-background">
                <p className=" text-sm">Campaign not found.</p>
                <Button variant="ghost" size="sm" className="mt-4" onClick={() => router.push("/campaigns")}>
                    Back to Campaigns
                </Button>
            </div>
        );
    }

    const scheduledText =
        campaign.status === "scheduled"
            ? `This campaign is scheduled for ${new Date(campaign.scheduledAt!).toLocaleString()}.`
            : "This campaign hasn't been sent yet.";

    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto text-foreground bg-background">
            <div className="flex items-start gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push("/campaigns")}>
                    <ArrowLeft size={18} />
                </Button>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-2xl font-semibold truncate">{campaign.name}</h1>
                        <CampaignStatusBadge status={campaign.status} />
                    </div>
                    <p className="text-sm  mt-1">{campaign.subjectLine}</p>
                </div>
            </div>

            {campaign.status === "sending" && <CampaignLiveProgress campaignId={campaignId} />}
            {campaign.status === "sent" && <CampaignAnalytics campaignId={campaignId} campaign={campaign} />}
            {(campaign.status === "draft" || campaign.status === "scheduled") && (
                <div className="text-foreground bg-background border border-gray-200 rounded-xl p-8 text-center">
                    <p className="text-sm">{scheduledText}</p>
                </div>
            )}
        </div>
    );
}