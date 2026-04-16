"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "@/components/ui/button";

export const PreviewTemplateModal = NiceModal.create(({ html }: { html: string }) => {
    const modal = useModal();

    const handleClose = () => {
        modal.hide();
        setTimeout(() => {
            modal.remove();
        }, 200);
    };

    if (!modal.visible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white dark:bg-zinc-900 rounded-xl w-[90vw] h-[90vh] p-4 flex flex-col">

                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-semibold">Preview</h2>
                    <Button variant="yellow" onClick={handleClose}>
                        Close
                    </Button>
                </div>

                <iframe
                    srcDoc={html}
                    className="flex-1 w-full rounded-md border"
                />
            </div>
        </div>
    );
});