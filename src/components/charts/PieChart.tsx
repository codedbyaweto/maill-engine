"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";
import { useTheme } from "next-themes";

const MailEnginePieChart: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const distributionData = [
        {
            name: "Opened",
            value: 60,
            fill: isDark ? "#3B82F6" : "#FBBF24",
        },
        {
            name: "Not Opened",
            value: 25,
            fill: isDark ? "#60A5FA" : "#F59E0B",
        },
        {
            name: "Bounced",
            value: 10,
            fill: isDark ? "#1D4ED8" : "#FCD34D",
        },
        {
            name: "Complaints",
            value: 5,
            fill: isDark ? "#93C5FD" : "#FEF08A",
        },
    ];

    const textColor = isDark ? "#CBD5E1" : "#374151";

    return (
        <div className="w-full h-[220px] sm:h-[250px] md:h-[270px] lg:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={distributionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        innerRadius={0}
                        isAnimationActive
                    />

                    <Tooltip
                        contentStyle={{
                            fontSize: "12px",
                            borderRadius: "8px",
                            backgroundColor: isDark ? "#0F172A" : "#FFFFFF",
                            border: isDark ? "1px solid #1E293B" : "1px solid #E5E7EB",
                            color: textColor,
                        }}
                        formatter={(value: any, name: any) => [`${value}%`, name]}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MailEnginePieChart;