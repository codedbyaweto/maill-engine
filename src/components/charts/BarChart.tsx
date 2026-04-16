"use client";

import React from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Cell,
} from "recharts";
import { useTheme } from "next-themes";

const comparisonData = [
    { name: "Spring Sale", performance: 4200 },
    { name: "Newsletter", performance: 3800 },
    { name: "Promo", performance: 3000 },
    { name: "Launch Campaign", performance: 3500 },
];

const TopCampaignsChart: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const colors = isDark
        ? ["#60A5FA", "#38BDF8", "#93C5FD", "#3B82F6"]
        : ["#FACC15", "#FDE047", "#FCD34D", "#F59E0B"];

    const gridColor = isDark ? "#334155" : "#E5E7EB";
    const textColor = isDark ? "#CBD5E1" : "#374151";

    return (
        <div className="w-full h-[200px] sm:h-[230px] md:h-[250px] lg:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />

                    <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: textColor }}
                        tickMargin={6}
                    />

                    <YAxis
                        tick={{ fontSize: 10, fill: textColor }}
                        width={28}
                    />

                    <Tooltip
                        contentStyle={{
                            fontSize: "12px",
                            borderRadius: "8px",
                            backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
                            border: isDark ? "1px solid #1E293B" : "1px solid #E5E7EB",
                            color: textColor,
                        }}
                        formatter={(value: any) => value.toLocaleString()}
                    />

                    <Bar dataKey="performance" isAnimationActive>
                        {comparisonData.map((_, index) => (
                            <Cell key={index} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopCampaignsChart;