"use client";

export function UserTableSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex gap-4 items-center">
                <div className="h-10 w-full bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                <div className="h-10 w-32 bg-gray-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
            </div>

            <div className="border rounded-xl overflow-hidden">
                <div className="bg-gray-100 dark:bg-zinc-900 p-4 grid grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-3 bg-gray-300 dark:bg-zinc-800 rounded animate-pulse"
                        />
                    ))}
                </div>

                <div className="divide-y">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-5 gap-4 p-4 items-center">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-zinc-800 animate-pulse" />
                                <div className="h-4 w-24 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                            </div>

                            <div className="h-4 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />

                            <div className="h-4 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />

                            <div className="h-6 w-16 bg-gray-200 dark:bg-zinc-800 rounded-full animate-pulse" />

                            <div className="flex justify-end gap-2">
                                <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                                <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                                <div className="h-8 w-8 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 flex justify-between">
                    <div className="h-4 w-40 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    <div className="flex gap-2">
                        <div className="h-8 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                        <div className="h-8 w-20 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}