import DashboardModule from "@/modules/dashboard/DashboardModule";
import PermissionGuard from "@/components/providers/PermissinGuard";

export default function DashboardPage() {
    return (
        <PermissionGuard resource="dashboard">
            <DashboardModule/>
        </PermissionGuard>
    )
}