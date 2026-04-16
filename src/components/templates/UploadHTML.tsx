"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useUploadHtmlTemplateMutation } from "@/services/endpoints/templateApi";
import { toast } from "react-hot-toast";

export function UploadHTML({ onUseHtml }: any) {
    const [html, setHtml] = useState("");
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [uploadHtmlTemplate, { isLoading }] =
        useUploadHtmlTemplateMutation();

    const handleFile = async (file: File) => {
        if (!file.name.endsWith(".html")) {
            toast.error("Please upload a valid HTML file");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await uploadHtmlTemplate(formData).unwrap();

            const text = await file.text();

            setHtml(res.htmlContent || text);
            setFileName(file.name);

        } catch (err) {
            console.error(err);
            toast.error("Upload failed");
        }
    };

    return (
        <div className="space-y-4 w-full">

            <input
                ref={fileInputRef}
                type="file"
                accept=".html,text/html"
                className="hidden"
                onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) await handleFile(file);
                }}
            />

            {fileName && (
                <p className="text-sm text-green-600 truncate">
                    Uploaded: {fileName}
                </p>
            )}

            <div className="w-full h-[320px] border rounded overflow-hidden">
                {html ? (
                    <iframe srcDoc={html} className="w-full h-full" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm px-4 text-center">
                        No file uploaded yet
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between gap-2">

                <Button
                    variant="yellow"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="text-xs lg:text-sm px-3 py-2"
                >
                    {isLoading ? "Uploading..." : "Upload HTML File"}
                </Button>

                <Button
                    variant="earth"
                    disabled={!html}
                    onClick={() => onUseHtml(html)}
                    className="text-xs lg:text-sm px-3 py-2"
                >
                    Edit in HTML Editor
                </Button>

            </div>
        </div>
    );
}