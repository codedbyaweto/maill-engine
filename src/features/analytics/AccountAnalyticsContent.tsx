// "use client";
//
// import {
//     useGetDeliverabilityTrendsQuery,
//     useGetEngagementScoresQuery,
//     useGetListHealthQuery,
// } from "@/services/endpoints/analyticsApi";
//
// import { Loader2, AlertTriangle, TrendingUp } from "lucide-react";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     ResponsiveContainer,
//     Legend,
// } from "recharts";
// import { useMemo } from "react";
//
// function ScoreCircle({ score }: { score: number }) {
//     return (
//         <div
//             className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center shrink-0
//             ${score >= 80
//                     ? "bg-green-50 text-green-600"
//                     : score >= 60
//                         ? "bg-yellow-50 text-yellow-600"
//                         : "bg-red-50 text-red-600"
//                 }`}
//         >
//             <span className="text-xl sm:text-2xl font-bold">{score}</span>
//             <span className="text-[10px] sm:text-xs">/ 100</span>
//         </div>
//     );
// }
//
// function CategoryBadge({ category }: { category: string }) {
//     const map: Record<string, string> = {
//         "highly engaged": "bg-green-100 text-green-700",
//         engaged: "bg-blue-100 text-blue-700",
//         "at risk": "bg-yellow-100 text-yellow-700",
//         disengaged: "bg-red-100 text-red-600",
//     };
//
//     return (
//         <span
//             className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${map[category] ?? ""
//                 }`}
//         >
//             {category}
//         </span>
//     );
// }
//
// function EngagementRow({ email, category, lastOpenAt, score }: any) {
//     return (
//         <tr>
//             <td className="py-3 text-xs sm:text-sm break-all">{email}</td>
//             <td className="py-3">
//                 <CategoryBadge category={category} />
//             </td>
//             <td className="py-3 text-[10px] sm:text-xs">
//                 {lastOpenAt ? new Date(lastOpenAt).toLocaleDateString() : "—"}
//             </td>
//             <td className="py-3 text-right">
//                 <div className="flex items-center justify-end gap-2">
//                     <div className="w-12 sm:w-16 rounded-full h-1.5 bg-gray-100">
//                         <div
//                             className={`h-full rounded-full ${score >= 70
//                                 ? "bg-green-400"
//                                 : score >= 40
//                                     ? "bg-yellow-400"
//                                     : "bg-red-400"
//                                 }`}
//                             style={{ width: `${score}%` }}
//                         />
//                     </div>
//                     <span className="text-xs sm:text-sm font-medium w-6 text-right">
//                         {score}
//                     </span>
//                 </div>
//             </td>
//         </tr>
//     );
// }
//
// export default function AccountAnalyticsContent() {
//     const { data: trends, isLoading: loadingTrends } =
//         useGetDeliverabilityTrendsQuery();
//
//     const { data: scores, isLoading: loadingScores } =
//         useGetEngagementScoresQuery();
//
//     const { data: listHealth, isLoading: loadingHealth } =
//         useGetListHealthQuery();
//
//     const highComplaint = useMemo(() => {
//         return (trends ?? []).some((t) => t.complaintRate > 0.08);
//     }, [trends]);
//
//     return (
//         <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
//             <div className="space-y-1">
//                 <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
//                     Analytics
//                 </h1>
//                 <p className="text-xs sm:text-sm">
//                     Account-wide performance, deliverability, and engagement insights
//                 </p>
//             </div>
//
//             <div className="border rounded-xl p-4 sm:p-5 space-y-4">
//                 <div className="flex items-center gap-2">
//                     <TrendingUp size={16} className="text-yellow-500" />
//                     <h2 className="text-xs sm:text-sm font-semibold">
//                         Deliverability Trends
//                     </h2>
//                 </div>
//
//                 {loadingTrends ? (
//                     <div className="flex justify-center py-10">
//                         <Loader2 className="animate-spin text-yellow-500" />
//                     </div>
//                 ) : (
//                     <ResponsiveContainer width="100%" height={220}>
//                         <LineChart data={trends ?? []}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" tick={{ fontSize: 10 }} />
//                             <YAxis tick={{ fontSize: 10 }} />
//                             <Tooltip />
//                             <Legend wrapperStyle={{ fontSize: 10 }} />
//                             <Line
//                                 type="monotone"
//                                 dataKey="deliveryRate"
//                                 stroke="#3b82f6"
//                                 strokeWidth={2}
//                                 dot={false}
//                             />
//                             <Line
//                                 type="monotone"
//                                 dataKey="bounceRate"
//                                 stroke="#ef4444"
//                                 strokeWidth={2}
//                                 dot={false}
//                             />
//                             <Line
//                                 type="monotone"
//                                 dataKey="complaintRate"
//                                 stroke="#f59e0b"
//                                 strokeWidth={2}
//                                 dot={false}
//                             />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 )}
//
//                 {highComplaint && (
//                     <div className="flex items-start gap-2 border rounded-lg px-3 py-2 text-xs sm:text-sm">
//                         <AlertTriangle size={14} className="mt-0.5 text-yellow-500" />
//                         <span>Complaint rate is high. Review sending practices.</span>
//                     </div>
//                 )}
//             </div>
//
//             <div className="border rounded-xl p-4 sm:p-5 space-y-4">
//                 <h2 className="text-xs sm:text-sm font-semibold">List Health</h2>
//
//                 {loadingHealth ? (
//                     <div className="flex justify-center py-6">
//                         <Loader2 className="animate-spin text-yellow-500" />
//                     </div>
//                 ) : (
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                         <ScoreCircle score={listHealth?.score ?? 0} />
//
//                         <div className="space-y-2">
//                             {listHealth?.recommendations?.map((rec, i) => (
//                                 <div key={i} className="flex items-start gap-2 text-xs sm:text-sm">
//                                     <AlertTriangle
//                                         size={14}
//                                         className="text-yellow-500 mt-0.5"
//                                     />
//                                     <span>{rec}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//
//             <div className="border rounded-xl p-4 sm:p-5 space-y-4">
//                 <h2 className="text-xs sm:text-sm font-semibold">
//                     Recipient Engagement Scores
//                 </h2>
//
//                 {loadingScores ? (
//                     <div className="flex justify-center py-10">
//                         <Loader2 className="animate-spin text-yellow-500" />
//                     </div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-xs sm:text-sm min-w-[500px]">
//                             <thead>
//                                 <tr className="border-b">
//                                     <th className="text-left pb-2">Email</th>
//                                     <th className="text-left pb-2">Category</th>
//                                     <th className="text-left pb-2">Last Opened</th>
//                                     <th className="text-right pb-2">Score</th>
//                                 </tr>
//                             </thead>
//
//                             <tbody className="divide-y">
//                                 {scores?.map((s) => (
//                                     <EngagementRow key={s.email} {...s} />
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, TrendingUp } from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts"

