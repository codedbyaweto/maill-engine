"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SaveTemplateResult = {
    name: string;
    category: string;
};

export const SaveTemplateModal = NiceModal.create<SaveTemplateResult>(() => {
    const modal = useModal();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    const handleSave = () => {
        if (!name || !category) return;

        modal.resolve({ name, category });
        modal.hide();
    };

    return (
        <Dialog open={modal.visible} onOpenChange={modal.hide}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Save Template</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <Input
                        placeholder="Template Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <Button onClick={handleSave}>
                        Save Template
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
});