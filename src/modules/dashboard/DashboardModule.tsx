"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mail, Users, Plus, Menu, X } from "lucide-react";
import MailEnginePieChart from "@/components/charts/PieChart";
import PerformanceTrendChart from "@/components/charts/AreaChart";
import TopCampaignsChart from "@/components/charts/BarChart";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserTableModule from "@/components/dashboard/UsersTable";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

const funnelSteps = [
    { label: "Sent", value: 10000 },
    { label: "Delivered", value: 9500 },
    { label: "Opened", value: 6000 },
    { label: "Clicked", value: 2500 },
];

const campaigns = [
    { name: "Spring Sale", status: "Sent" },
    { name: "Newsletter", status: "Sent" },
    { name: "Promo Blast", status: "Draft" },
    { name: "Launch Campaign", status: "Scheduled" },
    { name: "Feedback Request", status: "Sent" },
];

const statusStyles: Record<string, string> = {
    Sent: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
    Draft: "bg-blue-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400",
    Scheduled: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
};

const DashboardModule = () => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleCreate = () => {
        router.push("/campaigns/create");
    };

    const handleUpload = () => {
        router.push("/recipients/upload");
    };

    if (isLoading) return <DashboardSkeleton />;

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto bg-gradient-to-b from-yellow-50 via-white to-transparent dark:from-black dark:via-zinc-900 dark:to-transparent">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center justify-between w-full lg:w-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Dashboard
                    </h1>

                    <button
                        className="lg:hidden"
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {open ? <X /> : <Menu />}
                    </button>
                </div>

                <div className={`flex-col lg:flex lg:flex-row gap-2 sm:gap-3 w-full lg:w-auto ${open ? "flex" : "hidden lg:flex"}`}>
                    <Button variant="yellow" onClick={handleCreate} className="gap-2 w-full sm:w-auto">
                        <Plus size={16} /> New Campaign
                    </Button>

                    <Button variant="outline" onClick={handleUpload} className="w-full sm:w-auto">
                        Upload Recipients
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="earth" className="w-full sm:w-auto">
                                Create Template
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href="/templates/editor?mode=drag">Drag & Drop Editor</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/templates/editor?mode=html">HTML Editor</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/templates/editor?mode=upload">Upload HTML</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                <Card className="rounded-2xl">
                    <CardContent className="p-5 sm:p-6 flex justify-between items-center">
                        <div>
                            <p className="text-sm">Total Campaigns</p>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-1">120</h2>
                        </div>
                        <Mail className="w-7 h-7 sm:w-9 sm:h-9 opacity-70" />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardContent className="p-5 sm:p-6 flex justify-between items-center">
                        <div>
                            <p className="text-sm">Total Recipients</p>
                            <h2 className="text-2xl sm:text-3xl font-bold mt-1">8450</h2>
                        </div>
                        <Users className="w-7 h-7 sm:w-9 sm:h-9 opacity-70" />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardContent className="p-5 sm:p-6">
                        <p className="text-sm">Open Rate</p>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-1">42%</h2>
                        <Progress value={42} className="mt-3" />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl">
                    <CardContent className="p-5 sm:p-6">
                        <p className="text-sm">Click Rate</p>
                        <h2 className="text-2xl sm:text-3xl font-bold mt-1">18%</h2>
                        <Progress value={18} className="mt-3" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-10">
                <div className="xl:col-span-2 space-y-6 lg:space-y-10">
                    <Card className="rounded-2xl">
                        <CardHeader className="text-center font-bold text-base sm:text-lg">
                            Performance Trend
                        </CardHeader>
                        <CardContent>
                            <PerformanceTrendChart />
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardHeader className="text-center font-bold text-base sm:text-lg">
                            Top Campaigns
                        </CardHeader>
                        <CardContent>
                            <TopCampaignsChart />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6 lg:space-y-10">
                    <Card className="rounded-2xl">
                        <CardHeader className="text-center font-bold text-base sm:text-lg">
                            Conversion Funnel
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {funnelSteps.map((step) => (
                                <div key={step.label}>
                                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                                        <span>{step.label}</span>
                                        <span>{step.value}</span>
                                    </div>
                                    <Progress value={(step.value / funnelSteps[0].value) * 100} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardHeader className="text-center font-bold text-base sm:text-lg">
                            Engagement Distribution
                        </CardHeader>
                        <CardContent>
                            <MailEnginePieChart />
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardHeader className="text-center font-bold text-base sm:text-lg">
                            Live Activity
                        </CardHeader>
                        <CardContent className="space-y-2 text-xs sm:text-sm">
                            <div>🔥 120 users opened email</div>
                            <div>📈 30 clicks in last 2 min</div>
                            <div>⚠️ Bounce spike detected</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="rounded-2xl">
                <CardHeader className="text-center font-bold text-base sm:text-lg">
                    Recent Campaigns
                </CardHeader>

                <CardContent className="space-y-3">
                    {campaigns.map((c, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-xl border hover:bg-muted/50"
                        >
                            <span className="font-medium text-sm sm:text-base">
                                {c.name}
                            </span>

                            <Badge className={statusStyles[c.status]}>
                                {c.status}
                            </Badge>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <UserTableModule />
        </div>
    );
};

export default DashboardModule;