 import AppSideBar from "@/components/shared/AppSideBar";
import DashboardNavbar from "@/components/shared/DashboardNavbar";
import {ReactNode} from "react";
import {ProtectedRoute} from "@/components/providers/protected-route";
import {SidebarProvider} from "@/components/ui/sidebar";
import {cookies} from "next/headers";

export default async function DashboardLayout({ children }: { children: ReactNode }) {

    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <ProtectedRoute>
            <SidebarProvider defaultOpen={defaultOpen}>
                <AppSideBar/>
                <main className="w-full">
                    <DashboardNavbar/>
                    <div
                        className="px-4 bg-gradient-to-b from-yellow-50 via-white to-transparent dark:from-black dark:via-zinc-900 dark:to-transparent">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </ProtectedRoute>
    )
}