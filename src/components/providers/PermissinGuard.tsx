"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePermission } from "@/hooks/usePermission";

export default function PermissionGuard({resource, children,}: {
    resource: string;
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { canAccess, role } = usePermission();

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    const allowed = canAccess(resource);

    const fallbackPath =
        role === "viewer" ? "/campaigns" : "/dashboard";

    useEffect(() => {
        if (hydrated && !allowed) {
            router.replace(fallbackPath);
        }
    }, [hydrated, allowed, router, fallbackPath]);

    if (!hydrated) return null;

    if (!allowed) {
        return (
            <div className="p-4 text-muted-foreground">
                Access denied
            </div>
        );
    }

    return <>{children}</>;
}