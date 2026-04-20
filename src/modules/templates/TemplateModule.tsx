"use client";

import { useState } from "react";
import { TemplateGrid } from "@/components/templates/TemplateGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetTemplatesQuery } from "@/services/endpoints/templateApi";
import { TemplateSkeleton } from "@/components/templates/TemplateGridSkeleton";

const PAGE_SIZE = 6;

function SkeletonBox({ className }: { className: string }) {
    return (
        <div className={`animate-pulse bg-gray-200 dark:bg-zinc-800 rounded ${className}`} />
    );
}

function PageHeaderSkeleton() {
    return (
        <div className="flex items-center justify-between">
            <SkeletonBox className="h-8 w-40" />
            <SkeletonBox className="h-9 w-32 rounded-lg hidden md:block" />
            <SkeletonBox className="h-8 w-8 md:hidden" />
        </div>
    );
}

function SearchSkeleton() {
    return <SkeletonBox className="h-10 w-full" />;
}

function PaginationSkeleton() {
    return (
        <div className="flex items-center justify-between">
            <SkeletonBox className="h-4 w-40" />
            <div className="flex gap-2">
                <SkeletonBox className="h-9 w-20" />
                <SkeletonBox className="h-9 w-20" />
            </div>
        </div>
    );
}

function FullPageSkeleton() {
    return (
        <div className="space-y-6">
            <PageHeaderSkeleton />
            <SearchSkeleton />
            <TemplateSkeleton />
            <PaginationSkeleton />
        </div>
    );
}

export default function TemplatesModule() {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const router = useRouter();

    const { data, isLoading } = useGetTemplatesQuery({
        page,
        size: PAGE_SIZE,
    });

    const templates = data?.content ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalElements = data?.totalElements ?? 0;

    const filteredTemplates = templates.filter(
        (t) =>
            t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = (mode: "drag" | "html" | "upload") => {
        router.push(`/templates/editor?mode=${mode}`);
        setOpen(false);
    };

    return (
        <div className="p-4 sm:p-6 space-y-6 bg-gradient-to-b from-yellow-50 via-white to-transparent dark:from-black dark:via-zinc-900 dark:to-transparent">

            {isLoading ? (
                <FullPageSkeleton />
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Templates
                        </h1>

                        <div className="md:hidden">
                            <button onClick={() => setOpen(!open)}>
                                {open ? <X /> : <Menu />}
                            </button>
                        </div>

                        <div className="hidden md:flex gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="yellow">
                                        Create Template
                                    </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => handleCreate("drag")}>
                                        Drag & Drop Editor
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleCreate("html")}>
                                        HTML Editor
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleCreate("upload")}>
                                        Upload HTML
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    {open && (
                        <div className="md:hidden flex flex-col gap-2 border p-3 rounded-xl bg-background">
                            <Button variant="yellow" className="w-full" onClick={() => handleCreate("drag")}>
                                Drag & Drop Editor
                            </Button>
                            <Button variant="yellow" className="w-full" onClick={() => handleCreate("html")}>
                                HTML Editor
                            </Button>
                            <Button variant="yellow" className="w-full" onClick={() => handleCreate("upload")}>
                                Upload HTML
                            </Button>
                        </div>
                    )}

                    <Input
                        type="text"
                        placeholder="Search templates..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPage(0);
                        }}
                        className="w-full"
                    />

                    <TemplateGrid
                        templates={filteredTemplates}
                        isLoading={isLoading}
                    />

                    {totalPages > 1 && (
                        <div className="flex items-center justify-between text-sm">
                            <p className="text-muted-foreground">
                                Page {page + 1} of {totalPages} · {totalElements} templates
                            </p>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                                    disabled={page === 0}
                                >
                                    <ChevronLeft size={16} />
                                    Prev
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                    disabled={page >= totalPages - 1}
                                >
                                    Next
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}