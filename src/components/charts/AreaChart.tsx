"use client";

import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { useTheme } from "next-themes";

const trendData = [
    { name: "Mon", opens: 2000, clicks: 800 },
    { name: "Tue", opens: 3000, clicks: 1200 },
    { name: "Wed", opens: 2500, clicks: 1000 },
    { name: "Thu", opens: 4000, clicks: 1600 },
    { name: "Fri", opens: 3800, clicks: 1400 },
    { name: "Sat", opens: 4200, clicks: 1800 },
    { name: "Sun", opens: 4600, clicks: 2000 },
];

const PerformanceTrendChart = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const primary = isDark ? "#60A5FA" : "#FFD700";
    const secondary = isDark ? "#38BDF8" : "#FFA500";

    const gridColor = isDark ? "#334155" : "#E5E7EB";
    const textColor = isDark ? "#CBD5E1" : "#374151";
    const tooltipBg = isDark ? "#0F172A" : "#FFFFFF";
    const tooltipBorder = isDark ? "#1E293B" : "#E5E7EB";

    return (
        <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={primary} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={primary} stopOpacity={0.1} />
                        </linearGradient>

                        <linearGradient id="secondaryGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={secondary} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={secondary} stopOpacity={0.1} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />

                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: textColor }} tickMargin={6} />

                    <YAxis tick={{ fontSize: 10, fill: textColor }} width={30} />

                    <Tooltip
                        contentStyle={{
                            fontSize: "12px",
                            borderRadius: "8px",
                            backgroundColor: tooltipBg,
                            border: `1px solid ${tooltipBorder}`,
                            color: textColor,
                        }}
                        formatter={(value: any) => value.toLocaleString()}
                    />

                    <Area
                        type="monotone"
                        dataKey="opens"
                        stroke={primary}
                        fill="url(#primaryGradient)"
                        strokeWidth={2}
                    />

                    <Area
                        type="monotone"
                        dataKey="clicks"
                        stroke={secondary}
                        fill="url(#secondaryGradient)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PerformanceTrendChart;