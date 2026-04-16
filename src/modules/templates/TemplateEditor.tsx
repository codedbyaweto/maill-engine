// "use client";
//
// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
//
// import { DragDropEditor } from "@/components/templates/DragDropEditor";
// import { HTMLEditor } from "@/components/templates/HtmlEditor";
// import { UploadHTML } from "@/components/templates/UploadHTML";
//
// import NiceModal from "@ebay/nice-modal-react";
// import { SaveTemplateModal } from "@/components/templates/SaveTemplateModal";
//
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import {
//     addTemplate,
//     updateTemplate,
// } from "@/features/templates/templatesSlice";
// import {toast} from "react-hot-toast";
//
// export default function EditorPage() {
//     const dispatch = useAppDispatch();
//     const router = useRouter();
//     const params = useSearchParams();
//
//     const modeFromURL = params.get("mode") || "drag";
//     const templateId = params.get("id");
//
//     const templates = useAppSelector(
//         (state) => state.templates.templates
//     );
//
//     const [mode, setMode] = useState(modeFromURL);
//
//     const tmpl = templates.find((t) => t.id === templateId);
//
//     const initialHtml = tmpl?.html ?? "";
//     const initialDesign = tmpl?.design ?? null;
//
//     const handleSave = async (data: any) => {
//         try {
//             const result = await NiceModal.show(SaveTemplateModal);
//
//             if (!result) return;
//
//             const { name, category } = result as {
//                 name: string;
//                 category: string;
//             };
//
//             const existing = templates.find((t) => t.id === templateId);
//
//             const payload = {
//                 id:
//                     templateId ||
//                     (typeof crypto !== "undefined"
//                         ? crypto.randomUUID()
//                         : Date.now().toString()),
//                 name,
//                 category,
//                 html: data.html,
//                 design: data.design,
//                 createdAt: existing?.createdAt || new Date().toISOString(),
//             };
//
//             if (templateId) {
//                 dispatch(updateTemplate(payload));
//             } else {
//                 dispatch(addTemplate(payload));
//             }
//
//             toast.success("Template saved successfully.");
//
//             setTimeout(() => {
//                 router.push("/templates");
//             }, 300)
//
//         } catch (err) {
//             console.error(err);
//         }
//     };
//
//     return (
//         <div className="p-6 space-y-4">
//             <div className="flex justify-between gap-2">
//                 <button
//                     className={mode === "drag" ? "font-bold" : ""}
//                     onClick={() => setMode("drag")}
//                 >
//                     Drag
//                 </button>
//
//                 <button
//                     className={mode === "html" ? "font-bold" : ""}
//                     onClick={() => setMode("html")}
//                 >
//                     HTML
//                 </button>
//
//                 <button
//                     className={mode === "upload" ? "font-bold" : ""}
//                     onClick={() => setMode("upload")}
//                 >
//                     Upload
//                 </button>
//             </div>
//
//             {mode === "drag" && (
//                 <DragDropEditor
//                     initialDesign={initialDesign}
//                     onSave={handleSave}
//                 />
//             )}
//
//             {mode === "html" && (
//                 <HTMLEditor
//                     initialHtml={initialHtml}
//                     onSave={(data) =>
//                         handleSave({
//                             html: data.html,
//                             design: null,
//                         })
//                     }
//                 />
//             )}
//
//             {mode === "upload" && (
//                 <UploadHTML
//                     onUseHtml={(h: string) => {
//                         setHtml(h);
//                         setMode("html");
//                     }}
//                 />
//             )}
//         </div>
//     );
// }

"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { DragDropEditor } from "@/components/templates/DragDropEditor";
import { HTMLEditor } from "@/components/templates/HtmlEditor";
import { UploadHTML } from "@/components/templates/UploadHTML";

import NiceModal from "@ebay/nice-modal-react";
import { SaveTemplateModal } from "@/components/templates/SaveTemplateModal";

import {
    useCreateTemplateMutation,
    useUpdateTemplateMutation,
    useGetTemplateByIdQuery
} from "@/services/endpoints/templateApi";

import { toast } from "react-hot-toast";
import {useAppSelector} from "@/store/hooks";

export default function EditorPage() {
    const router = useRouter();
    const params = useSearchParams();

    const templateId = params.get("id");
    const modeFromURL = params.get("mode") || "drag";

    const [mode, setMode] = useState(modeFromURL);
    const [html, setHtml] = useState("");

    const { data: template } = useGetTemplateByIdQuery(Number(templateId), {
        skip: !templateId,
    });

    const [createTemplate] = useCreateTemplateMutation();
    const [updateTemplate] = useUpdateTemplateMutation();

    const initialHtml = template?.htmlContent ?? "";
    const initialDesign = template?.jsonDesign ?? null;

    const token = useAppSelector((state) => state.auth.token);
    console.log("STATE TOKEN:", token);

    const handleSave = async (data: { html: string; design: any }) => {
        try {
            const result = await NiceModal.show(SaveTemplateModal);

            if (!result) return;

            const { name, category } = result as {
                name: string;
                category: string;
            };

            if (templateId) {
                await updateTemplate({
                    id: Number(templateId),
                    name,
                    category,
                    htmlContent: data.html,
                    jsonDesign: data.design,
                }).unwrap();
            } else {
                await createTemplate({
                    name,
                    category,
                    htmlContent: data.html,
                    jsonDesign: data.design,
                }).unwrap();
            }

            toast.success("Template saved successfully.");
            router.push("/templates");
        } catch (err) {
            console.error(err);
            toast.error("Failed to save template");
        }
    };

    return (
        <div className="p-6 space-y-4">

            <div className="flex justify-between items-center rounded-lg p-2">
                <button
                    className={mode === "drag" ? "font-bold" : "opacity-60"}
                    onClick={() => setMode("drag")}
                >
                    Drag
                </button>

                <button
                    className={mode === "html" ? "font-bold" : "opacity-60"}
                    onClick={() => setMode("html")}
                >
                    HTML
                </button>

                <button
                    className={mode === "upload" ? "font-bold" : "opacity-60"}
                    onClick={() => setMode("upload")}
                >
                    Upload
                </button>
            </div>

            {mode === "drag" && (
                <DragDropEditor
                    initialDesign={initialDesign}
                    onSave={handleSave}
                />
            )}

            {mode === "html" && (
                <HTMLEditor
                    initialHtml={html || initialHtml}
                    onChange={setHtml}
                    onSave={(data) =>
                        handleSave({
                            html: data.html,
                            design: null,
                        })
                    }
                />
            )}

            {mode === "upload" && (
                <UploadHTML
                    onUseHtml={(h: string) => {
                        setHtml(h);
                        setMode("html");
                    }}
                />
            )}
        </div>
    );
}