const mockTrends = [
    { date: "Mon", deliveryRate: 95, bounceRate: 3, complaintRate: 1 },
    { date: "Tue", deliveryRate: 92, bounceRate: 4, complaintRate: 2 },
    { date: "Wed", deliveryRate: 97, bounceRate: 2, complaintRate: 1 },
    { date: "Thu", deliveryRate: 94, bounceRate: 3, complaintRate: 1 },
]

const mockScores = Array.from({ length: 10 }).map((_, i) => ({
    email: `user${i + 1}@gmail.com`,
    category: i % 3 === 0 ? "highly engaged" : i % 3 === 1 ? "engaged" : "at risk",
    lastOpenAt: "2026-04-18",
    score: 95 - i * 5,
}))

const mockListHealth = {
    score: 78,
    recommendations: [
        "Remove inactive subscribers",
        "Improve subject line quality",
        "Segment low engagement users",
    ],
}

function SkeletonBox({ className }: { className: string }) {
    return (
        <div className={`animate-pulse bg-gray-200 dark:bg-zinc-800 rounded ${className}`} />
    )
}

function ScoreCircle({ score }: { score: number }) {
    return (
        <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center shrink-0 ${
                score >= 80
                    ? "bg-green-50 text-green-600"
                    : score >= 60
                        ? "bg-yellow-50 text-yellow-600"
                        : "bg-red-50 text-red-600"
            }`}
        >
            <span className="text-xl sm:text-2xl font-bold">{score}</span>
            <span className="text-[10px] sm:text-xs">/ 100</span>
        </div>
    )
}

function CategoryBadge({ category }: { category: string }) {
    const map: Record<string, string> = {
        "highly engaged": "bg-green-100 text-green-700",
        engaged: "bg-blue-100 text-blue-700",
        "at risk": "bg-yellow-100 text-yellow-700",
        disengaged: "bg-red-100 text-red-600",
    }

    return (
        <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full ${map[category] ?? ""}`}>
            {category}
        </span>
    )
}

function EngagementRow({ email, category, lastOpenAt, score }: any) {
    return (
        <tr className="border-b">
            <td className="py-3 text-xs sm:text-sm break-all">{email}</td>
            <td className="py-3">
                <CategoryBadge category={category} />
            </td>
            <td className="py-3 text-[10px] sm:text-xs">
                {lastOpenAt ? new Date(lastOpenAt).toLocaleDateString() : "—"}
            </td>
            <td className="py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                    <div className="w-12 sm:w-16 rounded-full h-1.5 bg-gray-100">
                        <div
                            className={`h-full rounded-full ${
                                score >= 70
                                    ? "bg-green-400"
                                    : score >= 40
                                        ? "bg-yellow-400"
                                        : "bg-red-400"
                            }`}
                            style={{ width: `${score}%` }}
                        />
                    </div>
                    <span className="text-xs sm:text-sm font-medium w-6 text-right">
                        {score}
                    </span>
                </div>
            </td>
        </tr>
    )
}

export default function AccountAnalyticsContent() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 800)
        return () => clearTimeout(t)
    }, [])

    const highComplaint = mockTrends.some(t => t.complaintRate > 0.08)

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">

            {/* HEADER SKELETON ADDED HERE */}
            <div className="space-y-2">
                {isLoading ? (
                    <>
                        <SkeletonBox className="h-7 w-40" />
                        <SkeletonBox className="h-4 w-72" />
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Analytics
                        </h1>
                        <p className="text-xs sm:text-sm">
                            Account-wide performance, deliverability, and engagement insights
                        </p>
                    </>
                )}
            </div>

            {/* Deliverability Trends */}
            <div className="border rounded-xl p-4 space-y-4">
                <div className="flex items-center gap-2">
                    <TrendingUp size={16} className="text-yellow-500" />
                    <h2 className="text-sm font-semibold">Deliverability Trends</h2>
                </div>

                {isLoading ? (
                    <SkeletonBox className="h-[220px] w-full" />
                ) : (
                    <div className="w-full h-[200px] sm:h-[220px] md:h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                                <YAxis tick={{ fontSize: 10 }} width={30} />
                                <Tooltip />
                                <Legend wrapperStyle={{ fontSize: "10px" }} />
                                <Line dataKey="deliveryRate" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                <Line dataKey="bounceRate" stroke="#ef4444" strokeWidth={2} dot={false} />
                                <Line dataKey="complaintRate" stroke="#f59e0b" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {highComplaint && !isLoading && (
                    <div className="flex gap-2 text-sm border rounded-lg px-3 py-2">
                        <AlertTriangle size={14} className="text-yellow-500" />
                        <span>Complaint rate is high.</span>
                    </div>
                )}
            </div>

            {/* List Health */}
            <div className="border rounded-xl p-4 space-y-4">
                <h2 className="text-sm font-semibold text-center sm:text-left">
                    List Health
                </h2>

                {isLoading ? (
                    <div className="flex justify-center sm:justify-start">
                        <SkeletonBox className="w-20 h-20 rounded-full" />
                    </div>
                ) : (
                    <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-start gap-4 text-center sm:text-left">

                        <div className="flex justify-center sm:justify-start">
                            <ScoreCircle score={mockListHealth.score} />
                        </div>

                        <div className="space-y-2">
                            {mockListHealth.recommendations.map((rec, i) => (
                                <div key={i} className="flex gap-2 text-sm justify-start">
                                    <AlertTriangle size={14} className="text-yellow-500" />
                                    <span>{rec}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                )}
            </div>

            {/* Table */}
            <div className="border rounded-xl p-4 space-y-4">
                <h2 className="text-sm font-semibold">Recipient Engagement Scores</h2>

                {isLoading ? (
                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SkeletonBox key={i} className="h-6 w-full" />
                        ))}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm min-w-[600px]">
                            <thead>
                            <tr className="border-b">
                                <th className="text-left pb-2">Email</th>
                                <th className="text-left pb-2">Category</th>
                                <th className="text-left pb-2">Last Opened</th>
                                <th className="text-right pb-2">Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mockScores.map(s => (
                                <EngagementRow key={s.email} {...s} />
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

        </div>
    )
}