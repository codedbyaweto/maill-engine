"use client";

import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetCampaignsQuery } from "@/services/endpoints/campaignApi";
import { CampaignDto } from "@/models/response/campaignResponse";
import CampaignStatusBadge from "@/components/campaign/CampaignStatusBadge";
import CampaignStatsRow from "@/components/campaign/CampaignStatsRow";
import { Button } from "@/components/ui/button";
import BaseFormField from "@/components/form/BaseFormField";

const STATUS_FILTERS = [
    { label: "All", value: "" },
    { label: "Draft", value: "draft" },
    { label: "Scheduled", value: "scheduled" },
    { label: "Sending", value: "sending" },
    { label: "Sent", value: "sent" },
    { label: "Failed", value: "failed" },
];

const PAGE_SIZE = 5;

export default function CampaignsContent() {
    const router = useRouter();
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const { data, isLoading, refetch } = useGetCampaignsQuery(
        { status: statusFilter || undefined, page, size: PAGE_SIZE }
    );

    const campaigns = data?.content ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalElements = data?.totalElements ?? 0;

    const filtered = campaigns.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleCreate = () => {
        router.push("/campaigns/create");
        setOpen(false);
    };

    const handleStatusFilter = (value: string) => {
        setStatusFilter(value);
        setPage(0);
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">

            <div className="flex items-start justify-between gap-3">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Campaigns</h1>
                    <p className="text-sm mt-1">Create and manage your email campaigns</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:block">
                        <Button variant="yellow" size="sm" onClick={handleCreate} className="flex items-center gap-2">
                            <Plus size={16} />
                            New Campaign
                        </Button>
                    </div>
                    <button className="sm:hidden" onClick={() => setOpen((p) => !p)}>
                        {open ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="sm:hidden border rounded-xl p-3 bg-background">
                    <Button variant="yellow" className="w-full flex items-center gap-2" onClick={handleCreate}>
                        <Plus size={16} />
                        New Campaign
                    </Button>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-3">
                <BaseFormField
                    name="search"
                    placeholder="Search campaigns..."
                    value={search}
                    onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearch(e.target.value)}
                    leftIcon={<Search size={16} />}
                    onBlur={undefined}
                />
                <div className="flex flex-wrap sm:flex-nowrap gap-1 p-1 rounded-lg w-full overflow-x-auto">
                    {STATUS_FILTERS.map((f) => (
                        <Button
                            key={f.value}
                            variant={statusFilter === f.value ? "yellow" : "ghost"}
                            size="sm"
                            className="whitespace-nowrap shrink-0"
                            onClick={() => handleStatusFilter(f.value)}
                        >
                            {f.label}
                        </Button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <CampaignsLoadingSkeleton />
            ) : filtered.length === 0 ? (
                <CampaignsEmptyState onCreateClick={handleCreate} />
            ) : (
                <>
                    <div className="space-y-3">
                        {filtered.map((campaign) => (
                            <CampaignCard
                                key={campaign.id}
                                campaign={campaign}
                                onView={() => router.push(`/campaigns/${campaign.id}`)}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between pt-2">
                            <p className="text-sm text-muted-foreground">
                                Page {page + 1} of {totalPages} · {totalElements} campaigns
                            </p>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    disabled={page === 0}
                                >
                                    <ChevronLeft size={16} />
                                    Prev
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                    disabled={page >= totalPages - 1}
                                >
                                    Next
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

function CampaignCard({ campaign, onView }: {
    campaign: CampaignDto;
    onView: () => void;
}) {
    return (
        <div
            onClick={onView}
            className="text-foreground bg-background border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-sm transition-all cursor-pointer"
        >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-medium truncate">{campaign.name}</h3>
                        <CampaignStatusBadge status={campaign.status} />
                    </div>
                    <p className="text-sm">{campaign.subjectLine}</p>
                    <p className="text-xs mt-1">
                        From: {campaign.fromName} &lt;{campaign.fromEmail}&gt;
                    </p>
                </div>
                {/* <Button
                    variant="outline"
                    size="sm"
                    className="shrink-0 w-full sm:w-auto"
                    onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
                >
                    Duplicate
                </Button> */}
            </div>

            {/* {campaign.status === "sent" && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <CampaignStatsRow campaign={campaign} />
                </div>
            )} */}

            {["sent", "scheduled", "completed"].includes(campaign.status) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <CampaignStatsRow campaign={campaign} />
                </div>
            )}

            <p className="text-xs mt-3">
                Created {new Date(campaign.createdAt).toLocaleDateString()}
                {campaign.scheduledAt && <> · Scheduled for {new Date(campaign.scheduledAt).toLocaleString()}</>}
                {campaign.sentAt && <> · Sent {new Date(campaign.sentAt).toLocaleDateString()}</>}
            </p>
        </div>
    );
}

function CampaignsEmptyState({ onCreateClick }: { onCreateClick: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-4">
                <Plus size={28} />
            </div>
            <h3 className="text-lg font-medium mb-1">No campaigns yet</h3>
            <p className="text-sm mb-6">Create a campaign to start sending emails.</p>
            <Button variant="yellow" size="sm" onClick={onCreateClick}>
                Create your first campaign
            </Button>
        </div>
    );
}

function CampaignsLoadingSkeleton() {
    return (
        <div className="space-y-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-xl p-4 sm:p-5 animate-pulse">
                    <div className="h-4 w-1/3 mb-2 rounded" />
                    <div className="h-3 w-1/2 rounded" />
                </div>
            ))}
        </div>
    );
}