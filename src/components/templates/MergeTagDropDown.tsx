"use client";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";

const tags = [
    "{{first_name}}",
    "{{last_name}}",
    "{{email}}",
];

export function MergeTagDropdown({ onInsert }: { onInsert: (tag: string) => void }) {
    return (
        <Select onValueChange={onInsert}>
            <SelectTrigger>Insert Merge Tag</SelectTrigger>
            <SelectContent>
                {tags.map(tag => (
                    <SelectItem key={tag} value={tag}>
                        {tag}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}