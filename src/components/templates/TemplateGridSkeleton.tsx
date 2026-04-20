"use client";

export function TemplateSkeleton() {
    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="h-10 w-full bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />

                <div className="h-10 w-40 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            </div>

            <div className="grid gap-6 sm:gap-7 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="border rounded-xl p-4 space-y-4"
                    >
                        <div className="h-40 w-full bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />

                        <div className="space-y-2">
                            <div className="h-4 w-3/4 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                            <div className="h-3 w-1/2 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                        </div>

                        <div className="flex gap-2 pt-2">
                            <div className="h-8 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                            <div className="h-8 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                            <div className="h-8 w-16 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}