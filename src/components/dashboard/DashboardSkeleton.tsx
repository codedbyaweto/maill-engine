"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">

            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-40" />
                <div className="flex gap-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-40" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="rounded-2xl">
                        <CardContent className="p-6 space-y-3">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-16" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                <div className="xl:col-span-2 space-y-6">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i} className="rounded-2xl">
                            <CardHeader>
                                <Skeleton className="h-5 w-40 mx-auto" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-64 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className="rounded-2xl">
                            <CardHeader>
                                <Skeleton className="h-5 w-32 mx-auto" />
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[...Array(4)].map((_, j) => (
                                    <Skeleton key={j} className="h-4 w-full" />
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>

            <Card className="rounded-2xl">
                <CardHeader>
                    <Skeleton className="h-5 w-40 mx-auto" />
                </CardHeader>
                <CardContent className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full rounded-xl" />
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}