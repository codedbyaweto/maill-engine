"use client";

import {
    useGetCampaignAnalyticsQuery,
    useGetCampaignTimelineQuery,
    useGetCampaignLinksQuery,
    useGetCampaignDevicesQuery,
    useGetCampaignGeographyQuery,
    useGetCampaignRecipientsQuery,
} from "@/services/endpoints/analyticsApi";
import { CampaignDto } from "@/models/response/campaignResponse";
import { Loader2, Download } from "lucide-react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";
import { Button } from "@/components/ui/button";

interface Props {
    campaignId: number;
    campaign: CampaignDto;
}

export default function CampaignAnalytics({ campaignId, campaign }: Props) {
    const id = Number(campaignId);
    const { data: analytics, isLoading } = useGetCampaignAnalyticsQuery(id);
    const { data: timeline } = useGetCampaignTimelineQuery(id);
    const { data: links } = useGetCampaignLinksQuery(id);
    const { data: devices } = useGetCampaignDevicesQuery(id);
    const { data: geography } = useGetCampaignGeographyQuery(id);
    const { data: recipients } = useGetCampaignRecipientsQuery(id);

    if (isLoading || !analytics) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={24} className="animate-spin text-yellow-500" />
            </div>
        );
    }

    const handleExport = () => {
        if (!recipients?.content) return;
        const headers = ["Email", "Status", "Opened At", "Links Clicked", "Read Depth"];
        const rows = recipients.content.map((r) => [
            r.email,
            r.status,
            r.openedAt ?? "—",
            r.clickedLinks,
            r.readDepth,
        ]);
        const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${campaign.name}-recipients.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6 text-foreground bg-background">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard label="Delivered" value={`${analytics.deliveryRate}%`} sub={`${analytics.delivered.toLocaleString()} emails`} color="blue" />
                <StatCard label="Open Rate" value={`${analytics.adjustedOpenRate}%`} sub="Adjusted for Apple MPP" color="green" />
                <StatCard label="Click Rate" value={`${analytics.clickRate}%`} sub={`${analytics.uniqueClicks.toLocaleString()} unique clicks`} color="purple" />
                <StatCard label="Bounce Rate" value={`${analytics.bounceRate}%`} sub={`${analytics.bounced.toLocaleString()} bounced`} color="red" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-foreground bg-background">
                <MiniStat label="Click-to-Open" value={`${analytics.clickToOpenRate}%`} />
                <MiniStat label="Unsubscribed" value={analytics.unsubscribed.toString()} />
                <MiniStat label="Complaints" value={analytics.complained.toString()} />
                <MiniStat label="Avg Read Time" value={`${analytics.avgReadTimeSeconds}s`} />
            </div>

            <div className=" border border-gray-200 rounded-xl p-5 space-y-4">
                <h3 className="text-sm font-semibold ">Scroll Depth</h3>
                <div className="space-y-3">
                    {[
                        { label: "Top of email", value: analytics.scrollDepth.top },
                        { label: "Middle of email", value: analytics.scrollDepth.middle },
                        { label: "Bottom of email", value: analytics.scrollDepth.bottom },
                    ].map((item) => (
                        <div key={item.label} className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span>{item.label}</span>
                                <span className="font-medium">{item.value}%</span>
                            </div>
                            <div className="w-full rounded-full h-2">
                                <div
                                    className="h-full bg-yellow-400 rounded-full"
                                    style={{ width: `${item.value}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {timeline && (
                <div className=" border border-gray-200 rounded-xl p-5 space-y-4">
                    <h3 className="text-sm font-semibold ">Engagement Timeline</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={timeline}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="timestamp"
                                tickFormatter={(v) => new Date(v).getHours() + ":00"}
                                tick={{ fontSize: 11 }}
                            />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip
                                labelFormatter={(v) => new Date(v).toLocaleTimeString()}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="opens" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="clicks" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )}

            {devices && (
                <div className=" border border-gray-200 rounded-xl p-5 space-y-4">
                    <h3 className="text-sm font-semibold ">Devices & Clients</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { title: "Devices", data: devices.devices },
                            { title: "Email Clients", data: devices.emailClients },
                            { title: "Operating Systems", data: devices.os },
                        ].map((group) => (
                            <div key={group.title}>
                                <p className="text-xs font-medium mb-3">{group.title}</p>
                                <div className="space-y-2">
                                    {group.data.map((item) => {
                                        const total = group.data.reduce((s, i) => s + i.count, 0);
                                        const pct = Math.round((item.count / total) * 100);
                                        return (
                                            <div key={item.name} className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span>{item.name}</span>
                                                    <span>{pct}%</span>
                                                </div>
                                                <div className="w-full  rounded-full h-1.5">
                                                    <div
                                                        className="h-full bg-yellow-400 rounded-full"
                                                        style={{ width: `${pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {links && (
                <div className=" border border-gray-200 rounded-xl p-5 space-y-4 text-foreground bg-background">
                    <h3 className="text-sm font-semibold ">Link Performance</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-xs font-medium pb-3">URL</th>
                                    <th className="text-right text-xs font-medium pb-3">Unique Clicks</th>
                                    <th className="text-right text-xs  font-medium pb-3">Total Clicks</th>
                                    <th className="text-right text-xs  font-medium pb-3">CTR</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {links.map((link) => (
                                    <tr key={link.url}>
                                        <td className="py-3 text-yellow-600 truncate max-w-xs">{link.url}</td>
                                        <td className="py-3 text-right ">{link.uniqueClicks}</td>
                                        <td className="py-3 text-right ">{link.totalClicks}</td>
                                        <td className="py-3 text-right ">{link.ctr}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {geography && (
                <div className=" border border-gray-200 rounded-xl p-5 space-y-4 text-foreground bg-background">
                    <h3 className="text-sm font-semibold ">Geography</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-xsfont-medium pb-3">Country</th>
                                    <th className="text-left text-xs  font-medium pb-3">City</th>
                                    <th className="text-right text-xs  font-medium pb-3">Opens</th>
                                    <th className="text-right text-xs  font-medium pb-3">Clicks</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {geography.map((row) => (
                                    <tr key={`${row.country}-${row.city}`}>
                                        <td className="py-3 ">{row.country}</td>
                                        <td className="py-3 ">{row.city}</td>
                                        <td className="py-3 text-right ">{row.opens}</td>
                                        <td className="py-3 text-right">{row.clicks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {recipients && (
                <div className=" border border-gray-200 rounded-xl p-5 space-y-4 text-foreground bg-background">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold ">Recipients</h3>
                        <Button
                            variant="yellow"
                            size="sm" onClick={handleExport}
                            className="flex items-center gap-1.5 text-xs  hover:text-gray-700 border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                            <Download size={13} />
                            Export CSV
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="text-left text-xs  font-medium pb-3">Email</th>
                                    <th className="text-left text-xs  font-medium pb-3">Status</th>
                                    <th className="text-left text-xs  font-medium pb-3">Opened At</th>
                                    <th className="text-center text-xs font-medium pb-3 pr-4">Links Clicked</th>
                                    <th className="text-left text-xs  font-medium pb-3">Read Depth</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recipients.content.map((r) => (
                                    <tr key={r.email} className="hover:bg-gray-20 transition-colors">
                                        <td className="py-3 ">{r.email}</td>
                                        <td className="py-3">
                                            <span
                                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColor(r.status)}`}
                                            >
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="py-3  text-xs">
                                            {r.openedAt ? new Date(r.openedAt).toLocaleString() : "—"}
                                        </td>
                                        <td className="py-3 text-center pr-4">{r.clickedLinks}</td>
                                        <td className="py-3  text-xs capitalize">{r.readDepth}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
    const colors: Record<string, string> = {
        blue: "bg-blue-50 text-blue-700",
        green: "bg-green-50 text-green-700",
        purple: "bg-purple-50 text-purple-700",
        red: "bg-red-50 text-red-700",
    };
    return (
        <div className={`${colors[color]} rounded-xl p-4`}>
            <p className="text-xs font-medium opacity-70">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            <p className="text-xs opacity-60 mt-0.5">{sub}</p>
        </div>
    );
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="text-foreground bg-background border border-gray-200 rounded-xl p-4">
            <p className="text-xs">{label}</p>
            <p className="text-lg font-semibold  mt-0.5">{value}</p>
        </div>
    );
}

function statusColor(status: string): string {
    const map: Record<string, string> = {
        opened: "bg-green-100 text-green-700",
        clicked: "bg-blue-100 text-blue-700",
        delivered: "bg-gray-100 text-gray-600",
        bounced: "bg-red-100 text-red-600",
        unsubscribed: "bg-yellow-100 text-yellow-700",
    };
    return map[status] ?? "bg-gray-100 text-gray-600";
}