"use client";

import { Card } from "@/components/ui/card";

export function ModeSelector({ onSelect }: { onSelect: (mode: string) => void }) {
    const options = [
        { key: "drag", label: "Drag & Drop Editor" },
        { key: "html", label: "HTML Editor" },
        { key: "upload", label: "Upload HTML File" },
    ];

    return (
        <div className="grid grid-cols-3 gap-4">
            {options.map((opt) => (
                <Card
                    key={opt.key}
                    onClick={() => onSelect(opt.key)}
                    className="p-6 cursor-pointer hover:border-primary"
                >
                    <h2 className="font-semibold">{opt.label}</h2>
                </Card>
            ))}
        </div>
    );
}