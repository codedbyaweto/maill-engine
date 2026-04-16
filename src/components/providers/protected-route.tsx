// "use client";
//
// import { useRouter } from "next/navigation";
// import { useAppSelector } from "@/store/hooks";
// import { useEffect, useState } from "react";
//
// export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//     const router = useRouter();
//     const token = useAppSelector((s) => s.auth.token);
//     const [hydrated, setHydrated] = useState(false);
//
//     useEffect(() => {
//         setHydrated(true);
//     }, []);
//
//     useEffect(() => {
//         if (hydrated && !token) {
//             router.replace("/login");
//         }
//     }, [hydrated, token, router]);
//
//     return <>{children}</>;
// };

"use client";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const token = useAppSelector((s) => s.auth.token);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    useEffect(() => {
        if (hydrated && !token) {
            router.replace("/");
        }
    }, [hydrated, token, router]);

    if (!hydrated) return null;

    return token ? <>{children}</> : null;
};