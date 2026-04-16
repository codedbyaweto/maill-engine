"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { MergeTagDropdown } from "@/components/templates/MergeTagDropDown";
import { Button } from "@/components/ui/button";

interface HTMLEditorProps {
    initialHtml: string;
    onChange: (html: string) => void;
    onSave: (data: { html: string; design: null }) => void;
}

export function HTMLEditor({
                               initialHtml,
                               onChange,
                               onSave,
                           }: HTMLEditorProps) {
    const [code, setCode] = useState(initialHtml);

    useEffect(() => {
        setCode(initialHtml);
    }, [initialHtml]);

    const handleChange = (value?: string) => {
        const html = value ?? "";
        setCode(html);
        onChange(html);
    };

    const insertTag = (tag: string) => {
        setCode((prev) => {
            const updated = prev + tag;
            onChange(updated);
            return updated;
        });
    };

    const handleSave = () => {
        onSave({
            html: code,
            design: null,
        });
    };

    return (
        <div className="space-y-3 w-full">

            <MergeTagDropdown onInsert={insertTag} />

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">

                <div className="w-full h-[300px] lg:h-[60vh] border rounded overflow-hidden">
                    <Editor
                        language="html"
                        value={code}
                        onChange={handleChange}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 13,
                            wordWrap: "on",
                            automaticLayout: true,
                        }}
                    />
                </div>

                <iframe
                    className="w-full h-[300px] lg:h-[60vh] border rounded bg-white"
                    srcDoc={code}
                    title="preview"
                />
            </div>

            <div className="flex justify-end">
                <Button variant="earth" onClick={handleSave}>
                    Save HTML
                </Button>
            </div>

        </div>
    );
}