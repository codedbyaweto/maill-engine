"use client";

import EmailEditor from "react-email-editor";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
    initialDesign?: any;
    onSave: (data: { html: string; design: any }) => void;
};

export function DragDropEditor({ initialDesign, onSave }: Props) {
    const editorRef = useRef<any>(null);
    const [view, setView] = useState<"desktop" | "mobile">("desktop");

    const handleSave = () => {
        const editor = editorRef.current?.editor;
        if (!editor) return;

        editor.exportHtml((data: any) => {
            onSave({
                html: data.html,
                design: data.design,
            });
        });
    };

    const handleLoad = () => {
        const editor = editorRef.current?.editor;
        if (editor && initialDesign) {
            editor.loadDesign(initialDesign);
        }
    };

    return (
        <div className="space-y-4 w-full">

            <div className="w-full flex justify-center overflow-x-auto">
                <div
                    className={
                        view === "mobile"
                            ? "w-[375px] max-w-full border rounded shadow-sm"
                            : "w-full max-w-6xl border rounded shadow-sm"
                    }
                >
                    <EmailEditor
                        ref={editorRef}
                        onLoad={() => {
                            handleLoad();

                            editorRef.current?.editor?.setMergeTags({
                                first_name: {
                                    name: "First Name",
                                    value: "{{first_name}}",
                                },
                                last_name: {
                                    name: "Last Name",
                                    value: "{{last_name}}",
                                },
                            });
                        }}
                        options={{
                            displayMode: "email",
                            tools: {
                                text: {
                                    properties: {
                                        mergeTags: true,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <Button
                        variant={view === "desktop" ? "earth" : "outline"}
                        onClick={() => setView("desktop")}
                        className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2"
                    >
                        Desktop
                    </Button>

                    <Button
                        variant={view === "mobile" ? "earth" : "outline"}
                        onClick={() => setView("mobile")}
                        className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2"
                    >
                        Mobile
                    </Button>
                </div>

                <Button
                    variant="yellow"
                    onClick={handleSave}
                    className="text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2"
                >
                    Save Template
                </Button>
            </div>
        </div>
    );
}